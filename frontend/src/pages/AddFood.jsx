import "./Cart.css";

function Cart({
  order,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
}) {
  const totalItems = order.reduce(
    (total, drink) => total + drink.quantity,
    0
  );

  return (
    <div className="cart-overlay">

      <aside className="cart-panel">

        {/* CART HEADER */}
        <div className="cart-header">

          <div>
            <p className="cart-label">
              BAMALICIOUS KITCHEN
            </p>

            <h2>Your Order</h2>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>

        {/* CART CONTENT */}
        <div className="cart-body">

          {order.length === 0 ? (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>

              <h3>Your order is empty</h3>

              <p>
                You haven't added any drinks yet.
                Choose your favourite drink to
                start your order.
              </p>

              <button
                className="continue-shopping"
                onClick={onClose}
              >
                <i className="fa-solid fa-arrow-left"></i>

                Browse Drinks
              </button>

            </div>

          ) : (

            <>

              <div className="cart-items">

                {order.map((drink, index) => (

                  <div
                    className="cart-item"
                    key={`${drink.name}-${drink.size}-${index}`}
                  >

                    {/* IMAGE */}
                    <div className="cart-item-image">

                      <img
                        src={drink.image}
                        alt={drink.name}
                      />

                    </div>

                    {/* DETAILS */}
                    <div className="cart-item-info">

                      <div className="cart-item-top">

                        <div>

                          <h3>
                            {drink.name}
                          </h3>

                          <span>
                            {drink.size}
                          </span>

                        </div>

                        <button
                          className="remove-item"
                          onClick={() =>
                            onRemove(index)
                          }
                          aria-label={`Remove ${drink.name}`}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>

                      </div>

                      {/* QUANTITY */}
                      <div className="cart-item-bottom">

                        <div className="cart-quantity">

                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                index,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>

                          <span>
                            {drink.quantity}
                          </span>

                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                index,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>

                        </div>

                        <span className="item-count">
                          {drink.quantity}{" "}
                          {drink.quantity === 1
                            ? "item"
                            : "items"}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* CLEAR ORDER */}
              <button
                className="clear-cart"
                onClick={onClear}
              >
                <i className="fa-solid fa-trash-can"></i>

                Clear Order
              </button>

            </>

          )}

        </div>

        {/* CART FOOTER */}
        {order.length > 0 && (

          <div className="cart-footer">

            <div className="cart-total">

              <span>
                Total Drinks
              </span>

              <strong>
                {totalItems}
              </strong>

            </div>

            <button
              className="checkout-cart-btn"
              onClick={() => {

                onClose();

                setTimeout(() => {

                  document
                    .getElementById("checkout")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });

                }, 100);

              }}
            >

              Continue to Checkout

              <i className="fa-solid fa-arrow-right"></i>

            </button>

          </div>

        )}

      </aside>

    </div>
  );
}

export default Cart;