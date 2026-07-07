import type { ImageMetadata } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { withBase } from "../utils/base";
import type { Locale } from "../i18n/locales";
import { ui } from "../i18n/ui";

const portfolioImages = import.meta.glob<{ default: ImageMetadata }>("../assets/portfolio/*.jpg", { eager: true });
const teamImages = import.meta.glob<{ default: ImageMetadata }>("../assets/team/*.png", { eager: true });
const certificationImages = import.meta.glob<{ default: ImageMetadata }>("../assets/certifications/*.png", { eager: true });

const byBasename = (modules: Record<string, { default: ImageMetadata }>) =>
  Object.fromEntries(Object.entries(modules).map(([path, mod]) => [path.split("/").pop(), mod.default]));

const portfolioImagesByName = byBasename(portfolioImages);
const teamImagesByName = byBasename(teamImages);
const certificationImagesByName = byBasename(certificationImages);

const portfolioImage = (file: string) => portfolioImagesByName[file];
const teamImage = (file: string) => teamImagesByName[file];
const certificationImage = (file: string) => certificationImagesByName[file];

export const siteMeta = {
  name: "San Electroterm Grup",
  title: "San Electroterm Grup",
  description: {
    ro: "Sisteme electrice feroviare, instalatii CCS-T, TTR-TC, ELF, EA, LC, curenti slabi, sisteme de securitate",
    en: "Railway electrical systems, CCS-T, TTR-TC, ELF, EA, LC installations, low-voltage and fire/security systems",
  } satisfies Record<Locale, string>,
  phoneDisplay: "+40 748 20 50 40",
  phoneHref: "tel:0748205040",
  email: "office@sangrup.ro",
  linkedin:
    "https://www.linkedin.com/company/san-electroterm-grup-srl/",
  addressLines: [
    "Str. Interioară nr. 2",
    "900229 Constanța",
    "România",
  ],
  addressUrl: "https://maps.app.goo.gl/En5bNJqj5rtg1JsC8",
  companyInfo: [
    "San Electroterm Grup SRL",
    "CIF 15344614",
    "J13/1197/2003",
  ],
};

export interface HeaderNavItem {
  label: string;
  href: string;
  homeHref?: string;
}

export interface CertificationDocument {
  id: string;
  title: string;
  description: string;
  filePath: string;
  fileType: "PDF";
}

const buildHeaderNavItems = (locale: Locale): HeaderNavItem[] => {
  const localeRoot = getRelativeLocaleUrl(locale);
  return [
    {
      label: ui.nav.despre[locale],
      href: getRelativeLocaleUrl(locale, "about"),
    },
    {
      label: ui.nav.servicii[locale],
      href: `${localeRoot}#servicii`,
      homeHref: "#servicii",
    },
    {
      label: ui.nav.portofoliu[locale],
      href: `${localeRoot}#portofoliu`,
      homeHref: "#portofoliu",
    },
    {
      label: ui.nav.certificari[locale],
      href: getRelativeLocaleUrl(locale, "certificari"),
    },
    {
      label: ui.nav.contact[locale],
      href: `${localeRoot}#contact`,
      homeHref: "#contact",
    },
  ];
};

export const headerNavItems: Record<Locale, HeaderNavItem[]> = {
  ro: buildHeaderNavItems("ro"),
  en: buildHeaderNavItems("en"),
};

// Footer intentionally omits the "Contact" item (it links to the contact form,
// which is already the last section on the page) — derived from headerNavItems
// so labels are only authored once per locale.
export const footerNavItems: Record<Locale, HeaderNavItem[]> = {
  ro: headerNavItems.ro.filter((item) => item.homeHref !== "#contact"),
  en: headerNavItems.en.filter((item) => item.homeHref !== "#contact"),
};

const certificationDescription: Record<Locale, string> = {
  ro: "Document oficial disponibil pentru descărcare în format PDF.",
  en: "Official document available for download in PDF format.",
};

const certificationTitles: Record<Locale, string[]> = {
  ro: [
    "Autorizație furnizor feroviar emisă de AFER",
    "Certificat SR EN ISO 9001:2015",
    "Atestat ANRE C1A",
    "Atestat ANRE tip E2",
    "Autorizație IGSU",
    "Autorizație IGSU efect de seră",
    "Autorizație IGSU gaze fierbinți",
    "Autorizație IGSU gaze fierbinți excepție gaz natural",
    "Certificare NCAGE",
    "Licență IGP 2025",
  ],
  en: [
    "Railway Supplier Authorization issued by AFER",
    "SR EN ISO 9001:2015 Certificate",
    "ANRE C1A Certification",
    "ANRE Type E2 Certification",
    "IGSU Authorization",
    "IGSU Greenhouse Gas Authorization",
    "IGSU Hot Gases Authorization",
    "IGSU Hot Gases Authorization (Natural Gas Exception)",
    "NCAGE Certification",
    "IGP License 2025",
  ],
};

