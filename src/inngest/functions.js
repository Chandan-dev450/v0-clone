// src/inngest/functions.ts
import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";


export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "agent/hello" } },
  async ({ event, step }) => {
    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agen that say hello",
      system: "You are helpful assistant. Always greet with enthusiasm",
      model: gemini({model:"gemini-2.5-flash"})
    })

    const {output} = await helloAgent.run("Say hello to the user!");

    return {
      message: output[0].content
    }
  }
);