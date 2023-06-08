import React from "react";

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";
import FAB from "../components/Tip.js";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Miguel from "../assets/Miguel.jpeg"
import Juan from "../assets/Juan.jpg"
import Sebas from "../assets/sebas.jpg"

const AboutUs = () => {
    return (
    <>
        <NavbarAll/>
        <FAB/>
        <h2 className="title">NutricionApp</h2>
        <div className="d-flex justify-content-center">
            <div className="aboutUs-container mb-4">
                <p>Tu mejor aliado para una vida más saludable</p>
            </div> 
        </div>
        
        <h3 className="title-secondary">Misión</h3>
        <div className="d-flex justify-content-center">
            <div className="aboutUs-container mb-4">
                <p>
                Ayudar a las personas a alcanzar sus objetivos de salud y bienestar a través de un enfoque práctico y personalizado en la nutrición. Nuestra aplicación permite a los usuarios monitorear su consumo diario de calorías, planificar comidas saludables y recibir recomendaciones basadas en datos para una dieta más equilibrada. 
                </p>
            </div>
        </div>
        
        <h3 className="title-secondary">Visión</h3>
        <div className="d-flex justify-content-center">
            <div className="aboutUs-container mb-4">
                <p>
                Ser la aplicación líder en el mercado de la nutrición personalizada, ofreciendo soluciones innovadoras y de alta calidad para contribuir en una mejora a la salud de nuestros usuarios. Queremos ser reconocidos por nuestra excelencia en el servicio al cliente y por la satisfacción de nuestros usuarios al alcanzar sus metas de salud. Además, aspiramos a expandir nuestra oferta de servicios y convertirnos en un referente en el campo de la nutrición y el bienestar.
                </p>
            </div>
        </div>

        
        <h3 className="title-secondary">Equipo</h3>
        <div className="aboutUs-container">
            <div className="d-flex justify-content-around mt-3 mb-4">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="https://www.linkedin.com/in/miguelangel-mosquera-martin-018033253/" target="_blank">
                    <CardMedia
                    component="img"
                    height="400"
                    image={Miguel}
                    alt="Miguel"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Miguelangel MosqueraMartin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Desarrollador frontend

                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="" target="_blank">
                    <CardMedia
                    component="img"
                    height="400"
                    image={Juan}
                    alt="Juan"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Juan Felipe Herrera
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Desarrollador backend

                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="https://www.linkedin.com/in/sebastian-camilo-casas-rojas-95157020b/" target="_blank"> 
                    <CardMedia
                    component="img"
                    height="400"
                    image={Sebas}
                    alt="Sebas"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Sebastián Casas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Desarrollador frontend

                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        
            </div>
        
            
        </div>
           <Footer/>
    </>);
}
 
export default AboutUs;