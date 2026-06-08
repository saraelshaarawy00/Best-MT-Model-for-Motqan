/**
 * MT Model Intelligence Report — Arabic Localization
 * SaaS Dashboard Controller & Data Pipeline
 * 
 * NEW ARCHITECTURE:
 * Content Type -> Translation Profile -> Language Bucket -> Engine Selection
 */

// ==========================================================================
// 1. ROUTING CONFIGURATION - NEW ARCHITECTURE
// ==========================================================================

/**
 * STEP 1: Content Type -> Translation Profile Mapping
 */
const CONTENT_TYPE_TO_PROFILE = {
    "General": "Balanced",
    "General Science": "Quality",
    "Heavy Machinery": "Quality",
    "Hospitality Services": "Balanced",
    "Information Technology": "Quality",
    "Insurance": "Quality",
    "Legal": "Quality",
    "Life Science": "Quality",
    "Literature": "Balanced",
    "Manufacturing": "Quality",
    "Marketing & Advertising": "Balanced",
    "Medical & Healthcare": "Quality",
    "Medical Devices & Instruments": "Quality",
    "Medicine": "Quality",
    "Military & Defense": "Quality",
    "Mining & Petroleum": "Quality",
    "Networks": "Quality",
    "NGOs": "Balanced",
    "Nursing": "Quality",
    "Other": "Balanced",
    "Patents": "Quality",
    "Patient Education": "Balanced",
    "Pharmaceuticals": "Quality",
    "Physical Therapy": "Quality",
    "Publishing, Printing & Packaging": "Balanced",
    "Real Estate & Properties": "Balanced",
    "Religion & Religious Studies": "Balanced",
    "Security & International Affairs": "Quality",
    "Shipping & Maritime": "Quality",
    "Social & Human Services": "Balanced",
    "Software UA": "Quality",
    "Software UI": "Speed",
    "Sports": "Speed",
    "Technical & Scientific": "Quality",
    "Telecommunications": "Quality",
    "Training & E-learning": "Balanced",
    "Transportation & Logistics": "Quality",
    "Veterinary Medicine": "Quality",
    "Wholesale & Retail Trade": "Balanced"
};

/**
 * STEP 2: Language Bucket Definitions
 * Each bucket has mapped engines for each Translation Profile
 */
const LANGUAGE_BUCKETS = {
    "RTL": {
        "Quality": { engine: "GPT-5.5 Pro", score: 85 },
        "Balanced": { engine: "GPT-5.5", score: 75 },
        "Speed": { engine: "GPT-5.4 Mini", score: 65 }
    },
    "CJK": {
        "Quality": { engine: "DeepSeek Premium", score: 88 },
        "Balanced": { engine: "Gemini 3.1 Pro", score: 78 },
        "Speed": { engine: "Gemini 3 Flash", score: 68 }
    },
    "European": {
        "Quality": { engine: "GPT-5.5 Pro", score: 82 },
        "Balanced": { engine: "Gemini 3.1 Pro", score: 76 },
        "Speed": { engine: "GPT-5.4", score: 62 }
    },
    "Others": {
        "Quality": { engine: "GPT-5.5", score: 80 },
        "Balanced": { engine: "Gemini 3 Flash", score: 72 },
        "Speed": { engine: "GPT-5.4 Mini", score: 60 }
    }
};

/**
 * Available language buckets for user selection
 */
const AVAILABLE_LANGUAGE_BUCKETS = ["RTL", "CJK", "European", "Others"];

/**
 * Translation Profile descriptions
 */
const PROFILE_DESCRIPTIONS = {
    "Quality": "Maximum accuracy & compliance. Prioritizes precision over speed. Best for legal, medical, technical content.",
    "Balanced": "Equilibrium between speed and quality. Suitable for marketing, creative, general content.",
    "Speed": "Fast turnaround with acceptable quality. For UI strings, sports commentary, time-sensitive content."
};

// ==========================================================================
// 2. DOMAIN CATEGORIES (RETAINED FOR UI GROUPING)
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

// ==========================================================================
// 3. NEW ROUTING ENGINE & SIMULATOR
// ==========================================================================

/**
 * Route a Content Type + Language Bucket combination to the optimal engine
 */
