import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openAiKey = process.env.OPENAI_API_KEY;
const openAiOrganization = process.env.OPENAI_API_ORGANIZATION;
const configuration = new Configuration({
  organization: openAiOrganization,
  apiKey: openAiKey,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (param) => {
  const prompt = `${param} no mercado`;

  const imageSize = "256x256";

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
