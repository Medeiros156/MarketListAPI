import { fetchUnsplashImage } from "../models/apiImage.js";
import { generateImage } from "../models/openai.js";

export const getImage = async (req, res) => {
  let typeOfSearch = req.query.type;
  let query = req.query.q;
//   let query = 'egg';
  console.log(typeOfSearch);
  console.log(query);
  if (typeOfSearch == 1) {
    const imageUrls = await fetchUnsplashImage(query);
    res.status(200).send(imageUrls);
    console.log('Unsplash')
  } else if (typeOfSearch == 2) {
    const imageUrls = await generateImage(query);
    res.status(200).send(imageUrls);
    console.log('OpenAi')
  }
};
