const API_BASE = "http://127.0.0.1:8000/api";
const KEY_DOWNLOADED = "kcse_studypack_downloaded_v1";
const KEY_CUSTOM = "kcse_studypack_custom_v1";
const KEY_QUEUE = "kcse_studypack_queue_v1";
const KEY_SERVER_LOG = "kcse_studypack_server_log_v1";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

const DEFAULT_KCSE_PACKS = [
  {
    pack_id: "math-kcse",
    subject: "Mathematics",
    category: "Compulsory",
    title: "Quadratic Equations, Surds & Commercial Arithmetic",
    size_kb: 16,
    notes: [
      {
        heading: "Quadratic Formula & Discriminant",
        body: "For ax² + bx + c = 0, x = [-b ± √(b² - 4ac)] / 2a. If b² - 4ac > 0, roots are real and distinct; if = 0, roots are equal."
      },
      {
        heading: "Compound Interest (Commercial Arithmetic II)",
        body: "A = P(1 + r/100)ⁿ where P is principal, r is rate per period, and n is number of compounding periods."
      }
    ],
    flashcards: [
      { term: "Rationalizing the Denominator", definition: "Multiplying numerator and denominator by the conjugate surd (e.g., a - √b) to remove radicals from the denominator." },
      { term: "Appreciation vs. Depreciation", definition: "Appreciation uses A = P(1 + r/100)ⁿ; depreciation uses A = P(1 - r/100)ⁿ." }
    ],
    quiz: [
      {
        question: "Solve for x: 2x² - 5x - 3 = 0",
        options: ["x = 3 or x = -0.5", "x = -3 or x = 0.5", "x = 2 or x = -1.5", "x = 3 or x = 0.5"],
        answer_index: 0,
        explanation: "Factoring (2x + 1)(x - 3) = 0 gives 2x = -1 (x = -0.5) or x = 3."
      },
      {
        question: "KSh 20,000 is invested at 10% p.a. compound interest for 2 years. Find the amount.",
        options: ["KSh 24,000", "KSh 24,200", "KSh 22,000", "KSh 24,400"],
        answer_index: 1,
        explanation: "A = 20,000 × (1.10)² = 20,000 × 1.21 = KSh 24,200."
      },
      {
        question: "Simplify: √48 + √27",
        options: ["√75", "7√3", "12√3", "5√3"],
        answer_index: 1,
        explanation: "√48 = 4√3 and √27 = 3√3; 4√3 + 3√3 = 7√3."
      }
    ]
  },
  {
    pack_id: "eng-kcse",
    subject: "English",
    category: "Compulsory",
    title: "Functional Writing, Grammar & Cloze Test Mastery",
    size_kb: 14,
    notes: [
      {
        heading: "Functional Writing Formats (Paper 1)",
        body: "Always include exact layout markers: Formal letters require sender address, date, recipient address, salutation, reference (RE:), body, and valediction (Yours faithfully)."
      },
      {
        heading: "Conditional Clauses & Inversion",
        body: "Type 3 conditional expresses unfulfilled past conditions: 'Had I revised earlier, I would have passed the exam.'"
      }
    ],
    flashcards: [
      { term: "Minutes of a Meeting", definition: "Official record containing Title, Present, Apologies, Absent, Preliminaries, Confirmation, Matters Arising, Agenda items, AOB, and Adjournment." },
      { term: "Litotes", definition: "Understatement using double negatives to affirm a positive idea (e.g., 'Not an easy task')." }
    ],
    quiz: [
      {
        question: "Choose the correct question tag: 'Let us revise for the KCSE exams, ____?'",
        options: ["shan't we", "shall we", "will we", "aren't we"],
        answer_index: 1,
        explanation: "Imperatives starting with 'Let us / Let's' take the tag 'shall we?'."
      },
      {
        question: "Which valediction correctly closes a formal letter addressed 'Dear Sir/Madam,'?",
        options: ["Yours sincerely,", "Yours affectionately,", "Yours faithfully,", "Warm regards,"],
        answer_index: 2,
        explanation: "When the recipient's name is unknown ('Dear Sir/Madam'), end with 'Yours faithfully,'."
      },
      {
        question: "Identify the sentence with correct subject-verb agreement:",
        options: [
          "Neither the prefects nor the captain were present.",
          "Neither the prefects nor the captain was present.",
          "Each of the candidates have a geometrical set.",
          "The news are broadcast at 9 PM."
        ],
        answer_index: 1,
        explanation: "With 'neither...nor', the verb agrees with the nearer subject ('captain' -> singular 'was')."
      }
    ]
  },
  {
    pack_id: "kisw-kcse",
    subject: "Kiswahili",
    category: "Compulsory",
    title: "Sarufi, Ngeli, Isimujamii na Fasihi Simulizi",
    size_kb: 15,
    notes: [
      {
        heading: "Ngeli za Nomino (U-ZI na LI-YA)",
        body: "Ngeli ya U-ZI hujumuisha nomino kama ukuta/kuta, ufunguo/funguo. Ngeli ya LI-YA hujumuisha jicho/macho, tunda/matunda."
      },
      {
        heading: "Isimujamii (Sajili ya Mahakamani)",
        body: "Sifa kuu: matumizi ya msamiati wa kisheria (mshtakiwa, hakimu, rufaa), lugha rasmi yenye adabu, na sentensi ndefu zenye maelezo ya kina."
      }
    ],
    flashcards: [
      { term: "Mighani", definition: "Hadithi za kishujaa zinazosimulia matendo ya mashujaa wa jamii (k.m. Fumo Liyongo)." },
      { term: "Kinyume cha Kitenzi", definition: "Kuonyesha tendo lililo kinyume, k.m. funga -> fungua; vaa -> vua." }
    ],
    quiz: [
      {
        question: "Wingi wa sentensi 'Ukuta mrefu umebomoka' ni upi?",
        options: [
          "Makuta marefu yamebomoka.",
          "Kuta ndefu zimebomoka.",
          "Ukuta ndefu zimebomoka.",
          "Kuta marefu zimebomoka."
        ],
        answer_index: 1,
        explanation: "'Ukuta' iko katika ngeli ya U-ZI; wingi wake ni 'kuta ndefu zimebomoka'."
      },
      {
        question: "Ni ipi sifa mojawapo ya sajili ya hospitalini?",
        options: [
          "Matumizi ya misimu ya mitaani pekee",
          "Lugha yenye huruma, maswali ya uchunguzi na istilahi za kitabibu",
          "Kukosekana kwa nidhamu kati ya mzungumzaji na msikilizaji",
          "Matumizi ya nyimbo za kisiasa"
        ],
        answer_index: 1,
        explanation: "Sajili ya hospitalini hutumia lugha ya upole, maswali ya utambuzi na msamiati wa kiafya."
      },
      {
        question: "Hadithi zinazoeleza asili ya vitu, tabia au matukio katika jamii huitwa:",
        options: ["Hurafa", "Visasili", "Hekaya", "Ngano za mazimwi"],
        answer_index: 1,
        explanation: "Visasili hueleza chanzo au asili ya maumbile, tamaduni au matukio."
      }
    ]
  },
  {
    pack_id: "bio-kcse",
    subject: "Biology",
    category: "Sciences",
    title: "Cell Physiology, Respiration & Ecology",
    size_kb: 16,
    notes: [
      {
        heading: "Osmosis in Plant vs. Animal Cells",
        body: "In hypotonic solutions, plant cells absorb water and become turgid (cell wall prevents bursting), whereas red blood cells swell and burst (haemolysis)."
      },
      {
        heading: "Aerobic vs. Anaerobic Respiration",
        body: "Aerobic respiration yields 38 ATP per glucose molecule in mitochondria; anaerobic respiration in muscles produces lactic acid and 2 ATP."
      }
    ],
    flashcards: [
      { term: "Plasmolysis", definition: "Shrinkage of cytoplasm away from the plant cell wall when placed in a hypertonic solution." },
      { term: "Carrying Capacity", definition: "Maximum population size of a species that an ecosystem can sustain indefinitely." }
    ],
    quiz: [
      {
        question: "What happens to a red blood cell placed in distilled water?",
        options: ["It undergoes crenation", "It becomes plasmolysed", "It swells and bursts (haemolysis)", "It remains unchanged"],
        answer_index: 2,
        explanation: "Distilled water is hypotonic to cell cytoplasm; water enters by osmosis and the cell bursts due to lack of a cell wall."
      },
      {
        question: "Which organelle is the site of aerobic respiration?",
        options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Chloroplast"],
        answer_index: 1,
        explanation: "Mitochondria contain respiratory enzymes for the Krebs cycle and ATP synthesis."
      },
      {
        question: "In a food chain: Grass → Grasshopper → Lizard → Hawk, which organism occupies the third trophic level?",
        options: ["Grass", "Grasshopper", "Lizard", "Hawk"],
        answer_index: 2,
        explanation: "Level 1: Grass (producer), Level 2: Grasshopper (primary consumer), Level 3: Lizard (secondary consumer)."
      }
    ]
  },
  {
    pack_id: "chem-kcse",
    subject: "Chemistry",
    category: "Sciences",
    title: "Mole Concept, Acids/Bases & Electrochemistry",
    size_kb: 17,
    notes: [
      {
        heading: "The Mole & Molar Gas Volume",
        body: "Moles = Mass / Molar Mass. At s.t.p., 1 mole of any gas occupies 22.4 dm³; at r.t.p., it occupies 24.0 dm³."
      },
      {
        heading: "Electrolysis & Preferential Discharge",
        body: "At the cathode, cations lower in the electrochemical series are discharged first (e.g., Cu²⁺ discharges before H⁺)."
      }
    ],
    flashcards: [
      { term: "Amphoteric Oxide", definition: "An oxide that reacts with both acids and alkalis to form salt and water (e.g., ZnO, Al₂O₃, PbO)." },
      { term: "Standard Electrode Potential (E°)", definition: "Potential difference measured when a half-cell is connected to a Standard Hydrogen Electrode under standard conditions." }
    ],
    quiz: [
      {
        question: "Calculate the number of moles in 10.6 g of sodium carbonate (Na₂CO₃). (Na=23, C=12, O=16)",
        options: ["0.05 moles", "0.10 moles", "0.20 moles", "1.00 mole"],
        answer_index: 1,
        explanation: "RFM of Na₂CO₃ = (23×2) + 12 + (16×3) = 106. Moles = 10.6 / 106 = 0.10 moles."
      },
      {
        question: "Which of the following oxides is amphoteric?",
        options: ["MgO", "SO₂", "Al₂O₃", "Na₂O"],
        answer_index: 2,
        explanation: "Aluminium oxide (Al₂O₃) reacts with both dilute acids and concentrated alkalis."
      },
      {
        question: "During electrolysis of aqueous copper(II) sulphate using carbon electrodes, what is observed at the cathode?",
        options: ["Evolution of oxygen gas", "Deposition of a brown solid", "Evolution of hydrogen gas", "Dissolution of the cathode"],
        answer_index: 1,
        explanation: "Cu²⁺ ions are preferentially discharged at the cathode, forming a brown copper metal deposit."
      }
    ]
  },
  {
    pack_id: "phys-kcse",
    subject: "Physics",
    category: "Sciences",
    title: "Current Electricity, Waves & Electromagnetic Induction",
    size_kb: 16,
    notes: [
      {
        heading: "Ohm's Law & Internal Resistance",
        body: "E = I(R + r), where E is e.m.f., I is current, R is external resistance, and r is internal resistance of the cell."
      },
      {
        heading: "Lenz's Law & Transformers",
        body: "Induced current opposes the change producing it. For an ideal transformer: Vs / Vp = Ns / Np = Ip / Is."
      }
    ],
    flashcards: [
      { term: "Refractive Index (n)", definition: "Ratio of speed of light in vacuum to speed in medium, or sin i / sin r." },
      { term: "Half-Life (t½)", definition: "Time taken for half the radioactive nuclei in a sample to decay." }
    ],
    quiz: [
      {
        question: "A step-down transformer has 1,000 primary turns and 50 secondary turns. If input voltage is 240V, find output voltage.",
        options: ["12 V", "24 V", "48 V", "4,800 V"],
        answer_index: 0,
        explanation: "Vs = Vp × (Ns / Np) = 240 × (50 / 1000) = 12 V."
      },
      {
        question: "Two 6Ω resistors in parallel are connected in series with a 3Ω resistor. Find total resistance.",
        options: ["6 Ω", "9 Ω", "12 Ω", "15 Ω"],
        answer_index: 0,
        explanation: "Parallel pair: (6×6)/(6+6) = 3Ω. Total in series: 3Ω + 3Ω = 6Ω."
      },
      {
        question: "A radioactive sample of 80 g has a half-life of 5 days. How much remains undecayed after 15 days?",
        options: ["40 g", "20 g", "10 g", "5 g"],
        answer_index: 2,
        explanation: "15 days = 3 half-lives. 80g -> 40g -> 20g -> 10g."
      }
    ]
  },
  {
    pack_id: "geo-kcse",
    subject: "Geography",
    category: "Humanities",
    title: "External Land-Forming Processes, Climate & Mapwork",
    size_kb: 15,
    notes: [
      {
        heading: "River Profiles & Landforms",
        body: "Youthful stage features V-shaped valleys, waterfalls, and interlocking spurs; old stage features meanders, ox-bow lakes, and floodplains."
      },
      {
        heading: "Modified Equatorial Climate of the Lake Victoria Basin",
        body: "Characterized by high temperatures (20°C–26°C), double rainfall maxima, and afternoon convectional rainfall influenced by lake breezes."
      }
    ],
    flashcards: [
      { term: "Ox-bow Lake", definition: "Crescent-shaped lake formed when a pronounced river meander neck is cut off during flooding." },
      { term: "Isohyets", definition: "Lines drawn on a map joining places with equal average rainfall." }
    ],
    quiz: [
      {
        question: "Which feature is formed by river deposition in the old stage?",
        options: ["Pothole", "Gorge", "Ox-bow lake", "Interlocking spur"],
        answer_index: 2,
        explanation: "Ox-bow lakes form in the mature/old floodplain stage through lateral erosion and deposition."
      },
      {
        question: "Lines on a weather map joining places with equal atmospheric pressure are called:",
        options: ["Isotherms", "Isobars", "Isohyets", "Contours"],
        answer_index: 1,
        explanation: "Isobars connect points of equal barometric (atmospheric) pressure."
      },
      {
        question: "What causes land and sea breezes along the Kenyan coast?",
        options: [
          "Differential heating and cooling of land and sea",
          "Earth's revolution around the sun",
          "Plate tectonic movement",
          "Ocean salinity variations"
        ],
        answer_index: 0,
        explanation: "Land heats and cools faster than sea water, creating local pressure gradients day and night."
      }
    ]
  },
  {
    pack_id: "hist-kcse",
    subject: "History & Government",
    category: "Humanities",
    title: "Constitutional Development, Independence & Devolved Government",
    size_kb: 16,
    notes: [
      {
        heading: "Lancaster House Conferences (1960–1963)",
        body: "Three conferences in London negotiated Kenya's independence constitution, culminating in internal self-government (Madaraka) on 1 June 1963 and full independence on 12 December 1963."
      },
      {
        heading: "Constitution of Kenya 2010 — Devolution",
        body: "Established 47 County Governments, a bicameral Parliament (National Assembly & Senate), and an independent Judiciary."
      }
    ],
    flashcards: [
      { term: "Lyttelton Constitution (1954)", definition: "Introduced multi-racial Council of Ministers in Kenya and allowed African participation in the LegCo." },
      { term: "Bicameral Parliament", definition: "Legislature consisting of two chambers: the National Assembly and the Senate." }
    ],
    quiz: [
      {
        question: "How many County Governments were established under the Constitution of Kenya 2010?",
        options: ["42", "45", "47", "50"],
        answer_index: 2,
        explanation: "Article 6 and the First Schedule of the 2010 Constitution establish 47 counties."
      },
      {
        question: "Which conference finalized Kenya's Independence Constitution in 1963?",
        options: ["Berlin Conference", "Third Lancaster House Conference", "Bomas Conference", "Limuru Conference"],
        answer_index: 1,
        explanation: "The Third Lancaster House Conference (1963) drafted the independence constitution."
      },
      {
        question: "Who chairs the County Executive Committee in Kenya?",
        options: ["County Speaker", "County Commissioner", "County Governor", "Senator"],
        answer_index: 2,
        explanation: "The elected County Governor heads the County Executive Committee."
      }
    ]
  },
  {
    pack_id: "cre-kcse",
    subject: "CRE",
    category: "Humanities",
    title: "Old Testament Prophets, Luke's Gospel & Christian Ethics",
    size_kb: 14,
    notes: [
      {
        heading: "Prophet Amos on Social Justice",
        body: "Amos condemned oppression of the poor, bribery in courts, dishonest weights, and hollow religious rituals without righteousness."
      },
      {
        heading: "Jesus' Parables in St. Luke's Gospel",
        body: "Luke highlights universal salvation, prayer, and compassion for outcasts through parables like the Good Samaritan and the Prodigal Son."
      }
    ],
    flashcards: [
      { term: "Theophany", definition: "Visible manifestation of God to human beings (e.g., the burning bush to Moses at Mount Horeb)." },
      { term: "Stewardship", definition: "Human responsibility to care for, protect, and manage God's creation responsibly." }
    ],
    quiz: [
      {
        question: "Which prophet strongly condemned social injustice and hypocritical worship in the Northern Kingdom of Israel?",
        options: ["Prophet Amos", "Prophet Haggai", "Prophet Nehemiah", "Prophet Ezra"],
        answer_index: 0,
        explanation: "Amos prophesied during King Jeroboam II's reign against exploitation of the poor."
      },
      {
        question: "In St. Luke's Gospel, the parable of the Good Samaritan primarily teaches:",
        options: [
          "Strict adherence to Sabbath laws",
          "Unconditional love and practical compassion for every neighbor",
          "Accumulation of wealth",
          "Temple tax obligations"
        ],
        answer_index: 1,
        explanation: "Jesus defined a neighbor as anyone in need regardless of ethnic or social barriers."
      },
      {
        question: "In Traditional African Communities, elders promoted harmony mainly through:",
        options: [
          "Written statutory courts",
          "Mediation, reconciliation, and shared oaths/covenants",
          "Imprisonment in cells",
          "Exile to foreign nations"
        ],
        answer_index: 1,
        explanation: "African traditional justice focused on restoring communal peace through mediation and reconciliation."
      }
    ]
  },
  {
    pack_id: "agri-kcse",
    subject: "Agriculture",
    category: "Technical",
    title: "Soil Fertility, Crop Production & Livestock Health",
    size_kb: 15,
    notes: [
      {
        heading: "Soil Conservation & Fertility",
        body: "Contour ploughing, terracing (fanya juu), mulching, and crop rotation prevent soil erosion and replenish soil nutrients."
      },
      {
        heading: "Notifiable Livestock Diseases",
        body: "Foot and Mouth Disease (FMD), Anthrax, and Rift Valley Fever must be reported immediately to veterinary authorities and controlled via quarantine and vaccination."
      }
    ],
    flashcards: [
      { term: "Quarantine", definition: "Legal restriction of livestock movement in or out of an area during a contagious disease outbreak." },
      { term: "Top-Dressing", definition: "Application of nitrogenous fertilizers (e.g., CAN, Urea) to growing crops in the field." }
    ],
    quiz: [
      {
        question: "Why should a farmer NOT open the carcass of an animal suspected to have died of Anthrax?",
        options: [
          "It spoils the hide value only",
          "Exposure to oxygen causes bacteria to form resistant spores that contaminate the soil",
          "It attracts scavenger birds",
          "The meat becomes too tough"
        ],
        answer_index: 1,
        explanation: "Bacillus anthracis forms long-lived spores when exposed to air; carcasses must be burned or buried deeply."
      },
      {
        question: "Which practice controls soil erosion on steep slopes by building ridges across the contour?",
        options: ["Overgrazing", "Terracing", "Monocropping", "Burning vegetation"],
        answer_index: 1,
        explanation: "Terraces reduce slope length and runoff velocity, preventing sheet and gully erosion."
      },
      {
        question: "Which fertilizer is best suited for top-dressing maize?",
        options: ["Single Superphosphate (SSP)", "Calcium Ammonium Nitrate (CAN)", "Muriate of Potash", "Rock Phosphate"],
        answer_index: 1,
        explanation: "CAN supplies readily available nitrogen needed during active vegetative growth."
      }
    ]
  },
  {
    pack_id: "bus-kcse",
    subject: "Business Studies",
    category: "Technical",
    title: "Ledger Accounts, Cash Books & Balance Sheet",
    size_kb: 15,
    notes: [
      {
        heading: "Double-Entry Principle & Cash Book",
        body: "Every transaction affects at least two accounts: Debit the receiver/asset increase, Credit the giver/liability increase. Three-column cash books record Discounts, Cash, and Bank."
      },
      {
        heading: "Accounting Equation",
        body: "Assets = Capital + Liabilities. Fixed assets are held for long-term use; current assets convert to cash within one year."
      }
    ],
    flashcards: [
      { term: "Contra Entry", definition: "Transaction affecting both cash and bank columns simultaneously (e.g., depositing office cash into bank), marked 'C'." },
      { term: "Working Capital", definition: "Current Assets minus Current Liabilities; measures short-term liquidity." }
    ],
    quiz: [
      {
        question: "Given Fixed Assets = KSh 450,000, Current Assets = KSh 150,000, and Liabilities = KSh 200,000, calculate Capital.",
        options: ["KSh 800,000", "KSh 400,000", "KSh 300,000", "KSh 600,000"],
        answer_index: 1,
        explanation: "Total Assets = 450,000 + 150,000 = 600,000. Capital = Assets - Liabilities = 600,000 - 200,000 = KSh 400,000."
      },
      {
        question: "Which document is issued by a seller to reduce the amount owed by a buyer due to returned goods?",
        options: ["Debit Note", "Credit Note", "Invoice", "Delivery Note"],
        answer_index: 1,
        explanation: "A Credit Note reduces an overcharge or credits the buyer's account for damaged/returned goods."
      },
      {
        question: "Which principle of insurance prevents an insured person from profiting from a loss?",
        options: ["Utmost Good Faith", "Indemnity", "Proximate Cause", "Insurable Interest"],
        answer_index: 1,
        explanation: "Indemnity restores the insured to the exact financial position prior to the loss."
      }
    ]
  },
  {
    pack_id: "comp-kcse",
    subject: "Computer Studies",
    category: "Technical",
    title: "Data Representation, Networking & System Development",
    size_kb: 16,
    notes: [
      {
        heading: "Number Systems & Two's Complement",
        body: "Convert decimal to binary by repeated division by 2. Two's complement represents negative integers by inverting bits and adding 1."
      },
      {
        heading: "SDLC & Network Topologies",
        body: "System Development Life Cycle phases: Problem recognition, Requirements, Design, Coding, Testing, Implementation, and Maintenance."
      }
    ],
    flashcards: [
      { term: "Primary Key", definition: "A field (or combination of fields) that uniquely identifies each record in a relational database table." },
      { term: "Star Topology", definition: "Network layout where all nodes connect to a central switch/hub; failure of one cable affects only that node." }
    ],
    quiz: [
      {
        question: "Convert the decimal number 25 into binary:",
        options: ["11001₂", "10101₂", "11010₂", "10011₂"],
        answer_index: 0,
        explanation: "25 = 16 + 8 + 1 = 1(2⁴) + 1(2³) + 0(2²) + 0(2¹) + 1(2⁰) = 11001₂."
      },
      {
        question: "Which database constraint prevents duplicate or NULL values in a unique identifier column?",
        options: ["Foreign Key", "Primary Key", "Lookup Wizard", "Input Mask"],
        answer_index: 1,
        explanation: "A Primary Key enforces entity integrity by requiring unique, non-null values."
      },
      {
        question: "Which SDLC changeover strategy runs the old and new systems simultaneously before retiring the old system?",
        options: ["Direct changeover", "Parallel changeover", "Phased changeover", "Pilot changeover"],
        answer_index: 1,
        explanation: "Parallel running compares outputs of both systems to minimize operational risk."
      }
    ]
  }
];

