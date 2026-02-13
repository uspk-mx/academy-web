import { motion, AnimatePresence } from "motion/react";
import type { SVGProps, JSX, ComponentProps } from "react";
import {
  backgroundTransition,
  backgroundVariants,
  checkIconTransition,
  checkIconVariants,
  rippleTransition,
  rippleVariants,
} from "./utils";

interface StepProps {
  step: number;
  currentStep: number;
}

export function Step({ step, currentStep }: StepProps): JSX.Element {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  return (
    <motion.div animate={status} className="relative" initial={status}>
      <motion.div
        className="absolute inset-0 rounded-full"
        transition={rippleTransition}
        variants={rippleVariants}
      />

      <motion.div
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-400 bg-white font-semibold text-slate-500"
        transition={backgroundTransition}
        variants={backgroundVariants}
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {status === "complete" ? (
              <CheckIcon className="h-6 w-6 text-white" />
            ) : (
              <motion.span
                animate={{ opacity: 1 }}
                className="absolute"
                exit={{ scale: 0.5, opacity: 0 }}
                key="step"
              >
                {step}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props: ComponentProps<"svg">): JSX.Element {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={checkIconTransition}
        variants={checkIconVariants}
      />
    </svg>
  );
}
