import React, { createContext, useContext, useEffect, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";
import { getAllDogs } from "../fetch/fetch-all";

export const DogContext = createContext({});

export const DogProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  const refetchDogs = () => {
    getAllDogs().then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  const favoriteDogCount = favorited.length;
  const unfavoriteDogCount = unfavorited.length;

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const handleOnClick = (name) => {
    if (showComponent === name) {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent(name);
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  console.log(showComponent, "context");

  return (
    <DogContext.Provider
      value={{
        showComponent,
        handleOnClick,
        favoriteDogCount,
        unfavoriteDogCount,
        filteredDogs,
        unfavoriteDog,
        deleteDog,
        favoriteDog,
        dogs,
        addDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDog = () => {
  const context = useContext(DogContext);
  return context;
};
