import { useTranslation } from "react-i18next";

import { LANGUAGES } from "../../shared/constants";
import type { LanguageCode } from "../../types/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentCode = i18n.resolvedLanguage?.split("-")[0] as
    | LanguageCode
    | undefined;

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === currentCode) ?? LANGUAGES[0];

  const changeLanguage = (language: LanguageCode): void => {
    i18n.changeLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Change language"
        >
          <img
            src={currentLanguage.flag}
            alt={currentLanguage.label}
            className="h-6 w-6 rounded-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={
              currentCode === language.code ? "font-semibold" : undefined
            }
          >
            <img
              src={language.flag}
              alt={language.label}
              className="h-5 w-5 rounded-full object-cover"
            />
            <span
              className={
                currentCode === language.code ? "font-semibold" : undefined
              }
            >
              {language.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
