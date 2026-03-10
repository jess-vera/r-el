/* ============================================
   RECEIPT AS EMOTIONAL LEDGER — APP LOGIC
   ============================================ */

// ---- CONFIG ----
const API_KEY = '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';

// ---- STORE TYPES (global) ----
const STORE_TYPES = [
  { group: 'FOOD + GROCERY', items: [
    { v: 'grocery', l: 'GROCERY / SUPERMARKET' },
    { v: 'hypermarket', l: 'HYPERMARKET' },
    { v: 'market', l: 'OPEN-AIR MARKET / BAZAAR' },
    { v: 'butcher', l: 'BUTCHER / FISHMONGER' },
    { v: 'bakery', l: 'BAKERY' },
    { v: 'greengrocer', l: 'GREENGROCER / PRODUCE STAND' },
    { v: 'deli', l: 'DELI / PREPARED FOOD' },
    { v: 'kirana', l: 'KIRANA / CORNER SHOP' },
    { v: 'bodega', l: 'BODEGA / TIENDA' },
    { v: 'food-coop', l: 'FOOD CO-OP' }
  ]},
  { group: 'CONVENIENCE + GAS', items: [
    { v: 'convenience', l: 'CONVENIENCE STORE' },
    { v: 'gas', l: 'GAS / PETROL STATION' },
    { v: 'kiosk', l: 'KIOSK / NEWSSTAND' }
  ]},
  { group: 'DISCOUNT + VALUE', items: [
    { v: 'discount', l: 'DISCOUNT / DOLLAR STORE' },
    { v: 'warehouse', l: 'WAREHOUSE CLUB' },
    { v: 'outlet', l: 'OUTLET STORE' },
    { v: 'thrift', l: 'THRIFT / SECONDHAND' },
    { v: 'liquidation', l: 'LIQUIDATION / CLEARANCE' }
  ]},
  { group: 'HEALTH + PHARMACY', items: [
    { v: 'pharmacy', l: 'PHARMACY / DRUGSTORE' },
    { v: 'health-food', l: 'HEALTH FOOD / SUPPLEMENT' },
    { v: 'herbal', l: 'HERBAL / TRADITIONAL MEDICINE' },
    { v: 'optical', l: 'OPTICAL' }
  ]},
  { group: 'HOUSEHOLD + HARDWARE', items: [
    { v: 'hardware', l: 'HARDWARE STORE' },
    { v: 'home-goods', l: 'HOME GOODS / HOUSEWARES' },
    { v: 'furniture', l: 'FURNITURE' },
    { v: 'garden', l: 'GARDEN CENTER / NURSERY' }
  ]},
  { group: 'CLOTHING + PERSONAL', items: [
    { v: 'clothing', l: 'CLOTHING / APPAREL' },
    { v: 'shoes', l: 'SHOE STORE' },
    { v: 'beauty', l: 'BEAUTY / COSMETICS' },
    { v: 'laundry', l: 'LAUNDROMAT / DRY CLEANER' }
  ]},
  { group: 'DEPARTMENT + GENERAL', items: [
    { v: 'department', l: 'DEPARTMENT STORE' },
    { v: 'general', l: 'GENERAL STORE' },
    { v: 'variety', l: 'VARIETY STORE' }
  ]},
  { group: 'SPECIALTY', items: [
    { v: 'electronics', l: 'ELECTRONICS' },
    { v: 'bookstore', l: 'BOOKSTORE / STATIONERY' },
    { v: 'pet', l: 'PET SUPPLY' },
    { v: 'auto', l: 'AUTO PARTS' },
    { v: 'sporting', l: 'SPORTING GOODS' },
    { v: 'toy', l: 'TOY STORE' },
    { v: 'craft', l: 'CRAFT / ART SUPPLY' }
  ]},
  { group: 'FOOD SERVICE', items: [
    { v: 'restaurant', l: 'RESTAURANT / TAKEAWAY' },
    { v: 'cafe', l: 'CAFE / COFFEE SHOP' },
    { v: 'street-food', l: 'STREET FOOD / HAWKER' },
    { v: 'fast-food', l: 'FAST FOOD' }
  ]},
  { group: 'SERVICES', items: [
    { v: 'medical', l: 'MEDICAL / CLINIC' },
    { v: 'childcare', l: 'CHILDCARE' },
    { v: 'transport', l: 'TRANSPORT / TRANSIT' },
    { v: 'utility', l: 'UTILITY PAYMENT' },
    { v: 'telecom', l: 'TELECOM / MOBILE TOP-UP' }
  ]},
  { group: 'OTHER', items: [
    { v: 'online', l: 'ONLINE / E-COMMERCE' },
    { v: 'vending', l: 'VENDING MACHINE' },
    { v: 'other', l: 'OTHER' }
  ]}
];

