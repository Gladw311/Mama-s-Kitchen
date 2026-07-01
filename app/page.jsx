"use client";
import { useState, useRef, useEffect } from "react";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose-deep: #8B2252;
    --rose-mid: #C45C8A;
    --rose-soft: #E8A0BF;
    --blush: #F7D6E6;
    --blush-light: #FDF0F6;
    --cream: #FBF4EE;
    --gold: #C9973A;
    --charcoal: #2A1A22;
    --warm-grey: #8A7077;
    --white: #FEFEFE;
  }
  body { font-family: var(--font-dm-sans, "DM Sans", sans-serif); background: var(--cream); color: var(--charcoal); min-height: 100vh; }
  .app { min-height: 100vh; background: linear-gradient(145deg, #FBF4EE 0%, #FDF0F6 40%, #FBF4EE 100%); position: relative; overflow-x: hidden; }
  .app::before { content: ''; position: fixed; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(196,92,138,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .app::after { content: ''; position: fixed; bottom: -200px; left: -200px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(251,244,238,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(196,92,138,0.12); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: "Pinyon Script", cursive; font-size: 28px; color: var(--rose-deep); letter-spacing: 1px; line-height: 1; }
  .nav-tabs { display: flex; gap: 4px; background: rgba(232,160,191,0.15); border-radius: 50px; padding: 4px; flex-wrap: wrap; }
  .nav-tab { padding: 7px 14px; border-radius: 50px; border: none; background: transparent; cursor: pointer; font-family: var(--font-dm-sans, sans-serif); font-size: 13px; font-weight: 500; color: var(--warm-grey); transition: all 0.2s ease; white-space: nowrap; }
  .nav-tab.active { background: var(--rose-deep); color: white; box-shadow: 0 2px 12px rgba(139,34,82,0.25); }
  .hero { padding: 64px 24px 48px; text-align: center; position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
  .hero-title { font-family: var(--font-cormorant, "Cormorant Garamond", serif); font-size: clamp(42px, 8vw, 72px); font-weight: 300; line-height: 1.1; color: var(--rose-deep); margin-bottom: 8px; }
  .hero-title em { font-style: italic; color: var(--rose-mid); }
  .hero-dedication { font-family: var(--font-cormorant, serif); font-style: italic; font-size: 17px; color: var(--warm-grey); margin: 20px auto 0; max-width: 480px; line-height: 1.7; padding: 16px 24px; border-top: 1px solid rgba(196,92,138,0.2); border-bottom: 1px solid rgba(196,92,138,0.2); }
  .section { max-width: 860px; margin: 0 auto; padding: 0 20px 80px; position: relative; z-index: 1; }
  .section-title { font-family: var(--font-cormorant, serif); font-size: 32px; font-weight: 400; color: var(--rose-deep); margin-bottom: 6px; }
  .section-sub { font-size: 14px; color: var(--warm-grey); margin-bottom: 28px; line-height: 1.6; }
  .card { background: rgba(255,255,255,0.75); border: 1px solid rgba(232,160,191,0.25); border-radius: 20px; padding: 28px; box-shadow: 0 4px 24px rgba(139,34,82,0.06); backdrop-filter: blur(8px); margin-bottom: 20px; }
  .card-title { font-family: var(--font-cormorant, serif); font-size: 20px; font-weight: 500; color: var(--charcoal); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .form-grid.one { grid-template-columns: 1fr; }
  @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } .nav-tab { padding: 6px 10px; font-size: 11px; } }
  .field-label { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--warm-grey); margin-bottom: 7px; display: block; }
  .field-input { width: 100%; padding: 11px 14px; background: rgba(247,214,230,0.2); border: 1.5px solid rgba(196,92,138,0.2); border-radius: 12px; font-family: var(--font-dm-sans, sans-serif); font-size: 14px; color: var(--charcoal); transition: all 0.2s; outline: none; appearance: none; }
  .field-input:focus { border-color: var(--rose-mid); background: rgba(247,214,230,0.3); box-shadow: 0 0 0 3px rgba(196,92,138,0.1); }
  textarea.field-input { resize: vertical; min-height: 90px; }
  select.field-input { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C45C8A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
  .chip { padding: 7px 14px; border-radius: 50px; border: 1.5px solid rgba(196,92,138,0.25); background: transparent; cursor: pointer; font-family: var(--font-dm-sans, sans-serif); font-size: 13px; color: var(--warm-grey); transition: all 0.2s; }
  .chip.selected { background: var(--rose-deep); border-color: var(--rose-deep); color: white; }
  .chip:hover:not(.selected) { border-color: var(--rose-mid); color: var(--rose-mid); }
  .btn-primary { width: 100%; padding: 15px 28px; background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid)); border: none; border-radius: 50px; color: white; font-family: var(--font-dm-sans, sans-serif); font-size: 15px; font-weight: 500; cursor: pointer; letter-spacing: 0.5px; transition: all 0.25s; box-shadow: 0 4px 20px rgba(139,34,82,0.25); }
  .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(139,34,82,0.32); }
  .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
  .btn-secondary { padding: 10px 20px; background: transparent; border: 1.5px solid var(--rose-mid); border-radius: 50px; color: var(--rose-mid); font-family: var(--font-dm-sans, sans-serif); font-size: 13px; cursor: pointer; transition: all 0.2s; }
  .btn-secondary:hover { background: var(--rose-mid); color: white; }
  .loading-wrap { text-align: center; padding: 48px 0; }
  .loading-flowers { display: flex; justify-content: center; gap: 6px; margin-bottom: 20px; }
  .flower { width: 10px; height: 10px; background: var(--rose-mid); border-radius: 50%; animation: bloom 1.2s ease-in-out infinite; }
  .flower:nth-child(2) { animation-delay: 0.2s; background: var(--rose-soft); }
  .flower:nth-child(3) { animation-delay: 0.4s; background: var(--gold); }
  .flower:nth-child(4) { animation-delay: 0.6s; background: var(--rose-soft); }
  .flower:nth-child(5) { animation-delay: 0.8s; background: var(--rose-mid); }
  @keyframes bloom { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.6); opacity: 1; } }
  .loading-text { font-family: var(--font-cormorant, serif); font-style: italic; font-size: 18px; color: var(--rose-mid); }
  .recipe-output { animation: fadeUp 0.5s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .recipe-prose { font-size: 15px; line-height: 1.75; color: var(--charcoal); white-space: pre-wrap; }
  .recipe-prose h3 { font-family: var(--font-cormorant, serif); font-size: 20px; font-weight: 500; color: var(--rose-deep); margin: 20px 0 10px; }
  .result-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
  .shopping-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(232,160,191,0.15); font-size: 14px; }
  .shop-check { width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid rgba(196,92,138,0.3); cursor: pointer; appearance: none; background: white; flex-shrink: 0; transition: all 0.15s; accent-color: var(--rose-mid); }
  .shop-check:checked { background: var(--rose-mid); border-color: var(--rose-mid); }
  .chat-messages { max-height: 420px; overflow-y: auto; margin-bottom: 16px; display: flex; flex-direction: column; gap: 12px; scrollbar-width: thin; scrollbar-color: rgba(196,92,138,0.3) transparent; }
  .message { padding: 14px 18px; border-radius: 18px; max-width: 88%; animation: fadeUp 0.3s ease; line-height: 1.65; font-size: 14.5px; }
  .message.user { background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid)); color: white; align-self: flex-end; border-bottom-right-radius: 6px; }
  .message.ai { background: rgba(255,255,255,0.85); color: var(--charcoal); border: 1px solid rgba(232,160,191,0.25); align-self: flex-start; border-bottom-left-radius: 6px; white-space: pre-wrap; }
  .chat-input-row { display: flex; gap: 10px; }
  .chat-input { flex: 1; padding: 12px 18px; background: rgba(247,214,230,0.2); border: 1.5px solid rgba(196,92,138,0.2); border-radius: 50px; font-family: var(--font-dm-sans, sans-serif); font-size: 14px; color: var(--charcoal); outline: none; }
  .chat-input:focus { border-color: var(--rose-mid); background: rgba(247,214,230,0.35); }
  .btn-send { padding: 12px 22px; background: linear-gradient(135deg, var(--rose-deep), var(--rose-mid)); border: none; border-radius: 50px; color: white; font-size: 18px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 12px rgba(139,34,82,0.2); }
  .btn-send:hover:not(:disabled) { transform: scale(1.06); }
  .btn-send:disabled { opacity: 0.5; cursor: not-allowed; }
  .review-card { background: rgba(255,255,255,0.75); border: 1px solid rgba(232,160,191,0.22); border-radius: 18px; padding: 22px 24px; margin-bottom: 16px; animation: fadeUp 0.4s ease; box-shadow: 0 2px 16px rgba(139,34,82,0.05); }
  .review-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .review-author { font-weight: 500; font-size: 15px; color: var(--charcoal); }
  .review-date { font-size: 11px; color: var(--warm-grey); margin-top: 2px; }
  .review-stars { display: flex; gap: 3px; font-size: 18px; }
  .star { cursor: pointer; transition: transform 0.15s; }
  .star:hover { transform: scale(1.2); }
  .review-text { font-size: 14.5px; color: var(--charcoal); line-height: 1.7; }
  .avg-rating { display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, rgba(139,34,82,0.06), rgba(201,151,58,0.06)); border-radius: 16px; padding: 18px 22px; margin-bottom: 24px; border: 1px solid rgba(196,92,138,0.15); }
  .avg-number { font-family: var(--font-cormorant, serif); font-size: 48px; font-weight: 300; color: var(--rose-deep); line-height: 1; }
  .avg-info { flex: 1; }
  .avg-stars { font-size: 22px; margin-bottom: 4px; }
  .avg-label { font-size: 12px; color: var(--warm-grey); }
  .error-msg { background: rgba(255,100,100,0.08); border: 1px solid rgba(255,100,100,0.2); border-radius: 12px; padding: 14px; font-size: 14px; color: #b91c1c; margin-top: 12px; }
  .tribute-footer { text-align: center; padding: 40px 24px; position: relative; z-index: 1; border-top: 1px solid rgba(196,92,138,0.12); }
  .tribute-quote { font-family: var(--font-cormorant, serif); font-style: italic; font-size: 19px; color: var(--rose-mid); margin-bottom: 8px; line-height: 1.6; }
  .tribute-name { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); }
  .tab-content { display: none; }
  .tab-content.active { display: block; }
