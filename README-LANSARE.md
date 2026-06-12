# Pachetul Verii — Checklist de lansare

## Ce este acest proiect
Landing page de vânzare directă (COD/ramburs) pentru oferta „Pachetul Verii":
WindWaver + ventilator de mână cadou = 149 lei, bump portofel RFID +39 lei,
upsell pe pagina de mulțumire +49 lei.

## Pașii de lansare (în ordine)

### 1. Completează datele lipsă (5 min)
- [ ] **Numărul de telefon** — caută `07XX XXX XXX` în `index.html` și `termeni.html` și înlocuiește (apare de 3 ori)
- [ ] Adresa completă a firmei în `termeni.html`/`confidentialitate.html` dacă vrei să adaugi numărul/orașul

### 2. Creează botul de Telegram pentru comenzi (5 min, gratuit)
Comenzile îți vin instant pe telefon, pe Telegram:
1. Deschide Telegram → caută **@BotFather** → trimite `/newbot` → dă-i un nume (ex: „Comenzi Pachetul Verii") → primești un **token** (îl copiezi)
2. Caută **@userinfobot** → trimite-i orice mesaj → îți răspunde cu **Id**-ul tău (number)
3. IMPORTANT: deschide o conversație cu botul tău nou și apasă **Start** (altfel nu-ți poate scrie)
4. Tokenul și ID-ul le pui la pasul 4 ca variabile de mediu

### 3. Publică pe Vercel (5 min, gratuit)
```bash
cd /Users/galman/Downloads/pachetul-verii
vercel login          # te loghezi cu emailul/GitHub
vercel --prod         # publică site-ul
```

### 4. Setează variabilele de mediu în Vercel
În dashboard-ul Vercel → proiect → Settings → Environment Variables:
- `TELEGRAM_BOT_TOKEN` = tokenul de la BotFather
- `TELEGRAM_CHAT_ID` = ID-ul de la userinfobot

Apoi rulează din nou `vercel --prod` ca să se aplice.

**Plasă de siguranță:** chiar dacă Telegram nu e configurat, comenzile apar în
Vercel → proiect → Logs (caută `[ORDER]`). Dar configurează Telegram înainte de reclame!

### 5. Creează Pixel Meta și pune ID-ul (10 min)
1. Meta Business Suite → Events Manager → Connect data → Web → creezi Pixelul
2. Copiezi **Pixel ID** (un număr lung)
3. Îl pui în `index.html` și `multumim.html` la linia `var META_PIXEL_ID = "";`
4. `vercel --prod` din nou

### 6. Testează TOT înainte de reclame
- [ ] Deschide site-ul pe TELEFON (acolo vin 95% din vizitatori)
- [ ] Plasează o comandă de test → verifică că primești mesajul pe Telegram
- [ ] Bifează bump-ul → totalul devine 188 lei
- [ ] Pe pagina de mulțumire, apasă upsell-ul → vine al doilea mesaj pe Telegram
- [ ] Verifică Pixelul cu extensia Chrome „Meta Pixel Helper"

### 7. Lansează reclamele
Vezi `/Users/galman/Downloads/produse-ro/reclame/pachetul-verii-reclame.md`
- Campanie de Vânzări, buget 50 lei/zi, 3 zile, targetare largă RO 25–55
- 3 reclame (cele 3 concepte) → păstrezi ce are cost/comandă sub 35 lei

## De actualizat pe parcurs
- **Stocul**: textul „ultimele 9 pachete" din `index.html` (apare de 2 ori — topbar și
  deasupra formularului). Actualizează-l pe măsură ce vinzi — NU lăsa cifre false.
- După epuizarea WindWaver: schimbăm oferta pe ventilatorul de birou (vorbim atunci).

## Economia per comandă (referință)
- Comandă simplă 149 lei: cost produse 44 + curier ~20 → contribuție 85 lei
- Cu bump (188 lei): +30 lei profit → contribuție 115 lei
- Cu upsell (+49): +35 lei profit
- Ținta de cost pe comandă din reclame (CPA): sub 35 lei
