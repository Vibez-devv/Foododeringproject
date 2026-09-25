import "./AddFood.css";

function Cart({
  order = [],
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
}) {
  const totalItems = order.reduce(
    (total, food) => total + food.quantity,
    0
  );

  return (
    <div className="cart-overlay">

      <aside className="cart-panel">

        {/* CART HEADER */}
        <div className="cart-header">

          <div>
            <p className="cart-label">
              FOODORDERINGAPP
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
                You haven't added any food yet.
                Choose your favourite meal to
                start your order.
              </p>

              <button
                className="continue-shopping"
                onClick={onClose}
              >
                <i className="fa-solid fa-arrow-left"></i>

                Browse Food
              </button>

            </div>

          ) : (

            <>

              <div className="cart-items">

                {order.map((food, index) => (

                  <div
                    className="cart-item"
                    key={`${food.name}-${food.size || "default"}-${index}`}
                  >

                    {/* IMAGE */}
                    <div className="cart-item-image">

                      <img
                        src={food.image}
                        alt={food.name}
                      />

                    </div>

                    {/* DETAILS */}
                    <div className="cart-item-info">

                      <div className="cart-item-top">

                        <div>

                          <h3>
                            {food.name}
                          </h3>

                          {food.size && (
                            <span>
                              {food.size}
                            </span>
                          )}

                        </div>

                        <button
                          className="remove-item"
                          onClick={() =>
                            onRemove(index)
                          }
                          aria-label={`Remove ${food.name}`}
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
                            {food.quantity}
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
                          {food.quantity}{" "}
                          {food.quantity === 1
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
                Total Food Items
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