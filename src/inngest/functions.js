// src/inngest/functions.ts
import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import SandBox from "@e2b/code-interpreter"


export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "agent/hello" } },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async() => {
      const sandbox = await SandBox.create("v0-nextjs-build-new");
      return sandbox.sandboxId
    })

    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agen that say hello",
      system: "You are helpful assistant. Always greet with enthusiasm",
      model: gemini({model:"gemini-2.5-flash"})
    })

    const {output} = await helloAgent.run("Say hello to the user!");

    const sandboxUrl = await step.run("get-sandbox-url", async() => {
      const sandbox = await SandBox.connect(sandboxId);
      const host = sandbox.getHost(3000);

      return `http://${host}`
    })

    return {
      message: output[0].content
    }
  }
);