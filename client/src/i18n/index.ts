import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ro, type Translations } from "./ro";
import { en } from "./en";

export type Language = "ro" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  ro,
  en,
};

export const useLanguage = create<LanguageState>()(
  persist(
    (set: (partial: Partial<LanguageState>) => void) => ({
      language: "ro" as Language,
      t: ro,
      setLanguage: (lang: Language) =>
        set({
          language: lang,
          t: translations[lang],
        }),
    }),
    {
      name: "khora-language",
      partialize: (state: LanguageState) => ({ language: state.language }),
      onRehydrateStorage: () => (state: LanguageState | undefined) => {
        if (state) {
          state.t = translations[state.language];
        }
      },
    }
  )
);

// Helper function for nested translation keys
export function getNestedTranslation(obj: Record<string, unknown>, path: string): string {
  const result = path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

// Export translations for direct access
export { ro, en };
export type { Translations };
