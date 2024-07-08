import { Response } from "miragejs";

export const resourceNotFoundResponse = (resourceName?: string) =>
  new Response(404, {}, { message: `Resource ${resourceName} not found!` });
