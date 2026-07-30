import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InterestId =
  | "games"
  | "sports"
  | "music"
  | "art"
  | "outdoors"
  | "coding"
  | "memes"
  | "food"
  | "media";

export const INTEREST_OPTIONS: { id: InterestId; label: string }[] = [
  { id: "media", label: "Media" },
  { id: "games", label: "Games" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "art", label: "Art" },
  { id: "outdoors", label: "Outdoors" },
  { id: "coding", label: "Coding" },
  { id: "memes", label: "Memes" },
  { id: "food", label: "Food" },
];

export const KNOWN_INSTAGRAM_HANDLE = "zacks_way_media";
export const KNOWN_INSTAGRAM_URL =
  "https://www.instagram.com/zacks_way_media/";

export type Profile = {
  displayName: string;
  handle: string;
  bio: string;
  interests: InterestId[];
  setupComplete: boolean;
};

type ProfileState = Profile & {
  setProfile: (patch: Partial<Profile>) => void;
  completeSetup: (data: Omit<Profile, "setupComplete">) => void;
  resetProfile: () => void;
};

const defaults: Profile = {
  displayName: "Zack's Way Media",
  handle: KNOWN_INSTAGRAM_HANDLE,
  bio: "Lynchburg-based creative studio producing brand films, social systems, and campaign visuals for clients who want signal—not noise.",
  interests: ["media", "art", "outdoors"],
  setupComplete: true,
};

export function normalizeHandle(raw: string): string {
  return raw
    .trim()
    .replace(/^@+/, "")
    .replace(/https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[/?#].*$/, "")
    .replace(/[^a-zA-Z0-9._]/g, "");
}

export function instagramUrl(handle: string): string | null {
  const clean = normalizeHandle(handle);
  if (!clean) return null;
  return `https://www.instagram.com/${encodeURIComponent(clean)}/`;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...defaults,
      setProfile: (patch) =>
        set((state) => ({
          ...state,
          ...patch,
          handle:
            patch.handle !== undefined
              ? normalizeHandle(patch.handle)
              : state.handle,
        })),
      completeSetup: (data) =>
        set({
          displayName: data.displayName.trim() || defaults.displayName,
          handle: normalizeHandle(data.handle) || defaults.handle,
          bio: data.bio.trim() || defaults.bio,
          interests: data.interests.length ? data.interests : defaults.interests,
          setupComplete: true,
        }),
      resetProfile: () => set({ ...defaults }),
    }),
    {
      name: "zacks-way-media-profile-v3",
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ProfileState>;
        const handle =
          p.handle && p.handle.length > 0
            ? normalizeHandle(p.handle)
            : defaults.handle;
        return {
          ...current,
          ...p,
          displayName: p.displayName?.trim() || defaults.displayName,
          handle,
          bio: p.bio?.trim() || defaults.bio,
          interests:
            p.interests && p.interests.length > 0
              ? p.interests
              : defaults.interests,
          setupComplete: true,
        };
      },
    },
  ),
);
