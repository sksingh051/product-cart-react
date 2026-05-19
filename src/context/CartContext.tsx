import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Products } from "../types/type";
import { toast } from "react-toastify";

export interface CartContextType {
    cart : CartItem[];
    isCartOpen: boolean;
    openCart : () => void;
    closeCart : () => void;
    addToCart : (product : Products) => void;
    removeItem : (id : number) => void;
    changeQty : (id : number, delta : number) => void;
    cartCount : number;
}

// Context creation
const CartContext = createContext< CartContextType | null>(null);

export function CartProvider({children} : {children : ReactNode}){

    const [cart, setCart] = useState<CartItem[]>(()=>
    JSON.parse(localStorage.getItem("miniCart") || "[]"))
    const[isCartOpen, setIsCartOpen] = useState(false);

    function saveCart(updatedCart : CartItem[]){
        setCart(updatedCart)
        localStorage.setItem("miniCart", JSON.stringify(updatedCart));
    }

    function addToCart(product: Products){
        const found = cart.find((item) => item.id === (product.id))
        if(found){
            const updated = cart.map((item) => item.id === (product.id) ? {...item, qty : item.qty + 1} : item) 
            toast.success(`${product.title} quantity updated`);
            saveCart(updated)
        }else{
            const newItem : CartItem = {
                id : (product.id),
                name : product.title,
                price : product.price,
                qty : 1,
                img : product.thumbnail,
            };
            saveCart([...cart, newItem])
            toast.success(`${product.title} added to cart`);
        }
    }

    function removeItem(id : number){
        const item = cart.find((i) => i.id === id)
        saveCart(cart.filter((i) => i.id !== id))
        toast.info(`${item?.name} removed from cart`)
    }

    function changeQty(id : number, delta:number){
        const updated = cart.map((item) => item.id === id ? {...item, qty : item.qty + delta} : item).filter((item) => item.qty > 0)
        const wasRemoved = !updated.find((item) => item.id === id);
    if (wasRemoved) {
      const removedItem = cart.find((item) => item.id === id);
      toast.error(`${removedItem?.name} removed from cart`);
    }

    saveCart(updated);
    }
const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider
        value={{
        cart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeItem,
        changeQty,
        cartCount,
      }}
        >
{children}
        </CartContext.Provider>
    )
}

// context usage 
export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used inside CartProvider")
    }
   return context
}
