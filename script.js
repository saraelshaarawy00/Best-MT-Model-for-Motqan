/**
 * MT Model Suitability Analysis — Arabic Localization
 * Dashboard Controller & Data Pipeline
 */

// ==========================================================================
// 1. RAW DATASETS (CLAUDE, CHATGPT, GEMINI)
// ==========================================================================

const CLAUDE_DATA = [
    { type: "General", openai: 70, gemini: 55, winner: "OpenAI", rationale: "GPT-4o handles broad general language with higher fluency and fewer hallucinations across diverse topics" },
    { type: "General Science", openai: 82, gemini: 60, winner: "OpenAI", rationale: "Strong scientific terminology, LaTeX/notation awareness, factual grounding in GPT-4o" },
    { type: "Heavy Machinery", openai: 85, gemini: 58, winner: "OpenAI", rationale: "Technical specs, part nomenclature, ISO standards — GPT-4o trained heavily on engineering corpora" },
    { type: "Hospitality Services", openai: 60, gemini: 78, winner: "Gemini", rationale: "Warm, conversational, culturally adaptive tone; Gemini handles Arabic hospitality register naturally" },
    { type: "Information Technology", openai: 80, gemini: 65, winner: "OpenAI", rationale: "Code-adjacent language, API docs, acronyms — GPT-4o's strength; deep IT corpus coverage" },
    { type: "Insurance", openai: 83, gemini: 55, winner: "OpenAI", rationale: "Regulatory and contractual precision, policy terminology; OpenAI leads in structured legal-adjacent text" },
    { type: "Legal", openai: 88, gemini: 50, winner: "OpenAI", rationale: "Legal MT demands zero ambiguity. GPT-4o's formal Arabic legal register is markedly stronger" },
    { type: "Life Science", openai: 85, gemini: 60, winner: "OpenAI", rationale: "Taxonomy, gene nomenclature, research paper language — GPT-4o more reliable in peer-review style" },
    { type: "Literature", openai: 55, gemini: 80, winner: "Gemini", rationale: "Poetic nuance, stylistic register, cultural idioms — Gemini's multilingual creative training shines here" },
    { type: "Manufacturing", openai: 82, gemini: 58, winner: "OpenAI", rationale: "Technical process language, machinery specs, safety standards — GPT-4o outperforms" },
    { type: "Marketing & Advertising", openai: 52, gemini: 82, winner: "Gemini", rationale: "Creative copy, slogans, cultural resonance, emotional tone — Gemini's generative creativity leads" },
    { type: "Medical & Healthcare", openai: 87, gemini: 58, winner: "OpenAI", rationale: "Clinical accuracy is non-negotiable. GPT-4o's medical corpus and terminology precision is critical" },
    { type: "Medical Devices & Instruments", openai: 88, gemini: 55, winner: "OpenAI", rationale: "Device nomenclature, IFU documents, regulatory language — GPT-4o strongly preferred" },
    { type: "Medicine", openai: 88, gemini: 55, winner: "OpenAI", rationale: "Pharmacological, anatomical, procedural terminology — GPT-4o trained on dense medical literature" },
    { type: "Military & Defense", openai: 85, gemini: 52, winner: "OpenAI", rationale: "Classified-adjacent technical language, military doctrine terminology — GPT-4o more precise" },
    { type: "Mining & Petroleum", openai: 84, gemini: 57, winner: "OpenAI", rationale: "Geotechnical, drilling, refinery terminology — engineering corpus depth favors GPT-4o" },
    { type: "Networks", openai: 80, gemini: 62, winner: "OpenAI", rationale: "Network protocols, topology language, RFC-style documentation — GPT-4o handles tech docs well" },
    { type: "NGOs", openai: 60, gemini: 75, winner: "Gemini", rationale: "Humanitarian, social advocacy language; Gemini better calibrated for empathetic, accessible tone" },
    { type: "Nursing", openai: 84, gemini: 58, winner: "OpenAI", rationale: "Clinical nursing protocols, patient care terminology, drug administration — medical accuracy first" },
    { type: "Other", openai: 65, gemini: 65, winner: "Tie", rationale: "Insufficient domain signal — both models perform similarly on undefined/mixed content" },
    { type: "Patents", openai: 90, gemini: 52, winner: "OpenAI", rationale: "Patent language is legally binding, formulaic, highly specific. GPT-4o is clearly superior here" },
    { type: "Patient Education", openai: 72, gemini: 70, winner: "Tie", rationale: "Balance of clinical accuracy (OpenAI) vs accessible plain language (Gemini) — near equal" },
    { type: "Pharmaceuticals", openai: 88, gemini: 54, winner: "OpenAI", rationale: "Drug names, dosage instructions, regulatory labels, pharmacokinetics — GPT-4o leads clearly" },
    { type: "Physical Therapy", openai: 80, gemini: 62, winner: "OpenAI", rationale: "Clinical rehabilitation terminology; medical accuracy preference pushes GPT-4o ahead" },
    { type: "Publishing, Printing & Packaging", openai: 60, gemini: 75, winner: "Gemini", rationale: "Layout language is straightforward; publishing tone and creative direction favor Gemini" },
    { type: "Real Estate & Properties", openai: 65, gemini: 72, winner: "Gemini", rationale: "Descriptive, persuasive property language; GCC market Arabic register — Gemini adapts well" },
    { type: "Religion & Religious Studies", openai: 58, gemini: 78, winner: "Gemini", rationale: "Classical Arabic, Quranic register awareness, theological nuance — Gemini's Arabic depth is stronger" },
    { type: "Security & International Affairs", openai: 82, gemini: 58, winner: "OpenAI", rationale: "Geopolitical terminology, intelligence language, diplomatic register — GPT-4o more reliable" },
    { type: "Shipping & Maritime", openai: 83, gemini: 57, winner: "OpenAI", rationale: "IMO terminology, bill of lading language, port operations — technical precision favors GPT-4o" },
    { type: "Social & Human Services", openai: 60, gemini: 76, winner: "Gemini", rationale: "Accessible, empathetic public communication — Gemini's conversational tone is better calibrated" },
    { type: "Software UA", openai: 78, gemini: 65, winner: "OpenAI", rationale: "User assistance (help docs, tooltips) needs accuracy + clarity; GPT-4o handles both" },
    { type: "Software UI", openai: 76, gemini: 66, winner: "OpenAI", rationale: "UI string translation — character length awareness, conciseness; GPT-4o handles constraints better" },
    { type: "Sports", openai: 58, gemini: 78, winner: "Gemini", rationale: "Sports commentary, idiomatic expressions, live-event tone — Gemini's natural language register wins" },
    { type: "Technical & Scientific", openai: 85, gemini: 58, winner: "OpenAI", rationale: "Broad technical/scientific terminology depth strongly favors GPT-4o" },
    { type: "Telecommunications", openai: 80, gemini: 62, winner: "OpenAI", rationale: "Standards bodies (3GPP, ITU), spec documents, protocol language — GPT-4o more consistent" },
    { type: "Training & E-learning", openai: 64, gemini: 74, winner: "Gemini", rationale: "Instructional design language, learner-friendly tone, narrative clarity — Gemini more natural" },
    { type: "Transportation & Logistics", openai: 82, gemini: 60, winner: "OpenAI", rationale: "Shipping docs, customs language, logistics terminology — GPT-4o trained on trade documentation" },
    { type: "Veterinary Medicine", openai: 83, gemini: 58, winner: "OpenAI", rationale: "Medical terminology applied to animals; clinical precision still favors GPT-4o" },
    { type: "Wholesale & Retail Trade", openai: 62, gemini: 74, winner: "Gemini", rationale: "Product descriptions, catalog language, B2B/B2C tone — Gemini handles commercial copy well" }
];

