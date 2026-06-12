// Vercel serverless: primește comanda și o trimite pe Telegram.
// Setezi în Vercel: Settings -> Environment Variables:
//   TELEGRAM_BOT_TOKEN  (de la @BotFather)
//   TELEGRAM_CHAT_ID    (ID-ul tău de chat, de la @userinfobot)

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method' });
  }

  const { nume, telefon, localitate, adresa, bump, total, tip } = req.body || {};

  if (tip !== 'upsell' && (!nume || !telefon || !adresa)) {
    return res.status(400).json({ ok: false, error: 'missing fields' });
  }

  const lines = tip === 'upsell'
    ? [
        '🔥 UPSELL — Pachetul Verii',
        `📞 Telefon: ${telefon}`,
        '➕ Încă un ventilator de mână (+49 lei)',
        '⚠️ Adaugă în coletul comenzii cu acest telefon!',
      ]
    : [
        '🆕 COMANDĂ NOUĂ — Pachetul Verii',
        `👤 ${nume}`,
        `📞 ${telefon}`,
        `📍 ${localitate}`,
        `🏠 ${adresa}`,
        `🎁 Bump portofel RFID: ${bump ? 'DA (+39 lei)' : 'nu'}`,
        `💰 TOTAL ramburs: ${total} lei`,
      ];
  const text = lines.join('\n');

  // Comanda apare mereu în logurile Vercel, chiar dacă Telegram nu e configurat.
  console.log('[ORDER]', JSON.stringify(req.body));

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (!r.ok) console.error('[TELEGRAM FAIL]', await r.text());
    } catch (e) {
      console.error('[TELEGRAM ERROR]', e.message);
    }
  }

  return res.status(200).json({ ok: true });
};
