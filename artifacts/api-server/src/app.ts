import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

/**
 * Request logging
 */
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

/**
 * Middleware
 */
app.use(cors());

app.use(express.json({ limit: "20mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "20mb",
  }),
);

/**
 * Health APIs
 */

// General health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "api-server",
    timestamp: new Date().toISOString(),
  });
});

// Liveness check
app.get("/health/live", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "alive",
    service: "api-server",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Readiness check
// Database/service checks can be added here later.
app.get("/health/ready", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ready",
    service: "api-server",
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use("/api", router);

export default app;
