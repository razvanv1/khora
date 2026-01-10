import { useState, useEffect, useCallback } from "react";

export interface SupplementFeedback {
  supplementName: string;
  rating: number;
  comment: string;
  effectiveness: "very_effective" | "effective" | "neutral" | "ineffective";
  sideEffects: string;
  wouldRecommend: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FeedbackStore {
  feedbacks: Record<string, SupplementFeedback>;
}

const STORAGE_KEY = "khora_supplement_feedback";

export function useSupplementFeedback() {
  const [feedbacks, setFeedbacks] = useState<Record<string, SupplementFeedback>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: FeedbackStore = JSON.parse(stored);
        setFeedbacks(parsed.feedbacks || {});
      } catch (e) {
        console.error("Failed to parse supplement feedback:", e);
      }
    }
  }, []);

  // Save to localStorage when feedbacks change
  useEffect(() => {
    const store: FeedbackStore = { feedbacks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [feedbacks]);

  const addFeedback = useCallback((feedback: SupplementFeedback) => {
    setFeedbacks((prev) => ({
      ...prev,
      [feedback.supplementName]: {
        ...feedback,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const getFeedback = useCallback(
    (supplementName: string): SupplementFeedback | null => {
      return feedbacks[supplementName] || null;
    },
    [feedbacks]
  );

  const removeFeedback = useCallback((supplementName: string) => {
    setFeedbacks((prev) => {
      const newFeedbacks = { ...prev };
      delete newFeedbacks[supplementName];
      return newFeedbacks;
    });
  }, []);

  const getAverageRating = useCallback((): number => {
    const allFeedbacks = Object.values(feedbacks);
    if (allFeedbacks.length === 0) return 0;
    const sum = allFeedbacks.reduce((acc, f) => acc + f.rating, 0);
    return sum / allFeedbacks.length;
  }, [feedbacks]);

  const getAllFeedbacks = useCallback((): SupplementFeedback[] => {
    return Object.values(feedbacks).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [feedbacks]);

  const getFeedbackCount = useCallback((): number => {
    return Object.keys(feedbacks).length;
  }, [feedbacks]);

  return {
    feedbacks,
    addFeedback,
    getFeedback,
    removeFeedback,
    getAverageRating,
    getAllFeedbacks,
    getFeedbackCount,
  };
}
