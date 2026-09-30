"use client";

// Diadaptasi dari komponen BlurText React Bits (https://reactbits.dev/text-animations/blur-text).
import { motion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number; // jeda antar kata (detik)
  italicWords?: string[];
};

export default function BlurText({
  text,
  as: Tag = "p",
  className,
  delay = 0.12,
  italicWords = [],
}: Props) {
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          initial={{ filter: "blur(10.8px)", opacity: 0, y: -36 }}
          animate={{
            filter: ["blur(10.8px)", "blur(4.5px)", "blur(0px)"],
            opacity: [0, 0.5, 1],
            y: [-36, 5.4, 0],
          }}
          transition={{ duration: 0.9, delay: 0.2 + i * delay, ease: "easeOut" }}
        >
          {italicWords.includes(word) ? <em>{word}</em> : word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </Tag>
  );
}
