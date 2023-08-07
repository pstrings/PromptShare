import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// params get populated if we have dynamic variables in url, in this case we have "id" as dynamic parameter
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
