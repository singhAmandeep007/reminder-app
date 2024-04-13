import { Registry, Server } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import Schema from "miragejs/orm/schema";

import * as models from "./models";

import * as factories from "./factories";

export type TAppRegistry = Registry<typeof models, typeof factories>;

export type TAppSchema = Schema<TAppRegistry>;

export type TMockServer = Server<TAppRegistry>;
