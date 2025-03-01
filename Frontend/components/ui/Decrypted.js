"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { motion } from "framer-motion";

export default function Decrypted({
  text,
  speed = 200, // ⬇️ Reduced speed for slower scrambling effect
  maxIterations =25,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? [...new Set(text.split(""))].filter((char) => char !== " ")
      : characters.split("");

    const shuffleText = (originalText, currentRevealed) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        startTransition(() => {
          setRevealedIndices((prevRevealed) => {
            if (sequential) {
              if (prevRevealed.size < text.length) {
                const nextIndex = getNextIndex(prevRevealed);
                const newRevealed = new Set(prevRevealed);
                newRevealed.add(nextIndex);
                setDisplayText(shuffleText(text, newRevealed));
                return newRevealed;
              } else {
                clearInterval(interval);
                setIsScrambling(false);
                return prevRevealed;
              }
            } else {
              setDisplayText(shuffleText(text, prevRevealed));
              currentIteration++;
              if (currentIteration >= maxIterations) {
                clearInterval(interval);
                setIsScrambling(false);
                setDisplayText(text);
              }
              return prevRevealed;
            }
          });
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => clearInterval(interval);
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span ref={containerRef} className={`inline-block whitespace-pre-wrap ${parentClassName}`} {...hoverProps} {...props}>
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true" className=" text-4xl font-bold">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
