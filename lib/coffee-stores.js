import { createApi } from "unsplash-js";

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
}

const getPhotosUrls = async () => {
  const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  });
  const unsplashResponse = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
    orientation: "portrait",      
  });
  const photos = unsplashResponse.response.results;
  
  return photos.map(photo => photo.urls['regular']);
}

export const fetchCoffeeStores = async (
  latLong = `53.48499492544906,-2.258140074017513`,
  limit = 9
  ) => {    
    const options ={
        method: "GET",
        headers: {
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
      };
      const url = getUrlForCoffeeStores(latLong, `cafe&nbsp;stores`, limit);
      const response = await fetch(url, options);
      const data = await response.json();
      const photosUrls = await getPhotosUrls();

      return data.results.map((store, index) =>{
        return{
          id: store.fsq_id,
          name: store.name,
          address: store.location.address,
          neighborhood: store.location.postcode || store.location.neighborhood,
          imgUrl: photosUrls[index],
        }
      });
}




