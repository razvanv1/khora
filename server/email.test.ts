import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock ENV
vi.mock("./_core/env", () => ({
  ENV: {
    forgeApiUrl: "https://forge.manus.ai",
    forgeApiKey: "test-key",
  },
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should export sendEmail function", async () => {
    const { sendEmail } = await import("./email");
    expect(typeof sendEmail).toBe("function");
  });

  it("should export sendWelcomeEmail function", async () => {
    const { sendWelcomeEmail } = await import("./email");
    expect(typeof sendWelcomeEmail).toBe("function");
  });

  it("should export sendAdminNewUserEmail function", async () => {
    const { sendAdminNewUserEmail } = await import("./email");
    expect(typeof sendAdminNewUserEmail).toBe("function");
  });

  it("sendEmail should call fetch with correct endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve("{}"),
    });

    const { sendEmail } = await import("./email");
    
    await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Test</p>",
      text: "Test",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("SendNotification"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          authorization: expect.stringContaining("Bearer"),
        }),
      })
    );
  });

  it("sendEmail should return true on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve("{}"),
    });

    const { sendEmail } = await import("./email");
    
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    });

    expect(result).toBe(true);
  });

  it("sendEmail should return false on failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve("Error"),
    });

    const { sendEmail } = await import("./email");
    
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    });

    expect(result).toBe(false);
  });
});
