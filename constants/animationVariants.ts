export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
}

export const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2,
        },
    },
}

export const actionsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
}

export const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
}

export const mobileContentVariants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 400,
        },
    },
    exit: {
        y: "100%",
        transition: {
            duration: 0.2,
        },
    },
}

export const floatingButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.5,
        },
    },
    hover: {
        scale: 1.1,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
}

export const tooltipVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 1,
            duration: 0.3,
        },
    },
}

export const buttonAnimationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.5, type: "spring", stiffness: 300, damping: 24 },
    },
    hover: {
        scale: 1.03,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transition: { duration: 0.2 },
    },
    tap: { scale: 0.97 },
}
