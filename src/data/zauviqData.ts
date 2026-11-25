export type SolutionCategory = 'All' | 'Operations' | 'Healthcare' | 'Commerce' | 'Community';

export interface SolutionMetric {
  value: string;
  label: string;
}

export interface SolutionItem {
  id: string;
  name: string;
  category: Exclude<SolutionCategory, 'All'>;
  contextLabel: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  metrics: SolutionMetric[];
  fieldStudy: {
    participants: string;
    duration: string;
    realWorldFriction: string;
    researchInsight: string;
    softwareOutcome: string;
    capabilities: string[];
  };
}

export interface MethodPhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fieldQuestions: string[];
  tangibleOutput: string;
}

export interface FieldVoice {
  id: string;
  quote: string;
  before: string;
  outcome: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  initials: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FieldFilmChapter {
  id: string;
  number: string;
  title: string;
  location: string;
  duration: string;
  caption: string;
  narrative: string;
  image: string;
  imageAlt: string;
}

export const HERO_MARQUEE_ITEMS: string[] = [
  'Human-centered field research',
  'Practical software systems',
  'Simplified everyday management',
  'Co-designed with real operators',
  'Built for lasting clarity',
];

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  'All',
  'Operations',
  'Healthcare',
  'Commerce',
  'Community',
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'kora-flow',
    name: 'Kora Flow',
    category: 'Operations',
    contextLabel: 'Operations · Supply & Field Logistics',
    year: '2026',
    summary:
      'Born from 90 days shadowing regional supply coordinators who spent every evening reconciling paper manifests, chat messages, and spreadsheets. Kora Flow unifies dispatch, live stock handoffs, and exception alerts into a calm offline-ready workspace.',
    image: '/src/assets/images/solution_kora_flow_1795641369028.jpg',
    imageAlt:
      'Minimalist silver tablet on a pale concrete dispatch desk displaying the Kora Flow route and status grid next to delivery logs',
    metrics: [
      { value: '64%', label: 'Faster daily reconciliation' },
      { value: '14 hrs', label: 'Saved per coordinator weekly' },
      { value: '420+', label: 'Active regional depots' },
    ],
    fieldStudy: {
      participants: '46 warehouse leads & route drivers across 12 depots',
      duration: '14 weeks of on-site shadowing and iterative trials',
      realWorldFriction:
        'Coordinators jumped across six disconnected tools—paper clipboards at loading bays, messaging threads with drivers, and fragile spreadsheets for invoicing—causing late deliveries and evening overtime.',
      researchInsight:
        'Operators did not want a complex enterprise logistics suite with 80 configuration menus. They needed one single-glance dispatch sheet that stayed dependable even in low-connectivity loading docks.',
      softwareOutcome:
        'We engineered Kora Flow around a tactile, keyboard- and touch-friendly dispatch board with automatic offline syncing, photo-verified handoffs, and instant exception summaries.',
      capabilities: [
        'Offline-first route & bay dispatch grid',
        'One-tap driver handoff confirmation',
        'Automated end-of-day variance ledger',
        'Zero-training onboarding for shift staff',
      ],
    },
  },
  {
    id: 'mila-care',
    name: 'Mila Care',
    category: 'Healthcare',
    contextLabel: 'Healthcare · Community Clinic Coordination',
    year: '2025',
    summary:
      'Co-designed alongside front-desk coordinators and community nurses facing intake bottlenecks and missed patient follow-ups. Mila Care replaces cluttered legacy portals with a serene single-screen schedule and follow-up companion.',
    image: '/src/assets/images/solution_mila_care_1795641369527.jpg',
    imageAlt:
      'Clinic coordinator at a pale travertine reception desk using Mila Care scheduling software on a laptop in sunlit community clinic',
    metrics: [
      { value: '48%', label: 'Shorter patient intake waits' },
      { value: '91%', label: 'Follow-up completion in 6 mo' },
      { value: '38', label: 'Partner community clinics' },
    ],
    fieldStudy: {
      participants: '62 nurses, reception staff, and returning patients',
      duration: '18 weeks of clinic observation and co-design sessions',
      realWorldFriction:
        'Front-desk staff spent more time clicking through nested insurance tabs than greeting anxious patients, while post-visit care instructions frequently fell through the cracks.',
      researchInsight:
        'Reducing cognitive clutter at the reception desk directly improves patient calm and clinical accuracy. Every essential action during arrival must sit within two focused steps.',
      softwareOutcome:
        'Mila Care brings daily arrivals, triage notes, and gentle multilingual follow-up reminders into a quiet interface designed to keep eye contact on people rather than screens.',
      capabilities: [
        'Two-step patient check-in and queue clarity',
        'Automated post-visit follow-up reminders',
        'Shared nurse-to-desk handoff notes',
        'Accessible low-glare typography for long shifts',
      ],
    },
  },
  {
    id: 'vero-ledger',
    name: 'Vero Ledger',
    category: 'Commerce',
    contextLabel: 'Commerce · Independent Merchant Operations',
    year: '2025',
    summary:
      'Independent workshops and neighborhood retailers were trapped between rigid corporate accounting software and error-prone notebooks. Vero Ledger brings supplier orders, stock counts, and clear daily cashflow into one approachable tablet workspace.',
    image: '/src/assets/images/solution_vero_ledger_1795641369783.jpg',
    imageAlt:
      'Tablet on an aluminum stand on a stone workshop counter displaying the Vero Ledger inventory and daily sales overview',
    metrics: [
      { value: '3.2x', label: 'Faster monthly closing' },
      { value: '98.4%', label: 'Daily team adoption rate' },
      { value: '1,200+', label: 'Independent merchants' },
    ],
    fieldStudy: {
      participants: '85 workshop founders, makers, and shop floor managers',
      duration: '12 weeks of retail floor immersion',
      realWorldFriction:
        'Small business owners spent their Sundays manually matching paper supplier receipts against point-of-sale exports because enterprise ERP tools demanded dedicated bookkeepers.',
      researchInsight:
        'Owners think in terms of daily shelves, supplier relationships, and cash on hand—not abstract double-entry accounting jargon.',
      softwareOutcome:
        'Vero Ledger translates everyday sales, material restocks, and vendor bills into plain-language daily clarity while still exporting accountant-ready summaries in one click.',
      capabilities: [
        'Plain-language daily cashflow & margin view',
        'Instant stock adjustment from counter tablet',
        'Supplier restock reminders before sell-outs',
        'One-click accountant-ready monthly packs',
      ],
    },
  },
  {
    id: 'trellis-civic',
    name: 'Trellis Civic',
    category: 'Community',
    contextLabel: 'Community · Shared Civic Space Stewardship',
    year: '2026',
    summary:
      'Shaped through interviews with 140+ librarians, volunteers, and neighborhood organizers who managed community rooms and shared tools across email chains. Trellis Civic makes public resource booking transparent and effortless for everyone.',
    image: '/src/assets/images/solution_trellis_civic_1795641371353.jpg',
    imageAlt:
      'Sunlit architectural civic library and shared maker space featuring a clean desktop monitor showing the Trellis Civic daily schedule',
    metrics: [
      { value: '2.6x', label: 'Shared space utilization' },
      { value: '82%', label: 'Fewer booking conflicts' },
      { value: '65', label: 'Civic spaces supported' },
    ],
    fieldStudy: {
      participants: '140+ residents, librarians, and volunteer coordinators',
      duration: '16 weeks across municipal libraries and maker hubs',
      realWorldFriction:
        'Residents abandoned room and equipment requests because availability was buried in PDF schedules and manual email approvals took up to five days.',
      researchInsight:
        'Shared civic infrastructure thrives when availability is visible in real time, accessibility needs are captured upfront, and volunteers are freed from repetitive email triage.',
      softwareOutcome:
        'Trellis Civic pairs a public walk-up kiosk display with an intuitive web scheduler so neighborhoods can reserve rooms, studio gear, and workshop tables with confidence.',
      capabilities: [
        'Live walk-up schedule board for shared spaces',
        'Fair-access reservation rules for local groups',
        'Equipment checkout & maintenance tracking',
        'WCAG AA accessible interface for all ages',
      ],
    },
  },
];

