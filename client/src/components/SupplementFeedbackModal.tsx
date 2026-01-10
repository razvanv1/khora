import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import StarRating from "./StarRating";
import type { SupplementFeedback } from "@/hooks/useSupplementFeedback";

interface SupplementFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplementName: string;
  existingFeedback?: SupplementFeedback | null;
  onSubmit: (feedback: SupplementFeedback) => void;
}

const effectivenessOptions = [
  { value: "very_effective", label: "Foarte eficient", color: "#22c55e" },
  { value: "effective", label: "Eficient", color: "#2dd4bf" },
  { value: "neutral", label: "Neutru", color: "#f59e0b" },
  { value: "ineffective", label: "Ineficient", color: "#ef4444" },
] as const;

export default function SupplementFeedbackModal({
  isOpen,
  onClose,
  supplementName,
  existingFeedback,
  onSubmit,
}: SupplementFeedbackModalProps) {
  const [rating, setRating] = useState(existingFeedback?.rating || 0);
  const [comment, setComment] = useState(existingFeedback?.comment || "");
  const [effectiveness, setEffectiveness] = useState<SupplementFeedback["effectiveness"]>(
    existingFeedback?.effectiveness || "neutral"
  );
  const [sideEffects, setSideEffects] = useState(existingFeedback?.sideEffects || "");
  const [wouldRecommend, setWouldRecommend] = useState(existingFeedback?.wouldRecommend ?? true);

  useEffect(() => {
    if (existingFeedback) {
      setRating(existingFeedback.rating);
      setComment(existingFeedback.comment);
      setEffectiveness(existingFeedback.effectiveness);
      setSideEffects(existingFeedback.sideEffects);
      setWouldRecommend(existingFeedback.wouldRecommend);
    } else {
      setRating(0);
      setComment("");
      setEffectiveness("neutral");
      setSideEffects("");
      setWouldRecommend(true);
    }
  }, [existingFeedback, isOpen]);

  const handleSubmit = () => {
    if (rating === 0) return;

    const feedback: SupplementFeedback = {
      supplementName,
      rating,
      comment,
      effectiveness,
      sideEffects,
      wouldRecommend,
      createdAt: existingFeedback?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(feedback);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-full max-w-md p-6 rounded-2xl max-h-[85vh] overflow-y-auto"
            style={{
              background: "#0f1729",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(212, 165, 116, 0.2)" }}
                >
                  <MessageSquare className="w-5 h-5 text-[#d4a574]" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">Feedback</h2>
                  <p className="text-sm text-white/50">{supplementName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="text-white/70 text-sm mb-3 block">
                Evaluare generală *
              </label>
              <div className="flex items-center gap-4">
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  size="lg"
                />
                <span className="text-white/50 text-sm">
                  {rating > 0 ? `${rating}/5` : "Selectează"}
                </span>
              </div>
            </div>

            {/* Effectiveness */}
            <div className="mb-6">
              <label className="text-white/70 text-sm mb-3 block">
                Eficiență percepută
              </label>
              <div className="grid grid-cols-2 gap-2">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setEffectiveness(option.value)}
                    className="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background:
                        effectiveness === option.value
                          ? `${option.color}20`
                          : "rgba(255, 255, 255, 0.05)",
                      color:
                        effectiveness === option.value
                          ? option.color
                          : "rgba(255, 255, 255, 0.6)",
                      border: `1px solid ${
                        effectiveness === option.value
                          ? option.color
                          : "rgba(255, 255, 255, 0.1)"
                      }`,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Would Recommend */}
            <div className="mb-6">
              <label className="text-white/70 text-sm mb-3 block">
                Ai recomanda acest supliment?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: wouldRecommend
                      ? "rgba(34, 197, 94, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${
                      wouldRecommend ? "#22c55e" : "rgba(255, 255, 255, 0.1)"
                    }`,
                    color: wouldRecommend ? "#22c55e" : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <ThumbsUp className="w-5 h-5" />
                  Da
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: !wouldRecommend
                      ? "rgba(239, 68, 68, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${
                      !wouldRecommend ? "#ef4444" : "rgba(255, 255, 255, 0.1)"
                    }`,
                    color: !wouldRecommend ? "#ef4444" : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <ThumbsDown className="w-5 h-5" />
                  Nu
                </button>
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="text-white/70 text-sm mb-2 block">
                Comentariu (opțional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Împărtășește experiența ta cu acest supliment..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none resize-none"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>

            {/* Side Effects */}
            <div className="mb-6">
              <label className="text-white/70 text-sm mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                Efecte secundare (opțional)
              </label>
              <input
                type="text"
                value={sideEffects}
                onChange={(e) => setSideEffects(e.target.value)}
                placeholder="Ex: Ușoară greață, dureri de cap..."
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full p-4 rounded-2xl font-medium text-[#0a1628] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #d4a574 0%, #e8c9a8 100%)",
              }}
            >
              {existingFeedback ? "Actualizează Feedback" : "Trimite Feedback"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
