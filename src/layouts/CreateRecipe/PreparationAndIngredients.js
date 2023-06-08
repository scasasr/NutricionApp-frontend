import React ,{useState,useEffect} from "react";

import NavbarAll from "../../components/Navbar.js";
import Footer from "../../components/footer.js";

import {useSnackbar } from "notistack";

import { useFormik } from 'formik';
import * as Yup from "yup";


import SendIcon from '@mui/icons-material/Send';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import API from "../../services/http-common.js";

const PreparationIngredients = () => {


    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const {enqueueSnackbar} = useSnackbar();

    const [recipeId,setRecipeId] = useState(() =>{
        try {
            const localStorageRecipe = localStorage.getItem("idRecipe");
            return localStorageRecipe
        } catch (error) {
            return '';
        }
    })

    const [ingredients, setIngredients] = useState([]);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [ingredient, setIngredient] =useState([]);

    const getIngredients = async () =>{
        return await API.get('ingrediente/').then((response) =>{
            setIngredientsData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        })
    };

    const handldeChangeIngredient = (event) =>{
        setIngredient(event.target.value.split(','));
    }
 
    const handleAddIngredients = (data) => {
        document.getElementById("amount").value = "";
        setIngredients([...ingredients,data]);   
    };


    const handleDeleteIngredient = (ingredient) =>{
        const aux = ingredients.filter(item => item!==ingredient);
        setIngredients(aux);

    }
    
    const createIngredientRecipe = async(idRecipe,idIngredient,amount) =>{
        const data = JSON.stringify({
            "id_receta": parseInt(idRecipe,10),
            "id_ingrediente": idIngredient,
            "cantidad_ingrediente": amount
        });
        console.log(data)
       await  API.post('ingrediente_receta/',data).then((response) =>{
            if(response.status === 200){
                enqueueSnackbar("Ingrediente actualizado",{variant:'success'})
            }else if(response.status === 422){
                enqueueSnackbar("ingrediente no actualizado",{variant:'success'})
            }

        }).catch((error) =>{
            console.log(error)
        })
    }

    const createIngredientsRecipe = () => {
        ingredients.map((ingredient,id) =>{
            createIngredientRecipe(recipeId,ingredient.id,ingredient.amount);
        })
    }


    const putRecipe = async(idRecipe,preparation) =>{
        await API.put('receta/cambiar_preparacion/'+idRecipe+'/'+preparation).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar("Preparacion actualizada",{variant:'success'})
            }else if(response.status === 422){
                enqueueSnackbar("Preparacion no actualizada",{variant:'error'})

            }

        }).catch((error) =>{
            console.log(error);

        })
    }

    const formik = useFormik({
        initialValues: {
          preparation:'',
          amount:'',

        },
        validationSchema:Yup.object({
            preparation:Yup.string().required("Este campo es requerido").min(3,"menor a 1 digitos"),
            amount:Yup.string().required("Este campo es requerido").min(1,"menor a 1 digitos").max(4,"excede los 4 digitos")
        }),
        onSubmit: values => {
            createIngredientsRecipe();
            putRecipe(recipeId,formik.values.preparation);
            setTimeout(()=>window.location.href="./Recipes",4000);

        },
      });

    useEffect(() => {
        getIngredients();
    }, []);
    
 
    
    return (<>
    <NavbarAll/>

    <div className="allergies-container mb-4">
        <form className="form mt-0" onSubmit={formik.handleSubmit}>
        <div className="input-group mb-3">
            <span className="input-group-text"><RiceBowlIcon/></span>
            <select name="ingredient" id="ingredient" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handldeChangeIngredient(e)}  onBlur={formik.handleBlur}>
                <option value='placeholder' disabled>Seleccione un ingrediente</option>
                {ingredientsData.map((ingredient,id) =>(
                    <option key={id} value={[ingredient.id_ingrediente,ingredient.nombre_ingrediente,ingredient.cantidad_calorias]}>{ingredient.nombre_ingrediente}</option>
                ))}
            </select>
            <input 
                className="form-control"
                type="text" 
                id="amount" 
                name= "amount"
                placeholder="Cantidad en g"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.amount} 
            />
            <button className="btn btn-success" onClick={()=>handleAddIngredients({id:ingredient[0],name:ingredient[1],calories:ingredient[2],amount:formik.values.amount})}><AddCircleOutlineIcon/></button>
        </div >
        {formik.touched.amount && formik.errors.amount ? <div className="error">{formik.errors.amount}</div> : null}


        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {/* <th>id</th> */}
                        <th>Ingrediente</th>
                        <th>Cantidad - g</th>
                        <th>Calorias</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        ingredients.map((ingredient,id)=>(
                            <tr key={id}>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount}</td>
                                <td>{((ingredient.amount/100)*ingredient.calories).toFixed(2)}</td>
                                <td>   
                                    <button onClick={() => handleDeleteIngredient(ingredient)} className="btn btn-danger">
                                        <i><ClearIcon/></i>
                                    </button>  
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text"><SoupKitchenIcon/></span>
            <input 
                className="form-control"
                type="text" 
                id="preparation" 
                name= "preparation" 
                placeholder="Descripción de la preparación"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preparation} 
            />
        </div>
        {formik.touched.preparation && formik.errors.preparation ? <div className="error">{formik.errors.preparation}</div> : null}

        <div> 
            <button className="btn btn-success" type="submit"><SendIcon className="mr-1"/>Siguiente</button>
        </div>
        {error && <p className="error mt-2">{message}</p>} 
        </form>
    </div>



    <Footer/>
    </>);
}
 
export default PreparationIngredients;