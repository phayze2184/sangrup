export const siteMeta = {
  name: "San Electroterm Grup",
  title: "San Electroterm Grup",
  description:
    "Sisteme electrice feroviare, instalatii CCS-T, TTR-TC, ELF, EA, LC, curenti slabi, sisteme de securitate",
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

export const headerNavItems: HeaderNavItem[] = [
  {
    label: "Despre noi",
    href: "/about",
  },
  {
    label: "Servicii",
    href: "/#servicii",
    homeHref: "#servicii",
  },
  {
    label: "Portofoliu",
    href: "/#portofoliu",
    homeHref: "#portofoliu",
  },
  {
    label: "Certificări",
    href: "/certificari",
  },
  {
    label: "Contact",
    href: "/#contact",
    homeHref: "#contact",
  },
];

export const certificationDocuments: CertificationDocument[] = [
    {
    id: "certificare-afer",
    title: "Autorizație furnizor feroviar emisă de AFER",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/certificare%20afer.pdf",
    fileType: "PDF",
  },
   {
    id: "certificat-iso-2025",
    title: "Certificat SR EN ISO 9001:2015",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/certificat-iso-2025.pdf",
    fileType: "PDF",
  },
  {
    id: "atestat-anre-c1a",
    title: "Atestat ANRE C1A",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/atestat-anre-C1A.pdf",
    fileType: "PDF",
  },
  {
    id: "atestat-anre-e2",
    title: "Atestat ANRE tip E2",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/atestat-anre-tip-e2.pdf",
    fileType: "PDF",
  },
  {
    id: "autorizatie-igsu",
    title: "Autorizație IGSU",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/autorizatie-igsu.pdf",
    fileType: "PDF",
  },
  {
    id: "autorizatie-igsu-efect-sera",
    title: "Autorizație IGSU efect de seră",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/autorizatie-igsu-efect-sera.pdf",
    fileType: "PDF",
  },
  {
    id: "autorizatie-igsu-gaze-fierbinti",
    title: "Autorizație IGSU gaze fierbinți",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/autorizatie-igsu-gaze-fierbinti.pdf",
    fileType: "PDF",
  },
  {
    id: "autorizatie-igsu-gaze-fierbinti-exceptie",
    title: "Autorizație IGSU gaze fierbinți excepție gaz natural",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/autorizatie-igsu-gaze-fierbinti-exceptie-gaz-natural.pdf",
    fileType: "PDF",
  },
  {
    id: "certificare-ncage",
    title: "Certificare NCAGE",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/certificare-ncage.pdf",
    fileType: "PDF",
  },
  {
    id: "licenta-igp-2025",
    title: "Licență IGP 2025",
    description: "Document oficial disponibil pentru descărcare în format PDF.",
    filePath: "/assets/lienta-igp-2025.pdf",
    fileType: "PDF",
  },
];

export const certifications = Array.from({ length: 8 }, (_, index) => ({
  src: `/assets/cert-${index + 1}.png`,
  alt: `Certificare ${index + 1}`,
}));

export const services = [
  {
    title: "Instalații feroviare CCS-T, ELF, EA, LC, TTR-TC",
    description:
      "Lucrări de construcții-montaj, modernizări, reparații și întreținere instalații feroviare.",
    icon: "/assets/train.svg",
  },
  {
    title: "Proiectare instalații tehnice",
    description:
      "Proiectare instalații electrice și feroviare, aliniate la normative și cerințe tehnice.",
    icon: "/assets/compass.svg",
  },
  {
    title: "Instalații electrice de JT și MT",
    description:
      "Executare de posturi de transformare, stații electrice și de lucrări la partea electrică a centralelor cu orice tensiuni nominale standardizate.",
    icon: "/assets/zap.svg",
  },
  {
    title: "Sisteme de securitate și incendiu",
    description:
      "Instalare sisteme de semnalizare, alarmare și alertare în caz de incendiu.",
    icon: "/assets/shield.svg",
  },
];

export const portfolioProjects = [
  {
    title: "Linii contact",
    location: "Gara Ciulnița",
    year: "2025-în derulare",
    image: {
      jpg: "/assets/portofoliu-1.jpg",
      webp: "/assets/portofoliu-1.webp",
      avif: "/assets/portofoliu-1.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Lucrări TN",
    location: "Babadag",
    year: "2020",
    image: {
      jpg: "/assets/portofoliu-2.jpg",
      webp: "/assets/portofoliu-2.webp",
    },
    alt: "Transport public ecologic",
  },
  {
    title: "Lucrări linii medie tensiune",
    location: "Bolintin",
    year: "2022",
    image: {
      jpg: "/assets/portofoliu-3.jpg",
      webp: "/assets/portofoliu-3.webp",
      avif: "/assets/portofoliu-3.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Mentenanță echipamente CF",
    location: "Medgidia",
    year: "2025",
    image: {
      jpg: "/assets/portofoliu-4.jpg",
      webp: "/assets/portofoliu-4.webp",
      avif: "/assets/portofoliu-4.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Instalații de joasă tensiune",
    location: "Ploiești",
    year: "2019",
    image: {
      jpg: "/assets/portofoliu-5.jpg",
      webp: "/assets/portofoliu-5.webp",
      avif: "/assets/portofoliu-5.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Instalații curenți slabi și incendiu",
    location: "Corbu",
    year: "2019",
    image: {
      jpg: "/assets/portofoliu-6.jpg",
      webp: "/assets/portofoliu-6.webp",
      avif: "/assets/portofoliu-6.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Execuție JIL-uri",
    location: "CNCFR",
    year: "---",
    image: {
      jpg: "/assets/portofoliu-7.jpg",
      webp: "/assets/portofoliu-7.webp",
      avif: "/assets/portofoliu-7.avif",
    },
    alt: "Modernizare linie feroviară",
  },
  {
    title: "Lucrări de construcții-montaj",
    location: "Municipiul Aiud",
    year: "2023-2025",
    image: {
      jpg: "/assets/portofoliu-8.jpg",
      webp: "/assets/portofoliu-8.webp",
      avif: "/assets/portofoliu-8.avif",
    },
    alt: "Modernizare linie feroviară",
  },
];

export const aboutHistory = [
  'Înființată în anul 2003 pe baza unei viziuni tehnice solide, San Electroterm Grup s-a dezvoltat treptat dintr-o firmă specializată în <span class="highlight">lucrări de instalații</span> într-un integrator complex de soluții pentru clienți din sectoare critice ale industriei și infrastructurii.',
  'Pe parcursul anilor, San Electroterm Grup și-a <span class="highlight">extins aria de expertiză</span>, inclusiv prin accesul în proiecte feroviare, instalații electrice de joasă și medie tensiune, automatizări inteligente, securitate și alte lucrări de curenți slabi.',
  'Un moment semnificativ în evoluția recentă este achiziția strategică a <span class="highlight">companiei ISAF</span>, consolidându-și astfel poziția în domeniul proiectării și execuției de instalații feroviare și aducând experiență în tehnologie și standarde de calitate.',
];

export const managementTeam = [
  {
    name: "Ioan Buzău",
    role: "Managing Director",
    image: "/assets/person-1.webp",
  },
  {
    name: "Sergiu Neagu",
    role: "Managing Director",
    image: "/assets/person-2.webp",
  },
  {
    name: "Radu Mitu",
    role: "Chief Operating Officer",
    image: "/assets/person-3.webp",
  },
  {
    name: "Alina Napu",
    role: "Commercial Director",
    image: "/assets/person-4.webp",
  },
];
