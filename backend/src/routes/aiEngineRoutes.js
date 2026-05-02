import { z } from "zod";
import { 
  generatePersonas, 
  simulateSentiment, 
  analyzeNarrative, 
  predictElection 
} from "../services/coreAiEngine.js";

// Validation schemas
const generatePersonaSchema = z.object({
  region: z.string().min(2),
  demographics: z.string().min(5)
});

const simulateSentimentSchema = z.object({
  eventText: z.string().min(10),
  personas: z.array(z.any()) // In production, refine this schema to match the Persona object
});

const analyzeNarrativeSchema = z.object({
  textStream: z.string().min(10)
});

const predictElectionSchema = z.object({
  sentimentData: z.array(z.any()),
  turnoutEstimate: z.number().min(0).max(100)
});

export default async function aiEngineRoutes(fastify, options) {
  
  fastify.post('/api/generate-persona', async (request, reply) => {
    try {
      const { region, demographics } = generatePersonaSchema.parse(request.body);
      const personas = await generatePersonas(region, demographics);
      return { success: true, data: personas };
    } catch (error) {
      request.log.error(error);
      return reply.status(400).send({ success: false, error: error.message });
    }
  });

  fastify.post('/api/simulate-sentiment', async (request, reply) => {
    try {
      const { eventText, personas } = simulateSentimentSchema.parse(request.body);
      
      // Emit initial start event to connected websockets
      fastify.io.emit('simulation:start', { eventText });

      const reactions = await simulateSentiment(eventText, personas);
      
      // Emit results via websocket to simulate streaming
      reactions.forEach(result => {
        fastify.io.emit('simulation:update', result);
      });

      fastify.io.emit('simulation:complete', { status: 'done', totalProcessed: reactions.length });

      return { success: true, data: reactions };
    } catch (error) {
      request.log.error(error);
      return reply.status(400).send({ success: false, error: error.message });
    }
  });

  fastify.post('/api/analyze-narrative', async (request, reply) => {
    try {
      const { textStream } = analyzeNarrativeSchema.parse(request.body);
      const analysis = await analyzeNarrative(textStream);
      return { success: true, data: analysis };
    } catch (error) {
      request.log.error(error);
      return reply.status(400).send({ success: false, error: error.message });
    }
  });

  fastify.post('/api/predict-election', async (request, reply) => {
    try {
      const { sentimentData, turnoutEstimate } = predictElectionSchema.parse(request.body);
      const prediction = await predictElection(sentimentData, turnoutEstimate);
      return { success: true, data: prediction };
    } catch (error) {
      request.log.error(error);
      return reply.status(400).send({ success: false, error: error.message });
    }
  });

}
