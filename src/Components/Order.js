const Order = (props) => {
  const { index, order, setOrder } = props;
  const handleIncrementClick = () => {
    const newTab = [...order];
    newTab[index].number++;
    setOrder(newTab);
  };

  const handleDecrementClick = () => {
    const newTab = [...order];
    if (newTab[index].number === 1) {
      newTab.splice(index, 1);
      setOrder(newTab);
    } else {
      newTab[index].number--;
      setOrder(newTab);
    }
  };

  return (
    <div className="order">
      <div>
        <button onClick={handleDecrementClick}>-</button>
        {order[index].number}
        <button onClick={handleIncrementClick}>+</button>
      </div>
      <p>{props.name}</p>
      <span>{props.price} €</span>
    </div>
  );
};

export default Order;
