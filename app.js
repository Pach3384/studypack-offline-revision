const API_BASE = "http://127.0.0.1:8000/api";
const KEY_DOWNLOADED = "kenya_studypack_downloaded_v3";
const KEY_CUSTOM = "kenya_studypack_custom_v3";
const KEY_QUEUE = "kenya_studypack_queue_v3";
const KEY_SERVER_LOG = "kenya_studypack_server_log_v3";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

const CURRICULUM_REVISION_TIPS = [
  {
    curriculum: "KCSE",
    title: "KCSE Command Words & Marking Schemes",
    body: "Match answers to KNEC command verbs: 'State/Name' needs a brief fact; 'Explain' requires a point plus mechanism/reason; 'Compare' must address both items in the same sentence."
  },
  {
    curriculum: "KCSE",
    title: "Show Method Marks (M1) Before Final Answer (A1)",
    body: "In Mathematics, Physics, and Chemistry calculations, write the formula and substitution clearly. Even if a final rounding error occurs, method marks still count."
  },
  {
    curriculum: "KCSE",
    title: "Timed Past-Paper Drills (80/20 Rule)",
    body: "Revise Form 3 & 4 high-weight topics under strict exam timing (e.g., 2.5 hrs for Paper 1/2), then review KNEC examiner reports for common candidate pitfalls."
  },
  {
    curriculum: "CBC",
    title: "CBC Application & Real-Life Scenarios",
    body: "Competency-based assessments test how you apply concepts to community, environmental, and everyday problem-solving scenarios—always connect theory to practical action."
  },
  {
    curriculum: "CBC",
    title: "Projects, Portfolios & Rubrics (CBA)",
    body: "Document every step of practical investigations—planning, improvised local materials, observations, and reflection—to hit 'Exceeding Expectations' on KNEC CBA rubrics."
  },
  {
    curriculum: "CBC",
    title: "Core Competencies & Senior School Pathways",
    body: "Link revision across strands: integrate Digital Literacy, Critical Thinking, and Financial/Environmental awareness across STEM, Social Sciences, and Arts & Sports pathways."
  }
];

