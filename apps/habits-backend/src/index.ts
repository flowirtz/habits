import { Router } from "worktop";
import { listen } from "worktop/cache";
import * as CORS from "worktop/cors";

import * as Habits from "./routes";

// Populated by workers environment variable
declare const CORS_ALLOW_ORIGIN: string;

const API = new Router();

/**
 * Handles `OPTIONS` requests using the same settings.
 * NOTE: Call `CORS.preflight` per-route for individual settings.
 */
API.prepare = CORS.preflight({
  origin: CORS_ALLOW_ORIGIN,
  headers: ["Cache-Control", "Content-Type", "X-Count"],
  methods: ["GET", "HEAD", "PUT", "POST", "PATCH", "DELETE"],
});

API.add("GET", "/users/:username/habits", Habits.list);
API.add("POST", "/users/:username/habits", Habits.create);
API.add("GET", "/users/:username/habits/:uid", Habits.show);
API.add("PUT", "/users/:username/habits/:uid", Habits.update);
API.add("PATCH", "/users/:username/habits/:uid/complete", Habits.complete);
API.add("DELETE", "/users/:username/habits/:uid", Habits.destroy);

listen(API.run);
