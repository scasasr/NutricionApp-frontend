import React, {useState} from "react";

import NavbarAll from "../../components/Navbar.js";
import Footer from "../../components/footer.js";

import {useSnackbar } from "notistack";

import SendIcon from '@mui/icons-material/Send';
import AbcIcon from '@mui/icons-material/Abc';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LinkIcon from '@mui/icons-material/Link';

import { useFormik } from 'formik';
import * as Yup from "yup";
import API from "../../services/http-common.js";

const Recipe_register = () => {

    const {enqueueSnackbar} = useSnackbar();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [typeFood, setTypeFood] = useState('');

    const handleChangeTypeFood = (event) =>{
        setTypeFood(event.target.value);
    }
    

    const formik = useFormik({
        initialValues: {
          nombre_receta:'',
          url_imagen:'',

        },
        validationSchema:Yup.object({
            nombre_receta:Yup.string().required("Este campo es requerido").min(3,"menor a 1 digitos").max(35,"excede los 35 digitos"),
        }),
        onSubmit: values => {
            const recipeData = JSON.stringify({
                'nombre_receta':formik.values.nombre_receta,
                'tipo_comdida':typeFood,
                'preparacion':'',
                'url_imagen':formik.values.url_imagen,
                'cantidad_calorias':0
            });
            console.log(recipeData)
            API.post('receta/', recipeData).then((response) =>{
                if(response.status===200){
                    localStorage.setItem("idRecipe", JSON.stringify(response.data.id_receta));
                    enqueueSnackbar("Receta creada",{variant:'success'})
                    setTimeout(()=>window.location.href="./finishRecipe",2000);
                }else if(response.data.status===422){
                    console.log('no se ha podido guardadr la receta')
                    enqueueSnackbar("Error al crear receta",{variant:'error'})
                }
            }).catch((error)=>{
                console.log(error);
            })

        },
      });


    return (<>
    <NavbarAll/>
    <h1 className="title">Crear Receta </h1>

    <div className="allergies-container mb-4">
        <form className="form mt-0" onSubmit={formik.handleSubmit}>
        <div className="input-group mb-3">
            <span className="input-group-text"><AbcIcon/></span>
            <input 
                className="form-control"
                type="text" 
                id="nombre_receta" 
                name= "nombre_receta"
                placeholder="Nombre de la receta"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.nombre_receta} 
            />
        </div >
        {formik.touched.nombre_receta && formik.errors.nombre_receta ? <div className="error">{formik.errors.nombre_receta}</div> : null}
    
        <div className="input-group mb-3">
            <span className="input-group-text"><FoodBankIcon /></span>
            <select name="tipoComida" id="tipoComida" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handleChangeTypeFood(e)}  onBlur={formik.handleBlur}>
                <option value='placeholder'disabled>Tipo de comida </option>
                <option value="Desayuno">Desayuno</option>
                <option value="Almuerzo">Almuerzo</option>  
                <option value="Cena">Cena</option>
                <option value="Merienda">Merienda</option>   
            </select>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text"><LinkIcon/></span>
            <input 
                className="form-control"
                type="text" 
                id="url_imagen" 
                name= "url_imagen" 
                placeholder="URL imagen"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url_imagen} 
            />
        </div>
        {formik.touched.url_imagen && formik.errors.url_imagen ? <div className="error">{formik.errors.url_imagen}</div> : null}

        <div> 
            <button className="btn btn-success" type="submit"><SendIcon className="mr-1"/>Siguiente</button>
        </div>
        {error && <p className="error mt-2">{message}</p>} 
        </form>
    </div>
    

    <Footer/>
    </>);
}
 
export default Recipe_register;