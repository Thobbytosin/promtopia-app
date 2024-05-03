import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt.model";

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const existPrompt = await Prompt.findById(params.id).populate("creator");

    if (!existPrompt) return new Response("Prompt not found", { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();

    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 400 });
  }
};
