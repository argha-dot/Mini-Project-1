import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Carousel, Form, ButtonGroup, Button } from "react-bootstrap";
import Cart from '../crud_cart'; 
import { Link } from "react-router-dom"
import "./product.component.css"
import "./input.css"

const key = {
    "Vintage Gaming":"games",
    "Monitors":"monitor",
    "Motherboard":"motherboard",
    "CPU":"cpu",
    "Power Unit and Cooling":"psu",
    "Memory":"ram",
    "Peripherals":"peri",
    "Graphics Card":"graphics",
    "Cabinets":"cabinets",
    "Storage":"storage"
}

function ProductPage(props) {
    // const dispatch = useDispatch();
    const productId = props.match? props.match.params.productId: '';
    var userId = props.user? props.user._id : '';
    // var user = props.user? props.user : '';

    // console.log("Product Id from product page: ", productId)
    // console.log("usr Id from Product Page:", userId); 
    // console.log("Product ID: ", productId); 
    const [Product, setProduct] = useState('')
    const [qty, setIncrement] = useState(1)
    // const [userId, setUserId] = useState('')

    // props.user? setUserId(props.user._id) : setUserId('');
    


    useEffect(() => {
        // console.log("Query: ", `/api/products/${productId}`)
        Axios.get(`/api/products/${productId}`)
            .then(response => {
                setProduct(response.data.product)
            }).catch(err => console.log(err))

    }, [Product])

    function _addToCart() {
        // Cart(productId, userId);
    }

    var buy = {
        borderRadius: "0px",
        backgroundColor: "darkgray",
        border: "none"
    }

    return (
        <div className="product-main">
            <Carousel style={{ backgroundColor: "white" }}>{
                Product.pictures && Product.pictures.map(function (link) {
                    return(
                        <Carousel.Item key={link.toString()}>
                            <img
                                className="product-carousel-img"
                                src={link}
                                alt="First slide"
                                style={{ marginLeft: "auto", marginTop: "auto"}} />
                        </Carousel.Item>
                    )
                })
            }
            </Carousel>

            <div className="product-description">
                <Link to={`/category/${key[Product.category]}`} className="product-category">{Product.category}</Link>
                <div className="product-name">{Product.name}</div>

                <div className="product-text">
                    <p> {Product.description} </p>
                </div>

                <div className="order-info">
                    <div className="product-price"> {Product.price} </div>

                    <Form className="product-form">
                        <span
                            className="input-number-decrement"
                            onClick={() => setIncrement(qty > 0 ? qty - 1 : 0)}
                        >–</span>
                        <input
                            className="input-number"
                            type="text"
                            placeholder={qty}
                            min="1"
                            max="10"
                            readOnly="readOnly"
                        ></input>
                        <span
                            className="input-number-increment"
                            onClick={() => setIncrement(qty < 10 ? qty + 1 : qty)}
                        >+</span>
                    </Form>

                    <div className="shop-btn">
                        <ButtonGroup className="add-buy">
                            <Button>
                                <a className="add-link"
                                    style={{ textDecoration: "none" }}
                                    onClick={_addToCart}>
                                    Add To Cart
                                    </a>
                            </Button>

                            <Button variant="dark" style={buy}>
                                <a className="buy-link"
                                    style={{ textDecoration: "none" }}
                                    href="https://itch.io/">
                                    Buy Now
                                    </a>
                            </Button>
                        </ButtonGroup>

                        <button className="add-wishlist">
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
