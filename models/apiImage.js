import * as dotenv from "dotenv";
dotenv.config();

var IMAGEAUTH = process.env.IMAGEAUTH;

export const fetchUnsplashImage = async (keyWord) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=10&query=${keyWord}`,
      {
        method: "GET",
        headers: {
          Authorization: IMAGEAUTH,
        },
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );
  } catch (error) {
    console.log(error);
  }
  

  const data = await response.json();
  const listUrls = data.results.map((result) => result.urls.regular);
  return listUrls;
};