const DEFAULT_STUDY_PACKS = [
  {
    pack_id: "math-kcse",
    curriculum: "KCSE",
    subject: "Mathematics",
    category: "Compulsory",
    title: "Quadratic Equations, Surds & Commercial Arithmetic",
    revision_tip: "KCSE Tip: Always leave surd answers in simplest rationalized form unless the question specifies decimal places or significant figures.",
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
      }
    ]
  },
  {
    pack_id: "eng-kcse",
    curriculum: "KCSE",
    subject: "English",
    category: "Compulsory",
    title: "Functional Writing, Grammar & Cloze Test Mastery",
    revision_tip: "KCSE Tip: In Paper 1 Functional Writing, format carries up to 8 marks—check addresses, dates, headings, and sign-off before drafting content.",
    size_kb: 14,
    notes: [
      {
        heading: "Functional Writing Formats (Paper 1)",
        body: "Formal letters require sender address, date, recipient address, salutation, reference (RE:), body, and valediction (Yours faithfully)."
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
      }
    ]
  },
  {
    pack_id: "kisw-kcse",
    curriculum: "KCSE",
    subject: "Kiswahili",
    category: "Compulsory",
    title: "Sarufi, Ngeli, Isimujamii na Fasihi Simulizi",
    revision_tip: "KCSE Tip: Katika Isimujamii, taja sifa ya sajili kisha utoe mfano halisi wa sentensi au msamiati kutoka kifungu ulichopewa.",
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
        question: "Hadithi zinazoeleza asili ya vitu, tabia au matukio katika jamii huitwa:",
        options: ["Hurafa", "Visasili", "Hekaya", "Ngano za mazimwi"],
        answer_index: 1,
        explanation: "Visasili hueleza chanzo au asili ya maumbile, tamaduni au matukio."
      }
    ]
  },
  {
    pack_id: "bio-kcse",
    curriculum: "KCSE",
    subject: "Biology",
    category: "Sciences",
    title: "Cell Physiology, Respiration & Ecology",
    revision_tip: "KCSE Tip: Use exact biological terms (e.g., 'osmosis' not 'movement of water'; 'haemolysis' for red blood cells vs. 'turgid' for plant cells).",
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
      }
    ]
  },
  {
    pack_id: "chem-kcse",
    curriculum: "KCSE",
    subject: "Chemistry",
    category: "Sciences",
    title: "Mole Concept, Acids/Bases & Electrochemistry",
    revision_tip: "KCSE Tip: Always balance chemical equations with state symbols—unbalanced equations lose marks in mole ratio and ionic equation questions.",
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
      }
    ]
  },
  {
    pack_id: "phys-kcse",
    curriculum: "KCSE",
    subject: "Physics",
    category: "Sciences",
    title: "Current Electricity, Waves & Electromagnetic Induction",
    revision_tip: "KCSE Tip: Convert all values to SI units (meters, kilograms, seconds, amperes, volts) before substituting into formulas, and include units on final answers.",
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
        question: "A radioactive sample of 80 g has a half-life of 5 days. How much remains undecayed after 15 days?",
        options: ["40 g", "20 g", "10 g", "5 g"],
        answer_index: 2,
        explanation: "15 days = 3 half-lives. 80g -> 40g -> 20g -> 10g."
      }
    ]
  },
  {
    pack_id: "geo-kcse",
    curriculum: "KCSE",
    subject: "Geography",
    category: "Humanities",
    title: "External Land-Forming Processes, Climate & Mapwork",
    revision_tip: "KCSE Tip: In Paper 2 Mapwork, always quote 6-figure grid references with Eastings before Northings, and back up economic activity claims with map evidence (e.g., 'tea factory', 'cattle dip').",
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
      }
    ]
  },
  {
    pack_id: "hist-kcse",
    curriculum: "KCSE",
    subject: "History & Government",
    category: "Humanities",
    title: "Constitutional Development, Independence & Devolved Government",
    revision_tip: "KCSE Tip: For 'Explain six...' essay questions (12 marks), write 6 distinct paragraphs—each stating the point clearly followed by an explanation or historical example.",
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
        question: "Who chairs the County Executive Committee in Kenya?",
        options: ["County Speaker", "County Commissioner", "County Governor", "Senator"],
        answer_index: 2,
        explanation: "The elected County Governor heads the County Executive Committee."
      }
    ]
  },
  {
    pack_id: "cre-kcse",
    curriculum: "KCSE",
    subject: "CRE",
    category: "Humanities",
    title: "Old Testament Prophets, Luke's Gospel & Christian Ethics",
    revision_tip: "KCSE Tip: Link biblical teachings directly to modern Kenyan Christian life when answering application questions (e.g., integrity, family life, environmental care).",
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
      }
    ]
  },
  {
    pack_id: "agri-kcse",
    curriculum: "KCSE",
    subject: "Agriculture",
    category: "Technical",
    title: "Soil Fertility, Crop Production & Livestock Health",
    revision_tip: "KCSE Tip: Distinguish clearly between 'cultural', 'biological', and 'chemical' pest/weed control methods, and name specific parasites or diseases accurately.",
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
        question: "Which fertilizer is best suited for top-dressing maize?",
        options: ["Single Superphosphate (SSP)", "Calcium Ammonium Nitrate (CAN)", "Muriate of Potash", "Rock Phosphate"],
        answer_index: 1,
        explanation: "CAN supplies readily available nitrogen needed during active vegetative growth."
      }
    ]
  },
  {
    pack_id: "bus-kcse",
    curriculum: "KCSE",
    subject: "Business Studies",
    category: "Technical",
    title: "Ledger Accounts, Cash Books & Balance Sheet",
    revision_tip: "KCSE Tip: In ledger and cash book questions, always write the date, details (contra/account name), and balance c/d & b/d accurately.",
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
        question: "Which principle of insurance prevents an insured person from profiting from a loss?",
        options: ["Utmost Good Faith", "Indemnity", "Proximate Cause", "Insurable Interest"],
        answer_index: 1,
        explanation: "Indemnity restores the insured to the exact financial position prior to the loss."
      }
    ]
  },
  {
    pack_id: "comp-kcse",
    curriculum: "KCSE",
    subject: "Computer Studies",
    category: "Technical",
    title: "Data Representation, Networking & System Development",
    revision_tip: "KCSE Tip: In Paper 2 (451/2) practicals, save your database, spreadsheet, or DTP files frequently inside your named folder and verify printouts/PDF exports.",
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
      }
    ]
  },
  {
    pack_id: "cbc-int-sci",
    curriculum: "CBC",
    subject: "Integrated Science",
    category: "Sciences",
    title: "Strand: Mixtures, Elements, Compounds & Human Reproduction",
    revision_tip: "CBC Tip: Expect scenario-based questions asking you to design a safe separation method using locally available apparatus and observe laboratory safety.",
    size_kb: 15,
    notes: [
      {
        heading: "Sub-Strand: Separation of Heterogeneous & Homogeneous Mixtures",
        body: "Use filtration for insoluble solids in liquids, simple distillation for miscible liquids with wide boiling point differences, and paper chromatography for pigments/dyes."
      },
      {
        heading: "Sub-Strand: Acids, Bases & Indicators",
        body: "Plant extracts (such as red cabbage or hibiscus petals) act as natural acid-base indicators, changing color across pH ranges."
      }
    ],
    flashcards: [
      { term: "Fractional Distillation", definition: "Separation of miscible liquids with close boiling points (e.g., ethanol 78°C and water 100°C) using a fractionating column." },
      { term: "Competency-Based Assessment (CBA)", definition: "Evaluation focusing on practical skills, values, and application of knowledge rather than rote memorization." }
    ],
    quiz: [
      {
        question: "A learner in Nakuru wants to separate pure water from salty borehole water. Which method is most suitable?",
        options: ["Filtration", "Simple distillation", "Decantation", "Using a magnet"],
        answer_index: 1,
        explanation: "Simple distillation evaporates water and condenses pure distillate while leaving dissolved salts behind."
      },
      {
        question: "Which locally available material can be crushed to make a natural acid-base indicator?",
        options: ["Dry sand", "Red hibiscus flower petals", "Table salt", "Charcoal powder"],
        answer_index: 1,
        explanation: "Red hibiscus petals contain anthocyanin pigments that change color in acidic and basic solutions."
      }
    ]
  },
  {
    pack_id: "cbc-math",
    curriculum: "CBC",
    subject: "Mathematics",
    category: "Compulsory",
    title: "Strand: Numbers, Algebra, Measurements & Financial Literacy",
    revision_tip: "CBC Tip: Financial Literacy questions test real budgeting, mobile money transaction costs, VAT/tax calculations, and profit/loss decisions in daily life.",
    size_kb: 15,
    notes: [
      {
        heading: "Sub-Strand: Financial Literacy & Budgeting",
        body: "Compare unit prices, calculate percentage discounts, and account for transaction fees and Value Added Tax (16% VAT in Kenya) when planning a household or school project budget."
      },
      {
        heading: "Sub-Strand: Linear Inequalities & Graphs",
        body: "Represent real-world constraints (e.g., maximum budget or minimum capacity) on a number line or Cartesian plane."
      }
    ],
    flashcards: [
      { term: "Core Mathematics (CBC Senior School)", definition: "Compulsory foundational mathematics strand across all Senior School pathways focusing on quantitative reasoning and financial literacy." },
      { term: "16% VAT", definition: "Value Added Tax applied to taxable goods and services; VAT-inclusive price = 1.16 × base price." }
    ],
    quiz: [
      {
        question: "A solar study lamp costs KSh 1,500 before 16% VAT. What is the final price inclusive of VAT?",
        options: ["KSh 1,660", "KSh 1,740", "KSh 1,516", "KSh 1,800"],
        answer_index: 1,
        explanation: "16% of 1,500 = 240. Total price = 1,500 + 240 = KSh 1,740."
      },
      {
        question: "A learner has KSh 500 to buy notebooks at KSh 60 each and needs at least KSh 80 for bus fare. What is the maximum number of notebooks she can buy?",
        options: ["6 notebooks", "7 notebooks", "8 notebooks", "9 notebooks"],
        answer_index: 1,
        explanation: "Available for notebooks = 500 - 80 = KSh 420. 420 ÷ 60 = 7 notebooks."
      }
    ]
  },
  {
    pack_id: "cbc-social",
    curriculum: "CBC",
    subject: "Social Studies",
    category: "Humanities",
    title: "Strand: Citizenship, Peace & Conflict Resolution & Community Service",
    revision_tip: "CBC Tip: Community Service Learning (CSL) projects require identifying a genuine local need, collaborating with peers, executing an action plan, and reflecting on values gained.",
    size_kb: 14,
    notes: [
      {
        heading: "Sub-Strand: Non-Violent Conflict Resolution",
        body: "Negotiation, mediation, arbitration, and dialogue promote peaceful coexistence in schools and communities without resorting to violence."
      },
      {
        heading: "Sub-Strand: Community Service Learning (CSL)",
        body: "Combines classroom learning with community action—such as tree planting, waste management, or peer literacy mentorship."
      }
    ],
    flashcards: [
      { term: "Mediation", definition: "A neutral third party helps two conflicting sides communicate and reach a voluntary agreement." },
      { term: "Pertinent and Contemporary Issues (PCIs)", definition: "Cross-cutting real-world themes in CBC including climate change, health promotion, citizenship, and digital safety." }
    ],
    quiz: [
      {
        question: "What is the primary goal of Community Service Learning (CSL) in CBC?",
        options: [
          "Memorizing historical dates for exams",
          "Applying classroom knowledge and values to solve real community needs",
          "Competing individually for cash prizes",
          "Replacing all practical science lessons"
        ],
        answer_index: 1,
        explanation: "CSL integrates academic concepts with practical civic responsibility and reflection."
      },
      {
        question: "When a school prefect helps two classmates resolve a disagreement without imposing a punishment, which method is being used?",
        options: ["Litigation", "Mediation", "Sanctioning", "Arbitration"],
        answer_index: 1,
        explanation: "Mediation uses an impartial facilitator to help parties agree on a solution themselves."
      }
    ]
  },
  {
    pack_id: "cbc-pretech",
    curriculum: "CBC",
    subject: "Pre-Technical Studies",
    category: "Technical",
    title: "Strand: Safety, Technical Drawing, Entrepreneurship & Digital Tools",
    revision_tip: "CBC Tip: Keep a clean portfolio of freehand orthographic sketches, safety checklists, and simple business prototypes using recycled or low-cost local materials.",
    size_kb: 15,
    notes: [
      {
        heading: "Sub-Strand: Workshop & Digital Safety",
        body: "Use appropriate Personal Protective Equipment (PPE), keep workbenches clear, and protect personal data online using strong passwords and two-factor authentication."
      },
      {
        heading: "Sub-Strand: Entrepreneurship & Prototyping",
        body: "Identify a local customer problem, build a low-cost minimum viable prototype, calculate production cost vs. selling price, and gather user feedback."
      }
    ],
    flashcards: [
      { term: "Orthographic Projection", definition: "2D technical drawing showing an object from Front, Plan (Top), and End elevations." },
      { term: "STEM & Technical Pathway", definition: "Senior School pathway preparing learners for engineering, applied sciences, ICT, and vocational innovation." }
    ],
    quiz: [
      {
        question: "Which three views are standard in first-angle orthographic technical drawing?",
        options: [
          "Front elevation, Plan (top view), and End elevation",
          "Isometric, Perspective, and Oblique views",
          "Sketch, Blueprint, and Photograph",
          "Inside, Outside, and Diagonal views"
        ],
        answer_index: 0,
        explanation: "Orthographic drawings represent 3D objects accurately using Front, Plan, and End 2D views."
      },
      {
        question: "Before launching a student micro-enterprise in school, what is the best first step?",
        options: [
          "Borrowing a large bank loan immediately",
          "Conducting a simple market survey to identify what peers/community actually need",
          "Printing expensive flyers before making a product",
          "Copying a competitor's name"
        ],
        answer_index: 1,
        explanation: "Market research validates real demand before committing scarce resources."
      }
    ]
  }
];

