import React ,{useState, useEffect} from "react";

import style from "./style.module.scss"

import { Button, Modal } from 'react-bootstrap';
import {  Divider } from "@mui/material";

import NavbarAll from "../../components/Navbar.js";
import Footer from "../../components/footer.js";
import API from "../../services/http-common.js";


import MenuBookIcon from '@mui/icons-material/MenuBook';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';

const Recipes = () => {

    const [productName,setProductName] = useState('');
    const [photo, setPhoto] = useState('');
    const [instruction, setInstruction] = useState('');
    const [foodType,setFooodType] = useState('');



    const[recipesData,setRecipesData] = useState([]);

    const getRecipes=async () =>{
        return await API.get('receta/').then((response)=>{
            setRecipesData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        });
        
    }

    const[showModalSpecificationPost,setShowModalSpecificationPost]= useState(false);
    


    const handleOpenModalSpecificationPost = (post) =>{
        setProductName(post.nombre_receta);
        setPhoto(post.url_imagen);
        setInstruction(post.preparacion);
        setFooodType(post.tipo_comida);
        setShowModalSpecificationPost(true);
        

    }

    useEffect(() => {
        getRecipes();
      }, []);

    return (<>
        <NavbarAll/>
        <h1 className="title mb-4">Recetas</h1>
        <div class={style.productsContainer}>
            {recipesData.map((recipe,i) =>(     
                <div key={i} className={style.product}>
                    <img src={recipe.url_imagen} alt={recipe.nombre_receta} width="250" height="200"/>
                    <>
                    <div>
                        <p>{recipe.nombre_receta} - {recipe.tipo_comida}</p>
                    </div>
                    <a onClick={() => handleOpenModalSpecificationPost(recipe)}>Ver detalles</a>
                    </>
                </div> 
            ))}
        </div> 
        <div className="mb-5"></div>
        <Modal show={showModalSpecificationPost} onHide={()=>setShowModalSpecificationPost(false)} disablescrolllock = "true">
                <Modal.Header closeButton>
                    <Modal.Title>{productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="d-flex">
                            <div className={style.product}>
                                <img className={style.img} src={photo} alt={productName} width="250" height="250" />
                            </div>
                            <div className="py-3">
                                <h4>Nombre receta: </h4>
                                <p>{productName}</p>
                                <Divider/>
                                <h4><FoodBankIcon className="mr-1"/>Tipo de comida</h4>
                                <p>{foodType}</p>
                                <Divider/>
                            </div>
                        </div>
                        <div className="py-3">
                            <div>
                                <h4><MenuBookIcon className="mr-1"/>Preparación</h4>
                            </div>
                            <p>{instruction}</p>
                            <Divider/>
                        </div> 
                    </Modal.Body>
                <Modal.Footer>
                    <Button  className="btn btn-danger" onClick={() => setShowModalSpecificationPost(false)}><CloseIcon/>Cerrar</Button>
                    {/* <Button  className="btn btn-success"><FavoriteBorderIcon/></Button> */}
                </Modal.Footer>
        </Modal> 
        <Footer className="mt-4"/>
    </> );
}
 
export default Recipes;