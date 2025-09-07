import os, json, base64, zipfile, subprocess, shutil, textwrap

PROJECT = "scoutee"
BASE = os.path.join(os.getcwd(), PROJECT)

# =====================================================================
# Utils
# =====================================================================
def write(path, content, binary=False):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb" if binary else "w", encoding=None if binary else "utf-8") as f:
        f.write(content if binary else content.strip() + "\n")

# =====================================================================
# BLOCCO 1 — Core & Infrastructure
# =====================================================================
PACKAGE_JSON = {
    "name": "scoutee",
    "version": "5.0.0",
    "private": True,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "next": "14.2.5",
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "tailwindcss": "3.4.10",
        "postcss": "8.4.41",
        "autoprefixer": "10.4.20",
        "framer-motion": "11.3.24",
        "i18next": "23.11.5",
        "react-i18next": "15.1.4",
        "@supabase/supabase-js": "2.45.3",
        "mapbox-gl": "3.4.0",
        "next-pwa": "5.6.0",
        "next-seo": "6.5.0"
    },
    "devDependencies": {
        "eslint": "8.57.0",
        "eslint-config-next": "14.2.5"
    }
}

TAILWIND_CFG = textwrap.dedent("""
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { light: "#818cf8", DEFAULT: "#6366f1", dark: "#4f46e5" },
        accent: { pink: "#ec4899", violet: "#a855f7", cyan: "#22d3ee" },
        comfort: { light: "#f8f9fa", dark: "#0b0f19" },
        sos: "#ef4444"
      },
      fontFamily: { sans: ["Inter","Nunito","system-ui","sans-serif"] },
      boxShadow: { glow: "0 0 20px rgba(99,102,241,.35)", card: "0 4px 14px rgba(0,0,0,0.1)" },
      borderRadius: { xl: "1.25rem", "2xl": "1.75rem" }
    }
  },
  plugins: []
}
""").strip()

POSTCSS_CFG = {
    "plugins": {
        "tailwindcss": {},
        "autoprefixer": {}
    }
}

JSCONFIG = {
    "compilerOptions": {
        "baseUrl": "src",
        "paths": {
            "@/*": ["*"]
        }
    }
}

GLOBAL_CSS = """@tailwind base;
@tailwind components;
@tailwind utilities;

/* Comfort base */
:root { color-scheme: light dark; }
html,body { height: 100%; }
body { margin: 0; }
a { text-decoration: none; }
"""

GITIGNORE = textwrap.dedent("""
node_modules/
.pnpm-store/
dist/
.next/
out/
.env*
!.env.local.example
.vscode/
.idea/
.DS_Store
coverage/
""").strip()

ENV_EXAMPLE = textwrap.dedent("""
# Public keys (ok su client)
NEXT_PUBLIC_MAPBOX_KEY=
NEXT_PUBLIC_AI_KEY=

# Se monetizzi dopo:
# NEXT_PUBLIC_ADSENSE_KEY=
# NEXT_PUBLIC_PAYPAL_ID=
# NEXT_PUBLIC_STRIPE_PK=
# NEXT_PUBLIC_CRYPTO_WALLET=
""").strip()

README = textwrap.dedent("""
# 🦊 Scoutee — Survival Companion Europe+World

Super-app gratuita per viaggiatori: servizi locali, SOS, AI.  
- Mobility (Uber, Bolt, Enjoy, e-scooters…)  
- Connectivity (Airalo, Holafly, Nomad)  
- Fintech (Revolut, Wise, N26)  
- Food (Glovo, Wolt, Deliveroo, UberEats)  
- Tours (GetYourGuide, Klook, TheFork)

Tech: Next.js 14, Tailwind, SEO, PWA, i18n-ready, CI/CD.
""").strip()

LOGO_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='512' height='512' rx='96' fill='#0B0F19'/><circle cx='256' cy='256' r='128' fill='#6366F1'/><circle cx='220' cy='240' r='20' fill='#fff'/><circle cx='292' cy='240' r='20' fill='#fff'/><path d='M200,300 Q256,360 312,300' stroke='#fff' stroke-width='20' fill='none'/></svg>"
TINY_PNG = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=")

