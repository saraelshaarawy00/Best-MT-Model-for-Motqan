/**
 * MT Routing Intelligence Report — Two-Variant Strategy Matrix Backend
 * Language Bucket × Translation Profile × Engine Selection
 * 
 * ARCHITECTURE:
 * 1. Content Type → Translation Profile (Quality, Balanced, Speed)
 * 2. Language Bucket (EU, CJK, RTL, Others) → Optimal Engine per Profile
 * 3. Strategy Variant (A or B) determines content type tier assignments
 */

// ==========================================================================
// 1. STRATEGY VARIANT A: STANDARD LOGIC
// ==========================================================================

const STRATEGY_VARIANT_A = {
    // Quality Profile Tiers
    "Legal": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Life Science": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Medical & Healthcare": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Medical Devices & Instruments": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Medicine": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Military & Defense": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Patents": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Religion & Religious Studies": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Security & International Affairs": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    
    // Speed Profile Tiers
    "Networks": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },
    "Other": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },
    "Software UI": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },
    "Sports": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },
    "Telecommunications": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },
    "Transportation & Logistics": { EU: "GPT-5.4 Nano", CJK: "Gemini 3.1 Flash Lite", RTL: "GPT-5.4 Nano", Others: "Gemini 3.1 Flash Lite" },

    // Balanced Profile Tiers (Default for all other content types)
    "default_balanced": { EU: "GPT-5.4", CJK: "Gemini 3 Flash", RTL: "GPT-5.4 Mini", Others: "Gemini 3 Flash" }
};

// ==========================================================================
// 2. STRATEGY VARIANT B: ALTERNATIVE LOGIC (Extended Quality Coverage)
// ==========================================================================

const STRATEGY_VARIANT_B = {
    ...STRATEGY_VARIANT_A,
    "Nursing": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Patient Education": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Physical Therapy": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Veterinary Medicine": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" },
    "Software UA": { EU: "GPT-5.5 Pro", CJK: "Gemini 3.1 Pro", RTL: "GPT-5.5", Others: "Gemini 3.1 Pro" }
};

// ==========================================================================
// 3. PROFILE ASSIGNMENT & STRATEGY SELECTION
// ==========================================================================

let activeStrategy = "variant_a";

/**
 * Get translation profile for content type based on active strategy
 */
function getTranslationProfile(contentType) {
    const strategyMap = activeStrategy === "variant_a" ? STRATEGY_VARIANT_A : STRATEGY_VARIANT_B;
    
    // Check if content type has explicit profile assignment
    if (strategyMap[contentType]) {
        // Content type is explicitly in Quality or Speed tier
        const engineData = strategyMap[contentType];
        if (engineData.EU && engineData.CJK && engineData.RTL && engineData.Others) {
            // Determine profile by engine name patterns
            if (engineData.EU.includes("Pro")) return "Quality";
            if (engineData.EU.includes("Nano") || engineData.EU.includes("Lite")) return "Speed";
            return "Balanced";
        }
    }
    
    // Default to Balanced
    return "Balanced";
}

/**
 * Route content type + language bucket → optimal engine
 */
function routeTranslation(contentType, languageBucket = "EU") {
    const strategyMap = activeStrategy === "variant_a" ? STRATEGY_VARIANT_A : STRATEGY_VARIANT_B;
    const profile = getTranslationProfile(contentType);
    
    // Get routing matrix for content type, fallback to default_balanced
    const routingMatrix = strategyMap[contentType] || strategyMap.default_balanced;
    const engine = routingMatrix[languageBucket] || routingMatrix["EU"] || "N/A";
    
    // Calculate quality score based on engine tier
    let score = 75;
    if (engine.includes("Pro")) score = 88;
    else if (engine.includes("Flash")) score = 76;
    else if (engine.includes("Mini")) score = 65;
    else if (engine.includes("Nano") || engine.includes("Lite")) score = 58;
    
    // Adjust score slightly by bucket for variance
    const bucketAdjustment = { EU: 0, CJK: 2, RTL: -1, Others: 0 };
    score += (bucketAdjustment[languageBucket] || 0);
    
    return {
        engine,
        score: Math.min(100, Math.max(0, score)),
        profile,
        bucket: languageBucket,
        rationale: `[${profile}] ${engine} optimized for ${languageBucket} translation`
    };
}

// ==========================================================================
// 4. ENGINE METADATA & CLASSIFICATION
// ==========================================================================

