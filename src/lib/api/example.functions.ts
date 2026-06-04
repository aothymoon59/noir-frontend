import { z } from "zod";

const greetingInput = z.object({ name: z.string().min(1) });

export async function getGreeting(input: z.infer<typeof greetingInput>) {
  const data = greetingInput.parse(input);

  return {
    greeting: `Hello, ${data.name}!`,
    mode: "mock",
  };
}
