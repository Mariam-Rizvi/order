import React, { useState, useEffect } from "react";


export function Browse({
  isActive,
  changePage,
  cart,
  removeFromCart,
  addToCart,
  productPrices,
  products,
}) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    var cartEmpty = Object.values(cart).every((item) => item === 0);
    const checkoutButton = document.getElementById("checkout-button");
    if (cartEmpty) {
      checkoutButton.classList.add("collapse");
    } else {
      checkoutButton.classList.remove("collapse");
    }
  }, [cart]);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  function handleSearchChange(event) {
    if (event) {
      let filtered = products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFiltered(filtered);
    }
  }
  function doneShopping() {
    setFiltered(products);
    changePage("Cart");
  }

  return !isActive ? (
    <></>
  ) : (
    <div className="grid grid-cols-12">
      <div className="col-span-1 p-3">
        <input
          type="text"
          name="price"
          id="price"
          className=" rounded-md border-0 py-2 pl-3 pr-10 px-4 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-black text-md"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </div>

      <div className="col-span-9 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-3   grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
          {filtered.map((product) => (
            <div key={product.id}>
              <div className="w-full overflow-hidden rounded-md lg:h-50">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-44 lg:w-42"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white">{product.name}</h3>
                </div>
                <p className="text-sm font-medium text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <br></br>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => removeFromCart(product.name)}
                  className="bg-black hover:bg-black text-white font-bold py-2 px-4 border border-black-700 rounded"
                >
                  -
                </button>
                <span className="font-bold text-orange-100">
                  &emsp; {cart[product.name]} &emsp;
                </span>
                <button
                  onClick={() => addToCart(product.name)}
                  className="bg-black hover:bg-black text-white font-bold py-2 px-4 border border-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 p-4 ">
        <div>
          <div className="bg-white border-white border-2 p-4 rounded">
            <h1>Cart</h1>
            <div className="text-left">
              {Object.keys(cart).map((key) =>
                cart[key] > 0 ? (
                  <div key={key}>
                    {key}: {cart[key]} x ${productPrices[key].toFixed(2)}
                  </div>
                ) : null
              )}
            </div>
            <br></br>
            <div>
              Total: $
              {Object.keys(cart)
                .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                .reduce(
                  (total, price, index) =>
                    total + price * cart[Object.keys(cart)[index]],
                  0
                )
                .toFixed(2)}
            </div>
            <br></br>
          
            <br></br>
            
          </div>
        </div>

        <button
          id="checkout-button"
          onClick={() => {
            doneShopping();
          }}
          className="bg-black py-4 px-4 border-orange-900 rounded text-white font-semibold text-sm">
          Checkout
        </button>
      </div>
    </div>
  );
}