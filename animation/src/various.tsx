export const animation = {
    start: { scale: 0 },
    end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 1 } },
};

export const variants = {
    start: { scale: 0, opacity: 0 },
    end: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.5,
            delayChildren: 1,
            staggerChildren: 0.2,
        },
    },
};

export const circleVariants = {
    start: {
        opacity: 0,
        y: 20,
    },
    end: {
        opacity: 1,
        y: 0,
    },
};
