import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const Footer = () => {
    return ( 
        <div>
            <footer className="text white py-4 bg-dark">
                <div className="conrainer">
                    <div clasname="row">
                        <Link to='/' className="col-12 col-md3 d-flex aling-items-center justify-content-center">
                            <img src={logo}/>
                        </Link>

                    </div>
                </div>
            </footer>
        </div>
     );
}
 
export default Footer;