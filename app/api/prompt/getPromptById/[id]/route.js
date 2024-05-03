import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt.model";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 400 });
  }
};
