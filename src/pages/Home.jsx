import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import CardList from "../components/CardList";
import { getUser } from "../redux/userSlice";

const Home = () => {
  // const cardList = useSelector((state)=> state.cards.allcards)
  // console.log(cardList);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allcards } = useSelector((state) => state.cards);
  // console.log(allcards)
  // console.log(getUser())
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  console.log(user);
  return (
    <>
      <Header page="Home" />
      {/* <h2>This is home</h2> */}
      {user ? <CardList user={user} /> : "Loading information..."}
      {allcards.length < 4 ? (
        <Link className="add-new-card-lnk" to={"/addcard"} state={user}>
          <button>ADD NEW CARD</button>
        </Link>
      ) : (
        <p className="warning-msg">
          You have reached the max amount of 4 cards
        </p>
      )}

      {/* initial way of how i wrote the code
      {cardList.map((card,index)=>{
        const {cvc, vendor,cardNumber,cardHolder} = card;
        return(
          <div key={index}>
          
            <h1>{cvc}</h1>
            <p>{vendor}</p>
            <p>{cardHolder}</p>
            <p>{cardNumber}</p>
          </div>
        )
      })} */}
    </>
  );
};

export default Home;
