import { useGameStore } from "@/store/useGameStore";

export type Language = "en" | "bn";

const TRANSLATIONS = {
  settings: { en: "Settings", bn: "সেটিংস" },
  sound: { en: "Sound", bn: "সাউন্ড" },
  haptics: { en: "Haptics", bn: "ভাইব্রেশন" },
  graphicsQuality: { en: "Graphics Quality", bn: "গ্রাফিক্স কোয়ালিটি" },
  language: { en: "Language", bn: "ভাষা" },
  clearData: { en: "Clear Local Data", bn: "ডাটা মুছুন" },
  close: { en: "Close", bn: "বন্ধ করুন" },
  english: { en: "English", bn: "ইংরেজি" },
  bangla: { en: "Bangla", bn: "বাংলা" },
  shop: { en: "Shop", bn: "দোকান" },
  achievements: { en: "Achievements", bn: "অর্জন" },
  wantedPoster: { en: "Wanted Poster", bn: "পোস্টার" },
  introTitle: {
    en: "Upload a face. Pick a route.",
    bn: "মুখের ছবি দিন। রুট ঠিক করুন।",
  },
  introDescription: {
    en: "Use your photo or a generated face, then choose a villain and route.",
    bn: "নিজের ছবি দিন বা তৈরি মুখ রাখুন। তারপর ভিলেন আর রুট বেছে নিন।",
  },
  startRun: { en: "START RUN", bn: "রাস্তায় নামাও" },
  loadingAssets: { en: "LOADING ASSETS...", bn: "অ্যাসেট লোড হচ্ছে..." },
  ready: { en: "READY!", bn: "প্রস্তুত!" },
  playAnyway: { en: "Play anyway", bn: "তবুও খেলুন" },
  tapToStart: { en: "TAP TO START", bn: "শুরু করতে ট্যাপ করুন" },
  health: { en: "Health", bn: "স্বাস্থ্য" },
  stamina: { en: "Stamina", bn: "স্ট্যামিনা" },
  score: { en: "Score", bn: "স্কোর" },
  taka: { en: "Taka", bn: "টাকা" },
  morale: { en: "Morale", bn: "মনোবল" },
  wanted: { en: "Wanted", bn: "ওয়ান্টেড" },
  pause: { en: "Pause", bn: "বিরতি" },
  paused: { en: "PAUSED", bn: "বিরতি" },
  resume: { en: "Resume", bn: "চালিয়ে যান" },
  restart: { en: "Restart", bn: "আবার শুরু" },
  lobby: { en: "Main Lobby", bn: "মূল লবি" },
  victory: { en: "Victory", bn: "জয়" },
  defeat: { en: "Defeat", bn: "পরাজয়" },
  finalScore: { en: "Final Score", bn: "চূড়ান্ত স্কোর" },
  stars: { en: "Stars", bn: "স্টার" },
  nextMap: { en: "Next Map", bn: "পরের ম্যাপ" },
  replay: { en: "Replay", bn: "আবার খেলুন" },
  mapUnlocked: { en: "Map Unlocked", bn: "ম্যাপ আনলক হয়েছে" },
  targetEscaped: { en: "TARGET ESCAPED!", bn: "টার্গেট পালিয়েছে!" },
  outOfPatience: { en: "OUT OF PATIENCE!", bn: "ধৈর্য শেষ!" },
  missionAccomplished: { en: "MISSION ACCOMPLISHED!", bn: "মিশন সম্পন্ন!" },
  clearDataConfirm: {
    en: "Clear local saved face and cached game records?",
    bn: "সেভ করা মুখ ও স্থানীয় গেম রেকর্ড মুছবেন?",
  },
  dataCleared: { en: "Local data cleared!", bn: "স্থানীয় ডাটা মুছে ফেলা হয়েছে!" },
  rotateDevice: { en: "PLEASE ROTATE DEVICE", bn: "ফোনটি ঘুরিয়ে নিন" },
  rotateDescription: {
    en: "Rotate your phone to landscape for the best experience.",
    bn: "সেরা অভিজ্ঞতার জন্য ফোনটি ল্যান্ডস্কেপ করুন।",
  },
  playPortrait: { en: "Play in portrait anyway", bn: "তবুও পোর্ট্রেটে খেলুন" },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;

export function translate(key: TranslationKey, lang: Language): string {
  return TRANSLATIONS[key][lang];
}

export function useI18n() {
  const lang = useGameStore((state) => state.settings.lang);
  return {
    lang,
    t: (key: TranslationKey) => translate(key, lang),
  };
}