// ---- REGIONS (UN Geoscheme) ----
const REGIONS = [
  { group: 'AFRICA', items: [
    { v: 'af-north', l: 'NORTHERN AFRICA' },
    { v: 'af-east', l: 'EASTERN AFRICA' },
    { v: 'af-middle', l: 'MIDDLE AFRICA' },
    { v: 'af-south', l: 'SOUTHERN AFRICA' },
    { v: 'af-west', l: 'WESTERN AFRICA' }
  ]},
  { group: 'AMERICAS', items: [
    { v: 'am-caribbean', l: 'CARIBBEAN' },
    { v: 'am-central', l: 'CENTRAL AMERICA' },
    { v: 'am-south', l: 'SOUTH AMERICA' },
    { v: 'am-north', l: 'NORTHERN AMERICA' }
  ]},
  { group: 'ASIA', items: [
    { v: 'as-central', l: 'CENTRAL ASIA' },
    { v: 'as-east', l: 'EASTERN ASIA' },
    { v: 'as-southeast', l: 'SOUTH-EASTERN ASIA' },
    { v: 'as-south', l: 'SOUTHERN ASIA' },
    { v: 'as-west', l: 'WESTERN ASIA' }
  ]},
  { group: 'EUROPE', items: [
    { v: 'eu-east', l: 'EASTERN EUROPE' },
    { v: 'eu-north', l: 'NORTHERN EUROPE' },
    { v: 'eu-south', l: 'SOUTHERN EUROPE' },
    { v: 'eu-west', l: 'WESTERN EUROPE' }
  ]},
  { group: 'OCEANIA', items: [
    { v: 'oc-aunz', l: 'AUSTRALIA + NEW ZEALAND' },
    { v: 'oc-melanesia', l: 'MELANESIA' },
    { v: 'oc-micronesia', l: 'MICRONESIA' },
    { v: 'oc-polynesia', l: 'POLYNESIA' }
  ]}
];

// ---- EMOTIONAL TAGS ----
const BASE_EMOTIONS = [
  'necessity','survival','care','sacrifice','guilt','relief',
  'stress','joy','grief','scarcity','shame','abundance',
  'exhaustion','hope'
];

