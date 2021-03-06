// TODO Fix the footer thing. 

// React Imports
import React, { useState } from 'react'; 
import { Route} from 'react-router-dom';

import axios from 'axios';

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 


// Component Imports
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Homepage from "./components/homepage/homepage.component"
import Category from "./components/category/category.component"
import Cart from "./components/cart/cart.component";
import Wish from "./components/wish/wish.component";
import Buy from "./components/buy/buy.component";
import Footer from "./components/footer/footer.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Profile from "./components/profile/profile.component";
import AboutUs from "./components/about.us/about.us.component";
import StarRating from "./components/star.rating/star.rating.component";
import { startSession } from 'mongoose';
// import ItemCategory from './components/category/item.category.component';



function App()  {
  const [isSignedIn, setSignedIn] = useState(false);
  const [userId, setUserID] = useState('');
  const [user, setUser] = useState(null);

  const logoutSuccess = () => {
    // console.log("From Logout: ", userId)
    axios({
      method: "POST",
      url: "http://localhost:5000/api/google_logout",
      data: { userId: userId }
    }).then(res => {
      setSignedIn(false);
      setUser(null);
    })
  }

  const sucessfulResponseGoogle = (response) => {
    axios({
      method: "POST",
      url: 'http://localhost:5000/api/google_login',
      data: { tokenId: response.tokenId }
    }).then(res => {
      console.log(res);
      setSignedIn(true);
      setUserID(res.data.user._id);
      setUser(res.data.user);
      // console.log("Var inside: ", isSignedIn, res.data.user._id);
    })
      .catch(err => console.log("Error from succesfulResponseGoogle", err));
  }

  const failedResponseGoogle = (response) => {
    // console.log("Here", response);
    setSignedIn(false);
  }

    return (
        <div className="main">
          <NavBar user={user} isSignedIn={isSignedIn} logoutSuccess={logoutSuccess} sucessfulResponseGoogle={sucessfulResponseGoogle} failedResponseGoogle={failedResponseGoogle}/>
          <br />
          <Route exact
            path="/" 
            render={props => <Homepage user={user} {...props}
            component={Homepage} />
          }  
          />

          <Route 
            path="/product/:productId"
            component={Product}
          />

          <Route 
            path="/category/:catId" 
            component={Category}
          />

          <Route 
            path="/cart"
            render={props => <Cart user={user} {...props}
            component={Cart} />
          }/>

          <Route
            path="/wish"
            render={props => <Wish user={user} {...props}
            component={Wish} />
          } />

          <Route 
            path="/profile" 
            render={props => <Profile user={user} {...props}
            component={Profile} />
          }
          />
          <Route 
            path="/buy" component={Buy} />

          <Route 
            path="/about.us" component={AboutUs} />

          <Route 
            path="/star.rating" component={StarRating} />
            
          <Footer />
          <Sidebar user={user}/>
        </div>
    );
  }

export default App; 