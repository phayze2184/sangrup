import type { Locale } from "./locales";

type Entry = Record<Locale, string>;

export const ui = {
  skipLink: { ro: "Sari la conținut", en: "Skip to content" },

  header: {
    logoAlt: { ro: "Sangrup logo", en: "Sangrup logo" },
    brandLabel: { ro: "San Grup - Acasă", en: "San Grup - Home" },
    navLabel: { ro: "Navigație principală", en: "Main navigation" },
    phoneAriaLabel: { ro: "Număr de telefon", en: "Phone number" },
    menuAriaLabel: { ro: "Deschide meniul", en: "Open menu" },
    switchToLabel: { ro: "Switch to English", en: "Comută în română" },
  },

  nav: {
    despre: { ro: "Despre noi", en: "About us" },
    servicii: { ro: "Servicii", en: "Services" },
    portofoliu: { ro: "Portofoliu", en: "Portfolio" },
    certificari: { ro: "Certificări", en: "Certifications" },
    contact: { ro: "Contact", en: "Contact" },
  },

  footer: {
    contactTitle: { ro: "Contact", en: "Contact" },
    menuTitle: { ro: "Meniu", en: "Menu" },
    addressTitle: { ro: "Adresă", en: "Address" },
    infoTitle: { ro: "INFO", en: "INFO" },
    privacyLink: { ro: "Politica de confidențialitate", en: "Privacy Policy" },
    copyrightTemplate: {
      ro: "© {year} Sangrup. Toate drepturile rezervate.",
      en: "© {year} Sangrup. All rights reserved.",
    },
    logoAlt: { ro: "logo sangrup", en: "Sangrup logo" },
    phoneAlt: { ro: "telefon", en: "phone" },
    emailAlt: { ro: "email", en: "email" },
    linkedinAlt: { ro: "linkedin icon", en: "linkedin icon" },
  },

  hero: {
    titlePrefix: { ro: "Instalații ", en: "" },
    titleHighlight: { ro: "electrice", en: "Electrical" },
    titleSuffix: {
      ro: " pentru sisteme sigure și fiabile",
      en: " installations for safe and reliable systems",
    },
    description: {
      ro: "Proiectăm, realizăm și modernizăm instalații feroviare folosind tehnologii de ultimă generație și expertiză solidă, pentru rețele de transport feroviar mai sigure, mai eficiente și mai performante.",
      en: "We design, build, and modernize railway installations using state-of-the-art technology and solid expertise, for safer, more efficient, and higher-performing railway transport networks.",
    },
    ctaLabel: { ro: "Cere o ofertă", en: "Request a quote" },
    imageAlt: {
      ro: "Echipă în teren la instalații feroviare",
      en: "Team on-site at a railway installation",
    },
    kpiLabel: { ro: "ani experiență", en: "years of experience" },
  },

  despre: {
    eyebrow: { ro: "Despre noi", en: "About us" },
    missionHeading: { ro: "Misiunea noastră", en: "Our mission" },
    missionParagraph1: {
      ro: 'Să oferim soluții complete de instalații electrice și tehnice de cea mai înaltă calitate, contribuind la <span class="highlight">dezvoltarea infrastructurii naționale</span> și asigurând siguranța și eficiența operațională pentru clienții noștri.',
      en: 'To provide complete, top-quality electrical and technical installation solutions, contributing to the <span class="highlight">development of national infrastructure</span> and ensuring operational safety and efficiency for our clients.',
    },
    missionParagraph2: {
      ro: 'Printr-o abordare integrată de inginerie și execuție, asigurăm respectarea cerințelor tehnice și a standardelor aplicabile, livrând soluții fiabile și durabile, optimizate pentru <span class="highlight">exploatare sigură</span> și eficientă pe termen lung.',
      en: 'Through an integrated engineering and execution approach, we ensure compliance with technical requirements and applicable standards, delivering reliable, durable solutions optimized for <span class="highlight">safe operation</span> and long-term efficiency.',
    },
    visionHeading: { ro: "Viziunea noastră", en: "Our vision" },
    visionParagraph1: {
      ro: 'Urmărim dezvoltarea și implementarea unor sisteme electrice feroviare sigure, fiabile și scalabile, bazate pe expertiză inginerească solidă, <span class="highlight">control riguros al calității</span> și utilizarea tehnologiilor validate în exploatare.',
      en: 'We pursue the development and implementation of safe, reliable, and scalable railway electrical systems, built on solid engineering expertise, <span class="highlight">rigorous quality control</span>, and field-proven technologies.',
    },
    visionParagraph2: {
      ro: 'Prin optimizarea soluțiilor tehnice, management eficient al riscurilor și respectarea termenelor contractuale, contribuim la realizarea unor <span class="highlight">infrastructuri durabile</span>, pregătite pentru cerințele operaționale actuale și viitoare ale transportului feroviar.',
      en: 'By optimizing technical solutions, managing risk effectively, and honoring contractual deadlines, we help deliver <span class="highlight">durable infrastructure</span>, ready for the current and future operational demands of railway transport.',
    },
    ctaLabel: { ro: "Despre noi", en: "About us" },
  },

  services: {
    eyebrow: { ro: "Ce oferim", en: "What we offer" },
    heading: {
      ro: "Soluții integrate pentru infrastructura feroviară și civilă",
      en: "Integrated solutions for railway and civil infrastructure",
    },
    intro: {
      ro: "Oferim soluții tehnice integrate pentru infrastructură feroviară și civilă, de la proiectare până la implementare și mentenanță.",
      en: "We provide integrated technical solutions for railway and civil infrastructure, from design through implementation and maintenance.",
    },
    gridAriaLabel: { ro: "Serviciile noastre", en: "Our services" },
  },

  portfolio: {
    eyebrow: { ro: "Portofoliu", en: "Portfolio" },
    heading: { ro: "Proiecte realizate", en: "Completed projects" },
    intro: {
      ro: "Intervenții complete pentru instalații feroviare, de la modernizări complexe la implementări la cheie, cu rezultate măsurabile.",
      en: "Comprehensive work on railway installations, from complex modernizations to turnkey implementations, with measurable results.",
    },
  },

  certificationsMarquee: {
    ariaLabel: {
      ro: "Vezi pagina de certificări și autorizații",
      en: "View the certifications and authorizations page",
    },
  },

  contact: {
    heading: { ro: "Contactează-ne", en: "Contact us" },
    intro: {
      ro: "Discutăm cerințele proiectului tău și livrăm soluții electrice personalizate.",
      en: "Let's discuss your project's requirements and deliver tailored electrical solutions.",
    },
    mapTitle: { ro: "Harta San Electroterm Grup", en: "San Electroterm Grup map" },
    subjectHiddenValue: {
      ro: "Mesaj nou de pe sangrup.ro",
      en: "New message from sangrup.ro",
    },
    fieldName: { ro: "Nume", en: "Name" },
    fieldPhone: { ro: "Telefon", en: "Phone" },
    fieldEmail: { ro: "Email", en: "Email" },
    fieldMessage: { ro: "Mesaj", en: "Message" },
    emailInvalidMessage: {
      ro: "Te rugăm să introduci o adresă de email validă, care să includă caracterul @.",
      en: "Please enter a valid email address that includes the @ character.",
    },
    consentRequiredMessage: {
      ro: "Trebuie să fii de acord cu prelucrarea datelor pentru a trimite formularul.",
      en: "You must agree to the data processing to submit the form.",
    },
    consentTextPrefix: {
      ro: "Sunt de acord cu prelucrarea datelor mele cu caracter personal conform",
      en: "I agree to the processing of my personal data in accordance with the",
    },
    consentLinkText: {
      ro: "Politicii de confidențialitate",
      en: "Privacy Policy",
    },
    submitLabel: { ro: "Trimite mesajul", en: "Send message" },
    successMessage: {
      ro: "Mesajul a fost trimis cu succes. Revenim cât mai curând.",
      en: "Your message has been sent successfully. We'll get back to you shortly.",
    },
    errorMessage: {
      ro: "A apărut o eroare la trimitere. Încearcă din nou sau scrie-ne la office@sangrup.ro.",
      en: "There was an error sending your message. Please try again or email us at office@sangrup.ro.",
    },
    genericRequiredMessage: {
      ro: "Te rugăm să completezi acest câmp.",
      en: "Please fill out this field.",
    },
    genericEmailMessage: {
      ro: "Te rugăm să introduci un email valid.",
      en: "Please enter a valid email address.",
    },
    genericPatternMessage: {
      ro: "Te rugăm să completezi acest câmp în formatul corect.",
      en: "Please match the requested format.",
    },
    genericInvalidMessage: {
      ro: "Te rugăm să verifici datele introduse.",
      en: "Please check the information you entered.",
    },
    networkErrorMessage: {
      ro: "Nu s-a putut contacta serviciul de trimitere a formularului. Verifică conexiunea la internet și încearcă din nou.",
      en: "Could not reach the form submission service. Please check your internet connection and try again.",
    },
  },

  feedbackPopup: {
    defaultTitle: { ro: "Notificare", en: "Notification" },
    successTitle: { ro: "Mesaj trimis", en: "Message sent" },
    errorTitle: { ro: "Trimitere eșuată", en: "Sending failed" },
    actionLabel: { ro: "Am înțeles", en: "Got it" },
    closeLabel: { ro: "Închide notificarea", en: "Close notification" },
  },
} satisfies Record<string, Record<string, Entry>>;