export const METHOD_PHASES: MethodPhase[] = [
  {
    id: 'observation',
    number: '01.',
    title: 'Field Observation & Immersion',
    subtitle: 'Seeing friction where work actually happens',
    description:
      'We begin away from our desks—sitting inside warehouses, community clinics, retail counters, and public spaces. Watching how people improvise workarounds reveals truths that surveys and assumptions miss.',
    fieldQuestions: [
      'Where do handwritten sticky notes and spreadsheets fill gaps in current tools?',
      'Which moments in a typical shift create unnecessary stress or repeated re-entry?',
    ],
    tangibleOutput: 'Field Observation Dossier & Workflow Friction Map',
  },
  {
    id: 'interviews',
    number: '02.',
    title: 'Human Interviews & Problem Framing',
    subtitle: 'Distinguishing symptoms from root causes',
    description:
      'We engage directly with frontline staff, business owners, and everyday citizens to understand their lived constraints, priorities, and mental models before a single line of architecture is proposed.',
    fieldQuestions: [
      'What outcome matters most to the person doing this task at 8:00 AM on a busy Monday?',
      'Which steps can be removed entirely rather than merely digitized?',
    ],
    tangibleOutput: 'Grounded Problem Thesis & Shared Design Principles',
  },
  {
    id: 'prototyping',
    number: '03.',
    title: 'Collaborative Prototyping',
    subtitle: 'Testing early drafts in real hands',
    description:
      'Rather than building in isolation for months, we place working interactive prototypes back into real environments within days. People try them mid-shift, challenge our assumptions, and co-shape the flow.',
    fieldQuestions: [
      'Can a first-time operator complete the core task without a training manual?',
      'Does the interface remain calm under peak real-world pressure?',
    ],
    tangibleOutput: 'Validated Interactive Prototype & Usability Field Notes',
  },
  {
    id: 'engineering',
    number: '04.',
    title: 'Practical Software Engineering',
    subtitle: 'Durable systems built for everyday reliability',
    description:
      'We craft focused, resilient software—prioritizing speed, offline tolerance, clear typography, and clean data models over feature sprawl. Every screen earns its place by simplifying real management.',
    fieldQuestions: [
      'How does the system behave on older hardware or unstable connections?',
      'Does every interaction finish smoothly without disrupting human flow?',
    ],
    tangibleOutput: 'Production Software Platform & Accessible Interface System',
  },
  {
    id: 'stewardship',
    number: '05.',
    title: 'Continuous Stewardship & Real-World Feedback',
    subtitle: 'Measuring lived impact long after launch',
    description:
      'Shipping is the beginning of learning. We stay close to the teams and communities using our software, tracking tangible hours saved and refining workflows as real-world needs evolve.',
    fieldQuestions: [
      'Has everyday workload genuinely decreased three and six months after adoption?',
      'What newly uncovered possibilities can we thoughtfully support next?',
    ],
    tangibleOutput: 'Quarterly Impact Review & Iterative Product Releases',
  },
];

