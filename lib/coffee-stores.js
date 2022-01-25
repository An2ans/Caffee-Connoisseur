
const getUrlForCoffeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latlong}query=${query}&limit=${limit}`;
}

export const fetchCoffeeStores = async () => {
    const options ={
        method: "GET",
        headers: {
          Accept: 'application/json',
          Authorization:process.env.FOURSQUARE_API_KEY
        }
      };
      const url = getUrlForCoffeeStores("53.48499492544906,-2.258140074017513", "coffee-shops", "9");
      const response = await fetch(url, options);
      const data = await response.json();

      return data.results;
}


