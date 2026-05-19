import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, changeQty, removeItem } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />
      )}

      {/* drawer — slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-85 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={closeCart}
            className="cursor-pointer text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 mt-20 text-sm">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg p-1"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#6c5ce7] font-bold">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="cursor-pointer w-7 h-7 rounded-md bg-[#f0eeff] text-[#6c5ce7] font-bold hover:bg-[#6c5ce7] hover:text-white transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="cursor-pointer w-7 h-7 rounded-md bg-[#f0eeff] text-[#6c5ce7] font-bold hover:bg-[#6c5ce7] hover:text-white transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>

                  {/* remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer text-xs text-red-400 hover:text-red-600 underline self-start mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Total</span>
            <span className="text-[#6c5ce7] text-lg font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
