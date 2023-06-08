import React from "react";

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";
import FAB from "../components/Tip.js";
import Terms from "../components/Terms.js";

const Legal = () => {
    return (<>
        <NavbarAll/>
        <FAB/>
        <h1 className="title-secondary">Terminos y condiciones</h1>
        <Terms/>
        <div className="mb-4"></div>
        <Footer/>
    </>);
}
 
export default Legal;