// ---- SEED DATA ----
const SEED_DATA = [
  { id:'s1', storeType:'grocery', total:67.43, items:14, region:'am-north', tags:['necessity','stress'], note:'Everything costs more than last month. I put back the berries.', date:'2026-03-02' },
  { id:'s2', storeType:'pharmacy', total:124.89, items:3, region:'am-north', tags:['survival','guilt'], note:'Insurance did not cover it. Three months of this.', date:'2026-03-04' },
  { id:'s3', storeType:'grocery', total:23.17, items:8, region:'am-north', tags:['care','sacrifice'], note:'Packed lunch ingredients for the kids. Skipped mine.', date:'2026-03-05' },
  { id:'s4', storeType:'discount', total:41.02, items:11, region:'am-north', tags:['necessity','scarcity'], note:'', date:'2026-03-06' },
  { id:'s5', storeType:'grocery', total:189.34, items:32, region:'am-north', tags:['care','joy'], note:'First time in months I could fill the cart.', date:'2026-03-01' },
  { id:'s6', storeType:'gas', total:58.00, items:1, region:'am-north', tags:['necessity','stress'], note:'Full tank so I can make it to both jobs this week.', date:'2026-03-03' },
  { id:'s7', storeType:'grocery', total:34.76, items:9, region:'am-north', tags:['survival','shame'], note:'Used coupons for everything. The cashier was kind.', date:'2026-03-07' },
  { id:'s8', storeType:'warehouse', total:312.45, items:18, region:'am-north', tags:['care','relief'], note:'Split the membership with my neighbor. We share the bulk items.', date:'2026-02-28' },
  { id:'s9', storeType:'convenience', total:11.49, items:3, region:'am-north', tags:['guilt','necessity'], note:'Forgot lunch. This was the only option near work.', date:'2026-03-06' },
  { id:'s10', storeType:'grocery', total:52.83, items:12, region:'eu-west', tags:['stress','scarcity','grief'], note:'Prices up again. My mother used to cook this for less than half.', date:'2026-03-08' },
  { id:'s11', storeType:'pharmacy', total:8.99, items:1, region:'am-north', tags:['survival'], note:'', date:'2026-03-07' },
  { id:'s12', storeType:'grocery', total:97.21, items:22, region:'am-north', tags:['abundance','joy','relief'], note:'Tax return came. I bought real cheese.', date:'2026-03-04' }
];

// ---- STATE ----
const STORAGE_KEY = 'rel_archive';
const GALLERY_KEY = 'rel_gallery';
let entries = [];
let activeFilter = 'all';
let selectedTags = new Set();
let pendingPhoto = null;
let storeValue = '';
let regionValue = '';

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initGlyphCanvas();
  initMobileNav();
  loadEntries();
  renderTagButtons();
  initSearchableSelect('store-select', STORE_TYPES, v => storeValue = v);
  initSearchableSelect('region-select', REGIONS, v => regionValue = v);
  renderArchive();
  renderStats();
  renderEmotionalPulse();
  renderFilters();
  renderEmotionBars();
  renderCoOccurrences();
  bindForm();
  bindTags();
  bindPhotoUpload();
  bindEmotionAssist();
});

// ---- GLYPH CANVAS ----
function initGlyphCanvas() {
  const c = document.getElementById('glyph-bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  function resize() { c.width = window.innerWidth; c.height = document.documentElement.scrollHeight; draw(); }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = '10px IBM Plex Mono,monospace'; ctx.fillStyle = '#2A2A28';
    const ch = '6699EEEE6699EE00669966EE9966EE00', cW = 9, cH = 13;
    const cols = Math.ceil(c.width / cW), rows = Math.ceil(c.height / cH);
    for (let r = 0; r < rows; r++) for (let cl = 0; cl < cols; cl++) {
      const nx = cl/cols, ny = r/rows, dist = Math.sqrt((nx-.5)**2+(ny-.35)**2);
      const dn = Math.sin(ny*12)*.3+.5+Math.cos(nx*8+ny*3)*.2-(dist<.08?.8:0);
      if (((cl*7+r*13+cl*r)%97)/97 < dn*.6)
        ctx.fillText(ch[(cl*3+r*7)%ch.length], cl*cW, r*cH);
    }
  }
  resize();
  window.addEventListener('resize', () => { clearTimeout(window._gr); window._gr = setTimeout(resize, 200); });
  new MutationObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(c.height-h)>100){c.height=h;draw()} }).observe(document.body,{childList:true,subtree:true});
}

// ---- MOBILE NAV ----
function initMobileNav() {
  const logo = document.querySelector('.nav-logo');
  const overlay = document.getElementById('nav-mobile');
  const close = document.getElementById('nav-close');
  if (!logo || !overlay) return;
  
  function isMobile() { return window.innerWidth <= 480; }
  
  function updateLogo() {
    if (isMobile()) { logo.classList.add('is-trigger'); }
    else { logo.classList.remove('is-trigger'); overlay.classList.remove('open'); }
  }
  
  updateLogo();
  window.addEventListener('resize', updateLogo);
  
  logo.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      overlay.classList.add('open');
    }
  });
  
  close.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => overlay.classList.remove('open')));
}

