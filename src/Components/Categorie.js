import Meal from "./Meal";

const Categorie = (props) => {
  const { categorie, order, setOrder } = props;

  return (
    <div className="Categorie">
      <h2>{props.titre}</h2>
      <div className="wrap">
        {categorie.meals.map((meal, indax) => {
          if (meal) {
            return (
              <Meal
                handleAddClick={props.handleAddClick}
                key={indax}
                meal={meal}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                indax={indax}
                image={meal.picture}
                popular={meal.popular}
              ></Meal>
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );
};

export default Categorie;
