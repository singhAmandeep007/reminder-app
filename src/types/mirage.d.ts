import "miragejs";

declare module "miragejs" {
  export function trait(properties: Record<string, any>): any;
  export function association(trait?: string, override?: Record<string, any>): any;
}
