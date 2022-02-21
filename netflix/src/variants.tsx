import styled from "styled-components";

const TestCss = styled.div``;

export const logoVariants = {
    normal: {
        fillOpacity: 1,
        fill: "red",
    },
    active: {
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: Infinity,
        },
    },
};

const width = window.outerWidth;
const calcul = width / 100;

export const rowVariants = {
    start: (clickSencor: boolean) => ({
        x: clickSencor ? width + calcul * 2 + 10 : -width - (calcul * 2 + 10),
    }),
    end: {
        x: 0,
    },
    exit: (clickSencor: boolean) => ({
        x: clickSencor ? -width - (calcul * 2 + 10) : width + calcul * 2 + 10,
    }),
};

export const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.5,
            duaration: 0.3,
            type: "tween",
        },
    },
};
