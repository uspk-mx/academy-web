const x = 1;
const t = (v: number): number => x * v;

const backgroundTransition = { duration: t(0.2) };
const backgroundVariants = {
  inactive: {
    background: "rgb(255 255 255 / var(--tw-text-opacity, 1))",
    borderColor: "rgb(226 232 240 / var(--tw-text-opacity, 1))",
    color: "rgb(148 163 184 / var(--tw-text-opacity, 1))",
  },
  active: {
    background: "rgb(255 255 255 / var(--tw-text-opacity, 1))",
    borderColor: "rgb(59 130 246 / var(--tw-text-opacity, 1))",
    color: "rgb(59 130 246 / var(--tw-text-opacity, 1))",
  },
  complete: {
    background: "rgb(59 130 246 / var(--tw-text-opacity, 1))",
    borderColor: "rgb(59 130 246 / var(--tw-text-opacity, 1))",
  },
};

const rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};

const rippleVariants = {
  inactive: {
    background: "rgb(191 219 254 / var(--tw-text-opacity, 1))",
  },
  active: {
    background: "rgb(191 219 254 / var(--tw-text-opacity, 1))",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "rgb(191 219 254 / var(--tw-text-opacity, 1))",
    scale: 1.25,
  },
};

const checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};
const checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};

export {
  backgroundTransition,
  backgroundVariants,
  rippleTransition,
  rippleVariants,
  checkIconTransition,
  checkIconVariants,
};
