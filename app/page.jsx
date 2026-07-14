"use client";
import { useState, useRef, useEffect } from "react";


const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Pinyon+Script&display=swap');
`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --rose-deep: #8B2252;
    --rose-mid: #C45C8A;
    --rose-soft: #E8A0BF;
    --blush: #F7D6E6;
    --blush-light: #FDF0F6;
    --cream: #FBF4EE;
    --gold: #C9973A;
    --gold-light: #E8C97A;
    --charcoal: #2A1A22;
    --warm-grey: #8A7077;
    --white: #FEFEFE;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(145deg, #FBF4EE 0%, #FDF0F6 40%, #FBF4EE 100%);
    position: relative;
    overflow-x: hidden;
  }

  /* Decorative background */
  .app::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(196,92,138,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .app::after {
    content: '';
    position: fixed;
    bottom: -200px; left: -200px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(251,244,238,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(196,92,138,0.12);
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }

  .nav-logo {
    font-family: 'Pinyon Script', cursive;
    font-size: 28px;
    color: var(--rose-deep);
    letter-spacing: 1px;
    line-height: 1;
  }

  .nav-tabs {
    display: flex; gap: 4px;
    background: rgba(232,160,191,0.15);
    border-radius: 50px;
    padding: 4px;
  }

  .nav-tab {
    padding: 7px 16px;
    border-radius: 50px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--warm-grey);
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .nav-tab.active {
    background: var(--rose-deep);
    color: white;
    box-shadow: 0 2px 12px rgba(139,34,82,0.25);
  }

  /* HERO */
  .hero {
    padding: 64px 24px 48px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(42px, 8vw, 72px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--rose-deep);
    margin-bottom: 8px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--rose-mid);
  }

  .hero-dedication {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 17px;
    color: var(--warm-grey);
    margin: 20px auto 0;
    max-width: 480px;
    line-height: 1.7;
    padding: 16px 24px;
    border-top: 1px solid rgba(196,92,138,0.2);
    border-bottom: 1px solid rgba(196,92,138,0.2);
  }

  .hero-dedication .heart {
    color: var(--rose-mid);
    font-style: normal;
  }

  /* SECTION */
  .section {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 20px 80px;
    position: relative;
    z-index: 1;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    color: var(--rose-deep);
    margin-bottom: 6px;
  }

  .section-sub {
    font-size: 14px;
    color: var(--warm-grey);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  /* CARDS / PANELS */
  .card {
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(232,160,191,0.25);
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 4px 24px rgba(139,34,82,0.06);
    backdrop-filter: blur(8px);
    margin-bottom: 20px;
  }

  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 500;
    color: var(--charcoal);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }

  /* FORM ELEMENTS */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }

  .form-grid.three { grid-template-columns: 1fr 1fr 1fr; }
  .form-grid.one { grid-template-columns: 1fr; }

  @media (max-width: 600px) {
    .form-grid, .form-grid.three { grid-template-columns: 1fr; }
    .nav-tabs { gap: 2px; }
    .nav-tab { padding: 6px 10px; font-size: 11px; }
  }

  .field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--warm-grey);
    margin-bottom: 7px;
    display: block;
  }

  .field-input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(247,214,230,0.2);
    border: 1.5px solid rgba(196,92,138,0.2);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--charcoal);
    transition: all 0.2s;
    outline: none;
    appearance: none;
  }
  .field-input:focus {
    border-color: var(--rose-mid);
    background: rgba(247,214,230,0.3);
    box-shadow: 0 0 0 3px rgba(196,92,138,0.1);
  }

  textarea.field-input {
    resize: vertical;
    min-height: 90px;
  }

  select.field-input {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C45C8A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  /* CHIP TOGGLES */
  .chips {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 4px;
  }

  .chip {
    padding: 7px 14px;
    border-radius: 50px;
    border: 1.5px solid rgba(196,92,138,0.25);
    background: transparent;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--warm-grey);
    transition: all 0.2s;
  }
  .chip.selected {
    background: var(--rose-deep);
    border-color: var(--rose-deep);
    color: white;
  }
  .chip:hover:not(.selected) {
    border-color: var(--rose-mid);
    color: var(--rose-mid);
  }

  /* BUTTON */
  .btn-primary {
    width: 100%;
    padding: 15px 28px;
    background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid));
    border: none;
    border-radius: 50px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: all 0.25s;
    box-shadow: 0 4px 20px rgba(139,34,82,0.25);
    position: relative;
    overflow: hidden;
  }
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(139,34,82,0.32);
  }
  .btn-primary:disabled {
    opacity: 0.65; cursor: not-allowed;
  }

  .btn-secondary {
    padding: 10px 20px;
    background: transparent;
    border: 1.5px solid var(--rose-mid);
    border-radius: 50px;
    color: var(--rose-mid);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover {
    background: var(--rose-mid);
    color: white;
  }

  /* LOADING */
  .loading-wrap {
    text-align: center;
    padding: 48px 0;
  }

  .loading-flowers {
    display: flex; justify-content: center; gap: 6px;
    margin-bottom: 20px;
  }

  .flower {
    width: 10px; height: 10px;
    background: var(--rose-mid);
    border-radius: 50%;
    animation: bloom 1.2s ease-in-out infinite;
  }
  .flower:nth-child(2) { animation-delay: 0.2s; background: var(--rose-soft); }
  .flower:nth-child(3) { animation-delay: 0.4s; background: var(--gold); }
  .flower:nth-child(4) { animation-delay: 0.6s; background: var(--rose-soft); }
  .flower:nth-child(5) { animation-delay: 0.8s; background: var(--rose-mid); }

  @keyframes bloom {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.6); opacity: 1; }
  }

  .loading-text {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 18px;
    color: var(--rose-mid);
  }

  /* RECIPE OUTPUT */
  .recipe-output {
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .recipe-header {
    display: flex; align-items: flex-start; gap: 16px;
    margin-bottom: 20px;
  }

  .recipe-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(139,34,82,0.2);
  }

  .recipe-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: var(--rose-deep);
    line-height: 1.2;
  }

  .recipe-badges {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 6px;
  }

  .badge {
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 500;
    background: rgba(247,214,230,0.5);
    color: var(--rose-deep);
    border: 1px solid rgba(196,92,138,0.2);
  }

  .badge.gold {
    background: rgba(201,151,58,0.12);
    color: var(--gold);
    border-color: rgba(201,151,58,0.2);
  }

  .recipe-prose {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: var(--charcoal);
    white-space: pre-wrap;
  }

  .recipe-prose h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 500;
    color: var(--rose-deep);
    margin: 20px 0 10px;
  }

  .recipe-prose ul, .recipe-prose ol {
    padding-left: 20px;
    margin: 6px 0;
  }

  .recipe-prose li {
    margin-bottom: 5px;
  }

  .recipe-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,92,138,0.25), transparent);
    margin: 24px 0;
  }

  /* WEEKLY PLANNER */
  .week-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 20px;
  }

  @media (max-width: 700px) {
    .week-grid { grid-template-columns: 1fr 1fr; }
  }

  .day-card {
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(232,160,191,0.2);
    border-radius: 14px;
    padding: 14px 10px;
    text-align: center;
    transition: all 0.2s;
  }

  .day-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139,34,82,0.1);
  }

  .day-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }

  .day-meal {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    color: var(--charcoal);
    line-height: 1.4;
  }

  /* CHAT / QA */
  .chat-messages {
    max-height: 420px;
    overflow-y: auto;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scrollbar-width: thin;
    scrollbar-color: rgba(196,92,138,0.3) transparent;
  }

  .message {
    padding: 14px 18px;
    border-radius: 18px;
    max-width: 88%;
    animation: fadeUp 0.3s ease;
    line-height: 1.65;
    font-size: 14.5px;
  }

  .message.user {
    background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid));
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 6px;
  }

  .message.ai {
    background: rgba(255,255,255,0.85);
    color: var(--charcoal);
    border: 1px solid rgba(232,160,191,0.25);
    align-self: flex-start;
    border-bottom-left-radius: 6px;
    white-space: pre-wrap;
  }

  .chat-input-row {
    display: flex; gap: 10px;
  }

  .chat-input {
    flex: 1;
    padding: 12px 18px;
    background: rgba(247,214,230,0.2);
    border: 1.5px solid rgba(196,92,138,0.2);
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--charcoal);
    outline: none;
  }
  .chat-input:focus {
    border-color: var(--rose-mid);
    background: rgba(247,214,230,0.35);
  }

  .btn-send {
    padding: 12px 22px;
    background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid));
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 12px rgba(139,34,82,0.2);
  }
  .btn-send:hover:not(:disabled) { transform: scale(1.06); }
  .btn-send:disabled { opacity: 0.5; cursor: not-allowed; }

  /* SHOPPING LIST */
  .shopping-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(232,160,191,0.15);
    font-size: 14px;
  }

  .shop-check {
    width: 18px; height: 18px;
    border-radius: 5px;
    border: 1.5px solid rgba(196,92,138,0.3);
    cursor: pointer;
    appearance: none;
    background: white;
    flex-shrink: 0;
    transition: all 0.15s;
  }
  .shop-check:checked {
    background: var(--rose-mid);
    border-color: var(--rose-mid);
  }

  /* FOOTER TRIBUTE */
  .tribute-footer {
    text-align: center;
    padding: 40px 24px;
    position: relative; z-index: 1;
    border-top: 1px solid rgba(196,92,138,0.12);
  }

  .tribute-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 19px;
    color: var(--rose-mid);
    margin-bottom: 8px;
    line-height: 1.6;
  }

  .tribute-name {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* TABS CONTENT */
  .tab-content { display: none; }
  .tab-content.active { display: block; }

  /* REVIEWS */
  .review-card {
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(232,160,191,0.22);
    border-radius: 18px;
    padding: 22px 24px;
    margin-bottom: 16px;
    animation: fadeUp 0.4s ease;
    box-shadow: 0 2px 16px rgba(139,34,82,0.05);
  }
  .review-top {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 10px;
  }
  .review-author { font-weight: 500; font-size: 15px; color: var(--charcoal); }
  .review-date { font-size: 11px; color: var(--warm-grey); margin-top: 2px; }
  .review-stars { display: flex; gap: 3px; font-size: 18px; }
  .star { cursor: pointer; transition: transform 0.15s; }
  .star:hover { transform: scale(1.2); }
  .review-text { font-size: 14.5px; color: var(--charcoal); line-height: 1.7; }
  .review-count { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--warm-grey); margin-bottom: 20px; font-style: italic; }
  .avg-rating {
    display: flex; align-items: center; gap: 16px;
    background: linear-gradient(135deg, rgba(139,34,82,0.06), rgba(201,151,58,0.06));
    border-radius: 16px; padding: 18px 22px; margin-bottom: 24px;
    border: 1px solid rgba(196,92,138,0.15);
  }
  .avg-number { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; color: var(--rose-deep); line-height: 1; }
  .avg-info { flex: 1; }
  .avg-stars { font-size: 22px; margin-bottom: 4px; }
  .avg-label { font-size: 12px; color: var(--warm-grey); }

  /* HEALTH GOAL SELECTOR */
  .health-selector { display: flex; flex-direction: column; gap: 10px; }
  .health-input-row { display: flex; gap: 8px; }
  .health-input-row select { flex: 1; }
  .health-input-row input { flex: 1; }
  .btn-add {
    padding: 10px 16px;
    background: var(--rose-deep);
    border: none; border-radius: 12px;
    color: white; font-size: 18px;
    cursor: pointer; transition: all 0.2s;
    flex-shrink: 0;
    line-height: 1;
  }
  .btn-add:hover { background: var(--rose-mid); transform: scale(1.05); }
  .selected-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 4px; }
  .tag {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    background: linear-gradient(135deg, rgba(139,34,82,0.1), rgba(196,92,138,0.1));
    border: 1.5px solid rgba(196,92,138,0.3);
    border-radius: 50px;
    font-size: 13px; color: var(--rose-deep);
    animation: fadeUp 0.2s ease;
  }
  .tag-remove {
    background: none; border: none; cursor: pointer;
    color: var(--rose-mid); font-size: 15px; line-height: 1;
    padding: 0; transition: all 0.15s;
  }
  .tag-remove:hover { color: var(--rose-deep); transform: scale(1.2); }
  .no-goals { font-size: 13px; color: var(--warm-grey); font-style: italic; }

  .error-msg {
    background: rgba(255,100,100,0.08);
    border: 1px solid rgba(255,100,100,0.2);
    border-radius: 12px;
    padding: 14px;
    font-size: 14px;
    color: #b91c1c;
    margin-top: 12px;
  }

  .result-actions {
    display: flex; gap: 10px; flex-wrap: wrap;
    margin-top: 16px;
  }
`;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

