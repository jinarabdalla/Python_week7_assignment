const STORAGE_KEY = "spendwise-transactions-v1";
const monthlyIncome = 50000;
const categoryColors = { Food:"#20a879", Transport:"#5795d6", Rent:"#ed9b52", Entertainment:"#8b79d9", Savings:"#45b8bd", Utilities:"#d9799a", Other:"#94a0ad" };
const categoryIcons = { Food:"◉", Transport:"↗", Rent:"⌂", Entertainment:"♫", Savings:"✧", Utilities:"ϟ", Other:"•" };
const money = value => new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",minimumFractionDigits:0,maximumFractionDigits:2}).format(value);
const readTransactions = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
let transactions = readTransactions();

const byId = id => document.getElementById(id);
const modal = byId("expenseModal");
function showToast(message){ const toast=byId("toast"); toast.textContent=message; toast.classList.add("show"); window.setTimeout(()=>toast.classList.remove("show"),2400); }
function openModal(){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); byId("expenseDate").value=new Date().toISOString().slice(0,10); byId("expenseName").focus(); }
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); byId("formMessage").textContent=""; }

function renderSummary(){
  const now=new Date(), month=now.getMonth(), year=now.getFullYear();
  const monthItems=transactions.filter(t=>{const d=new Date(t.date+"T00:00:00");return d.getMonth()===month&&d.getFullYear()===year;});
  const total=monthItems.reduce((sum,t)=>sum+t.amount,0), savings=monthlyIncome-total;
  byId("balanceValue").textContent=money(savings);
  byId("incomeValue").textContent=money(monthlyIncome);
  byId("expenseValue").textContent=money(total);
  byId("savingsValue").textContent=money(Math.max(0,savings));
  byId("donutTotal").textContent=money(total);
  renderDonut(monthItems,total); renderBudgets(monthItems); renderTransactions();
}
function renderDonut(items,total){
  const sums={}; items.forEach(t=>sums[t.category]=(sums[t.category]||0)+t.amount);
  const entries=Object.entries(sums).sort((a,b)=>b[1]-a[1]);
  let cursor=0; const segments=entries.map(([name,value])=>{const start=cursor;cursor+=total?value/total*100:0;return `${categoryColors[name]||categoryColors.Other} ${start}% ${cursor}%`;});
  byId("spendingDonut").style.background=entries.length?`conic-gradient(${segments.join(",")})`:"conic-gradient(#e9edf2 0 100%)";
  byId("categoryLegend").innerHTML=entries.length?entries.map(([name,value])=>`<div class="legend-item"><span class="legend-dot" style="background:${categoryColors[name]||categoryColors.Other}"></span><span>${escapeHtml(name)}</span><strong>${Math.round(value/total*100)}%</strong></div>`).join(""):'<p class="empty-state">Add an expense to see your breakdown.</p>';
}
function renderBudgets(items){
  const limits={Food:12000,Transport:6000,Rent:18000,Entertainment:4000,Savings:5000,Utilities:5000};
  const totals={};items.forEach(t=>totals[t.category]=(totals[t.category]||0)+t.amount);
  byId("budgetList").innerHTML=Object.entries(limits).map(([name,limit])=>{const used=totals[name]||0,percent=Math.min(100,used/limit*100),color=percent>=100?"#e4775c":categoryColors[name];return `<div><div class="budget-item-head"><strong>${name}</strong><span>${money(used)} / ${money(limit)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%;background:${color}"></div></div></div>`;}).join("");
}
function renderTransactions(){
  const rows=[...transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8);
  byId("transactionRows").innerHTML=rows.length?rows.map(t=>`<tr><td><div class="transaction-name"><span class="transaction-icon">${categoryIcons[t.category]||"•"}</span>${escapeHtml(t.name)}</div></td><td><span class="category-tag">${escapeHtml(t.category)}</span></td><td>${new Date(t.date+"T00:00:00").toLocaleDateString("en-KE",{day:"numeric",month:"short",year:"numeric"})}</td><td class="amount-cell">− ${money(t.amount)}</td></tr>`).join(""):'<tr><td colspan="4" class="empty-table">No transactions yet. Add your first expense.</td></tr>';
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));}

byId("topAddButton").addEventListener("click",openModal);
byId("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",event=>{if(event.target===modal)closeModal();});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeModal();});
byId("expenseForm").addEventListener("submit",event=>{
  event.preventDefault(); const data=new FormData(event.currentTarget);
  const name=String(data.get("name")).trim(), amount=Number(data.get("amount")), category=String(data.get("category")), date=String(data.get("date"));
  if(!name||!Number.isFinite(amount)||amount<=0||!date){byId("formMessage").textContent="Please enter a name, valid amount and date.";return;}
  transactions.push({id:Date.now(),name,amount,category,date});
  localStorage.setItem(STORAGE_KEY,JSON.stringify(transactions)); event.currentTarget.reset(); closeModal(); renderSummary(); showToast("Expense saved successfully.");
});
byId("viewAllButton").addEventListener("click",()=>{document.querySelector("#transactions").scrollIntoView({behavior:"smooth"});showToast("Showing your latest transactions.");});
byId("menuButton").addEventListener("click",()=>byId("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>byId("sidebar").classList.remove("open")));
byId("todayLabel").textContent=new Date().toLocaleDateString("en-KE",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
byId("yearLabel").textContent=new Date().getFullYear();
renderSummary();