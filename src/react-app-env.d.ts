/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { TEnv } from "types";

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: TEnv;
      readonly PUBLIC_URL: string;
      // additional environment variables types
      readonly REACT_APP_NODE_ENV: TEnv;
      readonly REACT_APP_MOCKER: TMocker;
      readonly REACT_APP_API_URL: string;
      readonly REACT_APP_PUBLIC_URL: string;
    }
  }

  interface Window {
    Cypress?: { env: (key: string) => string };
  }
}

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
