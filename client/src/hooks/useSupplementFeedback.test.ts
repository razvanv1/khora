import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSupplementFeedback, type SupplementFeedback } from "./useSupplementFeedback";

describe("useSupplementFeedback", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const createTestFeedback = (name: string, rating: number = 4): SupplementFeedback => ({
    supplementName: name,
    rating,
    comment: "Test comment",
    effectiveness: "effective",
    sideEffects: "",
    wouldRecommend: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  it("should initialize with empty feedbacks", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    expect(result.current.getFeedbackCount()).toBe(0);
  });

  it("should add feedback for a supplement", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    const feedback = createTestFeedback("Vitamina B12");

    act(() => {
      result.current.addFeedback(feedback);
    });

    expect(result.current.getFeedbackCount()).toBe(1);
    expect(result.current.getFeedback("Vitamina B12")).not.toBeNull();
  });

  it("should update existing feedback", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    const feedback1 = createTestFeedback("Vitamina B12", 3);
    const feedback2 = createTestFeedback("Vitamina B12", 5);

    act(() => {
      result.current.addFeedback(feedback1);
    });

    act(() => {
      result.current.addFeedback(feedback2);
    });

    expect(result.current.getFeedbackCount()).toBe(1);
    expect(result.current.getFeedback("Vitamina B12")?.rating).toBe(5);
  });

  it("should remove feedback", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    const feedback = createTestFeedback("Vitamina D3");

    act(() => {
      result.current.addFeedback(feedback);
    });

    act(() => {
      result.current.removeFeedback("Vitamina D3");
    });

    expect(result.current.getFeedbackCount()).toBe(0);
    expect(result.current.getFeedback("Vitamina D3")).toBeNull();
  });

  it("should calculate average rating", () => {
    const { result } = renderHook(() => useSupplementFeedback());

    act(() => {
      result.current.addFeedback(createTestFeedback("Vitamina B12", 4));
      result.current.addFeedback(createTestFeedback("Vitamina D3", 5));
      result.current.addFeedback(createTestFeedback("Magneziu", 3));
    });

    expect(result.current.getAverageRating()).toBe(4);
  });

  it("should return 0 for average rating when no feedbacks", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    expect(result.current.getAverageRating()).toBe(0);
  });

  it("should get all feedbacks sorted by date", () => {
    const { result } = renderHook(() => useSupplementFeedback());

    act(() => {
      result.current.addFeedback(createTestFeedback("Vitamina B12"));
      result.current.addFeedback(createTestFeedback("Vitamina D3"));
    });

    const allFeedbacks = result.current.getAllFeedbacks();
    expect(allFeedbacks.length).toBe(2);
  });

  it("should persist feedbacks to localStorage", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    const feedback = createTestFeedback("Omega-3");

    act(() => {
      result.current.addFeedback(feedback);
    });

    const stored = localStorage.getItem("khora_supplement_feedback");
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.feedbacks["Omega-3"]).toBeDefined();
  });

  it("should return null for non-existent feedback", () => {
    const { result } = renderHook(() => useSupplementFeedback());
    expect(result.current.getFeedback("NonExistent")).toBeNull();
  });
});