export const FIELD_VOICES: FieldVoice[] = [
  {
    id: 'voice-1',
    quote:
      'Before working with Zauviq, our dispatch desk closed every night around 9 PM reconciling clipboards and text messages. Their researchers spent two full weeks on our loading bay before showing a single screen. Within a month of adopting Kora Flow, our team was finishing reconciliation in twenty minutes.',
    before: '2+ hours of nightly manual reconciliation across paper and chat',
    outcome: '64% faster daily closing and calm morning handoffs',
    name: 'Henrik Lindholm',
    role: 'Regional Operations Lead',
    organization: 'Nordic Valley Distribution',
    location: 'Gothenburg, SE',
    initials: 'HL',
  },
  {
    id: 'voice-2',
    quote:
      'Most software teams send a slideshow and ask us to change how our clinic works. Zauviq sat quietly at our reception desk, listened to our nurses, and built Mila Care around how human care actually flows. Patients immediately noticed our team had time to look up and greet them.',
    before: 'Fragmented intake tabs causing 18-minute lobby bottlenecks',
    outcome: '48% shorter check-in times and 91% follow-up completion',
    name: 'Dr. Amara Okafor',
    role: 'Medical Director',
    organization: 'Harborview Community Clinic',
    location: 'Bristol, UK',
    initials: 'AO',
  },
  {
    id: 'voice-3',
    quote:
      'Every accounting tool we tried felt built for a 500-person corporation. Vero Ledger feels like it was crafted by someone who actually stood behind our studio counter. I finally understand our weekly margins without losing my entire Sunday afternoon to spreadsheets.',
    before: 'Sunday evenings spent manually matching receipts to sales',
    outcome: '3.2x faster monthly closing with zero bookkeeping backlog',
    name: 'Clara Vermeulen',
    role: 'Founder & Ceramicist',
    organization: 'Atelier Vermeulen',
    location: 'Antwerp, BE',
    initials: 'CV',
  },
  {
    id: 'voice-4',
    quote:
      'Residents used to give up trying to book our library studio rooms because email approvals took days. Zauviq interviewed over forty of our regulars and volunteers. Now Trellis Civic runs quietly on our front kiosk and room usage more than doubled in one season.',
    before: 'Manual email chains and frequent double-booked workshop rooms',
    outcome: '2.6x shared space utilization and 82% fewer conflicts',
    name: 'Tomasz Zielinski',
    role: 'Civic Program Coordinator',
    organization: 'Krakow Neighborhood Commons',
    location: 'Krakow, PL',
    initials: 'TZ',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01.',
    question: 'How is Zauviq different from a traditional software service agency?',
    answer:
      'Zauviq is not an outsourced development shop or billable-hours agency. We are a research-first software studio that studies real-world human and operational problems deeply, collaborates closely with the people living through them, and transforms those insights into enduring, practical software products.',
  },
  {
    id: 'faq-2',
    number: '02.',
    question: 'How do you choose which real-world problems to research and build for?',
    answer:
      'We look for everyday areas where essential work is slowed down by fragmented spreadsheets, paper handoffs, or overly complex legacy software—especially in operations, community care, independent commerce, and civic management. When a friction affects real people daily and lacks a calm, practical tool, we investigate.',
  },
  {
    id: 'faq-3',
    number: '03.',
    question: 'Can our business or community share a challenge with your research team?',
    answer:
      'Yes. Many of our strongest initiatives began when an operations manager, clinic coordinator, or founder invited us to observe an everyday bottleneck. Use the dialogue form below to describe what your team navigates, and our research leads will follow up directly.',
  },
  {
    id: 'faq-4',
    number: '04.',
    question: 'How do everyday users participate while software is being created?',
    answer:
      'Participation is never an afterthought. We shadow real workflows, conduct candid interviews, and put early interactive prototypes into operators’ hands during normal workdays. Their feedback directly dictates what stays simple and what gets stripped away.',
  },
  {
    id: 'faq-5',
    number: '05.',
    question: 'Are Zauviq solutions designed for small teams or larger organizations?',
    answer:
      'Our software is built to feel effortless for a five-person local workshop while remaining structured and dependable enough for multi-site regional networks. Clarity and reliability scale better than bloated enterprise dashboards.',
  },
];

