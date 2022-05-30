// declare module "@mui/material/styles" {
//   interface Theme {
//     customShadows: {
//       z8: string;
//     };
//   }
//   interface ThemeOptions {
//     customShadows?: {
//       z8?: string;
//     };
//   }
// }

import { Theme as DefaultTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  export interface Theme extends DefaultTheme {
    customShadows: {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
  }
}
