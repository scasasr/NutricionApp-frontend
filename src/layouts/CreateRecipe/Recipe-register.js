import React, {useState,useEffect} from "react";

import NavbarAll from "../../components/Navbar.js";
import Footer from "../../components/footer.js";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import {useSnackbar } from "notistack";

import SendIcon from '@mui/icons-material/Send';
import AbcIcon from '@mui/icons-material/Abc';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LinkIcon from '@mui/icons-material/Link';


import { useFormik } from 'formik';
import * as Yup from "yup";
import API from "../../services/http-common.js";
import photo from "../../assets/logo.png";

const Recipe_register = () => {

    const {user} = useAuth0();

    const {enqueueSnackbar} = useSnackbar();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [typeFood, setTypeFood] = useState('');
    const [userId,setUSerId] = useState('');
    const [file,setFile] =useState();
    const [pathImage,setPathImage] = useState(photo);
    const [auxNameImage,setAuxNameImage] = useState('');
    const [nameImage,setNameImage] = useState('');

    const handleChangeTypeFood = (event) =>{
        setTypeFood(event.target.value);
    }
 

    const getUserId = async() =>{
        await API.get('/user/correo/'+user.email).then((response)=>{
            if(response.status === 200){
                saveImages(auxNameImage,file,response.data.id_usuario);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const onChangeImage= (e) => {
        if(e.target.files && e.target.files.length > 0){
            const file =e.target.files[0] 
            if(file.type.includes("image")){
                const reader = new  FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load(){
                    setPathImage(reader.result)
                }
                setFile(file)
                setAuxNameImage(file.name)
            }
        }else{
            setPathImage(photo);
            formik.errors.url_imagen="No hay una imagen cargada"
        }
        // console.log("field value change");
        // console.log(formik.values.photo)
        formik.handleChange(e);
      }

    const saveImages = async (name,file,id) =>{
        const form  = new FormData();
        form.append('name',name);
        form.append('file',file,'form-data')

        await axios.post('https://nutricionapp-uploadimages.onrender.com/upload',form).then((response) =>{
            if(response.status ===200){
                createRecipe(response.data.nameImage,id);
            }
        }).catch((error) =>{
            console.log(error)
        });
    }

    const createRecipe = async(name,id) =>{
        const recipeData = JSON.stringify({
            'nombre_receta':formik.values.nombre_receta,
            'tipo_comdida':typeFood,
            'preparacion':'',
            'url_imagen':'https://nutricionapp-uploadimages.onrender.com/uploads/'+name,
            'cantidad_calorias':0,
            "calificacion":5,
            "id_autor":id

        });
        console.log(recipeData)
        await API.post('receta/', recipeData).then((response) =>{
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
            getUserId();
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
                type="file" 
                id="url_imagen" 
                name= "url_imagen" 
                placeholder="URL imagen"
                onChange={onChangeImage}
                onBlur={formik.handleBlur}
                // value={formik.values.url_imagen} 
            />
        </div>
        {formik.errors.url_imagen ? <div className="error">{formik.errors.url_imagen}</div> : null}
        <p className="mt-4" style={{fontSize:"10px"}}>Previsualización</p>
        <div className="d-flex justify-content-center">
            <img className="img-fluid img-thumbnall mt-1 mb-3 "style={{borderRadius:"10px",borderStyle:"inset",height:"300px"}}
                src={pathImage}/>      
        </div>

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