`;

const HEALTH_OPTIONS = ["General Wellness","Reproductive Health (Female)","Reproductive Health (Male)","Weight Loss","Muscle Building","Diabetes-Friendly","Heart Health","Pregnancy / Postpartum","Menopause Support","High Energy"];
const CUISINE_OPTIONS = ["Kenyan Classics","East African","West African","Indian / Asian","Mediterranean","American Comfort","Italian","Middle Eastern","Global Mix"];

async function callAPI(type, payload) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...payload }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}

export default function MamasKitchen() {
  const [tab, setTab] = useState("recipe");

  // Recipe
  const [ingredients, setIngredients] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("KSH");
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [servings, setServings] = useState("2");
  const [extraContext, setExtraContext] = useState("");
  const [recipeResult, setRecipeResult] = useState("");
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState("");

  // Week
  const [weekBudgetAmount, setWeekBudgetAmount] = useState("");
  const [weekBudgetCurrency, setWeekBudgetCurrency] = useState("KSH");
  const [weekHealth, setWeekHealth] = useState([]);
  const [weekData, setWeekData] = useState(null);
  const [weekLoading, setWeekLoading] = useState(false);
  const [weekError, setWeekError] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  // Chat
  const [chatMessages, setChatMessages] = useState([{ role: "ai", text: "Hello! I'm Mama's Kitchen. Ask me anything — what to cook with your ingredients, how to make a dish healthier, what recipe to try. 🌸" }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mamas-kitchen-reviews");
      if (saved) setReviews(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (val, arr, set) => set(p => p.includes(val) ? p.filter(v => v !== val) : [...p, val]);

  async function generateRecipe() {
    setRecipeLoading(true); setRecipeError(""); setRecipeResult("");
    try {
      const budgetLine = budgetAmount ? `Budget: ${budgetCurrency} ${budgetAmount} for this meal` : "Budget: flexible";
      const prompt = `Generate a beautiful recipe for me.\n${budgetLine}\n${ingredients ? `Ingredients I have: ${ingredients}` : "Surprise me!"}\nCuisine: ${selectedCuisine.length ? selectedCuisine.join(", ") : "Any"}\nHealth goals: ${selectedHealth.length ? selectedHealth.join(", ") : "General wellness"}\n${extraContext ? `Extra context: ${extraContext}` : ""}\nServings: ${servings}`;
      const result = await callAPI("recipe", { prompt });
      setRecipeResult(result);
    } catch { setRecipeError("Couldn't fetch recipe right now. Please try again."); }
    setRecipeLoading(false);
  }

  async function generateWeekPlan() {
    setWeekLoading(true); setWeekError(""); setWeekData(null); setCheckedItems({});
    try {
      const budgetLine = weekBudgetAmount ? `Weekly budget: ${weekBudgetCurrency} ${weekBudgetAmount}` : "Budget: flexible";
      const prompt = `Create a 7-day meal plan.\n${budgetLine}\nHealth focus: ${weekHealth.length ? weekHealth.join(", ") : "Balanced general health"}\nContext: Nairobi, Kenya. Mix local and some international dishes. Include breakfast, lunch, and dinner each day.`;
      const raw = await callAPI("week", { prompt });
      const clean = raw.replace(/```json|```/g, "").trim();
      setWeekData(JSON.parse(clean));
    } catch { setWeekError("Couldn't generate the meal plan. Please try again."); }
    setWeekLoading(false);
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const updated = [...chatMessages, { role: "user", text: userMsg }];
    setChatMessages(updated);
    setChatLoading(true);
    try {
      const messages = updated.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
      const result = await callAPI("chat", { messages });
      setChatMessages(p => [...p, { role: "ai", text: result }]);
    } catch {
      setChatMessages(p => [...p, { role: "ai", text: "I'm having trouble connecting right now. Please try again. 🌸" }]);
    }
    setChatLoading(false);
  }

  function submitReview() {
    if (!reviewName.trim() || !reviewText.trim()) return;
    setReviewSubmitting(true);
    const newReview = { id: Date.now(), name: reviewName.trim(), text: reviewText.trim(), rating: reviewRating, date: new Date().toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" }) };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try { localStorage.setItem("mamas-kitchen-reviews", JSON.stringify(updated)); } catch {}
    setReviewName(""); setReviewText(""); setReviewRating(5);
    setReviewSubmitting(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet" />
      <div className="app">
        <nav className="nav">
          <div className="nav-logo">Mama's Kitchen</div>
          <div className="nav-tabs">
            {[["recipe","✨ Recipe"],["planner","📅 Week Plan"],["chat","💬 Ask Mama"],["reviews","⭐ Reviews"]].map(([id, label]) => (
              <button key={id} className={`nav-tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
            ))}
          </div>
        </nav>

        <div className="hero">
          <div className="hero-eyebrow">✦ AI-Powered Recipe Companion ✦</div>
          <h1 className="hero-title">Food made with <em>love</em>,<br />crafted just for you</h1>
          <p className="hero-dedication">♥ Dedicated to every mother who fed the world with her hands, her heart, and her kitchen. ♥</p>
        </div>

        {/* RECIPE TAB */}
        <div className={`section tab-content ${tab === "recipe" ? "active" : ""}`}>
          <h2 className="section-title">Find Your Perfect Recipe</h2>
          <p className="section-sub">Tell us what you have and how you feel — we'll find something beautiful to make.</p>
          <div className="card">
            <div className="card-title">🥕 Your Ingredients <span style={{fontSize:13,fontWeight:400,color:"var(--warm-grey)"}}>— optional</span></div>
            <textarea className="field-input" placeholder="e.g. sukuma wiki, tomatoes, onion, rice… or leave blank for a surprise!" value={ingredients} onChange={e => setIngredients(e.target.value)} rows={3} />
          </div>
          <div className="card">
            <div className="card-title">🎯 Customise Your Recipe</div>
            <div className="form-grid">
              <div>
                <label className="field-label">Budget Amount</label>
                <div style={{display:"flex",gap:8}}>
                  <select className="field-input" value={budgetCurrency} onChange={e => setBudgetCurrency(e.target.value)} style={{width:90,flexShrink:0}}>
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
              <div className="chips">{CUISINE_OPTIONS.map(c => <button key={c} className={`chip ${selectedCuisine.includes(c)?"selected":""}`} onClick={() => toggle(c, selectedCuisine, setSelectedCuisine)}>{c}</button>)}</div>
            </div>
            <div style={{marginBottom:14}}>
              <label className="field-label">Health Goals</label>
              <div className="chips">{HEALTH_OPTIONS.map(h => <button key={h} className={`chip ${selectedHealth.includes(h)?"selected":""}`} onClick={() => toggle(h, selectedHealth, setSelectedHealth)}>{h}</button>)}</div>
            </div>
            <div>
              <label className="field-label">Additional context (optional)</label>
              <input className="field-input" placeholder="e.g. I'm postpartum, diabetic, training for a marathon…" value={extraContext} onChange={e => setExtraContext(e.target.value)} />
            </div>
          </div>
          <button className="btn-primary" onClick={generateRecipe} disabled={recipeLoading}>{recipeLoading ? "Creating your recipe…" : "✨ Generate Recipe"}</button>
          {recipeLoading && <div className="loading-wrap"><div className="loading-flowers">{[...Array(5)].map((_,i)=><div key={i} className="flower"/>)}</div><div className="loading-text">Cooking up something beautiful for you…</div></div>}
          {recipeError && <div className="error-msg">{recipeError}</div>}
          {recipeResult && !recipeLoading && (
            <div className="card recipe-output" style={{marginTop:24}}>
              <div className="recipe-prose">{recipeResult}</div>
              <div className="result-actions">
                <button className="btn-secondary" onClick={generateRecipe}>🔄 Another Recipe</button>
                <button className="btn-secondary" onClick={() => { setTab("chat"); setChatInput(`Tell me more about: ${recipeResult.split("\n")[0].replace("🍽️","").trim()}`); }}>💬 Ask About This</button>
              </div>
            </div>
          )}
        </div>

        {/* WEEK PLAN TAB */}
        <div className={`section tab-content ${tab === "planner" ? "active" : ""}`}>
          <h2 className="section-title">Your Weekly Meal Plan</h2>
          <p className="section-sub">Plan your whole week, know exactly what to shop for, and eat beautifully every day.</p>
          <div className="card">
            <div className="card-title">⚙️ Planner Settings</div>
            <div className="form-grid">
              <div>
                <label className="field-label">Weekly Budget</label>
                <div style={{display:"flex",gap:8}}>
                  <select className="field-input" value={weekBudgetCurrency} onChange={e => setWeekBudgetCurrency(e.target.value)} style={{width:90,flexShrink:0}}>
                    <option value="KSH">KSH</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="field-input" type="number" min="0" placeholder="e.g. 3000" value={weekBudgetAmount} onChange={e => setWeekBudgetAmount(e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <label className="field-label">Health Focus for the Week</label>
              <div className="chips">{HEALTH_OPTIONS.slice(0,7).map(h => <button key={h} className={`chip ${weekHealth.includes(h)?"selected":""}`} onClick={() => toggle(h, weekHealth, setWeekHealth)}>{h}</button>)}</div>
            </div>
          </div>
          <button className="btn-primary" onClick={generateWeekPlan} disabled={weekLoading}>{weekLoading ? "Building your meal plan…" : "📅 Generate My Week Plan"}</button>
          {weekLoading && <div className="loading-wrap"><div className="loading-flowers">{[...Array(5)].map((_,i)=><div key={i} className="flower"/>)}</div><div className="loading-text">Crafting a beautiful week for you…</div></div>}
          {weekError && <div className="error-msg">{weekError}</div>}
          {weekData && !weekLoading && (
            <div className="recipe-output">
              <div className="card" style={{marginTop:24}}>
                <div className="card-title">📅 Your 7-Day Plan</div>
                {weekData.days?.map((d, i) => (
                  <div key={i} style={{marginBottom:14,paddingBottom:14,borderBottom:i<6?"1px solid rgba(232,160,191,0.15)":"none"}}>
                    <div style={{fontWeight:600,fontSize:13,letterSpacing:"1px",textTransform:"uppercase",color:"var(--gold)",marginBottom:8}}>{d.day}</div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      {[["🌅",d.breakfast,"Breakfast"],["☀️",d.lunch,"Lunch"],["🌙",d.dinner,"Dinner"]].map(([icon,meal,label])=>(
                        <div key={label} style={{flex:"1 1 160px",background:"rgba(247,214,230,0.15)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(232,160,191,0.2)"}}>
                          <div style={{fontSize:11,color:"var(--warm-grey)",marginBottom:4}}>{icon} {label}</div>
                          <div style={{fontFamily:"var(--font-cormorant, serif)",fontSize:16,color:"var(--charcoal)"}}>{meal}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {weekData.shopping?.length > 0 && (
                <div className="card">
                  <div className="card-title">🛒 Shopping List</div>
                  <p style={{fontSize:13,color:"var(--warm-grey)",marginBottom:14}}>Tick off as you shop!</p>
                  <div style={{columns:2,columnGap:20}}>
                    {weekData.shopping.map((item, i) => (
                      <div key={i} className="shopping-item">
                        <input type="checkbox" className="shop-check" checked={!!checkedItems[i]} onChange={() => setCheckedItems(p => ({...p,[i]:!p[i]}))} />
                        <span style={{textDecoration:checkedItems[i]?"line-through":"none",color:checkedItems[i]?"var(--warm-grey)":"var(--charcoal)"}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CHAT TAB */}
        <div className={`section tab-content ${tab === "chat" ? "active" : ""}`}>
          <h2 className="section-title">Ask Mama's Kitchen</h2>
          <p className="section-sub">Ask anything — what to make, how to cook it, substitutes, nutrition, and more.</p>
          <div className="card">
            <div className="chat-messages">
              {chatMessages.map((m, i) => <div key={i} className={`message ${m.role}`}>{m.text}</div>)}
              {chatLoading && <div className="message ai"><div className="loading-flowers" style={{justifyContent:"flex-start",marginBottom:0}}>{[...Array(3)].map((_,i)=><div key={i} className="flower" style={{width:7,height:7}}/>)}</div></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-row">
              <input className="chat-input" placeholder="Ask about any recipe, ingredient, or meal idea…" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && !chatLoading && sendChat()} />
              <button className="btn-send" onClick={sendChat} disabled={chatLoading || !chatInput.trim()}>🌸</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
              {["What can I make with sukuma wiki?","Suggest a high-protein Kenyan meal","What's good for reproductive health?","Give me a quick 20-min dinner"].map(q => (
                <button key={q} className="btn-secondary" style={{fontSize:12,padding:"6px 12px"}} onClick={() => setChatInput(q)}>{q}</button>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS TAB */}
        <div className={`section tab-content ${tab === "reviews" ? "active" : ""}`}>
          <h2 className="section-title">Community Reviews</h2>
          <p className="section-sub">What are people cooking? Share your experience. 🌸</p>
          {avgRating && (
            <div className="avg-rating">
              <div className="avg-number">{avgRating}</div>
              <div className="avg-info">
                <div className="avg-stars">{"★".repeat(Math.round(+avgRating))}{"☆".repeat(5-Math.round(+avgRating))}</div>
                <div className="avg-label">{reviews.length} {reviews.length===1?"review":"reviews"}</div>
              </div>
            </div>
          )}
          <div className="card" style={{marginBottom:28}}>
            <div className="card-title">✍️ Write a Review</div>
            {reviewSuccess && <div style={{background:"rgba(196,92,138,0.1)",border:"1px solid rgba(196,92,138,0.25)",borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:14,color:"var(--rose-deep)",fontStyle:"italic"}}>🌸 Thank you! Your review has been posted.</div>}
            <div style={{marginBottom:14}}>
              <label className="field-label">Your Name</label>
              <input className="field-input" placeholder="e.g. Wanjiru, Amina, Grace…" value={reviewName} onChange={e => setReviewName(e.target.value)} />
            </div>
            <div style={{marginBottom:16}}>
              <label className="field-label">Your Rating</label>
              <div className="review-stars" style={{marginTop:6}}>
                {[1,2,3,4,5].map(n => (
                  <span key={n} className="star" style={{color:n<=(hoverRating||reviewRating)?"#C9973A":"#ddd"}} onMouseEnter={()=>setHoverRating(n)} onMouseLeave={()=>setHoverRating(0)} onClick={()=>setReviewRating(n)}>★</span>
                ))}
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label className="field-label">Your Review</label>
              <textarea className="field-input" placeholder="Tell us about your experience — a recipe you loved, how it helped you…" value={reviewText} onChange={e => setReviewText(e.target.value)} rows={4} />
            </div>
            <button className="btn-primary" onClick={submitReview} disabled={reviewSubmitting || !reviewName.trim() || !reviewText.trim()}>{reviewSubmitting ? "Posting…" : "🌸 Post My Review"}</button>
          </div>
          {reviews.length === 0
            ? <div style={{textAlign:"center",padding:"40px 0",color:"var(--warm-grey)",fontFamily:"var(--font-cormorant,serif)",fontStyle:"italic",fontSize:18}}>Be the first to leave a review 🌸</div>
            : reviews.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-top">
                  <div><div className="review-author">{r.name}</div><div className="review-date">{r.date}</div></div>
                  <div className="review-stars">{[1,2,3,4,5].map(n=><span key={n} style={{color:n<=r.rating?"#C9973A":"#ddd"}}>★</span>)}</div>
                </div>
                <div className="review-text">{r.text}</div>
              </div>
            ))
          }
        </div>

        <div className="tribute-footer">
          <div className="tribute-quote">"The love of a mother is the heart of the home —<br/>and it lives on in every meal made with care."</div>
          <div className="tribute-name">✦ Mama's Kitchen — In Loving Memory ✦</div>
        </div>
      </div>
    </>
  );
}
