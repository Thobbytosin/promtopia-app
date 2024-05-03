import Prompt from "@models/prompt.model";
import { connectToDatabase } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  console.log(userId, prompt, tag);

  try {
    await connectToDatabase();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create prompt", { status: 400 });
  }
};
