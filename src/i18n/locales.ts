export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const getLocale = (astroCurrentLocale: string | undefined): Locale =>
  (locales as readonly string[]).includes(astroCurrentLocale ?? "")
    ? (astroCurrentLocale as Locale)
    : defaultLocale;
