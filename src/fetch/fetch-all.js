
const URL = "http://localhost:3000/dogs";

export const getAllDogs = () => {
   return fetch(URL)
   .then((response) => response.json())
   .then(data => data)
}