import { useDog } from "./DogProvider";

//! Get rid of all props except 'children' and 'label'
export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
  const { handleOnClick, showComponent, favoriteDogCount, unfavoriteDogCount } =
    useDog();

  const data = [
    { name: "favorite-dogs", label: "favorited", counter: favoriteDogCount },
    {
      name: "unfavorite-dogs",
      label: "unfavorited",
      counter: unfavoriteDogCount,
    },
    { name: "create-dog-form", label: "create dog" },
  ];

  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {data.map((item) => {
            const { name, label, counter } = item;
            return (
              <div
                key={item.name}
                className={`selector ${showComponent === name && "active"}`}
                onClick={() => handleOnClick(name)}
              >
                {label} {counter && `(${counter})`}
              </div>
            );
          })}
        </div>
      </div>
      {children}
    </section>
  );
};