const certificationBase = [
  { id: "certificare-afer", filePath: withBase("/assets/certificare%20afer.pdf") },
  { id: "certificat-iso-2025", filePath: withBase("/assets/certificat-iso-2025.pdf") },
  { id: "atestat-anre-c1a", filePath: withBase("/assets/atestat-anre-C1A.pdf") },
  { id: "atestat-anre-e2", filePath: withBase("/assets/atestat-anre-tip-e2.pdf") },
  { id: "autorizatie-igsu", filePath: withBase("/assets/autorizatie-igsu.pdf") },
  { id: "autorizatie-igsu-efect-sera", filePath: withBase("/assets/autorizatie-igsu-efect-sera.pdf") },
  { id: "autorizatie-igsu-gaze-fierbinti", filePath: withBase("/assets/autorizatie-igsu-gaze-fierbinti.pdf") },
  {
    id: "autorizatie-igsu-gaze-fierbinti-exceptie",
    filePath: withBase("/assets/autorizatie-igsu-gaze-fierbinti-exceptie-gaz-natural.pdf"),
  },
  { id: "certificare-ncage", filePath: withBase("/assets/certificare-ncage.pdf") },
  { id: "licenta-igp-2025", filePath: withBase("/assets/lienta-igp-2025.pdf") },
] as const;

const buildCertificationDocuments = (locale: Locale): CertificationDocument[] =>
  certificationBase.map((doc, index) => ({
    id: doc.id,
    title: certificationTitles[locale][index],
    description: certificationDescription[locale],
    filePath: doc.filePath,
    fileType: "PDF",
  }));

export const certificationDocuments: Record<Locale, CertificationDocument[]> = {
  ro: buildCertificationDocuments("ro"),
  en: buildCertificationDocuments("en"),
};

export const certifications: Record<Locale, { src: ImageMetadata; alt: string }[]> = {
  ro: Array.from({ length: 8 }, (_, index) => ({
    src: certificationImage(`cert-${index + 1}.png`),
    alt: `Certificare ${index + 1}`,
  })),
  en: Array.from({ length: 8 }, (_, index) => ({
    src: certificationImage(`cert-${index + 1}.png`),
    alt: `Certification ${index + 1}`,
  })),
};

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export const services: Record<Locale, ServiceItem[]> = {
  ro: [
    {
      title: "Instalații feroviare CCS-T, ELF, EA, LC, TTR-TC",
      description:
        "Lucrări de construcții-montaj, modernizări, reparații și întreținere instalații feroviare.",
      icon: withBase("/assets/train.svg"),
    },
    {
      title: "Proiectare instalații tehnice",
      description:
        "Proiectare instalații electrice și feroviare, aliniate la normative și cerințe tehnice.",
      icon: withBase("/assets/compass.svg"),
    },
    {
      title: "Instalații electrice de JT și MT",
      description:
        "Executare de posturi de transformare, stații electrice și de lucrări la partea electrică a centralelor cu orice tensiuni nominale standardizate.",
      icon: withBase("/assets/zap.svg"),
    },
    {
      title: "Sisteme de securitate și incendiu",
      description:
        "Instalare sisteme de semnalizare, alarmare și alertare în caz de incendiu.",
      icon: withBase("/assets/shield.svg"),
    },
  ],
  en: [
    {
      title: "Railway installations: CCS-T, ELF, EA, LC, TTR-TC",
      description:
        "Construction, installation, modernization, repair, and maintenance of railway installations.",
      icon: withBase("/assets/train.svg"),
    },
    {
      title: "Technical installation design",
      description:
        "Design of electrical and railway installations, aligned with regulations and technical requirements.",
      icon: withBase("/assets/compass.svg"),
    },
    {
      title: "Low-voltage (LV) and medium-voltage (MV) electrical installations",
      description:
        "Execution of transformer substations, electrical stations, and electrical works for power plants at any standardized nominal voltage.",
      icon: withBase("/assets/zap.svg"),
    },
    {
      title: "Security and fire safety systems",
      description:
        "Installation of fire signaling, alarm, and alert systems.",
      icon: withBase("/assets/shield.svg"),
    },
  ],
};

export interface PortfolioProject {
  title: string;
  location: string;
  year: string;
  image: ImageMetadata;
  alt: string;
}