const ENGINE_METADATA = {
    "GPT-5.5 Pro": { family: "gpt", tier: "pro", cost: "$$$", latency: "medium", quality: "expert" },
    "GPT-5.5": { family: "gpt", tier: "standard", cost: "$$", latency: "medium", quality: "high" },
    "GPT-5.4": { family: "gpt", tier: "standard", cost: "$$", latency: "fast", quality: "high" },
    "GPT-5.4 Mini": { family: "gpt", tier: "lite", cost: "$", latency: "fast", quality: "good" },
    "GPT-5.4 Nano": { family: "gpt", tier: "nano", cost: "$", latency: "very-fast", quality: "fair" },
    "Gemini 3.1 Pro": { family: "gemini", tier: "pro", cost: "$$$", latency: "medium", quality: "expert" },
    "Gemini 3 Flash": { family: "gemini", tier: "standard", cost: "$$", latency: "fast", quality: "high" },
    "Gemini 3.1 Flash": { family: "gemini", tier: "standard", cost: "$$", latency: "fast", quality: "high" },
    "Gemini 3.1 Flash Lite": { family: "gemini", tier: "lite", cost: "$", latency: "very-fast", quality: "fair" }
};

// ==========================================================================
// 5. ALL CONTENT TYPES (Master List)
// ==========================================================================

const ALL_CONTENT_TYPES = [
    "General",
    "General Science",
    "Heavy Machinery",
    "Hospitality Services",
    "Information Technology",
    "Insurance",
    "Legal",
    "Life Science",
    "Literature",
    "Manufacturing",
    "Marketing & Advertising",
    "Medical & Healthcare",
    "Medical Devices & Instruments",
    "Medicine",
    "Military & Defense",
    "Mining & Petroleum",
    "Networks",
    "NGOs",
    "Nursing",
    "Other",
    "Patents",
    "Patient Education",
    "Pharmaceuticals",
    "Physical Therapy",
    "Publishing, Printing & Packaging",
    "Real Estate & Properties",
    "Religion & Religious Studies",
    "Security & International Affairs",
    "Shipping & Maritime",
    "Social & Human Services",
    "Software UA",
    "Software UI",
    "Sports",
    "Technical & Scientific",
    "Telecommunications",
    "Training & E-learning",
    "Transportation & Logistics",
    "Veterinary Medicine",
    "Wholesale & Retail Trade"
];

// ==========================================================================
// 6. DATA GENERATION & FILTERING
// ==========================================================================

let activeSource = "consensus";
let viewMode = "grid";
let selectedFilterProfile = "all";
let activeDataset = [];

const LANGUAGE_BUCKETS = ["EU", "CJK", "RTL", "Others"];

/**
 * Generate routing data for all content types
 */
function generateRoutingDataset(bucketFilter = null) {
    return ALL_CONTENT_TYPES.map(contentType => {
        const profile = getTranslationProfile(contentType);
        
        if (bucketFilter) {
            // Single bucket view
            const routing = routeTranslation(contentType, bucketFilter);
            return {
                contentType,
                profile,
                bucket: bucketFilter,
                engine: routing.engine,
                score: routing.score,
                topEngine: routing.engine,
                topScore: routing.score,
                rationale: routing.rationale,
                routingsByBucket: null,
                strategy: activeStrategy
            };
        } else {
            // Consensus (all buckets)
            const routingsByBucket = {};
            LANGUAGE_BUCKETS.forEach(bucket => {
                const routing = routeTranslation(contentType, bucket);
                routingsByBucket[bucket] = {
                    engine: routing.engine,
                    score: routing.score
                };
            });
            
            // Find top engine across all buckets
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
                profile,
                routingsByBucket,
                topEngine,
                topScore,
                rationale: `[${profile}] Best engine: ${topEngine} (${topScore}%)`,
                strategy: activeStrategy
            };
        }
    });
}

/**
 * Normalize content type names for matching
 */
function getNormalizedType(type) {
    const raw = type.trim().toLowerCase();
    
    for (const master of ALL_CONTENT_TYPES) {
        if (master.toLowerCase() === raw) {
            return master;
        }
    }
    return type;
}

/**
 * Apply search and filter to dataset
 */
function getFilteredData() {
    let result = [...activeDataset];

    const searchInput = document.getElementById("search-input");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    
    if (query !== "") {
        result = result.filter(item => 
            item.contentType.toLowerCase().includes(query) || 
            item.profile.toLowerCase().includes(query) ||
            (item.topEngine && item.topEngine.toLowerCase().includes(query))
        );
    }

    if (selectedFilterProfile !== "all") {
        result = result.filter(item => item.profile === selectedFilterProfile);
    }

    return result;
}

// ==========================================================================
// 7. UI RENDERING ENGINE
// ==========================================================================

const hoverTooltip = document.getElementById("table-hover-tooltip");
const tooltipModel = document.getElementById("tooltip-model");
const tooltipText = document.getElementById("tooltip-desc-text");

function isGptFamily(engine) {
    return engine && (engine.startsWith("GPT") || engine.includes("gpt"));
}

function isGeminiFamily(engine) {
    return engine && (engine.startsWith("Gemini") || engine.includes("gemini"));
}

function getEngineFamily(engine) {
    if (isGptFamily(engine)) return "gpt";
    if (isGeminiFamily(engine)) return "gemini";
    return "neutral";
}

