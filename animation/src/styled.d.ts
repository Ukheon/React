import "styled-components";
import { DefaultTheme } from "../../trello/src/styled.d";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
    }
}