const portfolioBase = [
  { location: "Gara Ciulnița", image: "portofoliu-1.jpg" },
  { location: "Babadag", image: "portofoliu-2.jpg" },
  { location: "Bolintin", image: "portofoliu-3.jpg" },
  { location: "Medgidia", image: "portofoliu-4.jpg" },
  { location: "Ploiești", image: "portofoliu-5.jpg" },
  { location: "Corbu", image: "portofoliu-6.jpg" },
  { location: "CNCFR", image: "portofoliu-7.jpg" },
  { location: "Municipiul Aiud", image: "portofoliu-8.jpg" },
] as const;

const portfolioContent: Record<Locale, { title: string; year: string; alt: string }[]> = {
  ro: [
    { title: "Linii contact", year: "2025-în derulare", alt: "Modernizare linie feroviară" },
    { title: "Lucrări TN", year: "2020", alt: "Transport public ecologic" },
    { title: "Lucrări linii medie tensiune", year: "2022", alt: "Modernizare linie feroviară" },
    { title: "Mentenanță echipamente CF", year: "2025", alt: "Modernizare linie feroviară" },
    { title: "Instalații de joasă tensiune", year: "2019", alt: "Modernizare linie feroviară" },
    { title: "Instalații curenți slabi și incendiu", year: "2019", alt: "Modernizare linie feroviară" },
    { title: "Execuție JIL-uri", year: "---", alt: "Modernizare linie feroviară" },
    { title: "Lucrări de construcții-montaj", year: "2023-2025", alt: "Modernizare linie feroviară" },
  ],
  en: [
    { title: "Contact Lines", year: "2025–ongoing", alt: "Railway line modernization" },
    { title: "TN Works", year: "2020", alt: "Eco-friendly public transport" },
    { title: "Medium-Voltage Line Works", year: "2022", alt: "Railway line modernization" },
    { title: "Railway Equipment Maintenance", year: "2025", alt: "Railway line modernization" },
    { title: "Low-Voltage Installations", year: "2019", alt: "Railway line modernization" },
    { title: "Low-Current and Fire Safety Installations", year: "2019", alt: "Railway line modernization" },
    { title: "Insulated Rail Joint (JIL) Installation", year: "---", alt: "Railway line modernization" },
    { title: "Construction and Installation Works", year: "2023-2025", alt: "Railway line modernization" },
  ],
};

const buildPortfolioProjects = (locale: Locale): PortfolioProject[] =>
  portfolioBase.map((project, index) => ({
    title: portfolioContent[locale][index].title,
    location: project.location,
    year: portfolioContent[locale][index].year,
    image: portfolioImage(project.image),
    alt: portfolioContent[locale][index].alt,
  }));

export const portfolioProjects: Record<Locale, PortfolioProject[]> = {
  ro: buildPortfolioProjects("ro"),
  en: buildPortfolioProjects("en"),
};

export const aboutHistory: Record<Locale, string[]> = {
  ro: [
    'Înființată în anul 2003 pe baza unei viziuni tehnice solide, San Electroterm Grup s-a dezvoltat treptat dintr-o firmă specializată în <span class="highlight">lucrări de instalații</span> într-un integrator complex de soluții pentru clienți din sectoare critice ale industriei și infrastructurii.',
    'Pe parcursul anilor, San Electroterm Grup și-a <span class="highlight">extins aria de expertiză</span>, inclusiv prin accesul în proiecte feroviare, instalații electrice de joasă și medie tensiune, automatizări inteligente, securitate și alte lucrări de curenți slabi.',
    'Un moment semnificativ în evoluția recentă este achiziția strategică a <span class="highlight">companiei ISAF</span>, consolidându-și astfel poziția în domeniul proiectării și execuției de instalații feroviare și aducând experiență în tehnologie și standarde de calitate.',
  ],
  en: [
    'Founded in 2003 on a solid technical vision, San Electroterm Grup gradually grew from a company specialized in <span class="highlight">installation works</span> into a complex solutions integrator for clients in critical industry and infrastructure sectors.',
    'Over the years, San Electroterm Grup has <span class="highlight">expanded its area of expertise</span>, including entry into railway projects, low- and medium-voltage electrical installations, smart automation, security, and other low-current works.',
    'A significant milestone in its recent evolution is the strategic acquisition of <span class="highlight">ISAF company</span>, strengthening its position in railway installation design and execution and bringing added experience in technology and quality standards.',
  ],
};

export const managementTeam = [
  {
    name: "Ioan Buzău",
    role: "Managing Director",
    image: teamImage("Profile-1.png"),
  },
  {
    name: "Sergiu Neagu",
    role: "Managing Director",
    image: teamImage("Profile-2.png"),
  },
  {
    name: "Radu Mitu",
    role: "Chief Operating Officer",
    image: teamImage("Profile-3.png"),
  },
  {
    name: "Alina Napu",
    role: "Commercial Director",
    image: teamImage("Profile-4.png"),
  },
];