function routeTranslation(contentType, languageBucket) {
    const profile = CONTENT_TYPE_TO_PROFILE[contentType] || "Balanced";
    const engineData = LANGUAGE_BUCKETS[languageBucket][profile];
    
    if (!engineData) {
        return { engine: "N/A", score: 0, profile, bucket: languageBucket };
    }
    
    return {
        engine: engineData.engine,
        score: engineData.score,
        profile,
        bucket: languageBucket,
        description: PROFILE_DESCRIPTIONS[profile]
    };
}

/**
 * Simulate routing for all Content Types across a Language Bucket
 */
function simulateLanguageBucketRouting(languageBucket) {
    return Object.keys(CONTENT_TYPE_TO_PROFILE).map(contentType => {
        const routing = routeTranslation(contentType, languageBucket);
        return {
            contentType,
            category: DOMAIN_CATEGORIES[contentType] || "Other",
            profile: routing.profile,
            bucket: routing.bucket,
            engine: routing.engine,
            score: routing.score,
            topEngine: routing.engine,
            topScore: routing.score,
            rationale: routing.description
        };
    });
}

/**
 * Generate consensus across all language buckets
 */
function generateConsensusRouting() {
    const masterContentTypes = Object.keys(CONTENT_TYPE_TO_PROFILE);
    
    return masterContentTypes.map(contentType => {
        const profile = CONTENT_TYPE_TO_PROFILE[contentType];
        const routingsByBucket = {};
        
        AVAILABLE_LANGUAGE_BUCKETS.forEach(bucket => {
            const engineData = LANGUAGE_BUCKETS[bucket][profile];
            routingsByBucket[bucket] = {
                engine: engineData.engine,
                score: engineData.score
            };
        });
        
        let topScore = 0;
        let topEngine = "N/A";
        Object.values(routingsByBucket).forEach(routing => {
            if (routing.score > topScore) {
                topScore = routing.score;
                topEngine = routing.engine;
            }
        });
        
        return {
            contentType,
            category: DOMAIN_CATEGORIES[contentType] || "Other",
            profile,
            routingsByBucket,
            topEngine,
            topScore,
            rationale: PROFILE_DESCRIPTIONS[profile]
        };
    });
}

// ==========================================================================
// 4. UI STATE & PIPELINE MANAGEMENT
// ==========================================================================

let activeSource = "consensus";
let viewMode = "grid";
let selectedFilterProfile = "all";

const pipelineData = {
    consensus: [],
    RTL: [],
    CJK: [],
    European: [],
    Others: []
};

const MASTER_CONTENT_TYPES = Object.keys(DOMAIN_CATEGORIES);

function getNormalizedType(type) {
    const raw = type.trim().toLowerCase();
    
    const normalizations = {
        "transportation & logistics services": "Transportation & Logistics",
        "transportation & logistics": "Transportation & Logistics",
        "patients education": "Patient Education",
        "patient education": "Patient Education",
        "marketing&advertising": "Marketing & Advertising",
        "marketing & advertising": "Marketing & Advertising",
        "publishing, printing&packaging": "Publishing, Printing & Packaging",
        "publishing, printing & packaging": "Publishing, Printing & Packaging",
        "real estate&properties": "Real Estate & Properties",
        "real estate & properties": "Real Estate & Properties",
        "religion&religious studies": "Religion & Religious Studies",
        "religion & religious studies": "Religion & Religious Studies",
        "security &international affairs": "Security & International Affairs",
        "security & international affairs": "Security & International Affairs",
        "shipping &maritime": "Shipping & Maritime",
        "shipping & maritime": "Shipping & Maritime",
        "wholesale &retail trade": "Wholesale & Retail Trade",
        "wholesale & retail trade": "Wholesale & Retail Trade",
        "technical &scientific": "Technical & Scientific",
        "technical & scientific": "Technical & Scientific"
    };
    
    if (normalizations[raw]) return normalizations[raw];
    
    for (const master of MASTER_CONTENT_TYPES) {
        if (master.toLowerCase() === raw) {
            return master;
        }
    }
    return type;
}

