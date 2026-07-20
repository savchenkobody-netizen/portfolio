/* =========================================================
   data.js — single source of truth for all content.
   Text and structure mirror the live Framer site
   (bs-portfolio.framer.ai): lowercase headings, real copy,
   real experience timeline.

   Asset folders sit in the site root, named per project
   (e.g. ./audiophil, ./AURA-Music Player, ./Golden Draught):
     <folder>/1.webp            — card thumbnail + case-study hero
     <folder>/1…9.webp|.gif     — auto-collected gallery images
   Missing files degrade gracefully.
   ========================================================= */

const SITE = {
  text: {
    /* Nested per-language dictionaries. data-i18n keys use dot paths
       (e.g. "home.why.title") which t() resolves through these objects. */
    en: {
      nav: { work: "work", about: "about me" },
      hero: { title: "Hi, I'm Bohdan", eyebrow: "Junior UX/UI Designer / Media Designer" },
      work: { title: "selected work" },
      filter: { all: "all", uxui: "ux/ui design", branding: "branding" },
      testimonials: { title: "client reviews", more: "More Upwork reviews" },
      home: {
        statement: "I'm Bohdan Savchenko, an End-to-End UX/UI Designer based in Germany. I combine over 5 years of visual design expertise with user-centered product development and live website creation.",
        why: {
          title: "why work with me",
          body: "My background gives me a unique advantage. Having spent years in the industry, I understand the full print production cycle\u2014from initial design to final physical installation. This deeply trained eye for typography, layout, and visual balance translates seamlessly into my digital work. Today, I bridge the gap between design and development. I actively leverage AI tools and Vibe Coding to not just design in Figma, but to build and deploy fully functional, responsive websites (HTML/CSS/JS). This means you get a strategic partner who can take a project from an initial idea to a live product efficiently."
        },
        fun: {
          title: "when i'm not designing",
          body: "I'm passionate about continuous learning and creative exploration. You'll often find me experimenting with video editing in DaVinci Resolve or producing tracks for my AI-driven music project. I'm always looking for inspiration in unexpected places\u2014whether that's exploring the latest AI technologies or gathering fresh ideas while traveling with my family."
        }
      },
      about: {
        title: "about me",
        p1: "I'm a Junior UX/UI Designer based in Germany, bridging the gap between strong visual aesthetics and seamless usability.",
        p2: "+ 5 years of Visual Design experience across Ukraine, Poland, and Germany, combined with a background in Print & Media Technology, I know how to deliver pixel-perfect and engaging digital experiences.",
        exp: "my experience"
      },
      resume: "download resume",
      footer: {
        tagline: "Let's build something great together!",
        get: "get in",
        touch: "touch",
        fab: "contact me",
        emailLabel: "email:",
        based: "Based in: Leipzig, Germany",
        available: "available for: freelance projects & full-time"
      },
      cursor: { more: "see more" },
      cs: {
        back: "all projects",
        type: "project type",
        year: "year",
        role: "my role",
        client: "client",
        overview: "project overview",
        problem: "the problem",
        research: "user research & wireframes",
        final: "final ui",
        other: "other projects",
        notfound: "Project not found."
      }
    },

    de: {
      nav: { work: "projekte", about: "über mich" },
      hero: { title: "Hi, ich bin Bohdan", eyebrow: "Junior UX/UI Designer / Mediengestalter" },
      work: { title: "ausgewählte projekte" },
      filter: { all: "alle", uxui: "ux/ui design", branding: "branding" },
      testimonials: { title: "kundenbewertungen", more: "Weitere Upwork-Bewertungen" },
      home: {
        statement: "Ich bin Bohdan Savchenko, ein End-to-End UX/UI Designer mit Sitz in Deutschland. Ich verbinde über 5 Jahre Erfahrung im visuellen Design mit nutzerzentrierter Produktentwicklung und der Umsetzung live geschalteter Websites.",
        why: {
          title: "warum mit mir arbeiten",
          body: "Mein Hintergrund verschafft mir einen besonderen Vorteil. Durch jahrelange Erfahrung in der Branche kenne ich den gesamten Druckproduktionszyklus \u2014 von der ersten Gestaltung bis zur finalen physischen Installation. Dieses geschulte Auge für Typografie, Layout und visuelle Balance überträgt sich nahtlos auf meine digitale Arbeit. Heute schlage ich die Brücke zwischen Design und Entwicklung. Ich nutze aktiv KI-Tools und Vibe Coding, um nicht nur in Figma zu gestalten, sondern voll funktionsfähige, responsive Websites (HTML/CSS/JS) zu bauen und zu veröffentlichen. So bekommst du einen strategischen Partner, der ein Projekt von der ersten Idee bis zum fertigen Live-Produkt effizient umsetzt."
        },
        fun: {
          title: "wenn ich nicht designe",
          body: "Ich lerne leidenschaftlich gern und liebe kreative Experimente. Man findet mich oft beim Videoschnitt in DaVinci Resolve oder beim Produzieren von Tracks für mein KI-gestütztes Musikprojekt. Inspiration suche ich an unerwarteten Orten \u2014 beim Erkunden neuester KI-Technologien oder auf Reisen mit meiner Familie, wenn ich neue Ideen sammle."
        }
      },
      about: {
        title: "über mich",
        p1: "Ich bin Junior UX/UI Designer in Deutschland und schlage die Brücke zwischen starker visueller Ästhetik und reibungsloser Usability.",
        p2: "Über 5 Jahre Erfahrung im visuellen Design in der Ukraine, Polen und Deutschland, kombiniert mit einem Hintergrund in Print- und Medientechnik \u2014 ich weiß, wie man pixelgenaue und fesselnde digitale Erlebnisse liefert.",
        exp: "meine erfahrung"
      },
      resume: "lebenslauf herunterladen",
      footer: {
        tagline: "Lass uns gemeinsam etwas Großartiges bauen!",
        get: "get in",
        touch: "touch",
        fab: "kontakt",
        emailLabel: "E-Mail:",
        based: "Standort: Leipzig, Deutschland",
        available: "Verfügbar für: freiberufliche Projekte & Festanstellung"
      },
      cursor: { more: "mehr sehen" },
      cs: {
        back: "alle projekte",
        type: "projektart",
        year: "jahr",
        role: "meine rolle",
        client: "kunde",
        overview: "projektüberblick",
        problem: "das problem",
        research: "user research & wireframes",
        final: "finales ui",
        other: "weitere projekte",
        notfound: "Projekt nicht gefunden."
      }
    }
  },

  /* about.html — experience timeline (top = most recent) */
  experience: [
    { company: "neue fische | bootcamp",  role: { en: "ux/ui design & ai student",        de: "ux/ui design & ki student" },
      description: {
        en: "advancing digital skills in a specialized bootcamp, focusing on user-centric product development, wireframing, and figma prototyping",
        de: "Ausbau digitaler Fähigkeiten in einem spezialisierten Bootcamp mit Fokus auf nutzerzentrierte Produktentwicklung, Wireframing und Figma-Prototyping"
      }, period: "2026" },
    { company: "werbeagentur wurzen",     role: { en: "digital & print media designer",   de: "digital- & printmediengestalter" },
      description: {
        en: "developed concepts and designs for diverse print and digital media, managed professional prepress data creation and coordinated directly with printing companies",
        de: "Entwicklung von Konzepten und Designs für vielfältige Print- und Digitalmedien, professionelle Druckvorstufe und direkte Abstimmung mit Druckereien"
      }, period: "2024 – 2025" },
    { company: "freelance",               role: { en: "media designer",                   de: "mediengestalter" },
      description: {
        en: "independently managed design projects for small businesses and startups",
        de: "eigenständige Betreuung von Designprojekten für kleine Unternehmen und Startups"
      }, period: "2018 – 2022" },
    { company: "w. l. anczyca sa",        role: { en: "print & graphic designer",         de: "print- & grafikdesigner" },
      description: {
        en: "designed and prepared various print products for production, worked directly with production data",
        de: "Gestaltung und Vorbereitung verschiedener Druckprodukte für die Produktion, direkte Arbeit mit Produktionsdaten"
      }, period: "2017" },
    { company: "independent study",       role: { en: "design student",                   de: "design-student" },
      description: {
        en: "deepened professional knowledge in typography, layout, and fundamental design principles through dedicated self-study",
        de: "Vertiefung fachlicher Kenntnisse in Typografie, Layout und grundlegenden Gestaltungsprinzipien im Selbststudium"
      }, period: "2016" },
    { company: "w. l. anczyca sa",        role: { en: "post-press operator",              de: "post-press operator" },
      description: {
        en: "managed print finishing operations, including cutting, folding, and packaging of printed materials",
        de: "Verantwortung für die Druckweiterverarbeitung, einschließlich Schneiden, Falzen und Verpacken von Druckerzeugnissen"
      }, period: "2015" },
    { company: "lviv polytechnic",        role: { en: "post-press operator",              de: "post-press operator" },
      description: {
        en: "gained hands-on experience in post-press production workflows and physical print finishing processes",
        de: "praktische Erfahrung in Workflows der Druckweiterverarbeitung und physischen Endfertigungsprozessen"
      }, period: "2010 – 2015" }
  ],

  /* homepage — Upwork client reviews (authentic quotes, not translated) */
  testimonials: [
    {
      project: "Image Design",
      date: "Dec 8, 2020 - Jan 7, 2021",
      rating: "5.0",
      review: "Bohdan is a very nice and professional designer. He's been very patient with us with all the change requests and the final product was more than we expected. Thanks"
    },
    {
      project: "URGENT-Graphic designer",
      date: "Aug 14, 2021",
      rating: "5.0",
      review: "Very responsive, quick to understand the requirements, delivers work with utmost quality. I would definitely recommend Bogdan for any designing needs. You can sit back and relax and you will get more..."
    },
    {
      project: "Design a Course Certificate",
      date: "Nov 21, 2022 - Dec 25, 2022",
      rating: "5.0",
      review: "Bohdan provided quality work within promised timeline. Happy to work with him"
    },
    {
      project: "Add product packages",
      date: "Jun 4, 2020 - Jun 10, 2020",
      rating: "5.0",
      review: "Prompt communications. Good attention to details. Awesome time management. High level of responsibility"
    },
    {
      project: "Promotion image",
      date: "Sep 17, 2022",
      rating: "5.0",
      review: "Professional and very good job. He was very responsive and responded to all my requests. Delivered within a day! I would be happy to recommend"
    },
    {
      project: "Website banners",
      date: "Jun 8, 2023 - Jun 23, 2023",
      rating: "5.0",
      review: "Great, clean work. Talented and easy to work with, highly recommended"
    },
    {
      project: "Photoshop Assistance on Photograph",
      date: "Apr 11, 2022 - Apr 12, 2022",
      rating: "5.0",
      review: "Great experience working with Bohdan, highly recommend and will hire again"
    }
  ],

  /* homepage skills marquee (loops between the hero and the work grid) */
  marquee: [
    "UX/UI Design", "Figma", "Typography", "User Research", "AI Prompting",
    "Branding & Identity", "Wireframing", "Print & Media Design", "Prototyping",
    "DaVinci Resolve", "Mobile App Design", "AI Media Production", "Layout Design",
    "Pre-press", "Usability Testing", "Adobe Creative Cloud", "CorelDRAW",
    "AI-Assisted Development"
  ],

  projects: [
    {
      slug: "audiophil",
      filter: "ux-ui",
      title: "audiophil",
      category: { en: "mobile app design", de: "mobile app design" },
      folder: "./audiophil",
      image: "./audiophil/1.webp",
      link: "./case-study.html?project=audiophil",
      /* desktop: images 3 + 4 side by side, shown in full (contain, no crop) */
      groups: [ { nums: [3, 4], cols: "1fr 1fr", gap: "16px", fit: "contain" } ],
      caseStudy: {
        type: { en: "mobile app design", de: "mobile app design" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2026",
        overview: {
          en: "A gamified e-commerce app for vinyl collectors. audiophil blends neobrutalist design with modern ux to turn routine record shopping into a rewarding hunt.",
          de: "Eine gamifizierte E-Commerce-App für Vinyl-Sammler. audiophil verbindet neobrutalistisches Design mit moderner UX und macht aus dem routinemäßigen Plattenkauf eine lohnende Schatzsuche."
        },
        problem: {
          en: "Audio shops overwhelm newcomers with specs instead of sound. The challenge: make choosing equipment feel as enjoyable as listening to it.",
          de: "Audio-Shops überfordern Einsteiger mit technischen Daten statt Klang. Die Herausforderung: Die Gerätewahl soll so viel Freude machen wie das Hören selbst."
        },
        research: {
          en: "Interviews with vinyl collectors shaped the information architecture; low-fidelity wireframes tested different comparison views before committing to the final flow.",
          de: "Interviews mit Vinyl-Sammlern prägten die Informationsarchitektur; Low-Fidelity-Wireframes testeten verschiedene Vergleichsansichten, bevor der finale Flow entstand."
        },
        final: {
          en: "A dark, warm interface puts product photography first, with a spec-comparison pattern that stays readable on small screens.",
          de: "Ein dunkles, warmes Interface stellt Produktfotografie in den Mittelpunkt — mit einem Spezifikationsvergleich, der auch auf kleinen Screens lesbar bleibt."
        }
      }
    },
    {
      slug: "aura",
      filter: "ux-ui",
      title: "Aura: Music Player",
      category: { en: "mobile app", de: "mobile app" },
      folder: "./aura",
      image: "./aura/1.webp",
      link: "./case-study.html?project=aura",
      /* desktop: images 7, 9, 8 in one equal 3-up horizontal row (that order) */
      groups: [ { nums: [7, 9, 8], cols: "1fr 1fr 1fr", gap: "16px", ratio: "4 / 3" } ],
      caseStudy: {
        type: { en: "mobile app", de: "mobile app" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2025",
        overview: {
          en: "AURA is a music player concept focused on mood-based listening — playlists that adapt to time of day and activity.",
          de: "AURA ist ein Musikplayer-Konzept für stimmungsbasiertes Hören — Playlists, die sich an Tageszeit und Aktivität anpassen."
        },
        problem: {
          en: "Standard players bury discovery behind endless lists. AURA explores how a player can feel calm and personal instead of crowded.",
          de: "Klassische Player verstecken Entdeckung hinter endlosen Listen. AURA untersucht, wie sich ein Player ruhig und persönlich statt überladen anfühlen kann."
        },
        research: {
          en: "Competitive analysis and quick usability tests on paper prototypes defined the gesture-driven navigation model.",
          de: "Wettbewerbsanalyse und schnelle Usability-Tests mit Papier-Prototypen definierten das gestenbasierte Navigationsmodell."
        },
        final: {
          en: "A minimal, gradient-tinted UI with an oversized now-playing screen and fluid transitions between moods.",
          de: "Ein minimalistisches UI mit sanften Verläufen, großem Now-Playing-Screen und fließenden Übergängen zwischen Stimmungen."
        }
      }
    },
    {
      slug: "golden-draught",
      filter: "branding",
      title: "Golden Draught",
      category: { en: "brand identity & positioning", de: "markenidentität & positionierung" },
      folder: "./golden-draught",
      image: "./golden-draught/1.webp",
      link: "./case-study.html?project=golden-draught",
      /* desktop rows:
         • images 6 + 7 as an equal pair
         • images 9.gif + 8.webp — 9.gif half the width of 8.webp (tall/fill) */
      groups: [
        { nums: [6, 7], cols: "1fr 1fr", gap: "16px", ratio: "4 / 3" },
        { nums: [9, 8], cols: "1fr 2fr", gap: "40px" }
      ],
      caseStudy: {
        type: { en: "brand identity & positioning", de: "markenidentität & positionierung" },
        role: { en: "brand identity, art direction", de: "markenidentität, art direction" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2023",
        overview: {
          en: "Golden Draught is a brand identity and positioning project for a craft beer label with a traditional soul and a modern audience.",
          de: "Golden Draught ist ein Branding- und Positionierungsprojekt für eine Craft-Beer-Marke mit traditioneller Seele und modernem Publikum."
        },
        problem: {
          en: "The brand needed to stand out on crowded shelves without losing its heritage feel.",
          de: "Die Marke musste im vollen Regal auffallen, ohne ihren Heritage-Charakter zu verlieren."
        },
        research: {
          en: "Market and competitor audits led to mood boards and typography studies that defined the visual direction.",
          de: "Markt- und Wettbewerbsanalysen führten zu Moodboards und Typografie-Studien, die die visuelle Richtung definierten."
        },
        final: {
          en: "A complete identity: logo, label system, color palette and packaging mockups ready for production.",
          de: "Eine komplette Identität: Logo, Etikettensystem, Farbpalette und produktionsreife Packaging-Mockups."
        }
      }
    },
    {
      slug: "in-car",
      filter: "ux-ui",
      title: "Incar: car rental app",
      category: { en: "mobile app", de: "mobile app" },
      folder: "./in-car",
      image: "./in-car/0.webp",
      link: "./case-study.html?project=in-car",
      caseStudy: {
        type: { en: "mobile app", de: "mobile app" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2024",
        overview: {
          en: "Incar is a car rental app concept that turns a stressful booking process into a three-step flow.",
          de: "Incar ist ein App-Konzept für Autovermietung, das einen stressigen Buchungsprozess in einen Flow mit drei Schritten verwandelt."
        },
        problem: {
          en: "Rental services hide fees and bury insurance details, eroding user trust exactly at checkout.",
          de: "Mietservices verstecken Gebühren und Versicherungsdetails — und verspielen damit Vertrauen genau im Checkout."
        },
        research: {
          en: "User journey mapping and wireframe iterations focused on transparency at every step of the booking.",
          de: "User Journey Mapping und Wireframe-Iterationen fokussierten Transparenz in jedem Schritt der Buchung."
        },
        final: {
          en: "A clean interface with upfront pricing, clear car comparisons and a checkout that fits on one screen.",
          de: "Ein klares Interface mit transparenten Preisen, verständlichen Fahrzeugvergleichen und einem Checkout auf einem Screen."
        }
      }
    },
    {
      slug: "trip-go",
      filter: "ux-ui",
      title: "Tripgo",
      category: { en: "mobile app", de: "mobile app" },
      folder: "./trip-go",
      image: "./trip-go/0.webp",
      link: "./case-study.html?project=trip-go",
      caseStudy: {
        type: { en: "mobile app", de: "mobile app" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2025",
        overview: {
          en: "TripGo is a travel planning app that brings routes, bookings and daily itineraries into one place.",
          de: "TripGo ist eine Reiseplanungs-App, die Routen, Buchungen und Tagespläne an einem Ort vereint."
        },
        problem: {
          en: "Travelers juggle multiple apps for flights, stays and plans — TripGo consolidates the whole journey.",
          de: "Reisende jonglieren mehrere Apps für Flüge, Unterkünfte und Pläne — TripGo bündelt die gesamte Reise."
        },
        research: {
          en: "Personas and task flows revealed that day-by-day itinerary editing was the core job to get right.",
          de: "Personas und Task-Flows zeigten: Die tageweise Bearbeitung des Reiseplans ist der entscheidende Use Case."
        },
        final: {
          en: "A card-based itinerary UI with drag-friendly planning and an offline-ready trip overview.",
          de: "Ein kartenbasiertes Itinerary-UI mit intuitiver Planung und einer offlinefähigen Reiseübersicht."
        }
      }
    },
    {
      slug: "habit-tracker",
      filter: "ux-ui",
      title: "Habit tracker",
      category: { en: "mobile app", de: "mobile app" },
      folder: "./habit-tracker",
      image: "./habit-tracker/0.webp",
      link: "./case-study.html?project=habit-tracker",
      caseStudy: {
        type: { en: "mobile app", de: "mobile app" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project", de: "konzeptprojekt" },
        year: "2025",
        overview: {
          en: "A Habit tracking app concept built around gentle consistency instead of streak anxiety.",
          de: "Ein Habit-Tracker-Konzept, das auf sanfte Konstanz statt Streak-Druck setzt."
        },
        problem: {
          en: "Most trackers punish missed days — exactly when users quit. The goal: motivate without guilt.",
          de: "Die meisten Tracker bestrafen verpasste Tage — genau dann geben Nutzer auf. Das Ziel: motivieren ohne schlechtes Gewissen."
        },
        research: {
          en: "Behavioral research and wireframe tests shaped a forgiving streak model and a calm visual rhythm.",
          de: "Verhaltensforschung und Wireframe-Tests formten ein verzeihendes Streak-Modell und einen ruhigen visuellen Rhythmus."
        },
        final: {
          en: "A minimal dashboard with satisfying check-in interactions and progress views that celebrate trends, not perfection.",
          de: "Ein minimalistisches Dashboard mit befriedigenden Check-in-Interaktionen und Fortschrittsansichten, die Trends statt Perfektion feiern."
        }
      }
    }
  ]
};