// ---- SEARCHABLE SELECT ----
function initSearchableSelect(id, data, onSelect) {
  const container = document.getElementById(id);
  const input = container.querySelector('.ss-input');
  const dropdown = container.querySelector('.ss-dropdown');
  let allItems = [];
  data.forEach(g => g.items.forEach(it => allItems.push({ ...it, group: g.group })));

  function render(filter) {
    const q = (filter || '').toUpperCase();
    let html = '';
    data.forEach(g => {
      const matches = g.items.filter(it => !q || it.l.includes(q) || g.group.includes(q));
      if (matches.length === 0) return;
      html += `<div class="ss-group-label">${g.group}</div>`;
      matches.forEach(it => {
        html += `<div class="ss-option" data-value="${it.v}">${it.l}</div>`;
      });
    });
    if (!html) html = '<div class="ss-no-results">NO MATCHES</div>';
    dropdown.innerHTML = html;
    dropdown.querySelectorAll('.ss-option').forEach(opt => {
      opt.addEventListener('mousedown', (e) => {
        e.preventDefault();
        input.value = opt.textContent;
        onSelect(opt.dataset.value);
        dropdown.classList.remove('open');
      });
    });
  }

  input.addEventListener('focus', () => { render(input.value); dropdown.classList.add('open'); });
  input.addEventListener('input', () => { render(input.value); dropdown.classList.add('open'); });
  input.addEventListener('blur', () => { setTimeout(() => dropdown.classList.remove('open'), 150); });

  render('');
}

// ---- TAG BUTTONS ----
function renderTagButtons() {
  const grid = document.getElementById('tags-grid');
  grid.innerHTML = BASE_EMOTIONS.map(t =>
    `<button class="tag-btn" data-tag="${t}">${t.toUpperCase()}</button>`
  ).join('');
}

function bindTags() {
  document.getElementById('tags-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-btn');
    if (!btn) return;
    const t = btn.dataset.tag;
    if (selectedTags.has(t)) { selectedTags.delete(t); btn.classList.remove('active'); }
    else { selectedTags.add(t); btn.classList.add('active'); }
  });
}

function addTag(tag) {
  const normalized = tag.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return;
  selectedTags.add(normalized);
  // Ensure button exists
  const grid = document.getElementById('tags-grid');
  let btn = grid.querySelector(`[data-tag="${normalized}"]`);
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'tag-btn active';
    btn.dataset.tag = normalized;
    btn.textContent = normalized.toUpperCase();
    grid.appendChild(btn);
  } else {
    btn.classList.add('active');
  }
}

// ---- AI EMOTION ASSISTANT ----
function bindEmotionAssist() {
  document.getElementById('emotion-assist-btn').addEventListener('click', handleEmotionAssist);
}

async function handleEmotionAssist() {
  const input = document.getElementById('emotion-input');
  const btn = document.getElementById('emotion-assist-btn');
  const container = document.getElementById('emotion-suggestions');
  const text = input.value.trim();
  if (!text) return;

  btn.classList.add('loading');
  btn.textContent = '...';
  container.innerHTML = '';

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: 'You are R:EL AI, the emotional vocabulary assistant for Receipt as Emotional Ledger, an anti-extractive civic archive. This project transforms disposable consumer receipts into collective emotional and economic knowledge. It challenges retail data analytics, consumer finance, and the emotional labor economy by making the invisible feelings attached to spending visible, public, and shared. Your role is to help contributors name emotions that corporate data systems deliberately erase: the stress of survival spending, the care embedded in feeding a family, the grief of watching prices rise, the shame systems impose on those who struggle. Given a description of what someone felt while shopping or at checkout, suggest 4-6 single-word emotional tags that are specific, honest, and structurally aware. Prefer words that name economic and caregiving emotions over clinical or therapeutic language. Return ONLY a JSON array of lowercase single words. No explanation. Example: ["sacrifice","exhaustion","devotion","scarcity","tenderness"]',
        messages: [{ role: 'user', content: text }]
      })
    });
    const data = await resp.json();
    const raw = data.content[0].text.trim();
    const tags = JSON.parse(raw);

    container.innerHTML = tags.map(t =>
      `<button class="emotion-sug-btn" data-tag="${t}">${t.toUpperCase()}</button>`
    ).join('') + '<span class="emotion-sug-note">R:EL AI SUGGESTIONS — TAP TO ADD TO YOUR TAGS</span>';

    container.querySelectorAll('.emotion-sug-btn').forEach(b => {
      b.addEventListener('click', () => {
        addTag(b.dataset.tag);
        b.classList.add('added');
      });
    });
  } catch (e) {
    container.innerHTML = '<span class="emotion-sug-note">COULD NOT REACH R:EL AI. SELECT TAGS MANUALLY.</span>';
  }

  btn.classList.remove('loading');
  btn.textContent = 'SUGGEST';
}

