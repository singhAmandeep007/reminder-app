import { Registry, Server } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import Schema from "miragejs/orm/schema";

import * as models from "./models";

import * as factories from "./factories";

export type TAppModels = typeof models;

export type TAppFactories = typeof factories;

export type TAppRegistry = Registry<TAppModels, TAppFactories>;

export type TAppSchema = Schema<TAppRegistry>;

export type TAppMockServer = Server<TAppRegistry>;
