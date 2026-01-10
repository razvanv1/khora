import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLanguage } from "./index";

describe("useLanguage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset the store to default state
    useLanguage.setState({ language: "ro", t: useLanguage.getState().t });
  });

  it("should initialize with Romanian as default language", () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.language).toBe("ro");
  });

  it("should have Romanian translations by default", () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.t.landing.ctaStart).toBe("Începe Acum");
    expect(result.current.t.nav.home).toBe("Acasă");
  });

  it("should switch to English when setLanguage is called", () => {
    const { result } = renderHook(() => useLanguage());
    
    act(() => {
      result.current.setLanguage("en");
    });

    expect(result.current.language).toBe("en");
    expect(result.current.t.landing.ctaStart).toBe("Get Started");
    expect(result.current.t.nav.home).toBe("Home");
  });

  it("should switch back to Romanian", () => {
    const { result } = renderHook(() => useLanguage());
    
    act(() => {
      result.current.setLanguage("en");
    });
    
    act(() => {
      result.current.setLanguage("ro");
    });

    expect(result.current.language).toBe("ro");
    expect(result.current.t.landing.ctaStart).toBe("Începe Acum");
  });

  it("should have all required translation keys", () => {
    const { result } = renderHook(() => useLanguage());
    const { t } = result.current;

    // Check common keys
    expect(t.common.loading).toBeDefined();
    expect(t.common.save).toBeDefined();
    expect(t.common.cancel).toBeDefined();

    // Check nav keys
    expect(t.nav.home).toBeDefined();
    expect(t.nav.pantry).toBeDefined();
    expect(t.nav.recipes).toBeDefined();
    expect(t.nav.hydrate).toBeDefined();
    expect(t.nav.supplements).toBeDefined();

    // Check landing keys
    expect(t.landing.title).toBeDefined();
    expect(t.landing.subtitle).toBeDefined();
    expect(t.landing.tagline).toBeDefined();
    expect(t.landing.ctaStart).toBeDefined();
  });

  it("should have matching keys in both languages", () => {
    const { result } = renderHook(() => useLanguage());
    
    // Get Romanian keys
    const roKeys = Object.keys(result.current.t);
    
    // Switch to English
    act(() => {
      result.current.setLanguage("en");
    });
    
    // Get English keys
    const enKeys = Object.keys(result.current.t);
    
    // Both should have the same top-level keys
    expect(roKeys.sort()).toEqual(enKeys.sort());
  });
});
