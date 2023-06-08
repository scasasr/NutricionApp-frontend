import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo-footer.png";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return ( 
        <div>
            <footer className="text-white py-4 bg-dark">
                <div className="container">
                    <nav className="row">
                        <Link to='/' className="col-12 col-md-3 d-flex aling-items-center justify-content-center">
                            <img src={logo} className="mx-2" width={'80%'} height={'35%'}/>
                        </Link>
                        <ul className="col-12 col-md-3 list-unstyled">
                            <li className="font-weight-bold mb-2" style={{color:'#DC7633'}}><h5>Misión</h5></li>
                            <li><small className="text-center">Ayudar a las personas a alcanzar sus objetivos de salud y bienestar a través de un enfoque práctico y personalizado en la nutrición.</small></li>
                            <li className="font-weight-bold mb-2 mt-2"style={{color:'#DC7633'}}><h5>Visión</h5></li>
                            <li><small className="text-center">Ser la empresa líder en el mercado de la nutrición personalizada, ofreciendo soluciones innovadoras y de alta calidad para mejorar la salud de nuestros usuarios.</small></li>
                        </ul>
                        <ul className="col-12 col-md-3 list-unstyled">
                            <li className="font-weight-bold mb-2"style={{color:'#198754'}}><h5>Enlaces</h5></li>
                            <li>
                                <Link to='/recipes' className="text-reset">Recetas</Link>   
                            </li>
                            <li>
                                <Link to='/AboutUs' className="text-reset">Nosotros</Link>   
                            </li>
                            <li>
                                <Link to='/Legal' className="text-reset">Terminos y condiciones</Link>  
                            </li>
                        </ul>
                        <ul className="col-12 col-md-3 list-unstyled">
                            <li className="font-weight-bold mb-2" style={{color:'#198754'}}><h5>Siguenos</h5></li>
                            <li className="d-flex justify-content-between">
                                <a className="text-reset" href='https://www.facebook.com/profile.php?id=100093491880723' target="_blank"><FacebookIcon/></a>
                                <a className="text-reset" href='https://www.instagram.com/accounts/login/' target="_blank"><InstagramIcon/></a>
                                <a className="text-reset" href='https://www.linkedin.com/company/nutricionapp/' target="_blank"><LinkedInIcon/></a>
                            </li>    
                            
                        </ul>

                    </nav>
                </div>
            </footer>
        </div>
     );
}
 
export default Footer;