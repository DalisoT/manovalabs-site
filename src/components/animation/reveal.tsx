"use client";

import { motion, type MotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const defaultMotionProps: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
};

export interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
}

export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
}: FadeUpProps) {
  const Component = motion[as];
  return (
    <Component
      {...defaultMotionProps}
      variants={fadeUpVariants}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function FadeIn({
  children,
  className,
  as = "div",
}: Omit<FadeUpProps, "delay">) {
  const Component = motion[as];
  return (
    <Component
      {...defaultMotionProps}
      variants={fadeInVariants}
      className={className}
    >
      {children}
    </Component>
  );
}

export { reducedVariants, fadeUpVariants, fadeInVariants };