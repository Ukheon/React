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
