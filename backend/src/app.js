import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySocketIo from "fastify-socket.io";
import simulationRoutes from "./routes/simulationRoutes.js";
import aiEngineRoutes from "./routes/aiEngineRoutes.js";
import { env } from "./config/env.js";

export function buildApp() {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: env.corsOrigin, 
    credentials: true
  });

  app.register(fastifySocketIo, {
    cors: {
      origin: env.corsOrigin,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  app.register(simulationRoutes);
  app.register(aiEngineRoutes);

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  app.ready(err => {
    if (err) throw err;
    app.io.on('connection', (socket) => {
      app.log.info(`Client connected: ${socket.id}`);
      socket.on('disconnect', () => {
        app.log.info(`Client disconnected: ${socket.id}`);
      });
    });
  });

  return app;
}
