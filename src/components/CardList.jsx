import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import { addNewCard } from "../redux/cardsSlice";

const CardList = ({ user }) => {
  let { name } = user.results[0];

  //console.log(name);

  const dispatch = useDispatch();
  const cardTypes = ["Mastercard", "Visa", "American Express", "Barclays"];
  const { allcards } = useSelector((state) => state.cards);
  let sampleCard = {
    fullName: `${name.first} ${name.last}`.toUpperCase(),
    type: cardTypes[Math.floor(Math.random() * 4)],
    cardNumber: "4663 5623 1227 9081",
    validity: "10/24",
    cvc: "243",
    active: true,
  };

  useEffect(() => {
    console.log(allcards.length);
    if (allcards.length < 1) {
      // let sampleCard
      console.log(sampleCard);
      dispatch(addNewCard(sampleCard));
    }
  }, []);

  return (
    <>
      <h2>Welcome {name.first}</h2>
      <div className="activeCard">
        <h3>Active card</h3>
        {allcards &&
          allcards.map((card, index) =>
            card.active ? <Card key={index} cardInfo={card} /> : null
          )}
      </div>
      <div className="inactiveCards">
        <h3>Inactive cards</h3>
        {allcards &&
          allcards.map((card, index) =>
            !card.active ? <Card key={index} cardInfo={card} /> : null
          )}
      </div>
    </>
  );
};

export default CardList;