async function callClaude(systemPrompt, userPrompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

const SYSTEM_RECIPE = `You are Mama's Kitchen — a warm, expert recipe assistant dedicated to beautiful, nourishing cooking in the Kenyan context and beyond. You were created in loving memory of a mother who passed on.

Always respond with warmth and care. For Kenyan budget recipes, use widely available local ingredients (sukuma wiki, ugali, githeri, nyama choma, pilau, samaki, etc.). For premium or global cuisine, suggest beautifully crafted dishes.

Format your recipe response like this:
🍽️ RECIPE NAME
[One warm sentence about this dish]

⏱️ Prep: X mins | Cook: Y mins | Serves: Z

📋 INGREDIENTS
- [ingredient with quantity]

👩‍🍳 METHOD
1. [Step]

💚 HEALTH NOTES
[Any relevant health or nutritional notes based on the user's goals]

💡 MAMA'S TIP
[One warm cooking tip]

Always be encouraging and specific. If the user has health considerations, tailor the recipe accordingly.`;

const SYSTEM_WEEK = `You are Mama's Kitchen meal planner. Create a beautiful 7-day meal plan (Monday–Sunday) for the user, then generate a shopping list.

Respond in this exact JSON format (no backticks, no markdown, pure JSON):
{
  "days": [
    {"day": "Monday", "breakfast": "name", "lunch": "name", "dinner": "name"},
    ...all 7 days...
  ],
  "shopping": ["item 1", "item 2", "item 3", ...]
}

Keep meals realistic for the budget level, culturally appropriate, and health-aligned. Shopping list should be 20–30 items.`;

const SYSTEM_CHAT = `You are Mama's Kitchen — a warm, knowledgeable cooking assistant. You answer questions about recipes, ingredients, substitutions, cooking techniques, and food in the Kenyan and global context. You are nurturing, expert, and always encouraging. Keep answers concise but complete (3–5 sentences usually). If someone asks what to make with certain ingredients, suggest 2–3 creative recipes briefly.`;

const healthOptions = [
  "General Wellness", "Reproductive Health (Female)", "Reproductive Health (Male)",
  "Weight Loss", "Muscle Building", "Diabetes-Friendly", "Heart Health",
  "Pregnancy / Postpartum", "Menopause Support", "High Energy"
];

const cuisineOptions = [
  "Kenyan Classics", "East African", "West African", "Indian / Asian",
  "Mediterranean", "American Comfort", "Italian", "Middle Eastern", "Global Mix"
];

export default function MamasKitchen() {
  const [tab, setTab] = useState("recipe");
  const [loading, setLoading] = useState(false);
  const [weekLoading, setWeekLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const [customHealthInput, setCustomHealthInput] = useState("");
  const [weekCustomHealthInput, setWeekCustomHealthInput] = useState("");

  function addHealth(val, arr, setArr) {
    const clean = val.trim();
    if (clean && !arr.includes(clean)) setArr(prev => [...prev, clean]);
  }
  function removeHealth(val, arr, setArr) {
    setArr(prev => prev.filter(v => v !== val));
  }

  // Recipe form
  const [ingredients, setIngredients] = useState("");
  const [budget, setBudget] = useState("mid");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("KSH");
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [servings, setServings] = useState("2");
  const [gender, setGender] = useState("");
  const [recipeResult, setRecipeResult] = useState("");
  const [recipeError, setRecipeError] = useState("");

  // Week planner
  const [weekBudget, setWeekBudget] = useState("mid");
  const [weekBudgetAmount, setWeekBudgetAmount] = useState("");
  const [weekBudgetCurrency, setWeekBudgetCurrency] = useState("KSH");
  const [weekHealth, setWeekHealth] = useState([]);
  const [weekData, setWeekData] = useState(null);
  const [weekError, setWeekError] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("mamas-kitchen-reviews", true);
        if (res?.value) setReviews(JSON.parse(res.value));
      } catch {}
    })();
  }, []);

  async function submitReview() {
    if (!reviewName.trim() || !reviewText.trim()) return;
    setReviewSubmitting(true);
    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      text: reviewText.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString("en-KE", { day:"numeric", month:"long", year:"numeric" })
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try { await window.storage.set("mamas-kitchen-reviews", JSON.stringify(updated), true); } catch {}
    setReviewName(""); setReviewText(""); setReviewRating(5);
    setReviewSubmitting(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  }

  // Chat
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Hello! I'm Mama's Kitchen. Ask me anything — what to cook with your ingredients, how to make a dish healthier, what a recipe is, or any food question you have. 🌸" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleChip = (val, arr, setArr) => {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  async function generateRecipe() {
    setLoading(true);
    setRecipeError("");
    setRecipeResult("");
    try {
      const budgetLine = budgetAmount ? `Budget: ${budgetCurrency} ${budgetAmount} for this meal` : "Budget: flexible";
      const prompt = `Generate a beautiful recipe for me.
${budgetLine}
${ingredients ? `Ingredients I have: ${ingredients}` : "Surprise me with something wonderful!"}
Cuisine preferences: ${selectedCuisine.length ? selectedCuisine.join(", ") : "Any"}
Health goals: ${selectedHealth.length ? selectedHealth.join(", ") : "General wellness"}
${gender ? `Additional context: ${gender}` : ""}
Servings: ${servings}

${ingredients ? "Please use my ingredients creatively — even suggest combinations I might not know existed!" : ""}
${budgetAmount && budgetCurrency === "KSH" ? "Keep ingredients affordable and available in Kenyan markets." : ""}`;
      const result = await callClaude(SYSTEM_RECIPE, prompt);
      setRecipeResult(result);
    } catch (e) {
      setRecipeError("Couldn't fetch recipe right now. Please try again.");
    }
    setLoading(false);
  }

  async function generateWeekPlan() {
    setWeekLoading(true);
    setWeekError("");
    setWeekData(null);
    setCheckedItems({});
    try {
      const weekBudgetLine = weekBudgetAmount ? `Weekly budget: ${weekBudgetCurrency} ${weekBudgetAmount}` : "Budget: flexible";
      const prompt = `Create a 7-day meal plan.
${weekBudgetLine}
Health focus: ${weekHealth.length ? weekHealth.join(", ") : "Balanced general health"}
Context: Nairobi, Kenya. Mix local and some international dishes. Include breakfast, lunch, and dinner each day.
${weekBudgetAmount && weekBudgetCurrency === "KSH" ? "Keep the total shopping cost within the stated KSH budget. Suggest affordable Kenyan ingredients." : ""}
${weekBudgetAmount && weekBudgetCurrency === "USD" ? "Keep the total shopping cost within the stated USD budget." : ""}`;
      const raw = await callClaude(SYSTEM_WEEK, prompt);
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setWeekData(parsed);
    } catch (e) {
      setWeekError("Couldn't generate the meal plan. Please try again.");
    }
    setWeekLoading(false);
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);
    try {
      const history = chatMessages.filter(m => m.role !== "ai" || chatMessages.indexOf(m) > 0);
      const messages = [
        ...history.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
        { role: "user", content: userMsg }
      ];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_CHAT,
          messages,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setChatMessages(prev => [...prev, { role: "ai", text: data.content[0].text }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "ai", text: "I'm having trouble connecting right now. Please try again in a moment. 🌸" }]);
    }
    setChatLoading(false);
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Mama's Kitchen</div>
          <div className="nav-tabs">
            {[["recipe", "✨ Recipe"], ["planner", "📅 Week Plan"], ["chat", "💬 Ask Mama"], ["reviews", "⭐ Reviews"]].map(([id, label]) => (
              <button key={id} className={`nav-tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">✦ AI-Powered Recipe Companion ✦</div>
          <h1 className="hero-title">Food made with <em>love</em>,<br />crafted just for you</h1>
          <p className="hero-dedication">
            <span className="heart">♥</span> Dedicated to every mother who fed the world with her hands, her heart, and her kitchen. <span className="heart">♥</span>
          </p>
        </div>

        {/* TAB: RECIPE */}
        <div className={`section tab-content ${tab === "recipe" ? "active" : ""}`}>
          <h2 className="section-title">Find Your Perfect Recipe</h2>
          <p className="section-sub">Tell us what you have, how you feel, and we'll find something beautiful to make.</p>

          <div className="card">
            <div className="card-title">🥕 Your Ingredients <span style={{fontSize:13,fontFamily:'DM Sans',fontWeight:400,color:'var(--warm-grey)'}}>— optional</span></div>
            <div className="form-grid one">
              <div>
                <label className="field-label">What's in your kitchen right now?</label>
                <textarea className="field-input" placeholder="e.g. sukuma wiki, tomatoes, onion, rice, chicken… or leave blank for a surprise!" value={ingredients} onChange={e => setIngredients(e.target.value)} rows={3}/>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">🎯 Customise Your Recipe</div>
            <div className="form-grid">
              <div>
                <label className="field-label">Budget Amount</label>
                <div style={{display:'flex', gap:8}}>
                  <select className="field-input" value={budgetCurrency} onChange={e => setBudgetCurrency(e.target.value)} style={{width:90, flexShrink:0}}>
                    <option value="KSH">KSH</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="field-input" type="number" min="0" placeholder="e.g. 500" value={budgetAmount} onChange={e => setBudgetAmount(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="field-label">Servings</label>
                <select className="field-input" value={servings} onChange={e => setServings(e.target.value)}>
                  {["1","2","3","4","6","8","10"].map(n => <option key={n} value={n}>{n} {n==="1"?"person":"people"}</option>)}
                </select>
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label className="field-label">Cuisine Preference</label>
              <div className="chips">
                {cuisineOptions.map(c => (
                  <button key={c} className={`chip ${selectedCuisine.includes(c) ? "selected" : ""}`} onClick={() => toggleChip(c, selectedCuisine, setSelectedCuisine)}>{c}</button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label className="field-label">Health Goals</label>
              <div className="health-selector">
                <div className="health-input-row">
                  <select
                    className="field-input"
                    value=""
                    onChange={e => { if (e.target.value) { addHealth(e.target.value, selectedHealth, setSelectedHealth); e.target.value = ""; }}}
                  >
                    <option value="">— Select a health goal —</option>
                    {healthOptions.filter(h => !selectedHealth.includes(h)).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div className="health-input-row">
                  <input
                    className="field-input"
                    placeholder="Or type your own e.g. Thyroid support, Low sodium…"
                    value={customHealthInput}
                    onChange={e => setCustomHealthInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && customHealthInput.trim()) { addHealth(customHealthInput, selectedHealth, setSelectedHealth); setCustomHealthInput(""); }}}
                  />
                  <button className="btn-add" onClick={() => { if (customHealthInput.trim()) { addHealth(customHealthInput, selectedHealth, setSelectedHealth); setCustomHealthInput(""); }}}>+</button>
                </div>
                <div className="selected-tags">
                  {selectedHealth.length === 0
                    ? <span className="no-goals">No health goals selected yet</span>
                    : selectedHealth.map(h => (
                      <div key={h} className="tag">
                        {h}
                        <button className="tag-remove" onClick={() => removeHealth(h, selectedHealth, setSelectedHealth)}>×</button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div>
              <label className="field-label">Additional context (optional)</label>
              <input className="field-input" placeholder="e.g. I'm postpartum, diabetic, training for a marathon…" value={gender} onChange={e => setGender(e.target.value)} />
            </div>
          </div>

          <button className="btn-primary" onClick={generateRecipe} disabled={loading}>
            {loading ? "Creating your recipe…" : "✨ Generate Recipe"}
          </button>

          {loading && (
            <div className="loading-wrap">
              <div className="loading-flowers">
                {[...Array(5)].map((_, i) => <div key={i} className="flower"/>)}
              </div>
              <div className="loading-text">Cooking up something beautiful for you…</div>
            </div>
          )}

          {recipeError && <div className="error-msg">{recipeError}</div>}

          {recipeResult && !loading && (
            <div className="card recipe-output" style={{marginTop:24}}>
              <div className="recipe-prose" dangerouslySetInnerHTML={{__html: formatRecipe(recipeResult)}}/>
              <div className="result-actions" style={{marginTop:20}}>
                <button className="btn-secondary" onClick={generateRecipe}>🔄 Another Recipe</button>
                <button className="btn-secondary" onClick={() => { setTab("chat"); setTimeout(()=>{ setChatInput(`Can you tell me more about: ${recipeResult.split('\n')[0].replace('🍽️','').trim()}`);}, 100); }}>💬 Ask About This</button>
              </div>
            </div>
          )}
        </div>

        {/* TAB: WEEK PLAN */}
        <div className={`section tab-content ${tab === "planner" ? "active" : ""}`}>
          <h2 className="section-title">Your Weekly Meal Plan</h2>
          <p className="section-sub">Plan your whole week, know exactly what to shop for, and eat well every day.</p>

          <div className="card">
            <div className="card-title">⚙️ Planner Settings</div>
            <div className="form-grid">
              <div>
                <label className="field-label">Weekly Budget</label>
                <div style={{display:'flex', gap:8}}>
                  <select className="field-input" value={weekBudgetCurrency} onChange={e => setWeekBudgetCurrency(e.target.value)} style={{width:90, flexShrink:0}}>
                    <option value="KSH">KSH</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="field-input" type="number" min="0" placeholder="e.g. 3000" value={weekBudgetAmount} onChange={e => setWeekBudgetAmount(e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <label className="field-label">Health Focus for the Week</label>
              <div className="health-selector">
                <div className="health-input-row">
                  <select
                    className="field-input"
                    value=""
                    onChange={e => { if (e.target.value) { addHealth(e.target.value, weekHealth, setWeekHealth); e.target.value = ""; }}}
                  >
                    <option value="">— Select a health goal —</option>
                    {healthOptions.filter(h => !weekHealth.includes(h)).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div className="health-input-row">
                  <input
                    className="field-input"
                    placeholder="Or type your own e.g. Anti-inflammatory, Low sugar…"
                    value={weekCustomHealthInput}
                    onChange={e => setWeekCustomHealthInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && weekCustomHealthInput.trim()) { addHealth(weekCustomHealthInput, weekHealth, setWeekHealth); setWeekCustomHealthInput(""); }}}
                  />
                  <button className="btn-add" onClick={() => { if (weekCustomHealthInput.trim()) { addHealth(weekCustomHealthInput, weekHealth, setWeekHealth); setWeekCustomHealthInput(""); }}}>+</button>
                </div>
                <div className="selected-tags">
                  {weekHealth.length === 0
                    ? <span className="no-goals">No health goals selected yet</span>
                    : weekHealth.map(h => (
                      <div key={h} className="tag">
                        {h}
                        <button className="tag-remove" onClick={() => removeHealth(h, weekHealth, setWeekHealth)}>×</button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={generateWeekPlan} disabled={weekLoading}>
            {weekLoading ? "Building your meal plan…" : "📅 Generate My Week Plan"}
          </button>

          {weekLoading && (
            <div className="loading-wrap">
              <div className="loading-flowers">
                {[...Array(5)].map((_, i) => <div key={i} className="flower"/>)}
              </div>
              <div className="loading-text">Crafting a beautiful week for you…</div>
            </div>
          )}

          {weekError && <div className="error-msg">{weekError}</div>}

          {weekData && !weekLoading && (
            <div className="recipe-output">
              <div className="card" style={{marginTop:24}}>
                <div className="card-title">📅 Your 7-Day Plan</div>
                {weekData.days?.map((d, i) => (
                  <div key={i} style={{marginBottom:14, paddingBottom:14, borderBottom: i < 6 ? '1px solid rgba(232,160,191,0.15)' : 'none'}}>
                    <div style={{fontWeight:600, fontSize:13, letterSpacing:'1px', textTransform:'uppercase', color:'var(--gold)', marginBottom:8}}>{d.day}</div>
                    <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
                      {[['🌅',d.breakfast,'Breakfast'],['☀️',d.lunch,'Lunch'],['🌙',d.dinner,'Dinner']].map(([icon,meal,label])=>(
                        <div key={label} style={{flex:'1 1 160px', background:'rgba(247,214,230,0.15)', borderRadius:12, padding:'10px 14px', border:'1px solid rgba(232,160,191,0.2)'}}>
                          <div style={{fontSize:11, color:'var(--warm-grey)', marginBottom:4}}>{icon} {label}</div>
                          <div style={{fontFamily:'Cormorant Garamond, serif', fontSize:16, color:'var(--charcoal)'}}>{meal}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {weekData.shopping?.length > 0 && (
                <div className="card">
                  <div className="card-title">🛒 Shopping List</div>
                  <p style={{fontSize:13, color:'var(--warm-grey)', marginBottom:14}}>Tick off as you shop!</p>
                  <div style={{columns:2, columnGap:20}}>
                    {weekData.shopping.map((item, i) => (
                      <div key={i} className="shopping-item">
                        <input type="checkbox" className="shop-check" checked={!!checkedItems[i]} onChange={() => setCheckedItems(p => ({...p, [i]: !p[i]}))} />
                        <span style={{textDecoration: checkedItems[i] ? 'line-through' : 'none', color: checkedItems[i] ? 'var(--warm-grey)' : 'var(--charcoal)', fontSize:14}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* TAB: CHAT */}
        <div className={`section tab-content ${tab === "chat" ? "active" : ""}`}>
          <h2 className="section-title">Ask Mama's Kitchen</h2>
          <p className="section-sub">Ask anything — what to make with what you have, how to cook something, substitutes, nutrition tips, and more.</p>

          <div className="card">
            <div className="chat-messages">
              {chatMessages.map((m, i) => (
                <div key={i} className={`message ${m.role}`}>{m.text}</div>
              ))}
              {chatLoading && (
                <div className="message ai">
                  <div className="loading-flowers" style={{justifyContent:'flex-start', marginBottom:0}}>
                    {[...Array(3)].map((_,i)=><div key={i} className="flower" style={{width:7,height:7}}/>)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>

            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask about any recipe, ingredient, or meal idea…"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !chatLoading && sendChat()}
              />
              <button className="btn-send" onClick={sendChat} disabled={chatLoading || !chatInput.trim()}>
                🌸
              </button>
            </div>

            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:12}}>
              {["What can I make with sukuma wiki?", "Suggest a high-protein Kenyan meal", "What's good for reproductive health?", "Give me a quick 20-min dinner"].map(q => (
                <button key={q} className="btn-secondary" style={{fontSize:12, padding:'6px 12px'}} onClick={() => { setChatInput(q); }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TAB: REVIEWS */}
        <div className={`section tab-content ${tab === "reviews" ? "active" : ""}`}>
          <h2 className="section-title">Community Reviews</h2>
          <p className="section-sub">What are people saying about Mama's Kitchen? Share your experience too — your words matter. 🌸</p>

          {reviews.length > 0 && (
            <div className="avg-rating">
              <div className="avg-number">{(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)}</div>
              <div className="avg-info">
                <div className="avg-stars">{"★".repeat(Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length))}{"☆".repeat(5-Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length))}</div>
                <div className="avg-label">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</div>
              </div>
            </div>
          )}

          {/* Write a review */}
          <div className="card" style={{marginBottom:28}}>
            <div className="card-title">✍️ Write a Review</div>

            {reviewSuccess && (
              <div style={{background:'rgba(196,92,138,0.1)', border:'1px solid rgba(196,92,138,0.25)', borderRadius:12, padding:'12px 16px', marginBottom:16, fontSize:14, color:'var(--rose-deep)', fontFamily:'Cormorant Garamond, serif', fontStyle:'italic'}}>
                🌸 Thank you for sharing! Your review has been posted.
              </div>
            )}

            <div className="form-grid one" style={{marginBottom:14}}>
              <div>
                <label className="field-label">Your Name</label>
                <input className="field-input" placeholder="e.g. Wanjiru, Amina, Grace…" value={reviewName} onChange={e => setReviewName(e.target.value)} />
              </div>
            </div>

            <div style={{marginBottom:16}}>
              <label className="field-label">Your Rating</label>
              <div className="review-stars" style={{marginTop:6}}>
                {[1,2,3,4,5].map(n => (
                  <span
                    key={n}
                    className="star"
                    style={{color: n <= (hoverRating || reviewRating) ? '#C9973A' : '#ddd'}}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewRating(n)}
                  >★</span>
                ))}
              </div>
            </div>

            <div className="form-grid one" style={{marginBottom:16}}>
              <div>
                <label className="field-label">Your Review</label>
                <textarea className="field-input" placeholder="Tell us about your experience — a recipe you loved, how it helped you, what you made…" value={reviewText} onChange={e => setReviewText(e.target.value)} rows={4} />
              </div>
            </div>

            <button className="btn-primary" onClick={submitReview} disabled={reviewSubmitting || !reviewName.trim() || !reviewText.trim()}>
              {reviewSubmitting ? "Posting…" : "🌸 Post My Review"}
            </button>
          </div>

          {/* Existing reviews */}
          {reviews.length === 0 ? (
            <div style={{textAlign:'center', padding:'40px 0', color:'var(--warm-grey)', fontFamily:'Cormorant Garamond, serif', fontStyle:'italic', fontSize:18}}>
              Be the first to leave a review 🌸
            </div>
          ) : (
            <>
              <div className="review-count">{reviews.length} {reviews.length === 1 ? "person has" : "people have"} shared their experience</div>
              {reviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-top">
                    <div>
                      <div className="review-author">{r.name}</div>
                      <div className="review-date">{r.date}</div>
                    </div>
                    <div className="review-stars">
                      {[1,2,3,4,5].map(n => (
                        <span key={n} style={{color: n <= r.rating ? '#C9973A' : '#ddd'}}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="review-text">{r.text}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* TRIBUTE FOOTER */}
        <div className="tribute-footer">
          <div className="tribute-quote">"The love of a mother is the heart of the home —<br/>and it lives on in every meal made with care."</div>
          <div className="tribute-name">✦ Mama's Kitchen — In Loving Memory ✦</div>
        </div>

      </div>
    </>
  );
}

function formatRecipe(text) {
  return text
    .replace(/^(🍽️[^\n]+)/gm, '<h3>$1</h3>')
    .replace(/^(📋[^\n]+|👩‍🍳[^\n]+|💚[^\n]+|💡[^\n]+|⏱️[^\n]+)/gm, '<h3>$1</h3>')
    .replace(/\n/g, '<br/>');
}
