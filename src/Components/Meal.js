import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import none from "../assets/img/placeholder.png";

const Meal = (props) => {
  return (
    <div
      onClick={() => {
        props.handleAddClick(props.meal);
      }}
      className="Meal"
    >
      <div>
        <h3>{props.title}</h3>
        {props.description ? <p>{props.description}</p> : ""}
        <span>{props.price} €</span>
        {props.popular ? (
          <b>
            <FontAwesomeIcon icon="star" />
            Populaire
          </b>
        ) : (
          ""
        )}
      </div>
      {props.image ? (
        <img src={props.image} alt={props.name} />
      ) : (
        <img className="none-img" src={none} alt={"not-found"}></img>
      )}
    </div>
  );
};

export default Meal;
