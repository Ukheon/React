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

export const presenceVariants = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360,
        transition: {
            duration: 2,
            type: "tween",
        },
    },
    leaving: {
        opacity: 0,
        scale: 0,
        y: 100,
    },
};

export const slideVariants = {
    start: (flag: boolean) => ({
        x: flag ? 300 : -300,
        scale: 0,
    }),
    end: {
        x: 0,
        scale: 1,
        transition: {
            duration: 0.7,
        },
    },
    exit: (flag: boolean) => ({
        x: flag ? -300 : 300,
        scale: 0,
    }),
};

export const overlayVariants = {
    start: {
        backgroundColor: "rgba(0,0,0,0)",
    },
    end: {
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    exit: {
        backgroundColor: "rgba(0,0,0,0)",
    },
};
