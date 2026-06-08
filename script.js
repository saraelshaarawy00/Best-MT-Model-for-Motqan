/**
 * MT Model Intelligence Report — Arabic Localization
 * SaaS Dashboard Controller & Data Pipeline
 */

// ==========================================================================
// 1. RAW DATA STRUCTURES
// ==========================================================================

const CLAUDE_RAW = [
    { type: "General", rank1: { model: "GPT-5.5", score: 38 }, rank2: { model: "GPT-5.4", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "General Science", rank1: { model: "GPT-5.5 Pro", score: 45 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "Gemini 3.1 Pro", score: 18 } },
    { type: "Heavy Machinery", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 28 }, rank3: { model: "GPT-5.5", score: 15 } },
    { type: "Hospitality Services", rank1: { model: "Gemini 3.1 Pro", score: 40 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "GPT-5.4", score: 22 } },
    { type: "Information Technology", rank1: { model: "GPT-5.5 Pro", score: 42 }, rank2: { model: "GPT-5.4 Mini", score: 28 }, rank3: { model: "GPT-5.5", score: 20 } },
    { type: "Insurance", rank1: { model: "GPT-5.5 Pro", score: 52 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "GPT-5.4 Mini", score: 13 } },
    { type: "Legal", rank1: { model: "GPT-5.5 Pro", score: 62 }, rank2: { model: "GPT-5.5", score: 25 }, rank3: { model: "Gemini 3.1 Pro", score: 9 } },
    { type: "Life Science", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 30 }, rank3: { model: "GPT-5.5", score: 14 } },
    { type: "Literature", rank1: { model: "Gemini 3.1 Pro", score: 48 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "GPT-5.5 Pro", score: 16 } },
    { type: "Manufacturing", rank1: { model: "GPT-5.5 Pro", score: 45 }, rank2: { model: "Gemini 3.1 Pro", score: 28 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "Marketing & Advertising", rank1: { model: "Gemini 3.1 Pro", score: 44 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "GPT-5.4", score: 18 } },
    { type: "Medical & Healthcare", rank1: { model: "GPT-5.5 Pro", score: 55 }, rank2: { model: "Gemini 3.1 Pro", score: 26 }, rank3: { model: "GPT-5.5", score: 14 } },
    { type: "Medical Devices & Instruments", rank1: { model: "GPT-5.5 Pro", score: 58 }, rank2: { model: "GPT-5.5", score: 22 }, rank3: { model: "Gemini 3.1 Pro", score: 14 } },
    { type: "Medicine", rank1: { model: "GPT-5.5 Pro", score: 56 }, rank2: { model: "Gemini 3.1 Pro", score: 28 }, rank3: { model: "GPT-5.5", score: 12 } },
    { type: "Military & Defense", rank1: { model: "GPT-5.5 Pro", score: 55 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "Gemini 3.1 Pro", score: 12 } },
    { type: "Mining & Petroleum", rank1: { model: "GPT-5.5 Pro", score: 48 }, rank2: { model: "Gemini 3.1 Pro", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 16 } },
    { type: "Networks", rank1: { model: "GPT-5.5 Pro", score: 44 }, rank2: { model: "GPT-5.4 Mini", score: 28 }, rank3: { model: "GPT-5.5", score: 20 } },
    { type: "NGOs", rank1: { model: "Gemini 3.1 Pro", score: 42 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "GPT-5.4", score: 18 } },
    { type: "Nursing", rank1: { model: "GPT-5.5 Pro", score: 52 }, rank2: { model: "GPT-5.5", score: 26 }, rank3: { model: "Gemini 3.1 Pro", score: 14 } },
    { type: "Other", rank1: { model: "GPT-5.4", score: 35 }, rank2: { model: "GPT-5.5", score: 32 }, rank3: { model: "Gemini 3 Flash", score: 22 } },
    { type: "Patents", rank1: { model: "GPT-5.5 Pro", score: 65 }, rank2: { model: "GPT-5.5", score: 20 }, rank3: { model: "Gemini 3.1 Pro", score: 12 } },
    { type: "Patient Education", rank1: { model: "GPT-5.5", score: 40 }, rank2: { model: "GPT-5.5 Pro", score: 30 }, rank3: { model: "Gemini 3.1 Pro", score: 22 } },
    { type: "Pharmaceuticals", rank1: { model: "GPT-5.5 Pro", score: 58 }, rank2: { model: "Gemini 3.1 Pro", score: 24 }, rank3: { model: "GPT-5.5", score: 14 } },
    { type: "Physical Therapy", rank1: { model: "GPT-5.5 Pro", score: 48 }, rank2: { model: "Gemini 3.1 Pro", score: 30 }, rank3: { model: "GPT-5.5", score: 16 } },
    { type: "Publishing, Printing & Packaging", rank1: { model: "GPT-5.5", score: 38 }, rank2: { model: "GPT-5.4 Mini", score: 30 }, rank3: { model: "GPT-5.4", score: 22 } },
    { type: "Real Estate & Properties", rank1: { model: "Gemini 3.1 Pro", score: 40 }, rank2: { model: "GPT-5.4", score: 30 }, rank3: { model: "GPT-5.5", score: 20 } },
    { type: "Religion & Religious Studies", rank1: { model: "Gemini 3.1 Pro", score: 60 }, rank2: { model: "GPT-5.5", score: 22 }, rank3: { model: "GPT-5.5 Pro", score: 12 } },
    { type: "Security & International Affairs", rank1: { model: "GPT-5.5 Pro", score: 52 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "Gemini 3.1 Pro", score: 14 } },
    { type: "Shipping & Maritime", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 26 }, rank3: { model: "Gemini 3 Flash", score: 18 } },
    { type: "Social & Human Services", rank1: { model: "Gemini 3.1 Pro", score: 42 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "GPT-5.4", score: 20 } },
    { type: "Software UA", rank1: { model: "GPT-5.5 Pro", score: 44 }, rank2: { model: "GPT-5.5", score: 28 }, rank3: { model: "GPT-5.4 Mini", score: 20 } },
    { type: "Software UI", rank1: { model: "GPT-5.5 Pro", score: 46 }, rank2: { model: "GPT-5.4 Mini", score: 28 }, rank3: { model: "GPT-5.5", score: 18 } },
    { type: "Sports", rank1: { model: "Gemini 3.1 Pro", score: 42 }, rank2: { model: "GPT-5.4", score: 28 }, rank3: { model: "GPT-5.5", score: 20 } },
    { type: "Technical & Scientific", rank1: { model: "GPT-5.5 Pro", score: 52 }, rank2: { model: "Gemini 3.1 Pro", score: 26 }, rank3: { model: "GPT-5.5", score: 16 } },
    { type: "Telecommunications", rank1: { model: "GPT-5.5 Pro", score: 44 }, rank2: { model: "GPT-5.4 Mini", score: 26 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "Training & E-learning", rank1: { model: "Gemini 3.1 Pro", score: 40 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "GPT-5.4", score: 20 } },
    { type: "Transportation & Logistics", rank1: { model: "GPT-5.5 Pro", score: 48 }, rank2: { model: "Gemini 3 Flash", score: 26 }, rank3: { model: "GPT-5.4 Mini", score: 18 } },
    { type: "Veterinary Medicine", rank1: { model: "GPT-5.5 Pro", score: 54 }, rank2: { model: "Gemini 3.1 Pro", score: 26 }, rank3: { model: "GPT-5.5", score: 14 } },
    { type: "Wholesale & Retail Trade", rank1: { model: "GPT-5.5", score: 38 }, rank2: { model: "GPT-5.4 Mini", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 24 } }
];

