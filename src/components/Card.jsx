import { useDispatch } from "react-redux";
import { activateCard, removeCard } from "../redux/cardsSlice"; //deactivateCard,

const Card = ({ cardInfo }) => {
  const dispatch = useDispatch();
  let { fullName, cardNumber, validity, type } = cardInfo;
  console.log(cardInfo);

  const activateOnClick = () => {
    dispatch(activateCard(cardInfo));
  };

  const removeOnClick = () => {
    dispatch(removeCard(cardInfo));
  };

  return (
    <div className={cardInfo.active ? `card ${type} active` : `card ${type}`}>
      {/* <div className="card-images">
        <div className="chip"></div>
        <div className="logo"></div>
        <div className="card-type">
          <p>{type}</p>
        </div>
      </div> */}
      <div className="card-number">
        <p>{type}</p>
        <p>{cardNumber}</p>
      </div>
      <div className="card-info">
        <div className="holder">
          {/* <p>{type}</p> */}
          <p className="label">CARD HOLDER</p>
          <p>{fullName}</p>
        </div>
        <div className="validity-info">
          <p className="label">VALID THRU</p>
          <p>{validity}</p>
        </div>
      </div>
      {!cardInfo.active && (
        <div className="hidden-buttons">
          <button onClick={() => activateOnClick()}>Activate</button>
          <button onClick={() => removeOnClick()}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Card;
