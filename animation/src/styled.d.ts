import "styled-components";
import { DefaultTheme } from "../../trello/src/styled.d";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        Dwidth: string;
        Dheight: string;
        D_boxWidth: string;
        D_boxHeight: string;
        bgGradation: string;
    }
}