// ---- DATA ----
function loadEntries() {
  try { const s = localStorage.getItem(STORAGE_KEY); entries = [...SEED_DATA, ...(s?JSON.parse(s):[])]; }
  catch(e) { entries = [...SEED_DATA]; }
}
function saveEntry(entry) {
  try { const s = localStorage.getItem(STORAGE_KEY); const a = s?JSON.parse(s):[]; a.push(entry); localStorage.setItem(STORAGE_KEY,JSON.stringify(a)); } catch(e){}
  entries.push(entry);
}
function saveGalleryPhoto(d) {
  try { const s = localStorage.getItem(GALLERY_KEY); const a = s?JSON.parse(s):[]; a.push(d); localStorage.setItem(GALLERY_KEY,JSON.stringify(a)); } catch(e){}
}

// ---- PHOTO ----
function bindPhotoUpload() {
  const area = document.getElementById('photo-upload-area');
  const input = document.getElementById('receipt-photo');
  const prompt = document.getElementById('photo-upload-prompt');
  const img = document.getElementById('photo-preview-img');
  const rm = document.getElementById('photo-remove');
  if (!area) return;
  area.addEventListener('click', e => { if (e.target===rm||e.target.closest('.photo-remove'))return; if(!img.classList.contains('visible'))input.click(); });
  input.addEventListener('change', e => {
    const f = e.target.files[0]; if(!f)return;
    const r = new FileReader();
    r.onload = ev => resizeImage(ev.target.result, 600, res => { pendingPhoto=res; img.src=res; img.classList.add('visible'); rm.classList.add('visible'); prompt.style.display='none'; });
    r.readAsDataURL(f);
  });
  rm.addEventListener('click', e => { e.stopPropagation(); pendingPhoto=null; input.value=''; img.classList.remove('visible'); img.removeAttribute('src'); rm.classList.remove('visible'); prompt.style.display=''; });
}
function resizeImage(u,mW,cb) { const i=new Image(); i.onload=()=>{const s=Math.min(1,mW/i.width);const c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',0.7))}; i.src=u; }

// ---- FORM ----
function bindForm() { document.getElementById('submit-btn').addEventListener('click', handleSubmit); }

function handleSubmit() {
  if (!storeValue) { showFeedback('SELECT A STORE TYPE.','error'); return; }
  const total = parseFloat(document.getElementById('total').value);
  if (isNaN(total)||total<=0) { showFeedback('ENTER A VALID TOTAL AMOUNT.','error'); return; }
  if (selectedTags.size===0) { showFeedback('SELECT AT LEAST ONE EMOTIONAL TAG.','error'); return; }
  const items = parseInt(document.getElementById('items-count').value)||0;
  const note = document.getElementById('note').value.trim();

  const entry = { id:'u'+Date.now(), storeType:storeValue, total, items, region:regionValue, tags:Array.from(selectedTags), note, date:new Date().toISOString().split('T')[0] };
  saveEntry(entry);
  if (pendingPhoto) saveGalleryPhoto({ id:'p'+Date.now(), image:pendingPhoto, date:entry.date, timestamp:new Date().toISOString() });
  showFeedback('SUBMITTED. YOUR RECEIPT IS NOW PART OF THE ARCHIVE.','success');
  resetForm();
  renderArchive(); renderStats(); renderEmotionalPulse(); renderFilters(); renderEmotionBars(); renderCoOccurrences();
  setTimeout(()=>document.getElementById('archive').scrollIntoView({behavior:'smooth'}),800);
}

function showFeedback(m,t) { const e=document.getElementById('submit-feedback'); e.textContent=m; e.className='submit-feedback '+t; if(t==='success')setTimeout(()=>{e.textContent='';e.className='submit-feedback'},4000); }

function resetForm() {
  storeValue=''; regionValue='';
  document.querySelectorAll('.ss-input').forEach(i=>i.value='');
  document.getElementById('total').value='';
  document.getElementById('items-count').value='';
  document.getElementById('note').value='';
  document.getElementById('emotion-input').value='';
  document.getElementById('emotion-suggestions').innerHTML='';
  selectedTags.clear();
  document.querySelectorAll('#tags-grid .tag-btn').forEach(b=>b.classList.remove('active'));
  pendingPhoto=null;
  const fi=document.getElementById('receipt-photo'); if(fi)fi.value='';
  const img=document.getElementById('photo-preview-img'),rm=document.getElementById('photo-remove'),pr=document.getElementById('photo-upload-prompt');
  if(img){img.classList.remove('visible');img.removeAttribute('src')} if(rm)rm.classList.remove('visible'); if(pr)pr.style.display='';
}

// ---- FILTERS ----
function renderFilters() {
  const el = document.getElementById('archive-filter');
  const allTags = new Set(); entries.forEach(e=>e.tags.forEach(t=>allTags.add(t)));
  const sorted = [...allTags].sort();
  el.innerHTML = `<button class="filter-btn${activeFilter==='all'?' active':''}" data-filter="all">ALL</button>` +
    sorted.map(t=>`<button class="filter-btn${activeFilter===t?' active':''}" data-filter="${t}">${t.toUpperCase()}</button>`).join('');
  el.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
    el.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); activeFilter=b.dataset.filter; renderArchive();
  }));
}

