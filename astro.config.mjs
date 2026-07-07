import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://phayze2184.github.io',
  base: '/sangrup',
  i18n: {
    defaultLocale: "ro",
    locales: ["ro", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "ro",
        locales: { ro: "ro", en: "en" },
      },
    }),
  ],
});
