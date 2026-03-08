import { ENV } from "./_core/env";

/**
 * Send notification via Manus Forge API
 * This sends push notifications to the project owner
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
 * Send email (as notification to owner)
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  return sendNotification(
    `📧 ${payload.subject}`,
    `Pentru: ${payload.to}\n\n${payload.text || ''}`
  );
}

/**
 * Send welcome notification for new user
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
    metricsText = `\n📊 Metrici calculate:`;
    if (calculatedMetrics.dailyCalories) metricsText += `\n• Calorii: ${calculatedMetrics.dailyCalories} kcal`;
    if (calculatedMetrics.dailyWater) metricsText += `\n• Lichide: ${(calculatedMetrics.dailyWater / 1000).toFixed(1)} L`;
    if (calculatedMetrics.proteinGrams) metricsText += `\n• Proteine: ${calculatedMetrics.proteinGrams}g`;
  }

  return sendNotification(
    `🌱 Welcome: ${userName} s-a înscris!`,
    `Email: ${email}\nNume: ${userName}${metricsText}\n\n✅ Utilizatorul a completat onboarding-ul și a primit mesajul de bun venit în aplicație.`
  );
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
