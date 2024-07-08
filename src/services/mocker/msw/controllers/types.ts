import { HttpHandler } from "msw";

import { TDb } from "../db";

export type TSetupController = ({ db }: { db: TDb }) => HttpHandler[];