function getEngineMetadata(engine) {
    return ENGINE_METADATA[engine] || { family: "neutral", tier: "standard", cost: "$$", latency: "medium", quality: "good" };
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

    const avgScore = activeDataset.length > 0 ? Math.round(sumScore / activeDataset.length) : 0;

    document.getElementById("kpi-gpt-wins").textContent = qualityCount;
    document.getElementById("kpi-gemini-wins").textContent = balancedCount;
    document.getElementById("kpi-max-score").textContent = maxScore + "%";
    document.getElementById("kpi-avg-score").textContent = avgScore + "%";
    document.getElementById("kpi-dominant-model").textContent = activeDataset.length > 0 ? activeDataset[0].topEngine : "N/A";
    document.getElementById("kpi-active-variant").textContent = activeStrategy === "variant_a" ? "Variant A" : "Variant B";
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
    const gridPanel = document.getElementById("grid-view-panel");
    const tableBody = document.getElementById("table-body");

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
            const metadata = getEngineMetadata(item.topEngine);

            let bucketsHTML = "";
            if (activeSource === "consensus" && item.routingsByBucket) {
                const bucketEntries = Object.entries(item.routingsByBucket);
                bucketEntries.forEach(([bucket, routing]) => {
                    const bucketFamily = getEngineFamily(routing.engine);
                    const colorVar = bucketFamily === "gpt" ? "var(--color-gpt)" : "var(--color-gemini)";
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
                const colorVar = engineFamily === "gpt" ? "var(--color-gpt)" : "var(--color-gemini)";
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

            const costBadge = metadata.cost === "$$$" ? "cost-premium" : metadata.cost === "$$" ? "cost-standard" : "cost-lite";
            const latencyIcon = metadata.latency === "very-fast" ? "⚡" : metadata.latency === "fast" ? "⏱" : "⏲";

            card.innerHTML = `
                <div class="card-top-row">
                    <span class="card-category">${item.profile}</span>
                    <span class="glow-winner-badge ${familyClass}">${item.topEngine}</span>
                </div>
                <div class="card-title-section">
                    <h3 class="card-domain-name">${item.contentType}</h3>
                    <div class="card-metric-block">
                        <span class="card-score-value monospace-font">${item.topScore}%</span>
                        <span class="card-tier-badge tier-${metadata.tier}">${metadata.quality}</span>
                    </div>
                </div>
                <div class="card-metadata-row">
                    <span class="metadata-item ${costBadge}">${metadata.cost} Cost</span>
                    <span class="metadata-item latency-item">${latencyIcon} ${metadata.latency}</span>
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
            const metadata = getEngineMetadata(item.topEngine);

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
                    <div class="tbl-domain-category">${metadata.quality}</div>
                </td>
                <td class="centered"><span class="card-confidence-badge conf-${item.profile.toLowerCase()}">${item.profile}</span></td>
                <td class="tbl-score-cell">
                    <div class="tbl-score-label-row">
                        <span class="tbl-model-name monospace-font">${item.topEngine}</span>
                        <span class="tbl-model-pct monospace-font">${item.topScore}%</span>
                    </div>
                </td>
                <td class="tbl-score-cell">${detailsHTML}</td>
                <td class="centered"><span class="glow-winner-badge ${familyClass}">${metadata.cost}</span></td>
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
// 8. TOOLTIP ACTIONS
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
// 9. CANVAS CHART DRAWER
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
// 10. STRATEGY VARIANT SWITCHER
// ==========================================================================

function setupStrategyToggle() {
    const strategyBtns = document.querySelectorAll(".strategy-btn");
    const strategyDesc = document.getElementById("strategy-desc");

    strategyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            strategyBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeStrategy = btn.getAttribute("data-strategy");

            // Update description
            if (activeStrategy === "variant_a") {
                strategyDesc.innerHTML = `<p><strong>Variant A (Standard):</strong> Quality tier includes Legal, Medical, Patents, Military, Religion, Security domains. Speed tier focuses on Networks, Software UI, Sports, Telecommunications.</p>`;
            } else {
                strategyDesc.innerHTML = `<p><strong>Variant B (Extended Quality):</strong> Adds Nursing, Patient Education, Physical Therapy, Veterinary Medicine, and Software UA to Quality tier for medical/healthcare emphasis.</p>`;
            }

            // Reprocess data with new strategy
            activeDataset = activeSource === "consensus" 
                ? generateRoutingDataset() 
                : generateRoutingDataset(activeSource);
            
            selectedFilterProfile = "all";
            updateViewport();
        });
    });
}

// ==========================================================================
// 11. VIEW TRANSITIONS & TABS
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
            
            // Generate data for selected bucket
            if (activeSource === "consensus") {
                activeDataset = generateRoutingDataset();
            } else {
                activeDataset = generateRoutingDataset(activeSource);
            }
            
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
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            renderMainViews();
        });
    }
}

// ==========================================================================
// 12. APP BOOTSTRAPPING
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
    activeDataset = generateRoutingDataset();
    
    initializeLiveDate();
    setupStrategyToggle();
    setupTabsAndSelectors();
    setupSearch();
    updateViewport();
});
