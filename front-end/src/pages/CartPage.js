import CartPageComponent from "./components/CartPageComponent";
import { useSelector,useDispatch } from 'react-redux';
import { addToCart,removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
    const cartItems=useSelector((state)=>{return state.cart.cartItems})
    //console.log(cartItems)
    const cartSubtotal=useSelector((state)=>{return state.cart.cartSubtotal})
    const reduxDispatch=useDispatch()
    return (
        <CartPageComponent addToCart={addToCart} cartItems={cartItems} cartSubtotal={cartSubtotal} reduxDispatch={reduxDispatch} removeFromCart={removeFromCart}></CartPageComponent>
    );
};
export default CartPage;