export const DIALOGUE_TOPICS: string[] = [
  'Field Research Partnership',
  'Operational Workflow Challenge',
  'Early Product Access',
  'Community Initiative',
  'General Dialogue',
];

export const FIELD_FILM_CHAPTERS: FieldFilmChapter[] = [
  {
    id: 'ch-1',
    number: '01',
    title: 'Listening where the work happens',
    location: 'Field Research · Studio & On-Site',
    duration: '01:24',
    caption: 'Before designing a single screen, we spend days sitting beside the people managing real complexity.',
    narrative:
      'Paper manifests, sticky notes on monitors, and midnight spreadsheet merges are never user errors—they are signals that existing software failed to understand human reality. Our work starts by observing quietly and asking better questions.',
    image: '/src/assets/images/zauviq_field_film_1795641368048.jpg',
    imageAlt: 'Zauviq researchers reviewing printed workflow maps with an operations manager at a sunlit wooden table',
  },
  {
    id: 'ch-2',
    number: '02',
    title: 'Translating friction into calm interfaces',
    location: 'Co-Design · Operations & Care',
    duration: '01:48',
    caption: 'Complex operational rules belong underneath the surface—never on the operator’s shoulders.',
    narrative:
      'Through rapid, tactile prototyping, we test ideas in real loading bays, reception desks, and shop counters. Anything that requires a manual to understand gets redesigned until it feels natural on day one.',
    image: '/src/assets/images/solution_kora_flow_1795641369028.jpg',
    imageAlt: 'Kora Flow clean dispatch grid running on a tablet on a concrete desk',
  },
  {
    id: 'ch-3',
    number: '03',
    title: 'Possibilities realized in everyday life',
    location: 'Impact · Businesses & Communities',
    duration: '01:15',
    caption: 'When software removes daily administrative weight, people reclaim time for care, craft, and growth.',
    narrative:
      'From regional depots closing shifts hours earlier to community clinics giving patients undivided attention, Zauviq measures success by tangible human relief—both digitally and in the real world.',
    image: '/src/assets/images/solution_trellis_civic_1795641371353.jpg',
    imageAlt: 'Sunlit community library and shared workspace running Trellis Civic scheduling software',
  },
];