function processRoutingData() {
    pipelineData.consensus = generateConsensusRouting();
    
    AVAILABLE_LANGUAGE_BUCKETS.forEach(bucket => {
        pipelineData[bucket] = simulateLanguageBucketRouting(bucket);
    });
}

// ==========================================================================
// 5. UI RENDERING ENGINE
// ==========================================================================

const searchInput = document.getElementById("search-input");
const tableBody = document.getElementById("table-body");
const gridPanel = document.getElementById("grid-view-panel");
const hoverTooltip = document.getElementById("table-hover-tooltip");
const tooltipModel = document.getElementById("tooltip-model");
const tooltipText = document.getElementById("tooltip-desc-text");

let activeDataset = [];

function isGptFamily(engine) {
    return engine && engine.startsWith("GPT");
}

function isGeminiFamily(engine) {
    return engine && engine.startsWith("Gemini");
}

function isDeepSeekFamily(engine) {
    return engine && engine.startsWith("DeepSeek");
}

function getEngineFamily(engine) {
    if (isGptFamily(engine)) return "gpt";
    if (isGeminiFamily(engine)) return "gemini";
    if (isDeepSeekFamily(engine)) return "deepseek";
    return "neutral";
}

function renderKPIs() {
    let qualityCount = 0;
    let balancedCount = 0;
    let speedCount = 0;
    let maxScore = 0;
    let sumScore = 0;

    activeDataset.forEach(item => {
        if (item.profile === "Quality") qualityCount++;
        else if (item.profile === "Balanced") balancedCount++;
        else if (item.profile === "Speed") speedCount++;
        
        const score = item.topScore || 0;
        if (score > maxScore) maxScore = score;
        sumScore += score;
    });

    document.getElementById("kpi-gpt-wins").textContent = qualityCount;
    document.getElementById("kpi-gemini-wins").textContent = balancedCount;
    document.getElementById("kpi-max-score").textContent = maxScore + "%";
    document.getElementById("kpi-avg-score").textContent = activeDataset.length > 0 ? Math.round(sumScore / activeDataset.length) + "%" : "0%";
    document.getElementById("kpi-dominant-model").textContent = activeDataset.length > 0 ? activeDataset[0].topEngine : "N/A";
}

function getFilteredData() {
    let result = [...activeDataset];

    const query = searchInput.value.toLowerCase().trim();
    if (query !== "") {
        result = result.filter(item => 
            item.contentType.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query) ||
            (item.topEngine && item.topEngine.toLowerCase().includes(query)) ||
            item.profile.toLowerCase().includes(query)
        );
    }

    if (selectedFilterProfile !== "all") {
        result = result.filter(item => item.profile === selectedFilterProfile);
    }

    return result;
}

function renderFilterPills() {
    const container = document.getElementById("model-filter-pills");
    
    const profiles = new Set();
    activeDataset.forEach(item => {
        if (item.profile) profiles.add(item.profile);
    });

    const sortedProfiles = ["Quality", "Balanced", "Speed"].filter(p => profiles.has(p));

    let pillsHTML = `<button class="pill-btn ${selectedFilterProfile === "all" ? "active" : ""}" data-profile="all">All Profiles</button>`;
    
    sortedProfiles.forEach(profile => {
        const isActive = selectedFilterProfile === profile;
        pillsHTML += `<button class="pill-btn ${isActive ? "active" : ""}" data-profile="${profile}">${profile}</button>`;
    });

    container.innerHTML = pillsHTML;

    container.querySelectorAll(".pill-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            container.querySelectorAll(".pill-btn").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            selectedFilterProfile = btn.getAttribute("data-profile");
            renderMainViews();
        });
    });
}

