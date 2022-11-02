import { useState } from "react";
import { addNewCard, deactivateCard, sortCards } from "../redux/cardsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const AddCardPage = () => {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "11",
    "12",
  ];
  const years = ["22", "23", "24", "25", "26", "27", "28"];
  const [cardNo, setCardNo] = useState("");
  // const [cvcNo, setCvcNo] = useState("");
  const [validMonth, setValidMonth] = useState("");
  const [validYear, setValidYear] = useState("");
  const [cardType, setCardType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { allcards } = useSelector((state) => state.cards);
  console.log(allcards);
  console.log(location.state);

  let fullName =
    `${location.state.results[0].name.first} ${location.state.results[0].name.last}`.toUpperCase();
  console.log(fullName);
  // const cardList = useSelector((state)=> state.cards.allcards);

  const handleSubmit = (e) => {
    //hämta alla värden från input, spara de i ett objekt och dispatcha actionen med objektet som argument
    e.preventDefault();
    dispatch(deactivateCard());
    const type = document.querySelector("#card-type").value;
    const cardNumber = document.querySelector("#card-number").value;
    let shownCardNumber = cardNumber
      .split("")
      .map((number, index) => {
        if (index === 3 || index === 7 || index === 11) {
          return number + " ";
        } else {
          return number;
        }
      })
      .join("");
    const cardHolder = document.querySelector("#card-holder-name").value;
    console.log(cardHolder);
    const validMonth = document.querySelector("#month-validity").value;
    const validYear = document.querySelector("#year-validity").value;
    let shownValidity = `${validMonth}/${validYear}`;
    const cvc = document.querySelector("#cvc").value;
    const newCard = {
      fullName: cardHolder,
      type: type,
      cardNumber: shownCardNumber,
      validity: shownValidity,
      cvc: cvc,
      active: true,
    };

    let cardExists = false;
    allcards.map((card) => {
      if (shownCardNumber === card.cardNumber) {
        alert("This number has already been used");
        cardExists = true;
      }
    });
    if (!cardExists) {
      dispatch(addNewCard(newCard));
      dispatch(sortCards());
      navigate("/");
    }

    //* initial way of how I wrote the code
    // const cardInfo ={
    //   vendor: "master card",
    //   cardHolder: "john doe",
    //   expiryMonth:"04",
    //   expiryYear: "24",
    //   cvc:"632",
    //   cardNumber:"123123123123",

    // }
    // dispatch(addNewCard(cardInfo))
  };

  return (
    // Vendor, card number, cardholder, expire month, expire year, CCV.
    <>
      <Header page="Add New Card" />
      <article className={`e-card ${cardType}`}>
        <h2>Card Preview</h2>
        <p>VENDOR: {cardType ? cardType : "Maestro"}</p>
        <p>CARD NUMBER: {cardNo ? cardNo : "XXXX-XXXX-XXXX-XXXX"}</p>
        <p>CARD HOLDER: {fullName} </p>
        <p>
          VALID THRU: {validMonth ? validMonth : "MM"}/
          {validYear ? validYear : "YY"}
        </p>
        {/* <p>Expiry month:</p>
        <p>Expiry year:</p> */}
        {/* <p>CVC: {cvcNo}</p> */}
      </article>

      <form
        action=""
        className="add-card-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="vendor-input">
          <label htmlFor="card-type">VENDOR: </label>
          <select
            defaultValue=""
            name="card-type"
            id="card-type"
            onChange={(e) => {
              setCardType(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              Choose Vendor
            </option>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="American Express">American Express</option>
            <option value="Barclays">Barclays</option>
          </select>
        </div>
        <div className="card-number-input">
          <label htmlFor="card-number">CARD NO. (16 digits) </label>
          <input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            pattern="[0-9]{16}"
            maxLength={16}
            title="16 digits"
            required
            onChange={(e) => {
              setCardNo(e.target.value);
            }}
          />
        </div>
        <div className="card-holder-input">
          <label htmlFor="card-holder-name">CARDHOLDER NAME: </label>
          <input
            type="text"
            name="card-holder-name"
            id="card-holder-name"
            value={fullName}
            placeholder="John Doe"
            readOnly
          />
        </div>
        <div className="dates-container">
          <div className="validity-input">
            <label htmlFor="validity">VALID THRU: </label>
            <div className="validity" id="validity">
              <label htmlFor="month-validity">MM: </label>
              <select
                name="month-validity"
                id="month-validity"
                onChange={(e) => {
                  setValidMonth(e.target.value);
                }}
              >
                {months.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <label htmlFor="year-validity"> YY: </label>
              <select
                name="year-validity"
                id="year-validity"
                onChange={(e) => {
                  setValidYear(e.target.value);
                }}
              >
                {years.map((year, index) => (
                  <option key={index}>{year} </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cvc-input">
            <label htmlFor="cvc">CVC: </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              placeholder="XXX"
              pattern="[0-9]{3}"
              maxLength={3}
              title="3 digits"
              required
              // onChange={(e) => {
              //   setCvcNo(e.target.value);
              // }}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="submit-btn">Submit</button>
          {/* <button type="submit" onClick={handleSubmit}>
            Submit
          </button> */}
          <Link to={`/`}>
            <button>Back</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default AddCardPage;
