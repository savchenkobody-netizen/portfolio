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
      nav: { work: "work", reviews: "reviews", about: "about me" },
      hero: { title: "Hi, I'm Bohdan", eyebrow: "UX/UI Designer · Media Designer · AI Enthusiast" },
      work: { title: "selected work" },
      filter: { all: "all", uxui: "ux/ui design", branding: "branding" },
      stats: {
        success:   "Job Success",
        projects:  "Projects Shipped",
        countries: "Countries Reached",
        rating:    "Average Rating"
      },
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
        p1: "I'm a UX/UI Designer based in Germany, bridging the gap between strong visual aesthetics and seamless usability.",
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
      nav: { work: "projekte", reviews: "bewertungen", about: "über mich" },
      hero: { title: "Hi, ich bin Bohdan", eyebrow: "UX/UI Designer · Media Designer · AI Enthusiast" },
      work: { title: "ausgewählte projekte" },
      filter: { all: "alle", uxui: "ux/ui design", branding: "branding" },
      stats: {
        success:   "Erfolgsquote",
        projects:  "Projekte umgesetzt",
        countries: "Länder erreicht",
        /* "Durchschnittsbewertung" is one unbreakable 22-char compound — it
           overflows the narrow 4-across mobile column; "Ø" is the standard
           German shorthand for a mean and keeps the label to two short words */
        rating:    "Ø Bewertung"
      },
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
        p1: "Ich bin UX/UI Designer in Deutschland und schlage die Brücke zwischen starker visueller Ästhetik und reibungsloser Usability.",
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
      status: "ready",
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
      slug: "stomatino",
      status: "ready",
      filter: "branding",
      title: "Stomatino",
      category: { en: "brand identity & logo design", de: "markenidentität & logodesign" },
      folder: "./stomatino",
      image: "./stomatino/1.webp",
      link: "./case-study.html?project=stomatino",
      /* 1.webp is the hero/cover; the local clip plays full-width beneath it,
         then a responsive grid: 3+4 paired, 5+6 paired, 7 (a clip) full-width,
         then 8.webp full-width to close out the gallery */
      blocks: [
        { type: "video-full", num: 2 },
        { type: "image-grid", rows: [
          { nums: [3, 4] },
          { nums: [5, 6] },
          { nums: [7], video: true }
        ] },
        { type: "image", num: 8 }
      ],
      caseStudy: {
        type: { en: "brand identity & logo design", de: "markenidentität & logodesign" },
        role: { en: "brand designer", de: "brand designer" },
        client: { en: "stomatino.pl", de: "stomatino.pl" },
        year: "2021",
        /* branding project: its own section labels instead of the UX defaults */
        headings: {
          problem:  { en: "the challenge",    de: "die herausforderung" },
          research: { en: "the logo concept", de: "das logo-konzept" },
          final:    { en: "final identity",   de: "finale identität" }
        },
        overview: {
          en: "Stomatino is a modern online store dedicated to high-quality dental care products. The brand identity was designed to evoke friendliness, trust, and expertise, transforming the often-clinical perception of dentistry into an approachable and positive experience for everyday customers.",
          de: "Stomatino ist ein moderner Online-Shop für hochwertige Zahnpflegeprodukte. Die Markenidentität wurde entwickelt, um Freundlichkeit, Vertrauen und Kompetenz zu vermitteln und die oft klinische Wahrnehmung von Zahnmedizin in ein zugängliches, positives Erlebnis für alltägliche Kunden zu verwandeln."
        },
        problem: {
          en: "E-commerce platforms for dental supplies often feel overly sterile and intimidating. The goal was to create a vibrant, welcoming brand identity that highlights a passion for oral health and beauty, bridging the gap between professional dental care and consumer lifestyle.",
          de: "E-Commerce-Plattformen für Dentalbedarf wirken häufig übermäßig steril und einschüchternd. Ziel war eine lebendige, einladende Markenidentität, die die Leidenschaft für Mundgesundheit und Schönheit betont und die Lücke zwischen professioneller Zahnpflege und Consumer-Lifestyle schließt."
        },
        research: {
          en: "At the heart of the visual identity is a clever typographic mark. By seamlessly combining the lowercase letters 't' and 'i' with a bright magenta dot, the logo forms a friendly, abstract smile. This visual metaphor perfectly captures the brand's core mission: inspiring beautiful, healthy smiles.",
          de: "Im Zentrum der visuellen Identität steht eine durchdachte typografische Marke: Die Kleinbuchstaben 't' und 'i' verschmelzen mit einem leuchtenden Magenta-Punkt zu einem freundlichen, abstrakten Lächeln. Diese visuelle Metapher bringt die Kernmission der Marke auf den Punkt: schöne, gesunde Lächeln zu inspirieren."
        },
        final: {
          en: "The visual system features a striking color palette of cyan and magenta, breaking away from traditional medical branding. This fresh aesthetic is consistently applied across digital storefronts, bold outdoor advertising, and corporate stationery to ensure maximum brand recognition.",
          de: "Das visuelle System setzt auf eine markante Farbpalette aus Cyan und Magenta und bricht damit mit traditionellem Medical-Branding. Diese frische Ästhetik wird konsequent über digitale Storefronts, plakative Außenwerbung und Geschäftsausstattung hinweg angewendet, um maximale Markenwiedererkennung zu sichern."
        }
      }
    },
    {
      slug: "golden-draught",
      status: "ready",
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
      slug: "dawdle",
      status: "ready",
      filter: "ux-ui",
      title: "dawdle",
      category: { en: "mobile app design", de: "mobile app design" },
      folder: "./dawdle",
      image: "./dawdle/1.webp",
      link: "./case-study.html?project=dawdle",
      /* explicit gallery sequence (hero 1.webp shown separately as the cover):
         a 4-up autoplay video row, a full-width image, then a same-height image pair */
      blocks: [
        { type: "video-row", nums: [2, 3, 4, 5], ratio: "894 / 1080" },
        { type: "image", num: 6 },
        { type: "image-row", nums: [7, 8] },
        { type: "image", num: 9 },
        { type: "image", num: 10 },
        { type: "image", num: 11 },
        { type: "image", num: 12 },
        { type: "bento-columns", columns: [[13, 14], [15, 16, 17, 18], [19, 20, 21]] },
        { type: "vimeo", id: "1211397154" }
      ],
      caseStudy: {
        type: { en: "mobile app design", de: "mobile app design" },
        role: { en: "ux/ui designer", de: "ux/ui designer" },
        client: { en: "concept project / capstone", de: "konzeptprojekt / capstone" },
        year: "2026",
        overview: {
          en: "dawdle is an edutainment app that brings local history to life through AI-generated audio stories. By combining location tracking with synchronized audio sharing, it allows users to experience historical sites together, completely hands-free and without the need for extensive prior research.",
          de: "dawdle ist eine Edutainment-App, die lokale Geschichte durch KI-generierte Audio-Geschichten zum Leben erweckt. Durch die Kombination von Standort-Tracking mit synchronisiertem Audio-Sharing können Nutzer historische Orte gemeinsam erleben — komplett freihändig und ohne aufwändige Vorab-Recherche."
        },
        problem: {
          en: "Discovering local history is often tedious, requiring extensive online research or reading dry texts on-site, which distracts from the actual experience. Users want a spontaneous way to explore together without constantly looking at their screens.",
          de: "Lokale Geschichte zu entdecken ist oft mühsam — es erfordert aufwändige Online-Recherche oder das Lesen trockener Texte vor Ort, was vom eigentlichen Erlebnis ablenkt. Nutzer wünschen sich einen spontanen Weg, gemeinsam zu erkunden, ohne ständig aufs Display zu schauen."
        },
        research: {
          en: "Surveys and interviews revealed a strong desire for audio content, though past experiences were mixed. We found that users rarely explore alone, making shared experiences crucial. Wireframing focused on creating a clean, one-handed UI that prioritizes audio over text.",
          de: "Umfragen und Interviews zeigten einen starken Wunsch nach Audio-Inhalten, auch wenn frühere Erfahrungen gemischt waren. Wir stellten fest, dass Nutzer selten allein erkunden — gemeinsame Erlebnisse sind entscheidend. Das Wireframing konzentrierte sich auf ein klares, einhändig bedienbares UI, das Audio über Text stellt."
        },
        final: {
          en: "The final design features a highly contrasting, bento-box layout tailored for outdoor use. Key features include a map for spontaneous discovery, shared audio playback, and distinct visual modes for short location-based snippets versus in-depth storytelling podcasts.",
          de: "Das finale Design setzt auf ein kontrastreiches Bento-Box-Layout, das für die Nutzung im Freien optimiert ist. Zentrale Funktionen sind eine Karte für spontane Entdeckungen, gemeinsames Audio-Playback und eigene visuelle Modi für kurze standortbasierte Snippets gegenüber tiefgehenden Storytelling-Podcasts."
        }
      }
    },
    {
      slug: "aura",
      status: "ready",
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
    "slug": "nucao",
    "status": "ready",
    "filter": "branding",
    "title": "nucao — Halloween Edition",
    "category": {
        "en": "campaign concept & packaging design",
        "de": "kampagnenkonzept & verpackungsdesign"
    },
    "folder": "./nucao",
    "image": "./nucao/1.webp",
    "link": "./case-study.html?project=nucao",
    "blocks": [
        {
            "type": "vimeo",
            "id": "1232805602"
        },
        { "type": "mixed-row", "image": 2, "video": "3.mov" },
        { "type": "image", "num": 4 },
        { "type": "vimeo", "id": "1233103848" },
        { "type": "video-row", "nums": [9, 10], "extension": "mov", "ratios": ["1530 / 860", "1120 / 1402"], "columns": "minmax(0, 1.7790697674fr) minmax(0, 0.7988587732fr)" },
{
    "type": "character-pair",
    "heading": {
        "en": "character development — girl",
        "de": "charakterentwicklung — Mädchen"
    },
    "text": {
        "en": "I developed AI-assisted reference sheets for the girl, exploring her appearance from multiple angles and across different expressions. These sheets served as a visual guide for keeping facial features, clothing and proportions consistent across the film and campaign imagery.",
        "de": "Für das Mädchen entwickelte ich KI-gestützte Referenzübersichten mit verschiedenen Ansichten und Gesichtsausdrücken. Sie dienten als visuelle Grundlage, um Gesichtszüge, Kleidung und Proportionen im Film und in den Kampagnenmotiven möglichst einheitlich zu halten."
    },
    "labels": [
        {
            "en": "Full-body views",
            "de": "Ganzkörperansichten"
        },
        {
            "en": "Facial expressions",
            "de": "Mimikstudien"
        }
    ],
    "nums": [
        6,
        5
    ]
},
{
    "type": "character-pair",
    "heading": {
        "en": "character development — vampire",
        "de": "charakterentwicklung — Vampir"
    },
    "text": {
        "en": "I developed AI-assisted reference sheets for the vampire, exploring his appearance from multiple angles and across different expressions. These sheets served as a visual guide for keeping facial features, clothing and proportions consistent across the film and campaign imagery.",
        "de": "Für den Vampir entwickelte ich KI-gestützte Referenzübersichten mit verschiedenen Ansichten und Gesichtsausdrücken. Sie dienten als visuelle Grundlage, um Gesichtszüge, Kleidung und Proportionen im Film und in den Kampagnenmotiven möglichst einheitlich zu halten."
    },
    "labels": [
        {
            "en": "Full-body views",
            "de": "Ganzkörperansichten"
        },
        {
            "en": "Facial expressions",
            "de": "Mimikstudien"
        }
    ],
    "nums": [
        8,
        7
    ]
},
        { "type": "image-row", "nums": [11, 12] }
    ],
    "caseStudy": {
        "type": {
            "en": "campaign concept & packaging design",
            "de": "kampagnenkonzept & verpackungsdesign"
        },
        "year": "2026",
        "role": {
            "en": "concept · art direction · packaging adaptation · video editing",
            "de": "konzeption · art direction · verpackungsadaption · videoschnitt"
        },
        "client": {
            "en": "self-initiated project — no client commission",
            "de": "eigeninitiative — keine auftragsarbeit"
        },
        "subtitle": {
            "en": "self-initiated concept · fictional flavour",
            "de": "freies Konzeptprojekt · fiktive Geschmacksrichtung"
        },
        "headings": {
            "problem": {
                "en": "the challenge",
                "de": "die herausforderung"
            },
            "research": {
                "en": "the creative concept",
                "de": "die kreative idee"
            },
            "final": {
                "en": "the execution",
                "de": "die umsetzung"
            }
        },
        "overview": {
            "en": "An independent Halloween campaign concept imagining cherry and black sesame as a fictional nucao chocolate flavour. Building on the brand’s existing visual identity, the project brings together packaging design, playful character imagery and an AI-assisted advertising film in which a vampire discovers an unexpected favourite.",
            "de": "Ein freies Halloween-Kampagnenkonzept, das Kirsche und schwarzen Sesam als fiktive Schokoladensorte für nucao interpretiert. Aufbauend auf dem bestehenden Markenauftritt verbindet das Projekt Verpackungsdesign, spielerische Charaktermotive und einen KI-gestützten Werbefilm, in dem ein Vampir einen unerwarteten neuen Lieblingsgeschmack entdeckt."
        },
        "problem": {
            "en": "Develop a fictional seasonal edition that feels consistent with nucao’s existing visual language while giving it a distinctive Halloween story. The focus was on making the chocolate appetising and memorable through humour, expressive characters and a coherent visual style across packaging, film and campaign imagery.",
            "de": "Eine fiktive saisonale Edition entwickeln, die zur bestehenden visuellen Sprache von nucao passt und zugleich eine eigenständige Halloween-Geschichte erzählt. Die Schokolade sollte durch Humor, ausdrucksstarke Figuren und eine durchgängige Gestaltung von Verpackung, Film und Kampagnenmotiven appetitlich und einprägsam präsentiert werden."
        },
        "research": {
            "en": "Cherry and black sesame meet in a playful story about sharing — and wanting more. A girl offers a vampire a piece of chocolate, only to discover that one bite is not enough. Pink packaging, purple backgrounds and cherry-red accents connect the fictional flavour with the characters and the film’s comic ending.",
            "de": "Kirsche und schwarzer Sesam treffen auf eine spielerische Geschichte über das Teilen — und den Wunsch nach mehr. Ein Mädchen bietet einem Vampir ein Stück Schokolade an und stellt fest, dass ihm ein Bissen nicht genügt. Die rosa Verpackung, violette Hintergründe und kirschrote Akzente verbinden die fiktive Sorte mit den Figuren und der humorvollen Auflösung des Films."
        },
        "final": {
            "en": "The concept combines packaging visuals, product compositions, a studio-style character series and an AI-assisted advertising film. Generated images and video sequences were selected and refined for continuity. Editing, colour grading and sound design in DaVinci Resolve brought the individual scenes together into the final film.",
            "de": "Das Konzept umfasst Verpackungsvisualisierungen, Produktinszenierungen, eine Fotoserie der Figuren im Studiolook und einen KI-gestützten Werbefilm. Generierte Bilder und Videosequenzen wurden ausgewählt und für einen konsistenten Gesamteindruck überarbeitet. Schnitt, Farbkorrektur und Sounddesign in DaVinci Resolve verbinden die einzelnen Szenen zum fertigen Film."
        },
        "note": {
            "en": "This is an independent portfolio concept based on a self-defined brief, not a commissioned campaign. The featured “Kirsche × Schwarzer Sesam — Halloween Edition” was invented for this project and does not represent a real product launch. The project is not affiliated with, commissioned by or endorsed by nucao. The nucao name, logo and existing brand identity belong to their respective rights holders. Imagery and video were created with AI assistance.",
            "de": "Dieses unabhängige Portfolioprojekt entstand auf Basis einer selbst formulierten Aufgabenstellung und ist keine Auftragsarbeit. Die gezeigte „Kirsche × Schwarzer Sesam — Halloween Edition“ wurde für dieses Projekt frei erfunden und stellt keine tatsächliche Produkteinführung dar. Das Projekt steht in keiner Verbindung zu nucao und wurde von der Marke weder beauftragt noch autorisiert oder unterstützt. Der Name nucao, das Logo und die bestehende Markenidentität gehören den jeweiligen Rechteinhabern. Bild- und Videomaterial wurden mit KI-Unterstützung erstellt."
        }
    }
},
{
    "slug": "car-wrapping",
    "status": "ready",
    "filter": "branding",
    "title": "Sven Griesche — Car Wrapping",
    "cardTitle": "Küchen- und Möbelmontage",
    "category": {
        "en": "vehicle graphics & wrap design",
        "de": "fahrzeugbeschriftung & folierungsdesign"
    },
    "folder": "./Car wrapping",
    "image": "./Car wrapping/1.webp",
    "imageVersions": {"3": "5c30adca399a", "5": "13818cfb6760", "6b.webp": "2f43a94ba333", "7b.webp": "1bc408743c32", "7a.webp": "068586ff83b9"},
    "link": "./case-study.html?project=car-wrapping",
    "blocks": [{"type": "image-row", "nums": [2, 3]}, {"type": "image-row", "nums": [5, 4]}, {"type": "comparison", "before": "6a.webp", "after": "6b.webp", "label": {"en": "Side view", "de": "Seitenansicht", "uk": "Вигляд збоку"}}, {"type": "comparison", "before": "7a.webp", "after": "7b.webp", "label": {"en": "Rear view", "de": "Heckansicht", "uk": "Вигляд ззаду"}}, {"type": "image-pair", "nums": [8, 9], "heading": {"en": "visibility in the city", "de": "sichtbarkeit im stadtbild", "uk": "помітність у місті"}, "text": {"en": "Yellow typography and a large kitchen image contrast with the black bodywork, helping the vehicle stand out in a busy cityscape and making its services immediately recognisable.", "de": "Gelbe Typografie und ein großflächiges Küchenmotiv setzen sich deutlich von der schwarzen Karosserie ab. So fällt das Fahrzeug im belebten Stadtbild auf und vermittelt sein Angebot auf einen Blick.", "uk": "Жовта типографіка та велике зображення кухні контрастують із чорним кузовом, виділяючи авто в міському середовищі й роблячи його послуги зрозумілими з першого погляду."}}],
    "caseStudy": {
        "type": {
            "en": "vehicle graphics & wrap design",
            "de": "fahrzeugbeschriftung & folierungsdesign"
        },
        "year": "2025",
        "role": {
            "en": "graphic design · vehicle graphics",
            "de": "grafikdesign · fahrzeugbeschriftung"
        },
        "client": {
            "en": "Sven Griesche",
            "de": "Sven Griesche"
        },
        "subtitle": {
            "en": "Küchen- und Möbelmontage · Güter- und Möbeltaxi",
            "de": "Küchen- und Möbelmontage · Güter- und Möbeltaxi",
            "uk": "Küchen- und Möbelmontage · Güter- und Möbeltaxi"
        },
        "overview": {
            "en": "Vehicle wrap design for Sven Griesche’s Citroën Jumper. The client is a Leipzig-based entrepreneur offering kitchen selection, kitchen and furniture transport, and installation. Created in 2025 during my employment at Werbeagentur Wurzen.",
            "de": "Gestaltung eines Citroën Jumper für Sven Griesche aus Leipzig: Küchenauswahl, Küchen- und Möbeltransport sowie Montage. Das Projekt entstand 2025 während meiner Tätigkeit bei Werbeagentur Wurzen."
        },
        "headings": {
            "problem": {
                "en": "the brief",
                "de": "die aufgabe"
            },
            "research": {
                "en": "the design concept",
                "de": "das gestaltungskonzept"
            },
            "final": {
                "en": "the vehicle graphics",
                "de": "die fahrzeuggestaltung"
            }
        },
        "problem": {
            "en": "Present the services and contact details clearly on a van, making the business easy to recognise on the road.",
            "de": "Leistungen und Kontaktdaten auf einem Transporter klar vermitteln und den Betrieb unterwegs erkennbar machen."
        },
        "research": {
            "en": "Bold yellow typography on black, a large kitchen image and flowing graphic elements connect the service offering with the shape of the vehicle.",
            "de": "Markante gelbe Typografie auf Schwarz, ein großflächiges Küchenmotiv und geschwungene Grafikelemente verbinden das Leistungsangebot mit der Fahrzeugform."
        },
        "final": {
            "en": "A coordinated vehicle design with a clear hierarchy for services, client name and contact details.",
            "de": "Eine abgestimmte Fahrzeuggestaltung mit klarer Hierarchie für Leistungen, Namen und Kontaktdaten."
        }
    }
},
    {
        "slug": "savechain",
        "status": "ready",
        "filter": "branding",
        "title": "SaveChain",
        "category": {"en": "online banking", "de": "online-banking", "uk": "онлайн-банкінг"},
        "folder": "./SaveChain",
        "image": "./SaveChain/1.webp",
        "link": "./case-study.html?project=savechain",
    "blocks": [{"type": "image-row", "nums": [2, 3]}, {"type": "video-row", "nums": [4, "Logo"], "extensions": ["webm", "mp4"], "transparent": [true, false], "posters": ["4-poster.webp", null], "crops": [[0.025, 0.0333333, 0.975, 0.9666667], null], "ratios": ["3648 / 2688", "2560 / 1440"], "columns": "minmax(0, 1.3571429fr) minmax(0, 1.7777778fr)"}, {"type": "image", "num": 5}, {"type": "image-row", "nums": [6, 7]}],
        "caseStudy": {
            "type": {
                "en": "logo design & brand identity",
                "de": "logodesign & markenidentität",
                "uk": "дизайн логотипу та айдентики"
            },
            "role": {
                "en": "brand designer",
                "de": "brand designer",
                "uk": "бренд-дизайнер"
            },
            "client": {
                "en": "SaveChain (online bank)",
                "de": "SaveChain (Online-Bank)",
                "uk": "SaveChain (онлайн-банк)"
            },
            "year": "2021",
            "headings": {
                "problem": {
                    "en": "the competition",
                    "de": "der wettbewerb",
                    "uk": "конкурс"
                },
                "research": {
                    "en": "the logo concept",
                    "de": "das logo-konzept",
                    "uk": "концепція логотипу"
                },
                "final": {
                    "en": "colour & the aftermath",
                    "de": "farbwelt & nachspiel",
                    "uk": "колір і розв’язка"
                }
            },
            "overview": {
                "en": "SaveChain is an online bank built for fast money transfers and cryptocurrency. I designed its logo in 2021 as a competition entry on Freelancehunt, Ukraine's largest freelance marketplace, with no fixed brief and more than 100 designers competing. The goal was a mark that feels as secure as a bank and as quick as a digital product.",
                "de": "SaveChain ist eine Online-Bank für schnelle Geldüberweisungen und Kryptowährungen. Das Logo entstand 2021 als Wettbewerbsbeitrag auf Freelancehunt, der größten ukrainischen Freelance-Plattform – ohne festes Briefing und gegen mehr als 100 teilnehmende Designer. Ziel war ein Zeichen, das so sicher wirkt wie eine Bank und so schnell wie ein digitales Produkt.",
                "uk": "SaveChain — це онлайн-банк для швидких переказів коштів і криптовалюти. Логотип я розробив у 2021 році як конкурсну роботу на Freelancehunt, найбільшій українській фріланс-біржі: без чіткого технічного завдання та серед понад 100 учасників. Мета — створити знак, який виглядає так само надійно, як банк, і так само швидко, як цифровий продукт."
            },
            "problem": {
                "en": "This was a contest, not a commissioned job: no brief to follow, just a name, a field and a crowd of competitors. The challenge was to stand out in a category full of generic blue shields and coins, and to say 'banking' and 'crypto' at once without a single cliché.",
                "de": "Es war ein Wettbewerb und kein Auftrag: kein Briefing, nur ein Name, eine Branche und eine Menge Mitbewerber. Die Herausforderung bestand darin, sich in einer Kategorie voller blauer Schilde und Münzen abzuheben und 'Banking' und 'Krypto' zugleich zu vermitteln – ohne ein einziges Klischee.",
                "uk": "Це був конкурс, а не замовлення: жодного брифу, лише назва, сфера та десятки конкурентів. Завдання — виділитися в ніші, повній шаблонних синіх щитів і монет, і передати водночас «банк» та «крипто» без жодного кліше."
            },
            "research": {
                "en": "The icon comes straight from the name: two interlocked chain links, a nod to both 'save' and 'chain'. The links read as a secure connection between people and as the linked blocks of a blockchain. The rounded-rectangle links are drawn with the same stroke and corner radius as the wide, technical wordmark, so symbol and lettering behave like one piece.",
                "de": "Das Symbol entsteht direkt aus dem Namen: zwei ineinandergreifende Kettenglieder – ein Verweis auf 'Save' und auf 'Chain'. Die Glieder stehen für eine sichere Verbindung zwischen Menschen und zugleich für die verketteten Blöcke einer Blockchain. Die abgerundeten Glieder sind mit derselben Linienstärke und demselben Eckenradius gezeichnet wie die breite, technische Wortmarke, sodass Zeichen und Schrift als ein Ganzes wirken.",
                "uk": "Іконка випливає прямо з назви: дві зчеплені ланки ланцюга — натяк і на «save», і на «chain». Ланки читаються як надійний зв’язок між людьми і водночас як пов’язані блоки блокчейну. Ланки із заокругленими кутами намальовані з тією самою товщиною лінії та радіусом, що й широкий технічний шрифт логотипу, тож знак і напис сприймаються як єдине ціле."
            },
            "final": {
                "en": "The palette stays deliberately digital: a deep, near-black ground, a crisp white mark and a cool teal accent. Dark surfaces signal trust and discretion, white keeps the logo razor sharp on screens, and the teal adds a calm, technological note that feels fresh next to the usual financial blues. In the final round another entry took first place. Some time later, however, the client got back in touch: they had changed their mind about the winning design and wanted to buy mine instead. It is a quiet kind of win, a logo chosen after the competition was already over.",
                "de": "Die Farbwelt ist bewusst digital gehalten: ein tiefer, fast schwarzer Grund, ein klares weißes Zeichen und ein kühler Türkis-Akzent. Dunkle Flächen stehen für Vertrauen und Diskretion, Weiß hält das Logo auf Bildschirmen gestochen scharf, und das Türkis setzt einen ruhigen, technologischen Akzent, der neben den üblichen Finanzblautönen frisch wirkt. In der Finalrunde belegte ein anderer Beitrag den ersten Platz. Einige Zeit später meldete sich der Auftraggeber jedoch erneut: Er hatte seine Meinung zum Siegerentwurf geändert und wollte stattdessen meinen erwerben. Ein leiser Sieg – ein Logo, das erst nach dem Wettbewerb gewählt wurde.",
                "uk": "Палітра свідомо цифрова: глибокий майже чорний фон, чіткий білий знак і холодний бірюзовий акцент. Темні поверхні передають довіру та стриманість, білий робить логотип різким на екранах, а бірюзовий додає спокійну технологічну ноту, свіжішу за звичні фінансові сині. У фіналі перше місце посів інший учасник. Проте згодом замовник сам написав мені: він передумав щодо переможного варіанта й захотів викупити мій. Це тиха перемога — логотип, обраний уже після завершення конкурсу."
            }
        }
    }
  ]
};