function renderMainViews() {
    const filtered = getFilteredData();

    // 1. Grid View
    gridPanel.innerHTML = "";
    if (filtered.length === 0) {
        gridPanel.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--color-gpt);"></i>
                No content types match the selected filters.
            </div>
        `;
    } else {
        filtered.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "saas-card fade-in-up";
            card.style.setProperty("--order", index);

            const engineFamily = getEngineFamily(item.topEngine);
            const familyClass = `badge-${engineFamily}`;

            let bucketsHTML = "";
            if (activeSource === "consensus" && item.routingsByBucket) {
                const bucketEntries = Object.entries(item.routingsByBucket);
                bucketEntries.forEach(([bucket, routing]) => {
                    const bucketFamily = getEngineFamily(routing.engine);
                    const colorVar = bucketFamily === "gpt" ? "var(--color-gpt)" : 
                                     bucketFamily === "gemini" ? "var(--color-gemini)" : "#A78BFA";
                    bucketsHTML += `
                        <div class="mini-chart-row">
                            <span class="mini-model-name monospace-font">${bucket}</span>
                            <div class="mini-progress-bg">
                                <div class="mini-progress-fill" style="background-color: ${colorVar}" data-width="${routing.score}%"></div>
                            </div>
                            <span class="mini-score-val monospace-font">${routing.score}%</span>
                        </div>
                    `;
                });
            } else if (item.bucket) {
                const colorVar = engineFamily === "gpt" ? "var(--color-gpt)" : 
                                 engineFamily === "gemini" ? "var(--color-gemini)" : "#A78BFA";
                bucketsHTML = `
                    <div class="mini-chart-row">
                        <span class="mini-model-name monospace-font">${item.bucket}</span>
                        <div class="mini-progress-bg">
                            <div class="mini-progress-fill" style="background-color: ${colorVar}" data-width="${item.score}%"></div>
                        </div>
                        <span class="mini-score-val monospace-font">${item.score}%</span>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="card-top-row">
                    <span class="card-category">${item.category}</span>
                    <span class="glow-winner-badge ${familyClass}">${item.topEngine}</span>
                </div>
                <div class="card-title-section">
                    <h3 class="card-domain-name">${item.contentType}</h3>
                    <div class="card-metric-block">
                        <span class="card-score-value monospace-font">${item.topScore}%</span>
                        <span class="card-confidence-badge conf-${item.profile.toLowerCase()}">${item.profile}</span>
                    </div>
                </div>
                <div class="card-mini-chart">
                    ${bucketsHTML}
                </div>
                <p class="card-insight-row">${item.rationale}</p>
            `;

            gridPanel.appendChild(card);
        });
    }

    // 2. Table View
    tableBody.innerHTML = "";
    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 4rem; color: var(--text-secondary);">
                    No records match filter conditions.
                </td>
            </tr>
        `;
    } else {
        filtered.forEach((item, index) => {
            const row = document.createElement("tr");
            row.className = "fade-in-up";
            row.style.setProperty("--order", index);

            const engineFamily = getEngineFamily(item.topEngine);
            const familyClass = `badge-${engineFamily}`;

            let detailsHTML = "";
            if (activeSource === "consensus" && item.routingsByBucket) {
                detailsHTML = `
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem;">
                        ${Object.entries(item.routingsByBucket).map(([bucket, routing]) => `
                            <span style="background: rgba(255, 255, 255, 0.05); padding: 0.2rem 0.5rem; border-radius: 4px;">
                                ${bucket}: ${routing.engine} (${routing.score}%)
                            </span>
                        `).join("")}
                    </div>
                `;
            } else {
                detailsHTML = `<span style="color: var(--text-secondary);">${item.bucket || "N/A"}</span>`;
            }

            row.innerHTML = `
                <td>
                    <div class="tbl-domain-name">${item.contentType}</div>
                    <div class="tbl-domain-category">${item.category}</div>
                </td>
                <td class="centered"><span class="card-confidence-badge conf-${item.profile.toLowerCase()}">${item.profile}</span></td>
                <td class="tbl-score-cell">
                    <div class="tbl-score-label-row">
                        <span class="tbl-model-name monospace-font">${item.topEngine}</span>
                        <span class="tbl-model-pct monospace-font">${item.topScore}%</span>
                    </div>
                </td>
                <td class="tbl-score-cell">${detailsHTML}</td>
                <td class="centered"><span class="glow-winner-badge ${familyClass}">${item.topEngine}</span></td>
            `;

            row.addEventListener("mouseenter", (e) => triggerTooltip(e, item));
            row.addEventListener("mousemove", moveTooltip);
            row.addEventListener("mouseleave", dismissTooltip);

            tableBody.appendChild(row);
        });
    }

    setTimeout(() => {
        const fills = document.querySelectorAll(".mini-progress-fill");
        fills.forEach(fill => {
            fill.style.width = fill.getAttribute("data-width");
        });
    }, 60);
}

