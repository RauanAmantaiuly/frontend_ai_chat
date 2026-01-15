import type { Language } from "../types/language";

export const LANGUAGES: readonly Language[] = [
  { code: "en", label: "English", flag: "/en-flag.png" },
  { code: "ru", label: "Русский", flag: "/ru-flag.png" },
  { code: "kz", label: "Қазақша", flag: "/kz-flag.png" },
] as const;
