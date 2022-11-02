const Header = (props) => {
  return (
    <header>
      {props.page === "Add New Card" ? (
        <h1>ADD A NEW CARD</h1>
      ) : (
        <h1>E-WALLET</h1>
      )}
    </header>
  );
};

export default Header;
