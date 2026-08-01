import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ACCENT_THEMES = [
  {
    id: "red" as const,
    label: "Crimson",
    blurb: "Default studio rim",
    swatch: "#e10600",
  },
  {
    id: "green" as const,
    label: "Signal",
    blurb: "Fresh / growth energy",
    swatch: "#12b76a",
  },
  {
    id: "blue" as const,
    label: "Electric",
    blurb: "Corporate-cool edge",
    swatch: "#3b82f6",
  },
  {
    id: "orange" as const,
    label: "Ember",
    blurb: "Heat / motorsport energy",
    swatch: "#ff6a00",
  },
];

export type AccentId = (typeof ACCENT_THEMES)[number]["id"];

const ACCENT_IDS = new Set<string>(ACCENT_THEMES.map((t) => t.id));

export function isAccentId(value: string | null | undefined): value is AccentId {
  return !!value && ACCENT_IDS.has(value);
}

export function applyAccentToDocument(accent: AccentId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-accent", accent);
  document.documentElement.style.colorScheme = "dark";
}

type ThemeState = {
  accent: AccentId;
  setAccent: (accent: AccentId) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      accent: "red",
      setAccent: (accent) => {
        applyAccentToDocument(accent);
        set({ accent });
      },
    }),
    {
      name: "zwm-accent",
      partialize: (state) => ({ accent: state.accent }),
      onRehydrateStorage: () => (state) => {
        if (state?.accent && isAccentId(state.accent)) {
          applyAccentToDocument(state.accent);
        }
      },
    },
  ),
);

/** Call once on client mount so hydrate matches localStorage */
export function syncAccentFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("zwm-accent");
    if (!raw) {
      applyAccentToDocument("red");
      return;
    }
    const parsed = JSON.parse(raw) as { state?: { accent?: string } };
    const accent = parsed?.state?.accent;
    applyAccentToDocument(isAccentId(accent) ? accent : "red");
  } catch {
    applyAccentToDocument("red");
  }
}
