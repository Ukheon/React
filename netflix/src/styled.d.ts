import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        black: {
            veryDark: string;
            darker: string;
            lighter: string;
            thin: string;
        };
        white: {
            darker: string;
            lighter: string;
        };
        green: {
            lighter: string;
        };
        blue: {
            lighter: string;
        };
        red: {
            lighter: string;
        };
        fontSize: {
            default: string;
            title: string;
            overview: string;
            item: string;
            itemTitle: string;
        };
    }
}
