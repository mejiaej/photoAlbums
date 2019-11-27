
const DEFAULT_GET_CONFIG = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};


const getPhotos = async () => {
  const url = "https://jsonplaceholder.typicode.com/photos";
  const response = await fetch(url, DEFAULT_GET_CONFIG);

  const photos = await response.json();
  return photos;
};

export {
  getPhotos,
}