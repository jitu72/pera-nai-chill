"use client";

import { useGameStore } from "@/store/useGameStore";
import { MAP_SCENARIOS } from "@/config/maps";
import { MapPin, Check, AlertTriangle } from "lucide-react";
import { audioService } from "@/services/audio";
import { useI18n } from "@/i18n";

export function MapSelector() {
  const { currentMapId, setMapId } = useGameStore();
  const { lang } = useI18n();
  return <section className="lobby-panel route-panel" aria-labelledby="route-heading">
    <h2 id="route-heading">{lang === "bn" ? "ঢাকার রুট" : "Dhaka Routes"} <small>{lang === "bn" ? "রুট বেছে নিন" : "Choose a route"}</small></h2>
    <div className="route-choices">
      {MAP_SCENARIOS.map(map => <button key={map.id} type="button" aria-pressed={currentMapId === map.id}
        onClick={() => { audioService.play("click"); setMapId(map.id); }}>
        <MapPin aria-hidden="true" />
        <span className="route-copy"><strong>{map.name[lang]}</strong><small>{map.tagline[lang]}</small>
          <span className="route-hazard"><AlertTriangle size={16} aria-hidden="true" />{lang === "bn" ? map.hazards.primary : map.hazards.secondary}</span>
        </span>
        {currentMapId === map.id && <Check aria-label="নির্বাচিত" />}
      </button>)}
    </div>
  </section>;
}
