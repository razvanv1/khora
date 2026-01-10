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
 * Uses the webdevtoken notification service endpoint
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Forge API not configured, skipping email send");
    return false;
  }

  // Use the notification endpoint to send emails via owner notification
  // This is a workaround since direct email API may not be available
  const endpoint = `${ENV.forgeApiUrl.replace(/\/$/, "")}/webdevtoken.v1.WebDevService/SendNotification`;

  try {
    // Send as notification to owner (admin)
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        title: `📧 Email pentru ${payload.to}: ${payload.subject}`,
        content: `Destinatar: ${payload.to}${payload.toName ? ` (${payload.toName})` : ''}\n\n${payload.text || 'Vezi versiunea HTML'}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Email] Failed to send email notification (${response.status}): ${detail}`);
      return false;
    }

    console.log(`[Email] Successfully sent email notification for ${payload.to}`);
    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Send welcome email to new user
 * Note: This sends a notification to the admin about the new user
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
  
  const text = `
🌱 Bine ai venit la Khora, ${userName}!

Mulțumim că ai ales Khora pentru călătoria ta spre o nutriție vegană echilibrată și conștientă.

${calculatedMetrics ? `
📊 Recomandările tale personalizate:
${calculatedMetrics.dailyCalories ? `• Calorii zilnice: ${calculatedMetrics.dailyCalories} kcal` : ''}
${calculatedMetrics.dailyWater ? `• Lichide zilnice: ${(calculatedMetrics.dailyWater / 1000).toFixed(1)} L` : ''}
${calculatedMetrics.proteinGrams ? `• Proteine zilnice: ${calculatedMetrics.proteinGrams}g` : ''}
` : ''}

Ce poți face acum:
✦ Explorează Cămara Digitală cu 500+ ingrediente vegane
✦ Generează rețete personalizate din ingredientele tale
✦ Monitorizează hidratarea și suplimentele
✦ Citește articolele educative despre nutriția vegană

---
Khora este un proiect The Unlearning School
Întrebări? Scrie-ne la hello@dezvatare.ro
  `;

  return sendEmail({
    to: email,
    toName: name || undefined,
    subject: "🌱 Bine ai venit la Khora!",
    html: "",
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
  const text = `
🌱 UTILIZATOR NOU PE KHORA

📧 Email: ${userData.email}
👤 Nume: ${userData.name || 'Nespecificat'}
🎯 Obiectiv: ${userData.goal || 'Nespecificat'}
🥗 Stil alimentar: ${userData.dietaryStyle || 'Nespecificat'}
📅 Data: ${userData.registeredAt.toLocaleString('ro-RO')}

---
Verifică dashboard-ul admin pentru mai multe detalii.
  `;

  return sendEmail({
    to: adminEmail,
    toName: "Admin Khora",
    subject: `🌱 Utilizator nou: ${userData.name || userData.email}`,
    html: "",
    text,
  });
}
