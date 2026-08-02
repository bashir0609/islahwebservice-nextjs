"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Consistent reveal trigger — slightly past the fold so content is already
// partially visible when it animates in, and the animation is subtle enough
// to feel cohesive across every section of the site.
const IN_VIEW_MARGIN = "-40px 0px -40px 0px";

export function SectionReveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  // Render fully visible from the first paint (no opacity:0 hidden state).
  // Use for above-the-fold hero content: an opacity:0 start delays the LCP
  // element until JS downloads + hydration + the reveal delay on slow
  // connections, which is the classic FCP-fast / LCP-slow mismatch.
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });

  // Hooks stay unconditional above; the plain wrapper keeps SSR/CSR identical
  // and costs zero client work for content that must be visible instantly.
  if (immediate) {
    return <div className={className}>{children}</div>;
  }

  // Reduced-motion users are handled globally by <MotionConfig reducedMotion="user">
  // in the site layout, so the initial state stays consistent server/client-side.
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  stagger = 0.08,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
