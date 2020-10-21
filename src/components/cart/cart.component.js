import React, { useEffect, useState } from "react";
import Axios from "axios";
import CartItem from "./item.cart.component";


import "./cart.component.css";

export default function Cart(props) {

    const [cartList, setCartList] = useState(null);
    const [userId, setUserId] = useState(props.user ? props.user._id : "")

    useEffect(() => {
        setUserId(props.user ? props.user._id : "");
        Axios({
            method: "GET",
            url: `http://localhost:5000/api/see_cart/${userId}`
        })
        .then(response => {
            // console.log("Response from cart.comp from cart: ", response);
            setCartList(response.data.cart);
        })
        .catch(err => console.log("error from cart.comp Error: ", err))
    }, [cartList])

    
    console.log("cartList from get cart: ", cartList);

    
    return (
        <div className="cart-main" style={{ color: "whitesmoke" }}>
            <h1 className="cart-title">Shopping Cart</h1>
            <br />
            <div className="cart-contents">
                {
                    cartList && cartList.map((item) => {
                        return (
                            <CartItem userId={userId} cartDetails={item} key={item.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}