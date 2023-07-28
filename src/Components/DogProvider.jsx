import React, { createContext, useContext, useEffect, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

export const DogContext = createContext({});

export const DogProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
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

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  console.log(showComponent, "context");

  return (
    <DogContext.Provider
      value={{
        showComponent,
        onClickFavorited,
        onClickUnfavorited,
        onClickCreateDog,
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