// ---- ARCHIVE ----
function renderArchive() {
  const grid = document.getElementById('archive-grid');
  let f = activeFilter==='all'?entries:entries.filter(e=>e.tags.includes(activeFilter));
  f.sort((a,b)=>b.date.localeCompare(a.date));
  grid.innerHTML = f.map((e,i)=>`
    <div class="archive-entry" style="animation-delay:${i*.04}s">
      <div class="entry-header"><span class="entry-store">${fmtStore(e.storeType)}</span><span class="entry-amount">$${e.total.toFixed(2)}</span></div>
      <div class="entry-meta">${fmtDate(e.date)}${e.items?' · '+e.items+' items':''}${e.region?' · '+fmtRegion(e.region):''}</div>
      <div class="entry-tags">${e.tags.map(t=>`<span class="entry-tag">${t.toUpperCase()}</span>`).join('')}</div>
      ${e.note?`<div class="entry-note">"${e.note}"</div>`:''}
    </div>`).join('');
}

// ---- STATS ----
function renderStats() {
  const el = document.getElementById('archive-stats');
  const n=entries.length, tot=entries.reduce((s,e)=>s+e.total,0), avg=n?tot/n:0;
  const regions=new Set(entries.map(e=>e.region).filter(Boolean)).size;
  const emotions=new Set(entries.flatMap(e=>e.tags)).size;
  el.innerHTML = `<div class="stat"><span class="stat-num">${n}</span><span class="stat-label">RECEIPTS</span></div>
    <div class="stat"><span class="stat-num">$${tot.toFixed(0)}</span><span class="stat-label">TOTAL RECORDED</span></div>
    <div class="stat"><span class="stat-num">$${avg.toFixed(0)}</span><span class="stat-label">AVG PER RECEIPT</span></div>
    <div class="stat"><span class="stat-num">${regions}</span><span class="stat-label">REGIONS</span></div>
    <div class="stat"><span class="stat-num">${emotions}</span><span class="stat-label">EMOTIONS TRACKED</span></div>`;
}

