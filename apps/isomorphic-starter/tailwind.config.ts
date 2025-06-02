// import type { Config } from "tailwindcss";
// import sharedConfig from "tailwind-config";

// const config: Pick<Config, "prefix" | "presets" | "content"> = {
//   content: [
//     "./src/**/*.tsx",
//     "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
//     '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
//   ],
//   presets: [sharedConfig],
// };

// export default config;

import type { Config } from "tailwindcss";
import sharedConfig from "tailwind-config";

const config: Config = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
    "../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5C08B1",
        },
        secondary: {
          DEFAULT: "#9AC6C5",
        },
        tertiary: {
          DEFAULT: "#EFCC27",
        },
      },
    },
  },
};

export default config;