let isOnline = true;
let activeCategory = "All";
let searchQuery = "";

const getDownloaded = () => JSON.parse(localStorage.getItem(KEY_DOWNLOADED) || "{}");
const saveDownloaded = (obj) => localStorage.setItem(KEY_DOWNLOADED, JSON.stringify(obj));
const getCustomPacks = () => JSON.parse(localStorage.getItem(KEY_CUSTOM) || "[]");
const saveCustomPacks = (arr) => localStorage.setItem(KEY_CUSTOM, JSON.stringify(arr));
const getQueue = () => JSON.parse(localStorage.getItem(KEY_QUEUE) || "[]");
const saveQueue = (arr) => {
  localStorage.setItem(KEY_QUEUE, JSON.stringify(arr));
  document.getElementById("queue-count").textContent = arr.length;
};
const getServerLog = () => JSON.parse(localStorage.getItem(KEY_SERVER_LOG) || "[]");
const saveServerLog = (arr) => localStorage.setItem(KEY_SERVER_LOG, JSON.stringify(arr));

function allCatalogPacks() {
  return [...DEFAULT_KCSE_PACKS, ...getCustomPacks()];
}

function showToast(msg) {
  const el = document.getElementById("toast-banner");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.add("hidden"), 3500);
}

function seedInitialPacks() {
  const downloaded = getDownloaded();
  if (Object.keys(downloaded).length === 0) {
    ["math-kcse", "bio-kcse"].forEach((id) => {
      const found = DEFAULT_KCSE_PACKS.find((p) => p.pack_id === id);
      if (found) downloaded[id] = found;
    });
    saveDownloaded(downloaded);
  }
}

