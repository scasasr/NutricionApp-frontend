import React from "react";


import { useAuth0 } from "@auth0/auth0-react";

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";

import {LoginButton} from "../layouts/Login.js";

import API from "../services/http-common.js";

//React-Bootstrap-components
import Carousel from 'react-bootstrap/Carousel';

//Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

//Images
import pizza from "../assets/pizza.png";
import pancakes from "../assets/pancakes.jpg";


const Main = () => {
    
    const {user,isAuthenticated} = useAuth0();

    const getUserRegister = (email) =>{
        API.get('user/correo/'+ email).then((response) =>{
            if(response.data.registro_completo !== 1){
                window.location.href ='/allergies-comorbidities';
            }
        }).catch((error) =>{
            if(error.response.status === 404){
                window.location.href ='/allergies-comorbidities';
            } 
        })
    }
    return (  <>

        {isAuthenticated ? (
            getUserRegister(user.email)
        ):(<div></div>)}
        <NavbarAll/>
        <div className="principal-container">
            <div className="principal">
                <div className="secondary-container d-flex justify-content-around align-items-center">
                    <div>
                        <h1 className="title">
                            NutricionApp
                        </h1>
                        <h1 className="title-secondary mb-4">tu mejor aliado<br/>para una vida<br/>más saludable</h1>
                        {LoginButton("Comenzar ahora")}
                    </div>  
                    <div></div>
                </div>
            </div>
        </div>
        <div className="container-white d-flex justify-content-around align-items-center">
            <AccessTimeIcon sx={{ fontSize: 90, color:"#198754" }}/>
            <p style={{color:"#fcba03"}}><b>Crea rutinas alimenticias y  llega a tus<br/>objetivos</b></p>
            <EmojiEventsIcon sx={{ fontSize: 90, color:"#198754" }}/>
            <p style={{color:"#fcba03"}}><b>Recetas saludables y deliciosas, pensadas<br/>en una vida mas saludable</b></p>
            <MonitorHeartIcon sx={{ fontSize: 90, color:"#198754" }}/>
        </div>
        <Carousel>
            <Carousel.Item>
                <div className="carousel-container d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-evenly align-items-center"
                    style={{height:"95%",width:"97%",borderRadius:"5px",borderStyle:"dotted",borderColor:"#fff"}}>
                        <img
                        className="carousel-image"
                        style={{transform:"rotate(-12deg)"}}
                        src={pizza}
                        alt="pizza"
                        />
                        <img
                        className="carousel-image"
                        style={{transform:"rotate(12deg)"}}
                        src={pancakes}
                        alt="pancakes"
                        />
                    </div>
                </div>
                <Carousel.Caption>
                <h1>Las mejores recetas</h1>
                <h4>Deliciosas y enfocadas en tu objetivos calóricos.</h4>
                </Carousel.Caption>
            </Carousel.Item>
            {/* <Carousel.Item>
                <div className="carousel-container">
                    <img
                    className="d-block w-50"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Second slide"
                    />
                </div>
                

                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
        <Footer/>
    </>);
}
 
export default Main;