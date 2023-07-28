import React from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { useDog } from "./Components/DogProvider";

function App() {
  const { showComponent } = useDog();

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
          showComponent
        ) && <Dogs label={"All Dogs"} />}
        {showComponent === "create-dog-form" && <CreateDogForm />}
      </Section>
    </div>
  );
}

export default App;