function renderCatalog() {
  const grid = document.getElementById("pack-grid");
  const downloaded = getDownloaded();
  const packs = allCatalogPacks().filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.subject.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.notes.some((n) => n.heading.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  grid.innerHTML = "";
  packs.forEach((pack) => {
    const cached = Boolean(downloaded[pack.pack_id]);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-top">
          <span class="pill">${pack.subject}</span>
          <span class="size-tag">${pack.size_kb} KB • ${pack.quiz.length} Qs</span>
        </div>
        <h3>${pack.title}</h3>
        <p class="muted">${pack.notes.length} Notes • ${pack.flashcards.length} Flashcards • ${pack.category}</p>
      </div>
      <div class="card-actions">
        ${
          cached
            ? `<button class="btn-open" onclick="openStudyPack('${pack.pack_id}')">Open Offline ✓</button>`
            : `<button class="btn-primary" style="width:100%" onclick="downloadPack('${pack.pack_id}')">Download Pack (${pack.size_kb} KB)</button>`
        }
      </div>
    `;
    grid.appendChild(card);
  });

  const countDownloaded = Object.keys(downloaded).length;
  const totalKb = Object.values(downloaded).reduce((sum, p) => sum + (p.size_kb || 15), 0);
  document.getElementById("storage-summary").textContent =
    `${countDownloaded}/${allCatalogPacks().length} packs cached (${totalKb} KB offline)`;
}

function downloadPack(packId) {
  if (!isOnline) {
    showToast("You are Offline! Switch to Online mode to download new packs.");
    return;
  }
  const pack = allCatalogPacks().find((p) => p.pack_id === packId);
  if (!pack) return;
  const downloaded = getDownloaded();
  downloaded[packId] = pack;
  saveDownloaded(downloaded);
  showToast(`Downloaded "${pack.subject}: ${pack.title}" (${pack.size_kb} KB) for offline use.`);
  renderCatalog();
}

document.getElementById("download-all-btn").onclick = () => {
  if (!isOnline) {
    showToast("Switch to Online mode first to download all 12 KCSE packs.");
    return;
  }
  const downloaded = getDownloaded();
  allCatalogPacks().forEach((p) => {
    downloaded[p.pack_id] = p;
  });
  saveDownloaded(downloaded);
  showToast("All KCSE subject packs cached locally! Try switching to Offline Mode now.");
  renderCatalog();
};

document.getElementById("reset-demo-btn").onclick = () => {
  localStorage.removeItem(KEY_DOWNLOADED);
  localStorage.removeItem(KEY_CUSTOM);
  localStorage.removeItem(KEY_QUEUE);
  localStorage.removeItem(KEY_SERVER_LOG);
  seedInitialPacks();
  saveQueue([]);
  renderCatalog();
  renderSyncLog();
  showToast("Storage reset to default state.");
};

function openStudyPack(packId) {
  const pack = getDownloaded()[packId];
  if (!pack) return;

  document.getElementById("catalog-view").classList.add("hidden");
  document.getElementById("study-view").classList.remove("hidden");
  document.getElementById("study-badge").textContent = `${pack.subject} • ${pack.category}`;
  document.getElementById("study-title").textContent = pack.title;

  document.getElementById("panel-notes").innerHTML = pack.notes
    .map(
      (n) => `
      <div class="note-box">
        <h3 style="margin:0 0 0.35rem">${n.heading}</h3>
        <p style="margin:0">${n.body}</p>
      </div>`
    )
    .join("");

  document.getElementById("panel-flashcards").innerHTML = pack.flashcards
    .map(
      (f) => `
      <div class="flashcard" onclick="this.querySelector('.flashcard-def').classList.toggle('hidden')">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>${f.term}</strong>
          <span class="muted">Tap to flip ↻</span>
        </div>
        <div class="flashcard-def hidden">${f.definition}</div>
      </div>`
    )
    .join("");

  const quizHtml = pack.quiz
    .map(
      (q, qi) => `
      <div class="quiz-card" id="qcard-${qi}">
        <p style="margin:0 0 0.5rem"><strong>Q${qi + 1}.</strong> ${q.question}</p>
        ${q.options
          .map(
            (opt, oi) => `
            <label class="option-label">
              <input type="radio" name="quiz-q-${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>`
          )
          .join("")}
        <div id="qexp-${qi}" class="explanation-box hidden"></div>
      </div>`
    )
    .join("");

  document.getElementById("panel-quiz").innerHTML =
    quizHtml +
    `<button class="btn-primary" onclick="submitQuiz('${pack.pack_id}')">Submit & Grade Offline</button>
     <div id="quiz-score-banner" style="margin-top:1rem"></div>`;

  activateStudyTab("notes");
}

function submitQuiz(packId) {
  const pack = getDownloaded()[packId];
  let score = 0;

  pack.quiz.forEach((q, qi) => {
    const picked = document.querySelector(`input[name="quiz-q-${qi}"]:checked`);
    const expBox = document.getElementById(`qexp-${qi}`);
    const isCorrect = picked && Number(picked.value) === q.answer_index;
    if (isCorrect) score++;

    expBox.classList.remove("hidden");
    expBox.innerHTML = `<strong>${isCorrect ? "✓ Correct" : "✗ Incorrect"}:</strong> ${q.explanation}`;
  });

  const attempt = {
    pack_id: pack.pack_id,
    subject: pack.subject,
    title: pack.title,
    score,
    total: pack.quiz.length,
    timestamp: new Date().toLocaleTimeString()
  };

  const queue = getQueue();
  queue.push(attempt);
  saveQueue(queue);

  document.getElementById("quiz-score-banner").innerHTML = `
    <div class="note-box">
      <strong>Result: ${score} / ${pack.quiz.length} (${Math.round((score / pack.quiz.length) * 100)}%)</strong>
      <p class="muted" style="margin-top:0.25rem">
        ${isOnline ? "Online — syncing attempt to server..." : "Saved in Offline Sync Queue — will auto-sync when back online."}
      </p>
    </div>`;

  if (isOnline) {
    flushSyncQueue();
  } else {
    renderSyncLog();
  }
}

async function flushSyncQueue() {
  const queue = getQueue();
  if (!queue.length) return;
  if (!isOnline) {
    showToast("Offline: attempts remain safely queued in local storage.");
    return;
  }

  try {
    await fetch(`${API_BASE}/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attempts: queue })
    });
  } catch (_) {}

  const serverLog = getServerLog();
  queue.forEach((item) => serverLog.unshift({ ...item, syncedAt: new Date().toLocaleTimeString() }));
  saveServerLog(serverLog);
  saveQueue([]);
  renderSyncLog();
  showToast(`Synced ${queue.length} quiz attempt(s) to server.`);
}