let isOnline = true;
let activeCurriculum = "All";
let activeCategory = "All";
let searchQuery = "";

const getDownloaded = () => JSON.parse(localStorage.getItem(KEY_DOWNLOADED) || "{}");
const saveDownloaded = (obj) => {
  try {
    localStorage.setItem(KEY_DOWNLOADED, JSON.stringify(obj));
    return true;
  } catch (_) {
    showToast("Storage limit reached! Try removing large files or resetting storage.");
    return false;
  }
};
const getCustomPacks = () => JSON.parse(localStorage.getItem(KEY_CUSTOM) || "[]");
const saveCustomPacks = (arr) => {
  try {
    localStorage.setItem(KEY_CUSTOM, JSON.stringify(arr));
    return true;
  } catch (_) {
    showToast("Storage limit reached while saving imported paper.");
    return false;
  }
};
const getQueue = () => JSON.parse(localStorage.getItem(KEY_QUEUE) || "[]");
const saveQueue = (arr) => {
  localStorage.setItem(KEY_QUEUE, JSON.stringify(arr));
  document.getElementById("queue-count").textContent = arr.length;
};
const getServerLog = () => JSON.parse(localStorage.getItem(KEY_SERVER_LOG) || "[]");
const saveServerLog = (arr) => localStorage.setItem(KEY_SERVER_LOG, JSON.stringify(arr));