// ---- EMOTIONAL PULSE ----
function renderEmotionalPulse() {
  const el = document.getElementById('emotional-pulse');
  const counts = {}; entries.forEach(e=>e.tags.forEach(t=>counts[t]=(counts[t]||0)+1));
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  if (!top) { el.innerHTML=''; return; }
  const topPct = ((top[1]/entries.length)*100).toFixed(0);
  const distress=['stress','guilt','grief','shame','scarcity','survival','exhaustion','resentment','anxiety','desperation','frustration','numbness','inadequacy','dread','rage'];
  const sustaining=['care','joy','relief','abundance','tenderness','pride','gratitude','hope','solidarity','dignity','devotion'];
  let dC=0,sC=0;
  entries.forEach(e=>e.tags.forEach(t=>{if(distress.includes(t))dC++;if(sustaining.includes(t))sC++}));
  const tot=dC+sC, dP=tot?((dC/tot)*100).toFixed(0):0, sP=tot?((sC/tot)*100).toFixed(0):0;
  el.innerHTML = `<div class="pulse-label">COLLECTIVE EMOTIONAL STATE</div>
    <div class="pulse-value">${top[0].toUpperCase()} is the most frequently recorded emotion (${topPct}% of receipts)</div>
    <div class="pulse-detail">Across all submissions: ${dP}% of emotional tags indicate economic distress while ${sP}% indicate sustaining conditions. The ratio of distress to sustenance is a measure of collective economic pressure.</div>`;
}

// ---- EMOTION BARS ----
function renderEmotionBars() {
  const el = document.getElementById('emotion-bars');
  const counts = {}; let max = 0;
  entries.forEach(e=>e.tags.forEach(t=>{counts[t]=(counts[t]||0)+1;if(counts[t]>max)max=counts[t]}));
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  el.innerHTML = sorted.map(([t,c])=>{
    const pct=max?(c/max)*100:0, rP=entries.length?((c/entries.length)*100).toFixed(0):0;
    return `<div class="emotion-bar-row"><span class="emotion-bar-label">${t.toUpperCase()}</span><div class="emotion-bar-track"><div class="emotion-bar-fill" style="width:${pct}%"></div></div><span class="emotion-bar-count">${c}</span><span class="emotion-bar-pct">${rP}%</span></div>`;
  }).join('');
}

// ---- CO-OCCURRENCES ----
function renderCoOccurrences() {
  const el = document.getElementById('emotion-pairs');
  const pairs = {};
  entries.forEach(e=>{const t=[...e.tags].sort();for(let i=0;i<t.length;i++)for(let j=i+1;j<t.length;j++){const k=t[i]+' + '+t[j];pairs[k]=(pairs[k]||0)+1}});
  const sorted = Object.entries(pairs).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const max = sorted.length?sorted[0][1]:1;
  el.innerHTML = sorted.map(([p,c])=>`<div class="pair-row"><span class="pair-tags">${p.toUpperCase()}</span><div class="pair-bar-track"><div class="pair-bar-fill" style="width:${(c/max)*100}%"></div></div><span class="pair-count">${c}</span></div>`).join('');
}

// ---- HELPERS ----
function fmtStore(v) {
  for (const g of STORE_TYPES) for (const it of g.items) if (it.v===v) return it.l;
  return v.toUpperCase();
}
function fmtRegion(v) {
  for (const g of REGIONS) for (const it of g.items) if (it.v===v) return it.l;
  return v.toUpperCase();
}
function fmtDate(d) {
  const dt=new Date(d+'T12:00:00');
  return `${dt.getDate()} ${['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][dt.getMonth()]} ${dt.getFullYear()}`;
}
