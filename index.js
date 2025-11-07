import { Mastra } from "@mastra/core";
import { taskAgent } from "./agent/taskAgent.js";

const mastra = new Mastra({
  agents: [taskAgent],
});

mastra.start();