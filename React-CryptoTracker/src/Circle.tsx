import styled from "styled-components";

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50px;
    border: 3px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

interface PlayerShape {
    name: string;
    age: number;
}

const sayhello = (playerobj: PlayerShape) => `Hello ${playerobj.name} you are ${playerobj.age} years old`;

function Circle({ bgColor, borderColor, text = "default msg" }: CircleProps) {
    console.log(sayhello({ name: "ukwon", age: 3 }));
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
}

export default Circle;
