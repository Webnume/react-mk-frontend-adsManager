import { rest } from "msw";
import { CREATIVE_BASE_URL } from "../services/CreativeService";
import { CREATIVES } from "./fixtures";

export const handlers = [
  // Handles a POST /login request
  rest.get(`${CREATIVE_BASE_URL}/creatives`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(CREATIVES))
  ),
  //   Handles a GET /user request
  rest.get(`${CREATIVE_BASE_URL}/creatives/:id`, (_req, res, ctx) =>
    res(ctx.json(CREATIVES[0]))
  ),
];