function allCatalogPacks() {
  return [...DEFAULT_STUDY_PACKS, ...getCustomPacks()];
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
    ["math-kcse", "bio-kcse", "cbc-int-sci", "cbc-math"].forEach((id) => {
      const found = DEFAULT_STUDY_PACKS.find((p) => p.pack_id === id);
      if (found) downloaded[id] = found;
    });
    saveDownloaded(downloaded);
  }
}

function renderCurriculumTips() {
  const grid = document.getElementById("curriculum-tips-grid");
  const visibleTips = CURRICULUM_REVISION_TIPS.filter(
    (t) => activeCurriculum === "All" || t.curriculum === activeCurriculum
  );

  grid.innerHTML = visibleTips
    .map(
      (t) => `
      <div class="tip-card ${t.curriculum.toLowerCase()}">
        <span class="curr-tag ${t.curriculum}" style="margin-bottom:0.35rem;display:inline-block">${t.curriculum} Strategy</span>
        <strong>${t.title}</strong>
        <p>${t.body}</p>
      </div>`
    )
    .join("");
}

function renderCatalog() {
  const grid = document.getElementById("pack-grid");
  const downloaded = getDownloaded();
  const packs = allCatalogPacks().filter((p) => {
    const matchCurr = activeCurriculum === "All" || p.curriculum === activeCurriculum;
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.subject.toLowerCase().includes(q) ||
      p.curriculum.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.notes.some((n) => n.heading.toLowerCase().includes(q));
    return matchCurr && matchCat && matchSearch;
  });

  grid.innerHTML = "";
  packs.forEach((pack) => {
    const cached = Boolean(downloaded[pack.pack_id]);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-top">
          <div class="badge-row">
            <span class="curr-tag ${pack.curriculum}">${pack.curriculum}</span>
            <span class="pill">${pack.subject}</span>
          </div>
          <span class="size-tag">${pack.size_kb} KB • ${pack.quiz.length} Qs</span>
        </div>
        <h3>${pack.title}</h3>
        <p class="muted">${pack.notes.length} Notes • ${pack.flashcards.length} Flashcards${pack.pdf_data_url ? " • PDF Attached" : ""}</p>
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
  if (saveDownloaded(downloaded)) {
    showToast(`Downloaded [${pack.curriculum}] ${pack.subject}: "${pack.title}" (${pack.size_kb} KB).`);
    renderCatalog();
  }
}

document.getElementById("download-all-btn").onclick = () => {
  if (!isOnline) {
    showToast("Switch to Online mode first to download all KCSE & CBC packs.");
    return;
  }
  const downloaded = getDownloaded();
  allCatalogPacks().forEach((p) => {
    downloaded[p.pack_id] = p;
  });
  if (saveDownloaded(downloaded)) {
    showToast("All KCSE & CBC packs cached locally! Toggle Offline Mode to test.");
    renderCatalog();
  }
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
  showToast("Storage reset to default KCSE + CBC state.");
};

function openStudyPack(packId) {
  const pack = getDownloaded()[packId];
  if (!pack) return;

  document.getElementById("catalog-view").classList.add("hidden");
  document.getElementById("study-view").classList.remove("hidden");
  document.getElementById("study-badge").textContent = `${pack.curriculum} • ${pack.subject} • ${pack.category}`;
  document.getElementById("study-title").textContent = pack.title;

  const tipHtml = pack.revision_tip
    ? `<div class="tip-callout"><strong>Exam & Competency Revision Tip</strong><p style="margin:0.25rem 0 0">${pack.revision_tip}</p></div>`
    : "";

  const pdfHtml = pack.pdf_data_url
    ? `<div class="pdf-box">
        <div>
          <strong>Imported PDF Paper: ${pack.pdf_name || "Revision Paper.pdf"}</strong>
          <p class="muted" style="margin-top:0.2rem">Stored locally in your browser for offline access.</p>
        </div>
        <a href="${pack.pdf_data_url}" download="${pack.pdf_name || "revision-paper.pdf"}" class="btn-primary" style="text-decoration:none;display:inline-block">Open / Download PDF</a>
      </div>`
    : "";

  document.getElementById("panel-notes").innerHTML =
    tipHtml +
    pdfHtml +
    pack.notes
      .map(
        (n) => `
        <div class="note-box">
          <h3 style="margin:0 0 0.35rem">${n.heading}</h3>
          <p style="margin:0;white-space:pre-line">${n.body}</p>
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
    curriculum: pack.curriculum,
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
          <span class="curr-tag ${item.curriculum || "KCSE"}">${item.curriculum || "KCSE"}</span>
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

function saveImportedPack(newPack) {
  const custom = getCustomPacks();
  custom.push(newPack);
  if (!saveCustomPacks(custom)) return;

  const downloaded = getDownloaded();
  downloaded[newPack.pack_id] = newPack;
  if (!saveDownloaded(downloaded)) return;

  renderCatalog();
  showToast(`Imported & cached "${newPack.title}" for offline study!`);
}

document.getElementById("download-sample-json-btn").onclick = () => {
  const samplePaper = {
    curriculum: "KCSE",
    subject: "Chemistry",
    category: "Sciences",
    title: "Imported Sample: Mole & Titration Revision Paper",
    revision_tip: "Write balanced ionic equations and average concordant titres to 2 decimal places.",
    notes: [
      {
        heading: "Volumetric Analysis Summary",
        body: "Use M1V1 / n1 = M2V2 / n2 for stoichiometry calculations once average titre is calculated."
      }
    ],
    flashcards: [
      {
        term: "Concordant Titres",
        definition: "Titre readings that agree within 0.1 cm³ or 0.2 cm³ of each other."
      }
    ],
    quiz: [
      {
        question: "25.0 cm³ of 0.1M NaOH neutralized 25.0 cm³ of HCl. What is the molarity of HCl?",
        options: ["0.05 M", "0.10 M", "0.20 M", "0.25 M"],
        answer_index: 1,
        explanation: "Since NaOH and HCl react in a 1:1 mole ratio with equal volumes, molarity is 0.10 M."
      }
    ]
  };

  const blob = new Blob([JSON.stringify(samplePaper, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kcse-sample-revision-paper.json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Downloaded sample revision paper (.json) — try importing it above!");
};

document.getElementById("import-paper-form").onsubmit = (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("imp-file");
  const file = fileInput.files[0];
  if (!file) return;

  const curriculum = document.getElementById("imp-curriculum").value;
  const subject = document.getElementById("imp-subject").value.trim();
  const category = document.getElementById("imp-category").value;
  const title = document.getElementById("imp-title").value.trim();
  const customTip = document.getElementById("imp-tip").value.trim();
  const packId = `imported-${Date.now().toString().slice(-6)}`;
  const sizeKb = Math.max(1, Math.round(file.size / 1024));

  const isJson = file.name.toLowerCase().endsWith(".json") || file.type === "application/json";
  const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";

  const reader = new FileReader();

  if (isJson) {
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const importedPack = {
          pack_id: parsed.pack_id || packId,
          curriculum: parsed.curriculum || curriculum,
          subject: parsed.subject || subject,
          category: parsed.category || category,
          title: parsed.title || title,
          revision_tip:
            customTip ||
            parsed.revision_tip ||
            "Review each question carefully and verify units/terminology against the marking scheme.",
          size_kb: sizeKb,
          notes:
            Array.isArray(parsed.notes) && parsed.notes.length
              ? parsed.notes
              : [{ heading: file.name, body: "Imported structured revision paper." }],
          flashcards:
            Array.isArray(parsed.flashcards) && parsed.flashcards.length
              ? parsed.flashcards
              : [{ term: "Imported Paper", definition: title }],
          quiz:
            Array.isArray(parsed.quiz) && parsed.quiz.length
              ? parsed.quiz
              : [
                  {
                    question: `Have you reviewed all sections of "${parsed.title || title}"?`,
                    options: ["Yes, completed review", "Still revising key concepts", "Need teacher clarification", "Skipped"],
                    answer_index: 0,
                    explanation: "Self-check logged for your revision progress."
                  }
                ]
        };
        saveImportedPack(importedPack);
        e.target.reset();
      } catch (_) {
        showToast("Invalid JSON file. Check formatting or download the sample .json template.");
      }
    };
    reader.readAsText(file);
  } else if (isPdf) {
    if (file.size > 1.5 * 1024 * 1024) {
      showToast("PDF larger than 1.5 MB may exceed local browser storage. Use a smaller PDF or .TXT/.JSON.");
      return;
    }
    reader.onload = () => {
      const pdfPack = {
        pack_id: packId,
        curriculum,
        subject,
        category,
        title,
        revision_tip:
          customTip ||
          "Attempt the imported PDF paper under timed conditions first before checking your marking notes.",
        size_kb: sizeKb,
        pdf_name: file.name,
        pdf_data_url: reader.result,
        notes: [
          {
            heading: `Attached Paper: ${file.name}`,
            body: "Use the 'Open / Download PDF' button above to view or save this imported revision paper offline."
          }
        ],
        flashcards: [
          {
            term: `${subject} Exam Focus`,
            definition: `Key revision paper: ${title} (${file.name}).`
          }
        ],
        quiz: [
          {
            question: `Did you attempt "${title}" within the allocated exam time?`,
            options: ["Yes, within time", "Needed extra time", "Partially attempted", "Not yet attempted"],
            answer_index: 0,
            explanation: "Timed practice builds speed and accuracy for national exams and assessments."
          }
        ]
      };
      saveImportedPack(pdfPack);
      e.target.reset();
    };
    reader.readAsDataURL(file);
  } else {
    reader.onload = () => {
      const textContent = String(reader.result || "").trim();
      const snippet = textContent.slice(0, 2500) || "Empty text file.";
      const txtPack = {
        pack_id: packId,
        curriculum,
        subject,
        category,
        title,
        revision_tip:
          customTip ||
          "Read through the imported revision text and highlight key definitions, formulas, and examples.",
        size_kb: sizeKb,
        notes: [
          {
            heading: `Imported Paper (${file.name})`,
            body: snippet
          }
        ],
        flashcards: [
          {
            term: title,
            definition: `Imported from ${file.name} (${sizeKb} KB) for offline study.`
          }
        ],
        quiz: [
          {
            question: `Have you summarized the main points from "${title}"?`,
            options: ["Yes, summarized key points", "Reviewed once", "Need more practice", "Not started"],
            answer_index: 0,
            explanation: "Summarizing revision papers in your own words strengthens long-term recall."
          }
        ]
      };
      saveImportedPack(txtPack);
      e.target.reset();
    };
    reader.readAsText(file);
  }
};

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
    showToast("Offline Mode enabled — cached KCSE & CBC packs still work!");
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

document.querySelectorAll(".curr-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".curr-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCurriculum = btn.dataset.curr;
    renderCurriculumTips();
    renderCatalog();
  };
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
  const curriculum = document.getElementById("c-curriculum").value;
  const subject = document.getElementById("c-subject").value;
  const category = document.getElementById("c-category").value;
  const title = document.getElementById("c-title").value.trim();
  const revision_tip = document.getElementById("c-tip").value.trim();
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
    curriculum,
    subject,
    category,
    title,
    revision_tip,
    size_kb: 13,
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

  saveImportedPack(newPack);
  e.target.reset();
};

seedInitialPacks();
saveQueue(getQueue());
renderCurriculumTips();
renderCatalog();
renderSyncLog();
