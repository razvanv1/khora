import { ENV } from "./_core/env";

/**
 * Send notification via Manus Forge API (for admin alerts)
 */
async function sendNotification(title: string, content: string): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Forge API not configured");
    return false;
  }

  const endpoint = `${ENV.forgeApiUrl.replace(/\/$/, "")}/webdevtoken.v1.WebDevService/SendNotification`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      console.warn(`[Email] Notification failed (${response.status})`);
      return false;
    }

    console.log(`[Email] Notification sent: ${title}`);
    return true;
  } catch (error) {
    console.warn("[Email] Error:", error);
    return false;
  }
}

export type EmailPayload = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Send email via Resend API (for user emails)
 * Falls back to notification if Resend is not configured
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  // Try Resend API first (for real emails to users)
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Khora <noreply@khora.dezvatare.ro>",
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.warn(`[Email] Resend API failed: ${JSON.stringify(error)}`);
        return false;
      }

      console.log(`[Email] Email sent via Resend to ${payload.to}`);
      return true;
    } catch (error) {
      console.warn("[Email] Resend error:", error);
      // Fall back to notification
    }
  }

  // Fallback: Send as notification to admin
  return sendNotification(
    `📧 ${payload.subject}`,
    `Pentru: ${payload.to}\n\n${payload.text || ''}`
  );
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  email: string, 
  name: string | null,
  calculatedMetrics?: {
    dailyCalories?: number;
    dailyWater?: number;
    proteinGrams?: number;
  }
): Promise<boolean> {
  const userName = name || "Utilizator";
  
  let metricsText = "";
  if (calculatedMetrics) {
    metricsText = `
      <h3 style="color: #2dd4bf; margin-top: 20px;">📊 Metrici calculate:</h3>
      <ul style="color: #ffffff; opacity: 0.8;">`;
    if (calculatedMetrics.dailyCalories) metricsText += `<li>Calorii: ${calculatedMetrics.dailyCalories} kcal/zi</li>`;
    if (calculatedMetrics.dailyWater) metricsText += `<li>Lichide: ${(calculatedMetrics.dailyWater / 1000).toFixed(1)}L/zi</li>`;
    if (calculatedMetrics.proteinGrams) metricsText += `<li>Proteine: ${calculatedMetrics.proteinGrams}g/zi</li>`;
    metricsText += `</ul>`;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a1628; color: #ffffff; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 32px; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px; }
          .logo .o { color: #2dd4bf; }
          .content { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; }
          .content h2 { color: #2dd4bf; margin-top: 0; }
          .content p { line-height: 1.6; opacity: 0.9; }
          .button { display: inline-block; background: #2dd4bf; color: #0a1628; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; opacity: 0.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">KH<span class="o">O</span>RA</div>
            <p style="opacity: 0.6; margin: 0;">Nutriție Vegană Holistică</p>
          </div>
          
          <div class="content">
            <h2>🌱 Bine ai venit la Khora, ${userName}!</h2>
            <p>
              Mulțumim că te-ai înscris! Ți-am calculat recomandările nutriționale personalizate 
              pe baza informațiilor tale. Acum poți:
            </p>
            <ul style="opacity: 0.8;">
              <li>📱 Accesa cămara digitală cu 430+ ingrediente vegane</li>
              <li>🍽️ Genera rețete personalizate pe baza preferințelor tale</li>
              <li>💧 Urmări hidratarea zilnică cu recomandări inteligente</li>
              <li>💊 Gestiona suplimentele și vitaminele esențiale</li>
              <li>📚 Citi articole educative despre nutriția vegană</li>
            </ul>
            
            ${metricsText}
            
            <p style="margin-top: 20px; opacity: 0.8;">
              <strong>⚕️ Important:</strong> Aceste recomandări sunt orientative și nu înlocuiesc consultul cu un profesionist de sănătate.
            </p>
            
            <a href="https://khora.manus.space" class="button">Accesează Khora</a>
          </div>
          
          <div class="footer">
            <p>
              © 2026 Khora - Nutriție Vegană. Creat cu 🌱 de The Unlearning School.<br>
              <a href="https://khora.manus.space/privacy" style="color: #2dd4bf; text-decoration: none;">Politica de Confidențialitate</a> | 
              <a href="https://khora.manus.space/contact" style="color: #2dd4bf; text-decoration: none;">Contact</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Bine ai venit la Khora, ${userName}!

Mulțumim că te-ai înscris! Ți-am calculat recomandările nutriționale personalizate.

Acum poți:
- Accesa cămara digitală cu 430+ ingrediente vegane
- Genera rețete personalizate
- Urmări hidratarea zilnică
- Gestiona suplimentele și vitaminele
- Citi articole educative

${metricsText ? `Metrici calculate:\n${metricsText}` : ''}

Accesează Khora: https://khora.manus.space

⚕️ Aceste recomandări sunt orientative și nu înlocuiesc consultul medical.

© 2026 Khora - Nutriție Vegană
  `;

  return sendEmail({
    to: email,
    toName: userName,
    subject: `🌱 Bine ai venit la Khora, ${userName}!`,
    html: htmlContent,
    text: textContent,
  });
}

/**
 * Send admin notification about new user
 */
export async function sendAdminNewUserEmail(
  adminEmail: string,
  userData: {
    email: string;
    name?: string | null;
    goal?: string | null;
    dietaryStyle?: string | null;
    registeredAt: Date;
  }
): Promise<boolean> {
  return sendNotification(
    `👤 Utilizator nou: ${userData.name || userData.email}`,
    `📧 Email: ${userData.email}
👤 Nume: ${userData.name || 'Nespecificat'}
🎯 Obiectiv: ${userData.goal || 'Nespecificat'}
🥗 Stil: ${userData.dietaryStyle || 'Nespecificat'}
📅 Data: ${userData.registeredAt.toLocaleString('ro-RO')}

---
Verifică /admin pentru detalii complete.`
  );
}

/**
 * Send confirmation email to user
 */
export async function sendConfirmationEmail(
  email: string,
  name: string | null
): Promise<boolean> {
  const userName = name || "Utilizator";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a1628; color: #ffffff; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; }
          .content h2 { color: #2dd4bf; }
          .content p { line-height: 1.6; opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2>✅ Email Confirmat!</h2>
            <p>Salut ${userName},</p>
            <p>
              Adresa ta de email a fost confirmată cu succes. Acum poți accesa complet aplicația Khora 
              și să beneficiezi de toate funcționalitățile: cămara digitală, generator de rețete, 
              tracking de hidratare și suplimente.
            </p>
            <p>Dacă ai întrebări, nu ezita să ne contactezi la hello@dezvatare.ro</p>
            <p>🌱 Bine ai venit în comunitatea Khora!</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    toName: userName,
    subject: `✅ Email Confirmat - Khora`,
    html: htmlContent,
  });
}