// ==========================================================================
// 6. TOOLTIP ACTIONS
// ==========================================================================

function triggerTooltip(e, item) {
    tooltipText.textContent = item.rationale;
    tooltipModel.textContent = item.topEngine;
    
    const family = getEngineFamily(item.topEngine);
    if (family === "gpt") {
        tooltipModel.style.backgroundColor = "var(--color-gpt-bg)";
        tooltipModel.style.color = "#60A5FA";
        tooltipModel.style.border = "1px solid rgba(59, 130, 246, 0.3)";
        hoverTooltip.style.borderColor = "var(--color-gpt)";
    } else if (family === "gemini") {
        tooltipModel.style.backgroundColor = "var(--color-gemini-bg)";
        tooltipModel.style.color = "#34D399";
        tooltipModel.style.border = "1px solid rgba(16, 185, 129, 0.3)";
        hoverTooltip.style.borderColor = "var(--color-gemini)";
    } else if (family === "deepseek") {
        tooltipModel.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
        tooltipModel.style.color = "#A78BFA";
        tooltipModel.style.border = "1px solid rgba(139, 92, 246, 0.3)";
        hoverTooltip.style.borderColor = "#A78BFA";
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
// 7. CANVAS CHART DRAWER
// ==========================================================================

let canvasAnimFrame = null;

function renderCanvasChart(progress = 1.0) {
    const canvas = document.getElementById("decisive-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const sorted = [...activeDataset]
        .sort((a, b) => b.topScore - a.topScore)
        .slice(0, 15);

    const leftMargin = 220;
    const rightMargin = 50;
    const topMargin = 30;
    const bottomMargin = 20;
    
    const plotW = w - leftMargin - rightMargin;
    const plotH = h - topMargin - bottomMargin;
    const rowH = plotH / 15;

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

        ctx.fillStyle = "rgba(243, 244, 246, 0.9)";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(item.contentType, leftMargin - 15, y + (rowH / 2) + 4);

        const barH = 6;
        const barW = ((item.topScore || 0) / 100) * plotW * progress;

        const profileColor = item.profile === "Quality" ? "#3B82F6" : 
                            item.profile === "Balanced" ? "#10B981" : "#F59E0B";
        
        ctx.fillStyle = profileColor;
        ctx.fillRect(leftMargin, y + (rowH / 2) - barH / 2, barW, barH);

        ctx.font = "bold 9px 'Courier New', Courier, monospace";
        ctx.textAlign = "left";
        ctx.fillStyle = profileColor;
        
        if ((item.topScore || 0) > 0) {
            ctx.fillText((item.topScore || 0) + "%", leftMargin + barW + 5, y + (rowH / 2) + 3);
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
        const ease = 1 - Math.pow(1 - progress, 3);
        
        renderCanvasChart(ease);

        if (progress < 1.0) {
            canvasAnimFrame = requestAnimationFrame(frame);
        }
    }

    canvasAnimFrame = requestAnimationFrame(frame);
}

// ==========================================================================
// 8. VIEW TRANSITIONS & TABS
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

            activeSource = tab.getAttribute("data-source");
            activeDataset = pipelineData[activeSource] || [];
            selectedFilterProfile = "all";

            updateViewport();
        });
    });

    const activeBtn = document.querySelector(".source-tab-btn.active");
    positionIndicator(activeBtn);

    window.addEventListener("resize", () => {
        const btn = document.querySelector(".source-tab-btn.active");
        positionIndicator(btn);
    });

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

function initializeLiveDate() {
    const el = document.getElementById("live-date");
    if (!el) return;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date("2026-06-08").toLocaleDateString('en-US', options);
    el.textContent = dateStr;
}

function setupSearch() {
    searchInput.addEventListener("input", () => {
        renderMainViews();
    });
}

// ==========================================================================
// 9. APP BOOTSTRAPPING
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
    processRoutingData();
    activeDataset = pipelineData.consensus;
    
    initializeLiveDate();
    setupTabsAndSelectors();
    setupSearch();
    updateViewport();
});
