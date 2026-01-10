import { ENV } from "./_core/env";

export type EmailPayload = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Send email using Manus Forge API
 * This uses the built-in notification/email service
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Forge API not configured, skipping email send");
    return false;
  }

  const endpoint = `${ENV.forgeApiUrl.replace(/\/$/, "")}/email.v1.EmailService/SendEmail`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.to,
        toName: payload.toName || "",
        subject: payload.subject,
        html: payload.html,
        text: payload.text || "",
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Email] Failed to send email (${response.status}): ${detail}`);
      return false;
    }

    console.log(`[Email] Successfully sent email to ${payload.to}`);
    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
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
  const userName = name || "Prieten";
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bine ai venit la Khora!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a1628; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a1628; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(45, 212, 191, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 36px; margin: 0; font-weight: 300; letter-spacing: 4px;">
                KH<span style="color: #2dd4bf;">O</span>RA
              </h1>
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 2px; margin-top: 8px;">
                χώρα · SPAȚIUL TRANSFORMĂRII
              </p>
            </td>
          </tr>
          
          <!-- Welcome Message -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px;">
                Bine ai venit, ${userName}! 🌱
              </h2>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Mulțumim că ai ales Khora pentru călătoria ta spre o nutriție vegană echilibrată și conștientă.
              </p>
            </td>
          </tr>
          
          ${calculatedMetrics ? `
          <!-- Personalized Metrics -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background: rgba(45, 212, 191, 0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(45, 212, 191, 0.2);">
                <h3 style="color: #2dd4bf; font-size: 14px; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">
                  Recomandările tale personalizate
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${calculatedMetrics.dailyCalories ? `
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Calorii zilnice:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right; font-weight: 600;">${calculatedMetrics.dailyCalories} kcal</td>
                  </tr>
                  ` : ''}
                  ${calculatedMetrics.dailyWater ? `
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Lichide zilnice:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right; font-weight: 600;">${(calculatedMetrics.dailyWater / 1000).toFixed(1)} L</td>
                  </tr>
                  ` : ''}
                  ${calculatedMetrics.proteinGrams ? `
                  <tr>
                    <td style="color: rgba(255,255,255,0.6); font-size: 14px; padding: 8px 0;">Proteine zilnice:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right; font-weight: 600;">${calculatedMetrics.proteinGrams}g</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>
          ` : ''}
          
          <!-- What's Next -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h3 style="color: #d4a574; font-size: 18px; margin: 0 0 16px;">Ce poți face acum:</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #2dd4bf; font-size: 16px;">✦</span>
                    <span style="color: rgba(255,255,255,0.8); font-size: 14px; margin-left: 8px;">Explorează Cămara Digitală cu 500+ ingrediente vegane</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #2dd4bf; font-size: 16px;">✦</span>
                    <span style="color: rgba(255,255,255,0.8); font-size: 14px; margin-left: 8px;">Generează rețete personalizate din ingredientele tale</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #2dd4bf; font-size: 16px;">✦</span>
                    <span style="color: rgba(255,255,255,0.8); font-size: 14px; margin-left: 8px;">Monitorizează hidratarea și suplimentele</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #2dd4bf; font-size: 16px;">✦</span>
                    <span style="color: rgba(255,255,255,0.8); font-size: 14px; margin-left: 8px;">Citește articolele educative despre nutriția vegană</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <a href="https://khora.app" style="display: inline-block; background: linear-gradient(135deg, #d4a574 0%, #c49464 100%); color: #0a1628; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                Deschide Khora
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 8px; text-align: center;">
                Khora este un proiect The Unlearning School
              </p>
              <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0; text-align: center;">
                Întrebări? Scrie-ne la hello@dezvatare.ro
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Bine ai venit la Khora, ${userName}!

Mulțumim că ai ales Khora pentru călătoria ta spre o nutriție vegană echilibrată și conștientă.

${calculatedMetrics ? `
Recomandările tale personalizate:
${calculatedMetrics.dailyCalories ? `- Calorii zilnice: ${calculatedMetrics.dailyCalories} kcal` : ''}
${calculatedMetrics.dailyWater ? `- Lichide zilnice: ${(calculatedMetrics.dailyWater / 1000).toFixed(1)} L` : ''}
${calculatedMetrics.proteinGrams ? `- Proteine zilnice: ${calculatedMetrics.proteinGrams}g` : ''}
` : ''}

Ce poți face acum:
- Explorează Cămara Digitală cu 500+ ingrediente vegane
- Generează rețete personalizate din ingredientele tale
- Monitorizează hidratarea și suplimentele
- Citește articolele educative despre nutriția vegană

Deschide Khora: https://khora.app

---
Khora este un proiect The Unlearning School
Întrebări? Scrie-ne la hello@dezvatare.ro
  `;

  return sendEmail({
    to: email,
    toName: name || undefined,
    subject: "🌱 Bine ai venit la Khora!",
    html,
    text,
  });
}

/**
 * Send notification email to admin about new user
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
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Utilizator nou Khora</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background: #0a1628; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0;">
                🌱 Utilizator nou pe Khora
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                Un nou utilizator s-a înregistrat pe Khora:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 10px 20px; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Nume:</strong>
                    <span style="color: #333; float: right;">${userData.name || 'Nespecificat'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Email:</strong>
                    <span style="color: #333; float: right;">${userData.email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Obiectiv:</strong>
                    <span style="color: #333; float: right;">${userData.goal || 'Nespecificat'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Stil alimentar:</strong>
                    <span style="color: #333; float: right;">${userData.dietaryStyle || 'Nespecificat'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px;">
                    <strong style="color: #666;">Data înregistrării:</strong>
                    <span style="color: #333; float: right;">${userData.registeredAt.toLocaleString('ro-RO')}</span>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666; font-size: 14px; margin: 20px 0 0;">
                Poți vedea toți utilizatorii în <a href="https://khora.app/admin" style="color: #2dd4bf;">Admin Dashboard</a>.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background: #f5f5f5; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Khora Admin Notifications
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Utilizator nou pe Khora

Un nou utilizator s-a înregistrat:

Nume: ${userData.name || 'Nespecificat'}
Email: ${userData.email}
Obiectiv: ${userData.goal || 'Nespecificat'}
Stil alimentar: ${userData.dietaryStyle || 'Nespecificat'}
Data înregistrării: ${userData.registeredAt.toLocaleString('ro-RO')}

Vezi toți utilizatorii: https://khora.app/admin
  `;

  return sendEmail({
    to: adminEmail,
    subject: `🌱 Utilizator nou: ${userData.name || userData.email}`,
    html,
    text,
  });
}
