import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt.model";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify("Prompt Deleted"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 400 });
  }
};
