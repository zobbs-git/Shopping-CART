import CartItem from "./CartItem";
import { useGlobeContext } from "./Context";
import cartItems from "./data";

const CartContainer = () => {
  const { cart, handleClear, totalCost } = useGlobeContext();
  // console.log(state.cart);

  const cartArr = Array.from(cart.entries());
  // console.log(cartArr);

  if (cartArr.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArr.map((cartItem) => {
          const [id, item] = cartItem;
          return <CartItem key={id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${totalCost.toFixed()}</span>
          </h5>
        </div>
        <button
          className="btn btn-hipster"
          onClick={handleClear}
          // onClick={() => console.log("clear cart")}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
