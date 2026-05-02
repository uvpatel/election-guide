import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySocketIo from "fastify-socket.io";
import simulationRoutes from "./routes/simulationRoutes.js";

export function buildApp() {
  const app = fastify({ logger: true });

  app.register(cors, {
    origin: "*", // Adjust in production
  });

  app.register(fastifySocketIo, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.register(simulationRoutes);

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