const CHATGPT_DATA = [
    { type: "General", openai: 95, gemini: 93, winner: "OpenAI" },
    { type: "General Science", openai: 96, gemini: 92, winner: "OpenAI" },
    { type: "Heavy Machinery", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Hospitality Services", openai: 93, gemini: 95, winner: "Gemini" },
    { type: "Information Technology", openai: 97, gemini: 92, winner: "OpenAI" },
    { type: "Insurance", openai: 98, gemini: 90, winner: "OpenAI" },
    { type: "Legal", openai: 99, gemini: 88, winner: "OpenAI" },
    { type: "Life Science", openai: 98, gemini: 90, winner: "OpenAI" },
    { type: "Literature", openai: 91, gemini: 98, winner: "Gemini" },
    { type: "Manufacturing", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Marketing & Advertising", openai: 92, gemini: 98, winner: "Gemini" },
    { type: "Medical & Healthcare", openai: 99, gemini: 89, winner: "OpenAI" },
    { type: "Medical Devices & Instruments", openai: 99, gemini: 89, winner: "OpenAI" },
    { type: "Medicine", openai: 99, gemini: 89, winner: "OpenAI" },
    { type: "Military & Defense", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Mining & Petroleum", openai: 98, gemini: 90, winner: "OpenAI" },
    { type: "Networks", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "NGOs", openai: 94, gemini: 95, winner: "Gemini" },
    { type: "Nursing", openai: 98, gemini: 89, winner: "OpenAI" },
    { type: "Other", openai: 95, gemini: 93, winner: "OpenAI" },
    { type: "Patents", openai: 99, gemini: 87, winner: "OpenAI" },
    { type: "Patient Education", openai: 96, gemini: 95, winner: "OpenAI" },
    { type: "Pharmaceuticals", openai: 99, gemini: 89, winner: "OpenAI" },
    { type: "Physical Therapy", openai: 98, gemini: 90, winner: "OpenAI" },
    { type: "Publishing, Printing & Packaging", openai: 95, gemini: 93, winner: "OpenAI" },
    { type: "Real Estate & Properties", openai: 96, gemini: 92, winner: "OpenAI" },
    { type: "Religion & Religious Studies", openai: 95, gemini: 96, winner: "Gemini" },
    { type: "Security & International Affairs", openai: 97, gemini: 92, winner: "OpenAI" },
    { type: "Shipping & Maritime", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Social & Human Services", openai: 94, gemini: 95, winner: "Gemini" },
    { type: "Software UA", openai: 99, gemini: 91, winner: "OpenAI" },
    { type: "Software UI", openai: 99, gemini: 90, winner: "OpenAI" },
    { type: "Sports", openai: 93, gemini: 95, winner: "Gemini" },
    { type: "Technical & Scientific", openai: 98, gemini: 91, winner: "OpenAI" },
    { type: "Telecommunications", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Training & E-learning", openai: 95, gemini: 94, winner: "OpenAI" },
    { type: "Transportation & Logistics", openai: 97, gemini: 91, winner: "OpenAI" },
    { type: "Veterinary Medicine", openai: 98, gemini: 89, winner: "OpenAI" },
    { type: "Wholesale & Retail Trade", openai: 95, gemini: 94, winner: "OpenAI" }
];

const GEMINI_DATA = [
    { type: "General Science", openai: 45, gemini: 55, winner: "Gemini", rationale: "Gemini handles extensive nomenclature, taxonomic definitions, and data-dense tables with lower hallucination rates." },
    { type: "Life Science", openai: 55, gemini: 45, winner: "OpenAI", rationale: "Usually involves regulatory documentation (FDA/EMA); OpenAI's compliance with strict context instruction wins here." },
    { type: "Medical & Healthcare", openai: 45, gemini: 55, winner: "Gemini", rationale: "Gemini leverages DeepMind’s medical corpus training, showing high accuracy in symptoms and clinical nomenclature." },
    { type: "Medical Devices & Instruments", openai: 50, gemini: 50, winner: "Tie", rationale: "Pure tie. OpenAI executes UI/UX strings on hardware perfectly; Gemini excels at translating localized hardware manuals." },
    { type: "Medicine", openai: 40, gemini: 60, winner: "Gemini", rationale: "Google's underlying medical translation dataset yields more accurate translations of active ingredients/diagnoses." },
    { type: "Nursing", openai: 55, gemini: 45, winner: "OpenAI", rationale: "Highly conversational and patient-care oriented; OpenAI’s soft, localized, natural phrasing performs better." },
    { type: "Patient Education", openai: 65, gemini: 35, winner: "OpenAI", rationale: "Requires lowering reading complexity (e.g., translating jargon into 6th-grade reading level). OpenAI adapts tone flawlessly." },
    { type: "Pharmaceuticals", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Governed by rigorous legal constraints, patents, and strict formatting where OpenAI’s instruction-following is critical." },
    { type: "Physical Therapy", openai: 45, gemini: 55, winner: "Gemini", rationale: "High density of anatomical movement and musculoskeletal terminology where Gemini’s vocabulary dominates." },
    { type: "Veterinary Medicine", openai: 40, gemini: 60, winner: "Gemini", rationale: "Highly specialized, low-resource terminology (comparatively). Gemini utilizes wider biological data graphs." },
    
    { type: "Insurance", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Heavily conditional clauses ('if/then' scenarios). OpenAI processes complex nested logic with fewer syntax errors." },
    { type: "Legal", openai: 70, gemini: 30, winner: "OpenAI", rationale: "Benchmark tests show Gemini can suffer minor grammar shifts or omissions in multi-clause sentences; OpenAI is highly precise here." },
    { type: "Patents", openai: 35, gemini: 65, winner: "Gemini", rationale: "Patent translation requires strict literalism over stylistic elegance. Gemini excels at literal, sentence-by-sentence mapping." },
    { type: "Security & International Affairs", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Highly dependent on nuanced geopolitical phrasing. OpenAI handles diplomatic terminology and subtle contexts better." },
    
    { type: "Heavy Machinery", openai: 40, gemini: 60, winner: "Gemini", rationale: "Mechanical engineering relies on dense component dictionaries. Gemini maintains glossary consistency for hardware parts." },
    { type: "Information Technology", openai: 55, gemini: 45, winner: "OpenAI", rationale: "OpenAI's superior coding architecture helps it understand IT architecture context, reducing mistranslations of cloud/IT concepts." },
    { type: "Manufacturing", openai: 45, gemini: 55, winner: "Gemini", rationale: "Standard Operating Procedures (SOPs) are step-by-step; Gemini maps repetitive, procedural sentences efficiently." },
    { type: "Military & Defense", openai: 55, gemini: 45, winner: "OpenAI", rationale: "Relies on tactical instructions and highly sensitive phrasing where OpenAI’s reasoning capabilities prevent dangerous errors." },
    { type: "Mining & Petroleum", openai: 40, gemini: 60, winner: "Gemini", rationale: "Highly geographical, geological, and specific sector terminology that aligns with Google's massive factual database." },
    { type: "Networks", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Heavily intertwined with code tokens, syntax variables, and commands. OpenAI's architecture processes code-adjacent text better." },
    { type: "Technical & Scientific", openai: 45, gemini: 55, winner: "Gemini", rationale: "Gemini safely handles dense tables, measurement metrics, and mathematical/scientific text alignments." },
    { type: "Telecommunications", openai: 50, gemini: 50, winner: "Tie", rationale: "Pure tie. Protocols are standardized globally; both handle standard telecom syntax equally well." },
    
    { type: "Hospitality Services", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Tone-heavy. Requires warm, engaging language. OpenAI is much better at transcreation and natural-sounding hospitality copy." },
    { type: "Literature", openai: 75, gemini: 25, winner: "OpenAI", rationale: "The ultimate test of style. OpenAI captures idioms, metaphors, subtext, and rhythmic prose, whereas Gemini tends to be too literal." },
    { type: "Marketing & Advertising", openai: 70, gemini: 30, winner: "OpenAI", rationale: "Requires cultural adaptation (transcreation). OpenAI outperforms Gemini in wordplay, marketing slogans, and persuasive nuance." },
    { type: "Publishing, Printing & Packaging", openai: 55, gemini: 45, winner: "OpenAI", rationale: "String length optimization is vital to prevent text overflow on packages. OpenAI follows strict length instructions better." },
    { type: "Real Estate & Properties", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Mix of descriptive sales copy and legal contracts. OpenAI balances the sales tone with contractual accuracy." },
    { type: "Software UA", openai: 55, gemini: 45, winner: "OpenAI", rationale: "Focuses on instructional clarity and screenshots. OpenAI maintains a very natural flow for long-form instruction manuals." },
    { type: "Software UI", openai: 65, gemini: 35, winner: "OpenAI", rationale: "UI strings need tight length constraints (e.g., 'translate to under 15 characters'). OpenAI excels at navigating token constraints." },
    { type: "Sports", openai: 65, gemini: 35, winner: "OpenAI", rationale: "Relies heavily on idioms, casual slang, and energetic pacing. OpenAI effortlessly captures localized sports jargon." },
    { type: "Training & E-learning", openai: 60, gemini: 40, winner: "OpenAI", rationale: "Pedagogical texts must be clear and engaging. OpenAI's conversational fluidity reads like an educator." },
    
    { type: "NGOs", openai: 55, gemini: 45, winner: "OpenAI", rationale: "Combines humanitarian narrative with financial reporting. OpenAI captures the empathetic tone required for NGO work." },
    { type: "Religion & Religious Studies", openai: 35, gemini: 65, winner: "Gemini", rationale: "Requires deep historical cross-lingual mapping of archaic texts. Gemini leverages historic, cross-referenced multilingual datasets." },
    { type: "Shipping & Maritime", openai: 40, gemini: 60, winner: "Gemini", rationale: "Relies heavily on standardized global customs codes, port registries, and logistics jargon where Gemini has strong factual mapping." },
    { type: "Social & Human Services", openai: 60, gemini: 40, winner: "OpenAI", rationale: "High community empathy and caseworker-client dynamics. OpenAI adapts better to culturally sensitive, low-friction terminology." },
    { type: "Transportation & Logistics", openai: 45, gemini: 55, winner: "Gemini", rationale: "Geographically dense data strings, routing vocabulary, and systemic operational terms favor Gemini's database footprint." },
    { type: "Wholesale & Retail Trade", openai: 55, gemini: 45, winner: "OpenAI", rationale: "High volume of e-commerce product descriptions. OpenAI writes more persuasive, natural-sounding copy for consumers." },
    
    { type: "General", openai: 50, gemini: 50, winner: "Tie", rationale: "For everyday text lacking domain specialty, both models perform excellently, achieving near-parity in COMET metrics." },
    { type: "Other", openai: 50, gemini: 50, winner: "Tie", rationale: "Fallback loop. Recommend routing based on target language profiles (OpenAI for Romance/Germanic, Gemini for Asian/Middle Eastern)." }
];

// ==========================================================================
// 2. CATEGORY DICTIONARY & STABLE NORMALIZATION LIST
// ==========================================================================
const DOMAIN_CATEGORIES = {
    "General": "General & Fallbacks",
    "Other": "General & Fallbacks",
    "General Science": "Technical & Scientific",
    "Heavy Machinery": "Technical & Scientific",
    "Information Technology": "Technical & Scientific",
    "Manufacturing": "Technical & Scientific",
    "Mining & Petroleum": "Technical & Scientific",
    "Networks": "Technical & Scientific",
    "Technical & Scientific": "Technical & Scientific",
    "Telecommunications": "Technical & Scientific",
    "Software UA": "Technical & Scientific",
    "Software UI": "Technical & Scientific",
    "Life Science": "Medical & Life Sciences",
    "Medical & Healthcare": "Medical & Life Sciences",
    "Medical Devices & Instruments": "Medical & Life Sciences",
    "Medicine": "Medical & Life Sciences",
    "Nursing": "Medical & Life Sciences",
    "Patient Education": "Medical & Life Sciences",
    "Pharmaceuticals": "Medical & Life Sciences",
    "Physical Therapy": "Medical & Life Sciences",
    "Veterinary Medicine": "Medical & Life Sciences",
    "Insurance": "Legal, Corporate & Logistics",
    "Legal": "Legal, Corporate & Logistics",
    "Patents": "Legal, Corporate & Logistics",
    "Security & International Affairs": "Legal, Corporate & Logistics",
    "Shipping & Maritime": "Legal, Corporate & Logistics",
    "Transportation & Logistics": "Legal, Corporate & Logistics",
    "Wholesale & Retail Trade": "Legal, Corporate & Logistics",
    "Real Estate & Properties": "Legal, Corporate & Logistics",
    "Hospitality Services": "Creative & Humanities",
    "Literature": "Creative & Humanities",
    "Marketing & Advertising": "Creative & Humanities",
    "NGOs": "Creative & Humanities",
    "Publishing, Printing & Packaging": "Creative & Humanities",
    "Religion & Religious Studies": "Creative & Humanities",
    "Social & Human Services": "Creative & Humanities",
    "Sports": "Creative & Humanities",
    "Training & E-learning": "Creative & Humanities",
    "Military & Defense": "Legal, Corporate & Logistics"
};

// ChatGPT Rationale Generator fallback values
const CHATGPT_RATIONALES = {
    "General": "Strong generalized conversational flow with OpenAI retaining a slight edge in prompt alignment.",
    "General Science": "High compliance with scientific jargon syntax; OpenAI's terminology accuracy handles formula references best.",
    "Heavy Machinery": "Standard industrial manuals translated with stable glossary precision by GPT-4o.",
    "Hospitality Services": "Gemini captures the polite hospitality register in localized Arabic with superior natural phrasing.",
    "Information Technology": "OpenAI processes code variables and IT architecture documents without translating reserved keys.",
    "Insurance": "Policy documentation nested logic handled cleanly by GPT-4o; less grammatical variance.",
    "Legal": "Extreme precision in contract terminology; GPT-4o maintains a formal legal register across multiple sub-clauses.",
    "Life Science": "Factual taxonomy mapping is highly precise under OpenAI's strict contextual instruction-following.",
    "Literature": "Gemini excels in rendering metaphors, cultural idioms, and stylized Arabic prose.",
    "Manufacturing": "Procedural assembly instructions parsed effectively by OpenAI's instruction sequencing.",
    "Marketing & Advertising": "Gemini exhibits higher transcreation performance with localized tagline copywriting.",
    "Medical & Healthcare": "Clinical diagnostics translation favors OpenAI's dense medical publications corpus.",
    "Medical Devices & Instruments": "Highly compliant hardware interface translation with tight string character length handling.",
    "Medicine": "Accurate pharmacology listings; high confidence translation of medical active compounds.",
    "Military & Defense": "Accurate strategic terminologies with lower semantic drift; OpenAI leads in military doctrine texts.",
    "Mining & Petroleum": "Geological terminologies mapping; OpenAI leverages extensive corpus representation.",
    "Networks": "Maintains developer syntax inside telecom/network config files.",
    "NGOs": "Gemini adapts humanitarian registers with warm, human-centric tone metrics.",
    "Nursing": "Clinical nursing guidelines require clear action verbs; OpenAI's flow is preferred.",
    "Other": "Near parity on unstructured general content; OpenAI leads by thin margined COMET evaluations.",
    "Patents": "Formulaic claims structure translated without syntax errors; OpenAI leads.",
    "Patient Education": "Clear patient discharge instructions with optimized vocabulary level; OpenAI leads by 1%.",
    "Pharmaceuticals": "Strict dosage compliance formatting; OpenAI shows absolute reliability under legal context rules.",
    "Physical Therapy": "Rehabilitation terminology translation maps cleanly under OpenAI's structure.",
    "Publishing, Printing & Packaging": "Layout strings fit formatting guidelines; OpenAI handles length constraints.",
    "Real Estate & Properties": "Commercial property listings translation is fluent; OpenAI holds a narrow 4% lead.",
    "Religion & Religious Studies": "Gemini maps Quranic/Classical Arabic registers using Google's broad regional corpus.",
    "Security & International Affairs": "Geopolitical terms translated with diplomatic awareness; OpenAI provides precise wording.",
    "Shipping & Maritime": "Logistics billing documentation structured translations; OpenAI leads.",
    "Social & Human Services": "Gemini shows strong conversational fluency in public services outreach texts.",
    "Software UA": "Help documentation localization; OpenAI maintains clean, readable paragraphs.",
    "Software UI": "UI string constraints followed strictly; OpenAI optimizes word lengths to prevent button clipping.",
    "Sports": "Gemini handles emotional commentary and sports slang with highly natural pacing.",
    "Technical & Scientific": "Complex tables, measurement metrics, and technical graphs aligned safely by OpenAI.",
    "Telecommunications": "Standardized telecom standards protocols (3GPP, ITU) translated accurately.",
    "Training & E-learning": "Instructional text remains engaging; OpenAI leads in pedagogical clarity.",
    "Transportation & Logistics": "Freight routing instructions; OpenAI leads with superior logistics vocabulary mapping.",
    "Veterinary Medicine": "Biological diagnostic terminology mapping; OpenAI leads in animal science databases.",
    "Wholesale & Retail Trade": "B2B e-commerce product catalogs translated with clean commercial appeal by OpenAI."
};

// ==========================================================================
// 3. PIPELINE CONTROLLER
// ==========================================================================

let activeDataset = [];
let normalizedData = {
    claude: [],
    chatgpt: [],
    gemini: [],
    consensus: []
};

// Map content type name to master normalized spelling
function getNormalizedTypeName(type) {
    const term = type.trim();
    if (term.toLowerCase() === "transportation & logistics services" || term.toLowerCase() === "transportation & logistics") {
        return "Transportation & Logistics";
    }
    if (term.toLowerCase() === "software ua (user assistance / help)") {
        return "Software UA";
    }
    if (term.toLowerCase() === "software ui (user interface)") {
        return "Software UI";
    }
    
    // Exact case-insensitive matching in category map
    for (const masterName of Object.keys(DOMAIN_CATEGORIES)) {
        if (masterName.toLowerCase() === term.toLowerCase()) {
            return masterName;
        }
    }
    return term;
}

// Prepare datasets: Normalizing domain names, attaching categories & defaults
function initializePipeline() {
    // 1. Normalize Claude Data
    normalizedData.claude = CLAUDE_DATA.map(item => {
        const normName = getNormalizedTypeName(item.type);
        return {
            type: normName,
            category: DOMAIN_CATEGORIES[normName] || "Other",
            openai: item.openai,
            gemini: item.gemini,
            winner: item.winner,
            rationale: item.rationale,
            confidence: Math.abs(item.openai - item.gemini) > 20 ? "High" : "Medium"
        };
    });

    // 2. Normalize ChatGPT Data & populate rationales
    normalizedData.chatgpt = CHATGPT_DATA.map(item => {
        const normName = getNormalizedTypeName(item.type);
        const diff = Math.abs(item.openai - item.gemini);
        let winner = "Tie";
        if (item.openai > item.gemini) winner = "OpenAI";
        else if (item.gemini > item.openai) winner = "Gemini";
        
        return {
            type: normName,
            category: DOMAIN_CATEGORIES[normName] || "Other",
            openai: item.openai,
            gemini: item.gemini,
            winner: winner,
            rationale: CHATGPT_RATIONALES[normName] || `ChatGPT baseline evaluations show a performance score of ${item.openai}% for OpenAI and ${item.gemini}% for Gemini.`,
            confidence: diff > 20 ? "High" : "Medium"
        };
    });

    // 3. Normalize Gemini Data
    normalizedData.gemini = GEMINI_DATA.map(item => {
        const normName = getNormalizedTypeName(item.type);
        const diff = Math.abs(item.openai - item.gemini);
        
        return {
            type: normName,
            category: DOMAIN_CATEGORIES[normName] || "Other",
            openai: item.openai,
            gemini: item.gemini,
            winner: item.winner,
            rationale: item.rationale,
            confidence: diff > 20 ? "High" : "Medium"
        };
    });

    // 4. Calculate Consensus Data dynamically (Averages)
    const allTypes = Object.keys(DOMAIN_CATEGORIES);
    normalizedData.consensus = allTypes.map(typeName => {
        // Find in other datasets
        const claudeVal = normalizedData.claude.find(x => x.type === typeName) || { openai: 50, gemini: 50 };
        const gptVal = normalizedData.chatgpt.find(x => x.type === typeName) || { openai: 50, gemini: 50 };
        const gemVal = normalizedData.gemini.find(x => x.type === typeName) || { openai: 50, gemini: 50 };

        const avgOpenAI = Math.round((claudeVal.openai + gptVal.openai + gemVal.openai) / 3);
        const avgGemini = Math.round((claudeVal.gemini + gptVal.gemini + gemVal.gemini) / 3);
        
        let winner = "Tie";
        if (avgOpenAI > avgGemini) winner = "OpenAI";
        else if (avgGemini > avgOpenAI) winner = "Gemini";

        const diff = Math.abs(avgOpenAI - avgGemini);

        // Generate combined rationale dynamically
        let consensusRationale = "";
        if (claudeVal.winner === gemVal.winner && claudeVal.winner !== "Tie") {
            consensusRationale = `Consensus Agreement: Claude and Gemini both recommend ${claudeVal.winner}. ${claudeVal.winner === 'OpenAI' ? claudeVal.rationale : gemVal.rationale}`;
        } else {
            consensusRationale = `Split Consensus: Claude recommends ${claudeVal.winner} (${claudeVal.openai}% vs ${claudeVal.gemini}%) pointing out: "${claudeVal.rationale.split(';')[0]}". Gemini recommends ${gemVal.winner} (${gemVal.openai}% vs ${gemVal.gemini}%) stating: "${gemVal.rationale.split(';')[0]}".`;
        }

        return {
            type: typeName,
            category: DOMAIN_CATEGORIES[typeName] || "Other",
            openai: avgOpenAI,
            gemini: avgGemini,
            winner: winner,
            rationale: consensusRationale,
            confidence: diff > 20 ? "High" : "Medium"
        };
    });

    // Default to Consensus view
    activeDataset = normalizedData.consensus;
}

// ==========================================================================
// 4. DYNAMIC RENDER & UI INTERACTIONS
// ==========================================================================

const searchInput = document.getElementById("search-input");
const winnerFilter = document.getElementById("winner-filter");
const sortSelector = document.getElementById("sort-selector");
const tableBody = document.getElementById("table-body");
const globalTooltip = document.getElementById("global-tooltip");
const tooltipWinnerBadge = document.getElementById("tooltip-winner-badge");
const tooltipText = document.getElementById("tooltip-text");

// Cache values for animations
let cachedStats = {
    openaiWins: 0,
    geminiWins: 0,
    ties: 0,
    openaiAvg: 0,
    geminiAvg: 0
};

// Animate numbers inside counter elements
function animateCounter(elementId, start, end, suffix = "") {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = start;
    const duration = 800; // ms
    const stepTime = 15; // ms
    const increment = (end - start) / (duration / stepTime);
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment >= 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, stepTime);
}

// Render the Summary KPI panels
function renderSummaryStats() {
    const total = activeDataset.length;
    let openaiWins = 0;
    let geminiWins = 0;
    let ties = 0;
    let sumOpenAI = 0;
    let sumGemini = 0;

    activeDataset.forEach(item => {
        if (item.winner === "OpenAI") openaiWins++;
        else if (item.winner === "Gemini") geminiWins++;
        else ties++;
        sumOpenAI += item.openai;
        sumGemini += item.gemini;
    });

    const avgOpenAI = Math.round(sumOpenAI / total);
    const avgGemini = Math.round(sumGemini / total);

    // Trigger value animations
    animateCounter("stat-openai-wins", cachedStats.openaiWins, openaiWins);
    animateCounter("stat-gemini-wins", cachedStats.geminiWins, geminiWins);
    animateCounter("stat-ties", cachedStats.ties, ties);
    animateCounter("stat-openai-avg", cachedStats.openaiAvg, avgOpenAI, "%");
    animateCounter("stat-gemini-avg", cachedStats.geminiAvg, avgGemini, "%");

    // Animate progress indicators under card
    document.getElementById("bar-openai-wins").style.width = `${(openaiWins / total) * 100}%`;
    document.getElementById("bar-gemini-wins").style.width = `${(geminiWins / total) * 100}%`;
    document.getElementById("bar-ties").style.width = `${(ties / total) * 100}%`;
    document.getElementById("bar-openai-avg").style.width = `${avgOpenAI}%`;
    document.getElementById("bar-gemini-avg").style.width = `${avgGemini}%`;

    // Cache current statistics
    cachedStats = { openaiWins, geminiWins, ties, openaiAvg: avgOpenAI, geminiAvg: avgGemini };
}

// Filter and Sort Data
function getFilteredAndSortedData() {
    let result = [...activeDataset];

    // Apply Search
    const searchVal = searchInput.value.toLowerCase().trim();
    if (searchVal !== "") {
        result = result.filter(item => 
            item.type.toLowerCase().includes(searchVal) || 
            item.category.toLowerCase().includes(searchVal) ||
            item.rationale.toLowerCase().includes(searchVal)
        );
    }

    // Apply Winner Filter
    const filterVal = winnerFilter.value;
    if (filterVal !== "all") {
        result = result.filter(item => item.winner.toLowerCase() === filterVal);
    }

    // Apply Sorting
    const sortVal = sortSelector.value;
    if (sortVal === "name") {
        result.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortVal === "openai-desc") {
        result.sort((a, b) => b.openai - a.openai);
    } else if (sortVal === "gemini-desc") {
        result.sort((a, b) => b.gemini - a.gemini);
    } else if (sortVal === "gap-desc") {
        result.sort((a, b) => Math.abs(b.openai - b.gemini) - Math.abs(a.openai - a.gemini));
    }

    return result;
}

// Render the main table
function renderTable() {
    const list = getFilteredAndSortedData();
    tableBody.innerHTML = "";

    if (list.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 3rem; color: var(--color-text-dimmed);">
                    <i class="fa-regular fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; display: block;"></i>
                    No content types match the current filters.
                </td>
            </tr>
        `;
        return;
    }

    list.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-type", item.type);
        row.style.setProperty("--order", index % 15); // limit animations delay stagger
        row.className = "fade-in-up";

        const badgeClass = `badge-winner badge-${item.winner.toLowerCase()}`;
        const confidenceClass = `confidence-indicator confidence-${item.confidence.toLowerCase()}`;
        const gap = Math.abs(item.openai - item.gemini);

        row.innerHTML = `
            <td>
                <div class="domain-cell">
                    <span>${item.type}</span>
                    <span class="domain-category">${item.category}</span>
                </div>
            </td>
            <td>
                <div class="score-progress-wrapper">
                    <span class="score-number">${item.openai}%</span>
                    <div class="score-bar-bg">
                        <div class="score-bar-fill fill-openai" data-width="${item.openai}%"></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="score-progress-wrapper">
                    <span class="score-number">${item.gemini}%</span>
                    <div class="score-bar-bg">
                        <div class="score-bar-fill fill-gemini" data-width="${item.gemini}%"></div>
                    </div>
                </div>
            </td>
            <td class="badge-col">
                <span class="${badgeClass}">${item.winner}</span>
            </td>
            <td class="badge-col">
                <span class="${confidenceClass}" title="Gap: ${gap}%">${item.confidence}</span>
            </td>
        `;

        // Tooltip hover interactions
        row.addEventListener("mouseenter", (e) => showTooltip(e, item));
        row.addEventListener("mousemove", moveTooltip);
        row.addEventListener("mouseleave", hideTooltip);
        
        // Mobile tap expands rationale in line
        row.addEventListener("click", () => toggleInlineRationale(row, item));

        tableBody.appendChild(row);
    });

    // Trigger progress bar filling width transitions
    setTimeout(() => {
        const fills = tableBody.querySelectorAll(".score-bar-fill");
        fills.forEach(fill => {
            fill.style.width = fill.getAttribute("data-width");
        });
    }, 50);
}

// Expand rationale inline for mobile/accessible viewing
function toggleInlineRationale(row, item) {
    // Remove any existing active inline rationales
    const existing = tableBody.querySelector(".rationale-row");
    const existingTarget = existing ? existing.previousElementSibling : null;
    
    if (existing) {
        existing.remove();
        if (existingTarget === row) return; // Closed self
    }

    const rationaleRow = document.createElement("tr");
    rationaleRow.className = "rationale-row";
    rationaleRow.innerHTML = `
        <td colspan="5" class="rationale-cell">
            <div class="rationale-content-wrapper">
                <i class="fa-solid fa-circle-info"></i>
                <div>
                    <strong>Rationale for ${item.type}:</strong> ${item.rationale}
                    <div style="margin-top: 0.25rem; font-size: 0.75rem; color: var(--color-openai);">
                        Score Gap: ${Math.abs(item.openai - item.gemini)}% (${item.winner} leads) | Confidence: ${item.confidence}
                    </div>
                </div>
            </div>
        </td>
    `;
    row.after(rationaleRow);
}

// Tooltip behaviors
function showTooltip(e, item) {
    tooltipText.textContent = item.rationale;
    tooltipWinnerBadge.textContent = item.winner;
    tooltipWinnerBadge.className = `tooltip-badge badge-${item.winner.toLowerCase()}`;
    
    // Set border glow of tooltip matching the winner
    if (item.winner === "OpenAI") {
        globalTooltip.style.borderColor = "var(--color-openai)";
        globalTooltip.style.boxShadow = "0 10px 30px rgba(0, 210, 255, 0.2)";
    } else if (item.winner === "Gemini") {
        globalTooltip.style.borderColor = "var(--color-gemini)";
        globalTooltip.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.2)";
    } else {
        globalTooltip.style.borderColor = "var(--color-tie)";
        globalTooltip.style.boxShadow = "0 10px 30px rgba(100, 116, 139, 0.2)";
    }

    globalTooltip.classList.add("active");
    moveTooltip(e);
}

function moveTooltip(e) {
    const tooltipWidth = globalTooltip.offsetWidth;
    const tooltipHeight = globalTooltip.offsetHeight;
    let x = e.clientX + 20;
    let y = e.clientY + 20;

    // Boundary check so tooltip stays inside viewport
    if (x + tooltipWidth > window.innerWidth) {
        x = e.clientX - tooltipWidth - 20;
    }
    if (y + tooltipHeight > window.innerHeight) {
        y = e.clientY - tooltipHeight - 20;
    }

    globalTooltip.style.left = `${x}px`;
    globalTooltip.style.top = `${y}px`;
}

function hideTooltip() {
    globalTooltip.classList.remove("active");
}

// Render Decisive Domains Horizontal Grouped Bar Chart
function renderChart() {
    const container = document.getElementById("decisive-chart-container");
    container.innerHTML = "";

    // Sort active dataset by absolute score gap descending
    const sortedByGap = [...activeDataset]
        .map(item => ({ ...item, gap: Math.abs(item.openai - item.gemini) }))
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 10);

    sortedByGap.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "chart-row";
        row.style.setProperty("--order", index + 6);

        const isGeminiLed = item.gemini > item.openai;
        const gapClass = isGeminiLed ? "chart-row-gap-badge gemini-led" : "chart-row-gap-badge";

        row.innerHTML = `
            <div class="chart-row-header">
                <span class="chart-row-title">${item.type}</span>
                <span class="${gapClass}" title="${item.winner} leads by ${item.gap}%">${item.winner} +${item.gap}%</span>
            </div>
            <div class="chart-row-bars">
                <!-- OpenAI Bar -->
                <div class="chart-bar-outer">
                    <span class="chart-bar-label">GPT-4o</span>
                    <div class="chart-bar-line-bg">
                        <div class="chart-bar-line-fill fill-openai" data-width="${item.openai}%"></div>
                    </div>
                    <span class="chart-bar-value">${item.openai}%</span>
                </div>
                <!-- Gemini Bar -->
                <div class="chart-bar-outer">
                    <span class="chart-bar-label">1.5 Pro</span>
                    <div class="chart-bar-line-bg">
                        <div class="chart-bar-line-fill fill-gemini" data-width="${item.gemini}%"></div>
                    </div>
                    <span class="chart-bar-value">${item.gemini}%</span>
                </div>
            </div>
        `;

        container.appendChild(row);
    });

    // Trigger chart bar animations
    setTimeout(() => {
        const fills = container.querySelectorAll(".chart-bar-line-fill");
        fills.forEach(fill => {
            fill.style.width = fill.getAttribute("data-width");
        });
    }, 50);
}

// Trigger complete view update
function updateView() {
    renderSummaryStats();
    renderTable();
    renderChart();
}

// Bind navigation tab slide events
function setupNavigation() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    const slidingUnderline = document.querySelector(".sliding-underline");

    function updateSlidingIndicator(activeBtn) {
        if (!activeBtn) return;
        slidingUnderline.style.width = `${activeBtn.offsetWidth}px`;
        slidingUnderline.style.left = `${activeBtn.offsetLeft}px`;
    }

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active state
            toggleButtons.forEach(b => b.classList.remove("active"));
            
            // Add active state
            btn.classList.add("active");
            updateSlidingIndicator(btn);

            // Change dataset
            const source = btn.getAttribute("data-source");
            activeDataset = normalizedData[source];

            // Re-render UI
            updateView();
        });
    });

    // Initialize position
    const initialActive = document.querySelector(".toggle-btn.active");
    updateSlidingIndicator(initialActive);

    // Recalculate on window resize
    window.addEventListener("resize", () => {
        const active = document.querySelector(".toggle-btn.active");
        updateSlidingIndicator(active);
    });
}

// Bind search and filter events
function setupFilters() {
    searchInput.addEventListener("input", () => {
        renderTable();
    });

    winnerFilter.addEventListener("change", () => {
        renderTable();
    });

    sortSelector.addEventListener("change", () => {
        renderTable();
    });
}

// ==========================================================================
// 5. CANVAS PARTICLE BACKGROUND ENGINE
// ==========================================================================
function setupParticleBackground() {
    const container = document.getElementById("particles");
    if (!container) return;

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const maxParticles = Math.min(60, Math.floor((width * height) / 20000));

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.15;
            this.color = Math.random() > 0.5 ? "0, 229, 255" : "16, 185, 129"; // Blue or Green
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce on boundaries
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                }
            }
        }
        ctx.stroke();

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// ==========================================================================
// 6. INITIALIZATION CALLS
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
    initializePipeline();
    setupNavigation();
    setupFilters();
    updateView();
    setupParticleBackground();
});
