import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_SAVE_DATA_V1,
  loadSettings,
  saveSettings,
  SETTINGS_STORAGE_KEY,
} from "@/services/storage";
import { translate } from "@/i18n";

const storage = new Map<string, string>();

const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
};

describe("settings persistence and localization", () => {
  const defaults = {
    sound: true,
    haptics: true,
    quality: "high" as const,
    lang: "bn" as const,
    reducedMotion: false,
  };

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("localStorage", localStorageMock);
    vi.stubGlobal("window", { localStorage: localStorageMock });
  });

  it("persists sound and language settings", () => {
    const saved = { ...defaults, sound: false, lang: "en" as const };
    expect(saveSettings(saved)).toBe(true);
    expect(loadSettings(defaults)).toEqual(saved);
    expect(localStorageMock.getItem(SETTINGS_STORAGE_KEY)).toContain('"sound":false');
  });

  it("falls back safely when settings storage is corrupted", () => {
    localStorageMock.setItem(SETTINGS_STORAGE_KEY, "{bad json");
    expect(loadSettings(defaults)).toEqual(defaults);
  });

  it("provides English and Bangla labels for core settings", () => {
    expect(translate("sound", "en")).toBe("Sound");
    expect(translate("sound", "bn")).toBe("সাউন্ড");
    expect(translate("nextMap", "en")).toBe("Next Map");
    expect(translate("nextMap", "bn")).toBe("পরের ম্যাপ");
  });

  it("does not alter the existing save-data defaults", () => {
    expect(DEFAULT_SAVE_DATA_V1.version).toBe(1);
    expect(DEFAULT_SAVE_DATA_V1.unlockedMaps).toEqual(["mirpur"]);
  });
});