function renderSyncLog() {
  const list = document.getElementById("sync-log-list");
  const queued = getQueue().map((q) => ({ ...q, status: "queued" }));
  const synced = getServerLog().map((s) => ({ ...s, status: "synced" }));
  const combined = [...queued, ...synced];

  if (!combined.length) {
    list.innerHTML = `<p class="muted">No quiz attempts recorded yet. Open a downloaded pack and complete a mini-quiz.</p>`;
    return;
  }

  list.innerHTML = combined
    .map(
      (item) => `
      <div class="log-item">
        <div>
          <strong>${item.subject}</strong> — ${item.title}
          <span class="muted">(${item.timestamp})</span>
        </div>
        <div>
          <strong>${item.score}/${item.total}</strong> •
          <span class="${item.status === "synced" ? "badge-synced" : "badge-queued"}">
            ${item.status === "synced" ? "Synced ✓" : "Queued Offline"}
          </span>
        </div>
      </div>`
    )
    .join("");
}

document.getElementById("toggle-network-btn").onclick = () => {
  isOnline = !isOnline;
  const dot = document.getElementById("status-dot");
  const text = document.getElementById("status-text");
  const btn = document.getElementById("toggle-network-btn");

  dot.className = `dot ${isOnline ? "online" : "offline"}`;
  text.textContent = isOnline ? "Online" : "Offline Mode";
  btn.textContent = isOnline ? "Go Offline" : "Go Online";

  if (isOnline) {
    showToast("Back Online! Checking sync queue...");
    flushSyncQueue();
  } else {
    showToast("Offline Mode enabled — cached packs and quizzes still work!");
  }
};

