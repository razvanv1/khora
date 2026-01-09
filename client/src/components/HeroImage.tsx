/*
 * KHORA Hero Image Component
 * Displays the generated UI images as background elements
 */

import { motion } from "framer-motion";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export default function HeroImage({ src, alt, className = "", overlay = true }: HeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 15, 26, 0.3) 0%, rgba(10, 15, 26, 0.8) 100%)',
          }}
        />
      )}
    </motion.div>
  );
}