const CHATGPT_RAW = [
    { type: "General", bestModel: "GPT-5.5", confidence: 98 },
    { type: "General Science", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Heavy Machinery", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Hospitality Services", bestModel: "Gemini 3.1 Pro", confidence: 97 },
    { type: "Information Technology", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Insurance", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Legal", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Life Science", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Literature", bestModel: "Gemini 3.1 Pro", confidence: 99 },
    { type: "Manufacturing", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Marketing & Advertising", bestModel: "Gemini 3.1 Pro", confidence: 98 },
    { type: "Medical & Healthcare", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Medical Devices & Instruments", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Medicine", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Military & Defense", bestModel: "GPT-5.5 Pro", confidence: 98 },
    { type: "Mining & Petroleum", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Networks", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "NGOs", bestModel: "Gemini 3.1 Pro", confidence: 96 },
    { type: "Nursing", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Other", bestModel: "GPT-5.5", confidence: 98 },
    { type: "Patents", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Patient Education", bestModel: "GPT-5.5", confidence: 98 },
    { type: "Pharmaceuticals", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Physical Therapy", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Publishing, Printing & Packaging", bestModel: "GPT-5.5", confidence: 97 },
    { type: "Real Estate & Properties", bestModel: "GPT-5.5", confidence: 97 },
    { type: "Religion & Religious Studies", bestModel: "Gemini 3.1 Pro", confidence: 97 },
    { type: "Security & International Affairs", bestModel: "GPT-5.5 Pro", confidence: 98 },
    { type: "Shipping & Maritime", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Social & Human Services", bestModel: "Gemini 3.1 Pro", confidence: 96 },
    { type: "Software UA", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Software UI", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Sports", bestModel: "Gemini 3.1 Pro", confidence: 96 },
    { type: "Technical & Scientific", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Telecommunications", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Training & E-learning", bestModel: "GPT-5.5", confidence: 97 },
    { type: "Transportation & Logistics Services", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Veterinary Medicine", bestModel: "GPT-5.5 Pro", confidence: 99 },
    { type: "Wholesale & Retail Trade", bestModel: "GPT-5.5", confidence: 97 }
];

const GEMINI_RAW = [
    { type: "General", rank1: { model: "GPT-5.4", score: 40 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 20 } },
    { type: "General science", rank1: { model: "Gemini 3.1 Pro", score: 45 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "heavy machinery", rank1: { model: "Gemini 3.1 Pro", score: 45 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "hospitality services", rank1: { model: "GPT-5.4", score: 45 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "information technology", rank1: { model: "GPT-5.4 Mini", score: 45 }, rank2: { model: "GPT-5.5", score: 40 }, rank3: { model: "Gemini 3 Flash", score: 15 } },
    { type: "insurance", rank1: { model: "GPT-5.5 Pro", score: 45 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "GPT-5.4 Mini", score: 20 } },
    { type: "legal", rank1: { model: "GPT-5.5 Pro", score: 60 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "Gemini 3.1 Pro", score: 10 } },
    { type: "life science", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 35 }, rank3: { model: "GPT-5.4 Mini", score: 15 } },
    { type: "literature", rank1: { model: "GPT-5.5 Pro", score: 65 }, rank2: { model: "GPT-5.5", score: 25 }, rank3: { model: "GPT-5.4", score: 10 } },
    { type: "manufacturing", rank1: { model: "Gemini 3 Flash", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 35 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "marketing&advertising", rank1: { model: "GPT-5.5", score: 55 }, rank2: { model: "GPT-5.4", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 15 } },
    { type: "medical & healthcare", rank1: { model: "Gemini 3.1 Pro", score: 45 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "medical devices & instruments", rank1: { model: "GPT-5.5", score: 40 }, rank2: { model: "Gemini 3.1 Pro", score: 40 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "medicine", rank1: { model: "Gemini 3.1 Pro", score: 55 }, rank2: { model: "GPT-5.5 Pro", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 10 } },
    { type: "military & defense", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3.1 Pro", score: 15 } },
    { type: "mining & petroleum", rank1: { model: "Gemini 3.1 Pro", score: 45 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "networks", rank1: { model: "GPT-5.4 Mini", score: 50 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 15 } },
    { type: "NGOs", rank1: { model: "GPT-5.5", score: 45 }, rank2: { model: "GPT-5.4", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "nursing", rank1: { model: "GPT-5.5", score: 45 }, rank2: { model: "GPT-5.4", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "other", rank1: { model: "GPT-5.4 Mini", score: 40 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "GPT-5.4 Nano", score: 20 } },
    { type: "patents", rank1: { model: "Gemini 3.1 Pro", score: 65 }, rank2: { model: "GPT-5.5", score: 25 }, rank3: { model: "Gemini 3 Flash", score: 10 } },
    { type: "patients education", rank1: { model: "GPT-5.5", score: 55 }, rank2: { model: "GPT-5.4 Mini", score: 30 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "pharmaceuticals", rank1: { model: "GPT-5.5 Pro", score: 50 }, rank2: { model: "Gemini 3.1 Pro", score: 40 }, rank3: { model: "GPT-5.4 Mini", score: 10 } },
    { type: "physical therapy", rank1: { model: "Gemini 3.1 Pro", score: 50 }, rank2: { model: "GPT-5.4", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "publishing, printing&packaging", rank1: { model: "GPT-5.4 Mini", score: 50 }, rank2: { model: "GPT-5.4", score: 35 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "real estate&properties", rank1: { model: "GPT-5.4", score: 50 }, rank2: { model: "Gemini 3 Flash", score: 35 }, rank3: { model: "GPT-5.4 Nano", score: 15 } },
    { type: "religion&religious studies", rank1: { model: "Gemini 3.1 Pro", score: 60 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "Gemini 3 Flash", score: 10 } },
    { type: "security &international affairs", rank1: { model: "GPT-5.5 Pro", score: 55 }, rank2: { model: "GPT-5.5", score: 30 }, rank3: { model: "Gemini 3.1 Pro", score: 15 } },
    { type: "shipping &maritime", rank1: { model: "Gemini 3 Flash", score: 55 }, rank2: { model: "Gemini 3.1 Pro", score: 30 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "social & human services", rank1: { model: "GPT-5.5", score: 50 }, rank2: { model: "GPT-5.4", score: 35 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "software UA", rank1: { model: "GPT-5.5", score: 45 }, rank2: { model: "GPT-5.4 Mini", score: 40 }, rank3: { model: "Gemini 3 Flash", score: 15 } },
    { type: "Software UI", rank1: { model: "GPT-5.4 Mini", score: 60 }, rank2: { model: "GPT-5.5", score: 25 }, rank3: { model: "GPT-5.4 Nano", score: 15 } },
    { type: "Sports", rank1: { model: "GPT-5.4", score: 50 }, rank2: { model: "GPT-5 Mini", score: 35 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 15 } },
    { type: "technical &scientific", rank1: { model: "Gemini 3.1 Pro", score: 45 }, rank2: { model: "GPT-5.5", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 20 } },
    { type: "telecommunications", rank1: { model: "GPT-5.4 Mini", score: 40 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 20 } },
    { type: "training & e-learning", rank1: { model: "GPT-5.5", score: 50 }, rank2: { model: "GPT-5.4", score: 35 }, rank3: { model: "Gemini 3 Flash", score: 15 } },
    { type: "transportation & logistics services", rank1: { model: "Gemini 3 Flash", score: 55 }, rank2: { model: "GPT-5.4 Mini", score: 25 }, rank3: { model: "Gemini 3.1 Flash Lite", score: 20 } },
    { type: "veterinary medicine", rank1: { model: "Gemini 3.1 Pro", score: 50 }, rank2: { model: "Gemini 3 Flash", score: 35 }, rank3: { model: "GPT-5.4 Mini", score: 15 } },
    { type: "wholesale &retail trade", rank1: { model: "GPT-5.4 Mini", score: 45 }, rank2: { model: "Gemini 3 Flash", score: 40 }, rank3: { model: "GPT-5.4 Nano", score: 15 } }
];

// ==========================================================================
// 2. MODEL CONFIGURATION
// ==========================================================================

const ALL_MODELS = [
    "GPT-5.5 Pro", "GPT-5.5", "GPT-5.4", "GPT-5.4 Mini", "GPT-5.4 Nano", "GPT-5 Mini",
    "Gemini 3.1 Pro", "Gemini 3 Flash", "Gemini 3.1 Flash Lite"
];

function isGptFamily(model) {
    return model && model.startsWith("GPT");
}

function isGeminiFamily(model) {
    return model && model.startsWith("Gemini");
}

// Category mappings for SaaS grid grouping
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

// Rich localization rationales tailored for C-suite presenting
const LOCALIZATION_INSIGHTS = {
    "General": "Focuses on conversational fluency and broad vocabulary adaptation where GPT models lead in syntax coherence.",
    "General Science": "Requires precise terminology and LaTeX/notation awareness. GPT-5.5 Pro leads in peer-review standards.",
    "Heavy Machinery": "Technical parts catalogs demand strict glossary consistency. Gemini Pro matches specialized engineering indexes.",
    "Hospitality Services": "Conversational warmth and localized tone are key; Gemini handles Arabic polite register naturally.",
    "Information Technology": "Code-adjacent texts, API docs, and tags; GPT models prevent corruption of code tokens.",
    "Insurance": "Requires regulatory phrasing and policy terms. GPT-5.5 Pro handles complex nested legal clauses.",
    "Legal": "Zero tolerance for ambiguity in contracts. GPT-5.5 Pro matches formal legal registers with high precision.",
    "Life Science": "Deals with taxonomy and peer-review language. GPT-5.5 Pro outperforms in compliance metrics.",
    "Literature": "Style, idioms, and rhythmic prose; Gemini's generative depth captures creative nuance best.",
    "Manufacturing": "Procedural instructions and safety guidelines; Gemini mapping is highly efficient for repetitive scripts.",
    "Marketing & Advertising": "Transcreation and cultural slogans; Gemini excels in creative copywriting and emotional impact.",
    "Medical & Healthcare": "Clinical records and diagnostic precision; GPT-5.5 Pro shows the lowest hallucination rate.",
    "Medical Devices & Instruments": "Hardware user manuals and interface strings; GPT-5.5 Pro excels at token length constraints.",
    "Medicine": "Pharmacological and anatomical terms; Gemini leverages deep medical corpus datasets.",
    "Military & Defense": "Geopolitical sensitivity and tactical terms; GPT-5.5 Pro preserves security registers with high precision.",
    "Mining & Petroleum": "Geological vocabulary and operational logs; Gemini Pro utilizes wide earth-science data graphs.",
    "Networks": "Protocol documents and config syntax; GPT-5.4 Mini handles code-adjacent text efficiently.",
    "NGOs": "Humanitarian advocacy and report narratives; Gemini maintains an accessible, empathetic tone.",
    "Nursing": "Clinical care guidelines and patient interactions; GPT-5.5 Pro provides accurate procedure translation.",
    "Other": "Mixed unstructured domain signals where general fluency scores are highly tied.",
    "Patents": "Formulaic claims structure and legal binding; Gemini 3.1 Pro provides literal sentence mapping.",
    "Patient Education": "Requires translating medical terms to a layperson register; GPT-5.5 adapts reading levels flawlessly.",
    "Pharmaceuticals": "Dosage labels and pharmacokinetics reports; GPT-5.5 Pro is preferred for strict instruction compliance.",
    "Physical Therapy": "Anatomical movements and muscular terms; Gemini Pro's specialized vocabulary dominates.",
    "Publishing, Printing & Packaging": "Text length limitations to prevent packaging overflow; GPT-5.4 Mini meets constraints best.",
    "Real Estate & Properties": "Descriptive sales pitch combined with legal leasing clauses; GPT models balance tone and accuracy.",
    "Religion & Religious Studies": "Classical Arabic and theological texts; Gemini Pro's massive historic multilingual corpus leads.",
    "Security & International Affairs": "Geopolitical diplomacy register; GPT-5.5 Pro handles delicate diplomatic contexts with high reliability.",
    "Shipping & Maritime": "International customs codes and port logs; Gemini Flash handles structured logistics registries.",
    "Social & Human Services": "Accessible community outreach copy; Gemini handles conversational social work register naturally.",
    "Software UA": "User assistance help files; GPT-5.5 Pro maintains instruction flow and screenshot alignments.",
    "Software UI": "Extremely tight button and menu constraints; GPT-5.4 Mini optimizes text length to prevent clipping.",
    "Sports": "Sports commentary and live event slang; GPT-5.4 captures idiomatic pacing and energetic tone.",
    "Technical & Scientific": "Data-dense tables and measurement metrics; Gemini Pro ensures safe alignments of formula values.",
    "Telecommunications": "Standards protocols and frequency documentation; GPT-5.4 Mini handles global telecom terms accurately.",
    "Training & E-learning": "Pedagogical materials and slide decks; GPT-5.5 reads naturally like an online educator.",
    "Transportation & Logistics": "Routing registries and shipping manifests; Gemini Flash maps transport directories efficiently.",
    "Veterinary Medicine": "Animal anatomical terms and diagnosis; Gemini Pro utilizes wider biological data nodes.",
    "Wholesale & Retail Trade": "E-commerce product descriptions; GPT-5.4 Mini outputs persuasive, consumer-friendly copy."
};

// ==========================================================================
// 3. PIPELINE CONTROLLER
// ==========================================================================

let activeSource = "consensus";
let viewMode = "grid"; // grid or table
let selectedFilterModel = "all";

const pipelineData = {
    claude: [],
    chatgpt: [],
    gemini: [],
    consensus: []
};

// Master Content Type Spellings
const MASTER_CONTENT_TYPES = Object.keys(DOMAIN_CATEGORIES);

function getNormalizedType(type) {
    const raw = type.trim().toLowerCase();
    
    if (raw === "transportation & logistics services" || raw === "transportation & logistics") {
        return "Transportation & Logistics";
    }
    if (raw === "patients education" || raw === "patient education" || raw === "patients education") {
        return "Patient Education";
    }
    if (raw === "marketing&advertising" || raw === "marketing & advertising") {
        return "Marketing & Advertising";
    }
    if (raw === "publishing, printing&packaging" || raw === "publishing, printing & packaging") {
        return "Publishing, Printing & Packaging";
    }
    if (raw === "real estate&properties" || raw === "real estate & properties") {
        return "Real Estate & Properties";
    }
    if (raw === "religion&religious studies" || raw === "religion & religious studies") {
        return "Religion & Religious Studies";
    }
    if (raw === "security &international affairs" || raw === "security & international affairs") {
        return "Security & International Affairs";
    }
    if (raw === "shipping &maritime" || raw === "shipping & maritime") {
        return "Shipping & Maritime";
    }
    if (raw === "wholesale &retail trade" || raw === "wholesale & retail trade") {
        return "Wholesale & Retail Trade";
    }
    if (raw === "technical &scientific" || raw === "technical & scientific") {
        return "Technical & Scientific";
    }
    
    // Find case insensitive match in master types
    for (const master of MASTER_CONTENT_TYPES) {
        if (master.toLowerCase() === raw) {
            return master;
        }
    }
    return type;
}

// Convert Rank 1 scores into Win classifications
function getConfidenceRating(score) {
    if (score >= 50) return "HIGH";
    if (score >= 40) return "MEDIUM";
    return "SPLIT";
}

function processRawData() {
    // 1. Process Claude Data
    pipelineData.claude = MASTER_CONTENT_TYPES.map(typeName => {
        const item = CLAUDE_RAW.find(x => getNormalizedType(x.type) === typeName);
        const r1 = item ? item.rank1 : { model: "N/A", score: 0 };
        const r2 = item ? item.rank2 : { model: "N/A", score: 0 };
        const r3 = item ? item.rank3 : { model: "N/A", score: 0 };
        
        return {
            contentType: typeName,
            category: DOMAIN_CATEGORIES[typeName] || "Other",
            rank1: r1,
            rank2: r2,
            rank3: r3,
            winner: r1.model,
            confidence: getConfidenceRating(r1.score),
            rationale: LOCALIZATION_INSIGHTS[typeName] || "No localization analysis compiled."
        };
    });

    // 2. Process ChatGPT Data
    pipelineData.chatgpt = MASTER_CONTENT_TYPES.map(typeName => {
        const item = CHATGPT_RAW.find(x => getNormalizedType(x.type) === typeName);
        const modelName = item ? item.bestModel : "N/A";
        const scoreVal = item ? item.confidence : 0;
        
        return {
            contentType: typeName,
            category: DOMAIN_CATEGORIES[typeName] || "Other",
            rank1: { model: modelName, score: scoreVal },
            rank2: { model: "N/A", score: 0 },
            rank3: { model: "N/A", score: 0 },
            winner: modelName,
            confidence: getConfidenceRating(scoreVal),
            rationale: LOCALIZATION_INSIGHTS[typeName] || "No localization analysis compiled."
        };
    });

    // 3. Process Gemini Data
    pipelineData.gemini = MASTER_CONTENT_TYPES.map(typeName => {
        const item = GEMINI_RAW.find(x => getNormalizedType(x.type) === typeName);
        const r1 = item ? item.rank1 : { model: "N/A", score: 0 };
        const r2 = item ? item.rank2 : { model: "N/A", score: 0 };
        const r3 = item ? item.rank3 : { model: "N/A", score: 0 };

        // Normalize Gemini's "GPT-5 Mini" to "GPT-5 Mini" (which is one of our 9 models)
        if (r1.model === "GPT-5 Mini") r1.model = "GPT-5 Mini";
        if (r2.model === "GPT-5 Mini") r2.model = "GPT-5 Mini";
        if (r3.model === "GPT-5 Mini") r3.model = "GPT-5 Mini";

        return {
            contentType: typeName,
            category: DOMAIN_CATEGORIES[typeName] || "Other",
            rank1: r1,
            rank2: r2,
            rank3: r3,
            winner: r1.model,
            confidence: getConfidenceRating(r1.score),
            rationale: LOCALIZATION_INSIGHTS[typeName] || "No localization analysis compiled."
        };
    });

    // 4. Calculate Consensus Data (Dynamic Convergence)
    pipelineData.consensus = MASTER_CONTENT_TYPES.map(typeName => {
        const cl = pipelineData.claude.find(x => x.contentType === typeName);
        const ch = pipelineData.chatgpt.find(x => x.contentType === typeName);
        const ge = pipelineData.gemini.find(x => x.contentType === typeName);

        // Winner determined strictly by averaging Rank-1 scores across all 3 sources
        const rank1Scores = {};
        ALL_MODELS.forEach(m => rank1Scores[m] = 0);
        
        if (cl && cl.rank1 && cl.rank1.model !== "N/A") rank1Scores[cl.rank1.model] += cl.rank1.score;
        if (ch && ch.rank1 && ch.rank1.model !== "N/A") rank1Scores[ch.rank1.model] += ch.rank1.score;
        if (ge && ge.rank1 && ge.rank1.model !== "N/A") rank1Scores[ge.rank1.model] += ge.rank1.score;

        let maxRank1Avg = -1;
        let rank1Winner = "Tie";
        ALL_MODELS.forEach(m => {
            const avg = rank1Scores[m] / 3;
            if (avg > maxRank1Avg) {
                maxRank1Avg = avg;
                rank1Winner = m;
            } else if (avg === maxRank1Avg && avg > 0) {
                rank1Winner = "Tie";
            }
        });

        // Compute average scores of ALL models across ALL ranks to populate Rank 1, 2, and 3 columns
        const modelSums = {};
        ALL_MODELS.forEach(m => modelSums[m] = 0);

        const addScores = (sourceObj) => {
            if (!sourceObj) return;
            if (sourceObj.rank1 && sourceObj.rank1.model !== "N/A") modelSums[sourceObj.rank1.model] += sourceObj.rank1.score;
            if (sourceObj.rank2 && sourceObj.rank2.model !== "N/A") modelSums[sourceObj.rank2.model] += sourceObj.rank2.score;
            if (sourceObj.rank3 && sourceObj.rank3.model !== "N/A") modelSums[sourceObj.rank3.model] += sourceObj.rank3.score;
        };

        addScores(cl);
        addScores(ch);
        addScores(ge);

        const sortedAverages = ALL_MODELS.map(m => ({
            model: m,
            score: Math.round(modelSums[m] / 3)
        })).sort((a, b) => b.score - a.score);

        // Fallback winner if rank-1 calculations tied
        let winnerModel = rank1Winner;
        if (winnerModel === "Tie" || winnerModel === "N/A") {
            winnerModel = sortedAverages[0].model;
        }

        return {
            contentType: typeName,
            category: DOMAIN_CATEGORIES[typeName] || "Other",
            rank1: sortedAverages[0].score > 0 ? sortedAverages[0] : { model: "N/A", score: 0 },
            rank2: sortedAverages[1].score > 0 ? sortedAverages[1] : { model: "N/A", score: 0 },
            rank3: sortedAverages[2].score > 0 ? sortedAverages[2] : { model: "N/A", score: 0 },
            winner: winnerModel,
            confidence: getConfidenceRating(sortedAverages[0].score),
            rationale: LOCALIZATION_INSIGHTS[typeName] || "No localization analysis compiled."
        };
    });
}

// ==========================================================================
// 4. UI DRAWING & RENDER ENGINE
// ==========================================================================

const searchInput = document.getElementById("search-input");
const tableBody = document.getElementById("table-body");
const gridPanel = document.getElementById("grid-view-panel");
const hoverTooltip = document.getElementById("table-hover-tooltip");
const tooltipModel = document.getElementById("tooltip-model");
const tooltipText = document.getElementById("tooltip-desc-text");

let activeDataset = [];

// Aggregate current dataset metrics to update KPI strip
function renderKPIs() {
    let gptWins = 0;
    let geminiWins = 0;
    let maxScore = 0;
    let sumLeaderScore = 0;
    const modelWinCounts = {};

    ALL_MODELS.forEach(m => modelWinCounts[m] = 0);

    activeDataset.forEach(item => {
        const topModel = item.rank1.model;
        const topScore = item.rank1.score;

        // Win stats by Family
        if (isGptFamily(item.winner)) gptWins++;
        else if (isGeminiFamily(item.winner)) geminiWins++;

        // Track model win counts
        if (item.winner !== "N/A") {
            modelWinCounts[item.winner] = (modelWinCounts[item.winner] || 0) + 1;
        }

        sumLeaderScore += topScore;
        if (topScore > maxScore) maxScore = topScore;
    });

    // Animate KPI text value
    document.getElementById("kpi-gpt-wins").textContent = gptWins;
    document.getElementById("kpi-gemini-wins").textContent = geminiWins;
    document.getElementById("kpi-max-score").textContent = maxScore + "%";
    document.getElementById("kpi-avg-score").textContent = Math.round(sumLeaderScore / activeDataset.length) + "%";

    // Find overall dominant model
    let dominantModelName = "N/A";
    let maxWins = -1;
    ALL_MODELS.forEach(m => {
        if (modelWinCounts[m] > maxWins) {
            maxWins = modelWinCounts[m];
            dominantModelName = m;
        }
    });
    document.getElementById("kpi-dominant-model").textContent = dominantModelName;
}

// Apply Filters & Search query
function getFilteredData() {
    let result = [...activeDataset];

    // Search Input
    const query = searchInput.value.toLowerCase().trim();
    if (query !== "") {
        result = result.filter(item => 
            item.contentType.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query) ||
            item.winner.toLowerCase().includes(query)
        );
    }

    // Winner Pill Filter
    if (selectedFilterModel !== "all") {
        result = result.filter(item => item.winner === selectedFilterModel);
    }

    return result;
}

// Render dynamic filter pills based on active dataset winners
function renderFilterPills() {
    const container = document.getElementById("model-filter-pills");
    
    // Find active unique winners in current dataset
    const winners = new Set();
    activeDataset.forEach(item => {
        if (item.winner && item.winner !== "N/A") winners.add(item.winner);
    });

    const sortedWinners = Array.from(winners).sort();

    let pillsHTML = `<button class="pill-btn ${selectedFilterModel === "all" ? "active" : ""}" data-model="all">All Models</button>`;
    
    sortedWinners.forEach(model => {
        const isActive = selectedFilterModel === model;
        const geminiClass = isGeminiFamily(model) ? "gemini-pill" : "";
        pillsHTML += `<button class="pill-btn ${isActive ? "active" : ""} ${geminiClass}" data-model="${model}">${model}</button>`;
    });

    container.innerHTML = pillsHTML;

    // Bind event listeners to new pills
    container.querySelectorAll(".pill-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            container.querySelectorAll(".pill-btn").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            selectedFilterModel = btn.getAttribute("data-model");
            renderMainViews();
        });
    });
}

// Render both the SaaS Grid View and Detailed Table View
function renderMainViews() {
    const filtered = getFilteredData();

    // 1. Render SaaS Card Grid
    gridPanel.innerHTML = "";
    if (filtered.length === 0) {
        gridPanel.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--color-gpt);"></i>
                No content types match the selected search or win filters.
            </div>
        `;
    } else {
        filtered.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "saas-card fade-in-up";
            card.style.setProperty("--order", index);

            const winnerFamilyClass = isGptFamily(item.winner) ? "badge-gpt" : isGeminiFamily(item.winner) ? "badge-gemini" : "badge-tie";
            const confClass = `card-confidence-badge conf-${item.confidence.toLowerCase()}`;

            let miniBarsHTML = "";
            const ranks = [item.rank1, item.rank2, item.rank3];
            ranks.forEach(rank => {
                if (!rank || rank.model === "N/A") return;
                const barFillClass = isGptFamily(rank.model) ? "fill-openai" : "fill-gemini";
                const barColor = isGptFamily(rank.model) ? "var(--color-gpt)" : "var(--color-gemini)";
                
                miniBarsHTML += `
                    <div class="mini-chart-row">
                        <span class="mini-model-name monospace-font">${rank.model}</span>
                        <div class="mini-progress-bg">
                            <div class="mini-progress-fill" style="background-color: ${barColor}" data-width="${rank.score}%"></div>
                        </div>
                        <span class="mini-score-val monospace-font">${rank.score}%</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="card-top-row">
                    <span class="card-category">${item.category}</span>
                    <span class="glow-winner-badge ${winnerFamilyClass}">${item.winner}</span>
                </div>
                <div class="card-title-section">
                    <h3 class="card-domain-name">${item.contentType}</h3>
                    <div class="card-metric-block">
                        <span class="card-score-value monospace-font">${item.rank1.score}%</span>
                        <span class="${confClass}">${item.confidence}</span>
                    </div>
                </div>
                <div class="card-mini-chart">
                    ${miniBarsHTML}
                </div>
                <p class="card-insight-row">${item.rationale}</p>
            `;

            gridPanel.appendChild(card);
        });
    }

    // 2. Render Technical Table View
    tableBody.innerHTML = "";
    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 4rem; color: var(--text-secondary);">
                    No records matches filter conditions.
                </td>
            </tr>
        `;
    } else {
        filtered.forEach((item, index) => {
            const row = document.createElement("tr");
            row.className = "fade-in-up";
            row.style.setProperty("--order", index);

            const winnerFamilyClass = isGptFamily(item.winner) ? "badge-gpt" : isGeminiFamily(item.winner) ? "badge-gemini" : "badge-tie";
            const confClass = `card-confidence-badge conf-${item.confidence.toLowerCase()}`;

            // Helper to draw cells
            const getCellHTML = (rank) => {
                if (!rank || rank.model === "N/A" || rank.score === 0) {
                    return `<span style="color: var(--text-dimmed);">N/A</span>`;
                }
                const barFillClass = isGptFamily(rank.model) ? "gpt-color" : "gemini-color";
                return `
                    <div class="tbl-score-label-row">
                        <span class="tbl-model-name monospace-font">${rank.model}</span>
                        <span class="tbl-model-pct monospace-font">${rank.score}%</span>
                    </div>
                    <div class="tbl-bar-bg">
                        <div class="tbl-bar-fill ${barFillClass}" data-width="${rank.score}%"></div>
                    </div>
                `;
            };

            row.innerHTML = `
                <td>
                    <div class="tbl-domain-name">${item.contentType}</div>
                    <div class="tbl-domain-category">${item.category}</div>
                </td>
                <td class="tbl-score-cell">${getCellHTML(item.rank1)}</td>
                <td class="tbl-score-cell">${getCellHTML(item.rank2)}</td>
                <td class="tbl-score-cell">${getCellHTML(item.rank3)}</td>
                <td class="centered"><span class="glow-winner-badge ${winnerFamilyClass}">${item.winner}</span></td>
                <td class="centered"><span class="${confClass}">${item.confidence}</span></td>
            `;

            // Row mouseover tooltips
            row.addEventListener("mouseenter", (e) => triggerTooltip(e, item));
            row.addEventListener("mousemove", moveTooltip);
            row.addEventListener("mouseleave", dismissTooltip);

            tableBody.appendChild(row);
        });
    }

    // Trigger grid progress bar filling width transitions
    setTimeout(() => {
        const fills = document.querySelectorAll(".mini-progress-fill, .tbl-bar-fill");
        fills.forEach(fill => {
            fill.style.width = fill.getAttribute("data-width");
        });
    }, 60);
}

// ==========================================================================
// 5. TOOLTIP ACTIONS
// ==========================================================================

function triggerTooltip(e, item) {
    tooltipText.textContent = item.rationale;
    tooltipModel.textContent = item.winner;
    
    if (isGptFamily(item.winner)) {
        tooltipModel.style.backgroundColor = "var(--color-gpt-bg)";
        tooltipModel.style.color = "#60A5FA";
        tooltipModel.style.border = "1px solid rgba(59, 130, 246, 0.3)";
        hoverTooltip.style.borderColor = "var(--color-gpt)";
    } else if (isGeminiFamily(item.winner)) {
        tooltipModel.style.backgroundColor = "var(--color-gemini-bg)";
        tooltipModel.style.color = "#34D399";
        tooltipModel.style.border = "1px solid rgba(16, 185, 129, 0.3)";
        hoverTooltip.style.borderColor = "var(--color-gemini)";
    } else {
        tooltipModel.style.backgroundColor = "var(--color-tie-bg)";
        tooltipModel.style.color = "#9CA3AF";
        tooltipModel.style.border = "1px solid rgba(100, 116, 139, 0.3)";
        hoverTooltip.style.borderColor = "var(--color-tie)";
    }

    hoverTooltip.classList.add("active");
    moveTooltip(e);
}

function moveTooltip(e) {
    const tooltipWidth = hoverTooltip.offsetWidth;
    const tooltipHeight = hoverTooltip.offsetHeight;
    let x = e.clientX + 18;
    let y = e.clientY + 18;

    // Boundary check
    if (x + tooltipWidth > window.innerWidth) {
        x = e.clientX - tooltipWidth - 18;
    }
    if (y + tooltipHeight > window.innerHeight) {
        y = e.clientY - tooltipHeight - 18;
    }

    hoverTooltip.style.left = `${x}px`;
    hoverTooltip.style.top = `${y}px`;
}

function dismissTooltip() {
    hoverTooltip.classList.remove("active");
}

// ==========================================================================
// 6. CANVAS DECISIVE CHART DRAWER
// ==========================================================================

let canvasAnimFrame = null;

function renderCanvasChart(progress = 1.0) {
    const canvas = document.getElementById("decisive-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    // Clear Canvas
    ctx.clearRect(0, 0, w, h);

    // Filter active dataset by Rank 1 score descending (Top 15 decisive domains)
    const sorted = [...activeDataset]
        .sort((a, b) => b.rank1.score - a.rank1.score)
        .slice(0, 15);

    const leftMargin = 220;
    const rightMargin = 50;
    const topMargin = 30;
    const bottomMargin = 20;
    
    const plotW = w - leftMargin - rightMargin;
    const plotH = h - topMargin - bottomMargin;
    const rowH = plotH / 15;

    // Draw background grid vertical markers
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(156, 163, 175, 0.4)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    for (let i = 0; i <= 5; i++) {
        const val = i * 20;
        const x = leftMargin + (plotW * (val / 100));
        ctx.beginPath();
        ctx.moveTo(x, topMargin - 5);
        ctx.lineTo(x, h - bottomMargin);
        ctx.stroke();
        ctx.fillText(val + "%", x, topMargin - 12);
    }

    sorted.forEach((item, index) => {
        const y = topMargin + (index * rowH);

        // Name label
        ctx.fillStyle = "rgba(243, 244, 246, 0.9)";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(item.contentType, leftMargin - 15, y + (rowH / 2) + 4);

        // Grouped bar logic: get maximum score in GPT family and Gemini family
        let gptScore = 0;
        let geminiScore = 0;

        [item.rank1, item.rank2, item.rank3].forEach(r => {
            if (!r || r.model === "N/A") return;
            if (isGptFamily(r.model)) gptScore = Math.max(gptScore, r.score);
            if (isGeminiFamily(r.model)) geminiScore = Math.max(geminiScore, r.score);
        });

        const barH = 6;
        const spacing = 3;

        // Draw GPT bar
        const gptW = (gptScore / 100) * plotW * progress;
        ctx.fillStyle = "#3B82F6";
        ctx.fillRect(leftMargin, y + (rowH / 2) - barH - (spacing / 2), gptW, barH);

        // Draw Gemini bar
        const geminiW = (geminiScore / 100) * plotW * progress;
        ctx.fillStyle = "#10B981";
        ctx.fillRect(leftMargin, y + (rowH / 2) + (spacing / 2), geminiW, barH);

        // Draw percentage text metrics
        ctx.font = "bold 9px 'Courier New', Courier, monospace";
        ctx.textAlign = "left";
        
        if (gptScore > 0) {
            ctx.fillStyle = "#60A5FA";
            ctx.fillText(gptScore + "%", leftMargin + gptW + 5, y + (rowH / 2) - 1);
        }
        if (geminiScore > 0) {
            ctx.fillStyle = "#34D399";
            ctx.fillText(geminiScore + "%", leftMargin + geminiW + 5, y + (rowH / 2) + 7);
        }
    });
}

function triggerCanvasAnimation() {
    if (canvasAnimFrame) cancelAnimationFrame(canvasAnimFrame);

    let start = null;
    const duration = 1200;

    function frame(time) {
        if (!start) start = time;
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1.0);
        
        // Easing: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        
        renderCanvasChart(ease);

        if (progress < 1.0) {
            canvasAnimFrame = requestAnimationFrame(frame);
        }
    }

    canvasAnimFrame = requestAnimationFrame(frame);
}

// ==========================================================================
// 7. VIEW TRANSITIONS & TABS
// ==========================================================================

function updateViewport() {
    renderKPIs();
    renderFilterPills();
    renderMainViews();
    triggerCanvasAnimation();
}

function setupTabsAndSelectors() {
    const tabs = document.querySelectorAll(".source-tab-btn");
    const indicator = document.querySelector(".tab-sliding-indicator");

    function positionIndicator(btn) {
        if (!btn) return;
        indicator.style.width = btn.offsetWidth + "px";
        indicator.style.left = btn.offsetLeft + "px";
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            positionIndicator(tab);

            // Change Active Source
            activeSource = tab.getAttribute("data-source");
            activeDataset = pipelineData[activeSource];
            
            // Reset filter
            selectedFilterModel = "all";

            // Trigger updates
            updateViewport();
        });
    });

    // Initialize position
    const activeBtn = document.querySelector(".source-tab-btn.active");
    positionIndicator(activeBtn);

    window.addEventListener("resize", () => {
        const btn = document.querySelector(".source-tab-btn.active");
        positionIndicator(btn);
    });

    // View Toggles (Grid vs Table)
    const btnGrid = document.getElementById("btn-grid-view");
    const btnTable = document.getElementById("btn-table-view");
    const gridPanelEl = document.getElementById("grid-view-panel");
    const tablePanelEl = document.getElementById("table-view-panel");

    btnGrid.addEventListener("click", () => {
        btnTable.classList.remove("active");
        btnGrid.classList.add("active");
        tablePanelEl.classList.add("hidden");
        gridPanelEl.classList.remove("hidden");
        viewMode = "grid";
        renderMainViews();
    });

    btnTable.addEventListener("click", () => {
        btnGrid.classList.remove("active");
        btnTable.classList.add("active");
        gridPanelEl.classList.add("hidden");
        tablePanelEl.classList.remove("hidden");
        viewMode = "table";
        renderMainViews();
    });
}

// Set header date dynamically
function initializeLiveDate() {
    const el = document.getElementById("live-date");
    if (!el) return;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date("2026-06-08").toLocaleDateString('en-US', options);
    el.textContent = dateStr;
}

// Bind live search text queries
function setupSearch() {
    searchInput.addEventListener("input", () => {
        renderMainViews();
    });
}

// ==========================================================================
// 8. APP BOOTSTRAPPING
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
    processRawData();
    activeDataset = pipelineData.consensus;
    
    initializeLiveDate();
    setupTabsAndSelectors();
    setupSearch();
    updateViewport();
});