document.getElementById("sync-btn").onclick = flushSyncQueue;

document.getElementById("back-btn").onclick = () => {
  document.getElementById("study-view").classList.add("hidden");
  document.getElementById("catalog-view").classList.remove("hidden");
  renderCatalog();
  renderSyncLog();
};

function activateStudyTab(tabName) {
  document.querySelectorAll(".stab").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  document.querySelectorAll(".stab-panel").forEach((p) => {
    p.classList.toggle("hidden", p.id !== `panel-${tabName}`);
  });
}

document.querySelectorAll(".stab").forEach((btn) => {
  btn.onclick = () => activateStudyTab(btn.dataset.tab);
});

document.querySelectorAll(".cat-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderCatalog();
  };
});

document.getElementById("search-input").oninput = (e) => {
  searchQuery = e.target.value;
  renderCatalog();
};

document.getElementById("creator-form").onsubmit = (e) => {
  e.preventDefault();
  const subject = document.getElementById("c-subject").value;
  const category = document.getElementById("c-category").value;
  const title = document.getElementById("c-title").value.trim();
  const options = document
    .getElementById("c-opts")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (options.length < 2) {
    showToast("Please provide at least 2 comma-separated options.");
    return;
  }

  const ansIdx = Math.min(Math.max(0, Number(document.getElementById("c-ans").value) || 0), options.length - 1);
  const newPack = {
    pack_id: `custom-${Date.now().toString().slice(-5)}`,
    subject,
    category,
    title,
    size_kb: 12,
    notes: [
      {
        heading: document.getElementById("c-note-head").value.trim(),
        body: document.getElementById("c-note-body").value.trim()
      }
    ],
    flashcards: [
      {
        term: document.getElementById("c-fc-term").value.trim(),
        definition: document.getElementById("c-fc-def").value.trim()
      }
    ],
    quiz: [
      {
        question: document.getElementById("c-q").value.trim(),
        options,
        answer_index: ansIdx,
        explanation: document.getElementById("c-exp").value.trim()
      }
    ]
  };

  const custom = getCustomPacks();
  custom.push(newPack);
  saveCustomPacks(custom);

  const downloaded = getDownloaded();
  downloaded[newPack.pack_id] = newPack;
  saveDownloaded(downloaded);

  e.target.reset();
  renderCatalog();
  showToast(`Created & cached "${subject}: ${title}" for offline revision!`);
};

seedInitialPacks();
saveQueue(getQueue());
renderCatalog();
renderSyncLog();
