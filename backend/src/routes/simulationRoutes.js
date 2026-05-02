import { z } from "zod";
import { simulateReactions } from "../services/aiService.js";

const simulateSchema = z.object({
  policyText: z.string().min(5),
  region: z.string().optional()
});

const DEFAULT_PERSONAS = [
  { id: "p1", demographic: "Gen Z Urban Student", core_values: ["climate", "education", "jobs"] },
  { id: "p2", demographic: "Rural Farmer", core_values: ["agriculture", "subsidies", "infrastructure"] },
  { id: "p3", demographic: "Middle-class Suburban Parent", core_values: ["taxes", "healthcare", "safety"] }
];

export default async function simulationRoutes(fastify, options) {
  fastify.post('/api/simulate', async (request, reply) => {
    try {
      const { policyText, region } = simulateSchema.parse(request.body);
      
      // Emit initial start event to connected websockets
      fastify.io.emit('simulation:start', { policyText, region });

      // In a real app, we fetch personas from Firestore based on region
      const personas = DEFAULT_PERSONAS;

      // Run AI Simulation
      const results = await simulateReactions(policyText, personas);

      // Emit results via websocket to simulate streaming
      results.forEach(result => {
        fastify.io.emit('simulation:update', result);
      });

      fastify.io.emit('simulation:complete', { status: 'done', totalProcessed: results.length });

      return { success: true, message: "Simulation completed and broadcasted." };
    } catch (error) {
      request.log.error(error);
      return reply.status(400).send({ success: false, error: error.message });
    }
  });
}