MANIFEST = {
    "name": "Scoutee",
    "short_name": "Scoutee",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0B0F19",
    "theme_color": "#6366f1",
    "icons": [
        {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png"}
    ]
}

SEO_CONFIG = """import { DefaultSeo } from 'next-seo';
export default function SEO(){
  return <DefaultSeo title='Scoutee — Survival Companion'
    description='Find services, SOS & AI help based on where you are.'/>;
}
"""

WORKFLOW_DEPLOY = textwrap.dedent("""
name: Scoutee CI/CD
on:
  push:
    branches: [ "main" ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
""").strip()

WORKFLOW_CRON = textwrap.dedent("""
name: Scoutee Dataset Auto-Update
on:
  schedule:
    - cron: '0 3 * * 1'
jobs:
  update-dataset:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Update dataset
        run: |
          echo '{"last_update":"$(date)"}' > src/data/last_update.json
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add src/data/last_update.json
          git commit -m "chore: auto-update dataset"
          git push
""").strip()

def create_core():
    # package & base
    write(os.path.join(BASE, "package.json"), json.dumps(PACKAGE_JSON, indent=2))
    write(os.path.join(BASE, "tailwind.config.js"), TAILWIND_CFG)
    write(os.path.join(BASE, ".gitignore"), GITIGNORE)
    write(os.path.join(BASE, ".env.local.example"), ENV_EXAMPLE)
    write(os.path.join(BASE, "README.md"), README)

    # public / PWA
    write(os.path.join(BASE, "public/logo.svg"), LOGO_SVG)
    write(os.path.join(BASE, "public/manifest.webmanifest"), json.dumps(MANIFEST, indent=2))
    write(os.path.join(BASE, "public/icons/icon-192.png"), TINY_PNG, binary=True)
    write(os.path.join(BASE, "public/icons/icon-512.png"), TINY_PNG, binary=True)

    # SEO
    write(os.path.join(BASE, "src/lib/SEO.jsx"), SEO_CONFIG)

    # Workflows
    write(os.path.join(BASE, ".github/workflows/deploy.yml"), WORKFLOW_DEPLOY)
    write(os.path.join(BASE, ".github/workflows/update.yml"), WORKFLOW_CRON)

    # alias + postcss + styles
    write(os.path.join(BASE, "postcss.config.js"), json.dumps(POSTCSS_CFG, indent=2))
    write(os.path.join(BASE, "jsconfig.json"), json.dumps(JSCONFIG, indent=2))
    write(os.path.join(BASE, "src/styles/globals.css"), GLOBAL_CSS)

# =====================================================================
# BLOCCO 2 — Dataset & API
# =====================================================================
FULL_DATASET = {
  "services": [
    { "name": "Uber", "category": "Mobility", "icon": "🚕", "affiliate_url": "https://uber.com", "countries": ["ALL"] },
    { "name": "Bolt", "category": "Mobility", "icon": "🚖", "affiliate_url": "https://bolt.eu", "countries": ["AT","BE","FR","DE","IT","ES","PT","PL","UK"] },
    { "name": "FREE NOW", "category": "Mobility", "icon": "🚕", "affiliate_url": "https://free-now.com", "countries": ["DE","FR","IT","ES","UK"] },
    { "name": "Enjoy", "category": "Car Sharing", "icon": "🚗", "affiliate_url": "https://enjoy.eni.com", "countries": ["IT"] },
    { "name": "SHARE NOW", "category": "Car Sharing", "icon": "🚘", "affiliate_url": "https://www.share-now.com", "countries": ["DE","FR","IT","ES","AT"] },
    { "name": "eCooltra", "category": "Scooter", "icon": "🛵", "affiliate_url": "https://www.ecooltra.com", "countries": ["IT","ES","PT"] },
    { "name": "Lime", "category": "E-Scooter", "icon": "🛴", "affiliate_url": "https://li.me", "countries": ["FR","DE","IT","ES","PT","SE","NO","UK"] },
    { "name": "TIER", "category": "E-Scooter", "icon": "🛴", "affiliate_url": "https://www.tier.app", "countries": ["DE","AT","NO","SE","IT","FR","NL"] },
    { "name": "Voi", "category": "E-Scooter", "icon": "🛴", "affiliate_url": "https://www.voi.com", "countries": ["SE","DK","FI","DE","FR","IT","ES","UK"] },
    { "name": "Dott", "category": "E-Scooter", "icon": "🚲", "affiliate_url": "https://ridedott.com", "countries": ["FR","BE","IT","DE","PL"] },
    { "name": "Citymapper", "category": "Transit", "icon": "🚌", "affiliate_url": "https://citymapper.com", "countries": ["ALL"] },
    { "name": "Moovit", "category": "Transit", "icon": "🚇", "affiliate_url": "https://moovitapp.com", "countries": ["ALL"] },
    { "name": "Airalo", "category": "Connectivity", "icon": "📶", "affiliate_url": "https://airalo.com", "countries": ["ALL"] },
    { "name": "Holafly", "category": "Connectivity", "icon": "📡", "affiliate_url": "https://holafly.com", "countries": ["ALL"] },
    { "name": "Nomad", "category": "Connectivity", "icon": "📱", "affiliate_url": "https://getnomad.app", "countries": ["ALL"] },
    { "name": "GigSky", "category": "Connectivity", "icon": "🌐", "affiliate_url": "https://gigsky.com", "countries": ["ALL"] },
    { "name": "Revolut", "category": "Fintech", "icon": "💳", "affiliate_url": "https://revolut.com", "countries": ["ALL"] },
    { "name": "Wise", "category": "Fintech", "icon": "💱", "affiliate_url": "https://wise.com", "countries": ["ALL"] },
    { "name": "N26", "category": "Fintech", "icon": "🏦", "affiliate_url": "https://n26.com", "countries": ["DE","AT","IT","ES","FR"] },
    { "name": "Wolt", "category": "Food", "icon": "🍔", "affiliate_url": "https://wolt.com", "countries": ["AT","DE","GR","IT","SE","FI","PL","NO"] },
    { "name": "Glovo", "category": "Food", "icon": "🥡", "affiliate_url": "https://glovoapp.com", "countries": ["IT","ES","PT","RO","PL","UA","HR","RS"] },
    { "name": "Deliveroo", "category": "Food", "icon": "🥢", "affiliate_url": "https://deliveroo.com", "countries": ["IT","FR","UK","NL","BE","ES","IE"] },
    { "name": "UberEats", "category": "Food", "icon": "🍕", "affiliate_url": "https://ubereats.com", "countries": ["ALL"] },
    { "name": "GetYourGuide", "category": "Tours", "icon": "🎟️", "affiliate_url": "https://getyourguide.com", "countries": ["ALL"] },
    { "name": "Klook", "category": "Tours", "icon": "🌍", "affiliate_url": "https://klook.com", "countries": ["ALL"] },
    { "name": "TheFork", "category": "Restaurants", "icon": "🍴", "affiliate_url": "https://thefork.com", "countries": ["IT","FR","ES","PT","BE","NL"] }
  ],
  "emergencies": [
    { "country": "Italy", "iso": "IT", "numbers": { "general": "112", "police": "113", "ambulance": "118", "fire": "115" } },
    { "country": "France", "iso": "FR", "numbers": { "general": "112", "police": "17", "ambulance": "15", "fire": "18" } },
    { "country": "Germany", "iso": "DE", "numbers": { "general": "112", "police": "110" } },
    { "country": "Spain", "iso": "ES", "numbers": { "general": "112", "police": "091", "civil_guard": "062" } },
    { "country": "United Kingdom", "iso": "UK", "numbers": { "general": "999", "alternative": "112" } },
    { "country": "Portugal", "iso": "PT", "numbers": { "general": "112" } },
    { "country": "Netherlands", "iso": "NL", "numbers": { "general": "112" } },
    { "country": "Norway", "iso": "NO", "numbers": { "police": "112", "ambulance": "113", "fire": "110" } },
    { "country": "Switzerland", "iso": "CH", "numbers": { "general": "112", "police": "117", "ambulance": "144", "fire": "118" } },
    { "country": "WORLD", "iso": "ALL", "numbers": { "general": "112" } }
  ],
  "ads": [
    { "city": "Rome", "category": "Scooter", "title": "eCooltra -20% oggi", "url": "https://www.ecooltra.com/rome" },
    { "city": "Madrid", "category": "Taxi", "title": "Bolt 5€ off", "url": "https://bolt.eu/madrid" },
    { "city": "Berlin", "category": "Tour", "title": "GetYourGuide - Muro di Berlino", "url": "https://getyourguide.com/berlin" }
  ]
}

def create_dataset():
    write(os.path.join(BASE, "src/data/scoutee_master.json"),
          json.dumps(FULL_DATASET, indent=2, ensure_ascii=False))

def create_api():
    api_services = "import data from '@/data/scoutee_master.json'; export async function GET(){ return Response.json(data.services); }"
    api_emerg   = "import data from '@/data/scoutee_master.json'; export async function GET(){ return Response.json(data.emergencies); }"
    api_ads     = "import data from '@/data/scoutee_master.json'; export async function GET(){ return Response.json(data.ads); }"
    api_chat    = "export async function POST(req){ const {message}=await req.json(); let reply='Try Uber, SOS or eSIM.'; if((message||'').toLowerCase().includes('sos')) reply='Call 112 (EU) or your local emergency number.'; return Response.json({reply}); }"

    write(os.path.join(BASE, "src/app/api/services/route.js"), api_services)
    write(os.path.join(BASE, "src/app/api/emergencies/route.js"), api_emerg)
    write(os.path.join(BASE, "src/app/api/ads/route.js"), api_ads)
    write(os.path.join(BASE, "src/app/api/chat/route.js"), api_chat)

# =====================================================================
# BLOCCO 3 — UI (Navbar, Footer, ChatBot, Layout, Page) + globals.css
# =====================================================================
def create_ui():
    navbar = """export default function Navbar(){return(<nav className='p-4 shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50'>🦊 Scoutee</nav>)}"""
    footer = """export default function Footer(){return(<footer className='p-4 text-center text-sm text-gray-500'>© 2025 Scoutee</footer>)}"""
    chatbot = """import {useState} from 'react';
export default function ChatBotAI(){
  const [m,setM]=useState([{from:'bot',text:'Hi! I am Scoutee AI'}]); const [i,setI]=useState('');
  const send=async()=>{ if(!i.trim())return; setM(v=>[...v,{from:'user',text:i}]);
    try{ const r=await fetch('/api/chat',{method:'POST',body:JSON.stringify({message:i})});
      const d=await r.json(); setM(v=>[...v,{from:'bot',text:d.reply}]); }
    catch{ setM(v=>[...v,{from:'bot',text:'(offline) Try SOS or Uber'}]); }
    setI(''); };
  return(<div className='fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-900 border rounded-xl shadow-xl'>
    <div className='p-3 h-56 overflow-y-auto text-sm space-y-1'>{m.map((x,k)=>
      <div key={k} className={x.from==='bot'?'text-primary font-semibold':'text-gray-800 dark:text-gray-100'}>{x.text}</div>)}
    </div>
    <div className='flex border-t'>
      <input value={i} onChange={e=>setI(e.target.value)} className='flex-1 p-2 text-sm bg-transparent outline-none'/>
      <button onClick={send} className='px-3 bg-primary text-white rounded-r-xl'>▶</button>
    </div></div>);
}"""
    page = """import {useEffect,useState} from 'react';
import ChatBotAI from '@/components/ChatBotAI';
export default function Page(){
  const [d,setD]=useState({services:[],emergencies:[]});
  useEffect(()=>{ fetch('/api/services').then(r=>r.json()).then(s=>setD(p=>({...p,services:s})));
                  fetch('/api/emergencies').then(r=>r.json()).then(e=>setD(p=>({...p,emergencies:e}))); },[]);
  return(<div className='p-6 space-y-6'>
    <h1 className='text-2xl font-bold'>Welcome to Scoutee 🚀</h1>
    <section><h2 className='text-lg font-semibold mb-2'>Services</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {d.services.map((s,i)=><div key={i} className='p-4 rounded-xl shadow-card bg-white dark:bg-gray-900'>
          <div className='text-3xl'>{s.icon}</div><div className='font-bold'>{s.name}</div>
          <a className='text-primary text-sm' href={s.affiliate_url} target='_blank'>Open →</a></div>)}
      </div></section>
    <section><h2 className='text-lg font-semibold mb-2'>Emergencies</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {d.emergencies.map((c,i)=><div key={i} className='p-4 border-2 border-sos rounded-xl'>
          <div className='font-bold'>{c.country}</div>
          <pre className='text-xs'>{JSON.stringify(c.numbers,null,2)}</pre></div>)}
      </div></section>
    <ChatBotAI/>
  </div>);}
"""
    layout = """import '@/styles/globals.css';
import SEO from '@/lib/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({children}){
  return (
    <html lang="en">
      <body className="bg-comfort-light dark:bg-comfort-dark text-gray-900 dark:text-gray-100">
        <SEO/>
        <Navbar/>
        <main className="min-h-screen">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}"""

    write(os.path.join(BASE, "src/components/Navbar.jsx"), navbar)
    write(os.path.join(BASE, "src/components/Footer.jsx"), footer)
    write(os.path.join(BASE, "src/components/ChatBotAI.jsx"), chatbot)
    write(os.path.join(BASE, "src/app/page.jsx"), page)
    write(os.path.join(BASE, "src/app/layout.jsx"), layout)

# =====================================================================
# ZIP + GIT + (opz.) PUSH
# =====================================================================
def zip_repo():
    zip_path = os.path.join(os.getcwd(), f"{PROJECT}.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(BASE):
            for f in files:
                full = os.path.join(root, f)
                rel = os.path.relpath(full, os.path.dirname(BASE))
                z.write(full, rel)
    return zip_path

def init_git():
    try:
        subprocess.run(["git", "init", PROJECT], check=True)
        subprocess.run(["git", "-C", PROJECT, "checkout", "-b", "main"], check=True)
        subprocess.run(["git", "-C", PROJECT, "add", "."], check=True)
        subprocess.run(["git", "-C", PROJECT, "commit", "-m", "init: scoutee god edition"], check=True)
    except Exception as e:
        print("git init warning:", e)

def push_github():
    try:
        # Richiede gh installato e login: gh auth login
        subprocess.run(["gh","repo","create","kaglioster-hub/scoutee","--public","--source=./scoutee","--remote=origin","--push"], check=True)
        subprocess.run(["git","-C",PROJECT,"push","-u","origin","main"], check=True)
    except Exception as e:
        print("⚠️ GitHub CLI non configurato o repo già esistente. Dettagli:", e)

# =====================================================================
# MAIN
# =====================================================================
def main():
    if os.path.exists(BASE):
        shutil.rmtree(BASE)

    # 1) Core + alias + styles
    create_core()

    # 2) Dataset + API
    create_dataset()
    create_api()

    # 3) UI
    create_ui()

    # 4) Git + zip (push GitHub opzionale)
    init_git()
    # push_github()  # ← scommenta se vuoi creare/pushare automaticamente la repo con gh
    zip_path = zip_repo()

    print("✅ Repo completa generata:", BASE)
    print("📦 ZIP:", zip_path)
    print("🚀 Pronta al deploy su Vercel (build: npm ci && npm run build)")

if __name__ == "__main__":
    main()
