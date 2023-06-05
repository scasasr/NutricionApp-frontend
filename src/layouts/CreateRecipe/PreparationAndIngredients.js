import React ,{useState,useEffect} from "react";

import NavbarAll from "../../components/Navbar.js";
import Footer from "../../components/footer.js";

const PreparationIngredients = () => {

    const [recipeId,setRecipeId] = useState(() =>{
        try {
            const localStorageRecipe = localStorage.getItem("idRecipe");
            return localStorageRecipe
        } catch (error) {
            return '';
        }
    })
    return (<>
    <NavbarAll/>

    <Footer/>
    </>);
}
 
export default PreparationIngredients;