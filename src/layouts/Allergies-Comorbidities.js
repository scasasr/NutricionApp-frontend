import React,{useState, useEffect} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";

import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import API from "../services/http-common.js";


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


//icons 
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SendIcon from '@mui/icons-material/Send';
import WcIcon from '@mui/icons-material/Wc';

import { Box } from "@mui/material";

const AllergiesComorbidities = () => {

    // const [error, setError] = useState(false);
    // const {user,isAuthenticated} = useAuth0();

    const [age, setAge] = useState(()=>{
        try {
            const ageData = localStorage.getItem("age");
            return ageData ? JSON.parse(ageData).age : '';
        } catch (error) {
            return '';
        }
    }
        
    );

    const [gender ,setGender ] = useState(()=>{
        try {
            const genderData = localStorage.getItem("gender");
            return genderData ? JSON.parse(genderData).gender : '';
        } catch (error) {
            return '';
        }
    });
    
    const [weight,setWeight] = useState(()=>{
        try {
            const localStorageUserData = localStorage.getItem("userData");
            return localStorageUserData ? JSON.parse(localStorageUserData).weight : '';
        } catch (error) {
            return [];
        }
    });

    const [height,setHeight] = useState(()=>{
        try {
            const localStorageUserData = localStorage.getItem("userData");
            return localStorageUserData ? JSON.parse(localStorageUserData).height : '';
        } catch (error) {
            return [];
        }
    });

    const [birth,setBirth] = useState(()=>{
        try {
            const localStorageUserData = localStorage.getItem("userData");
            return localStorageUserData ? JSON.parse(localStorageUserData).birth : '';
        } catch (error) {
            return [];
        }
    });

    const [allergies,setAllergies] = useState(()=>{
        try {
            const localStorageAllergies = localStorage.getItem("Allergies");
            return localStorageAllergies ? JSON.parse(localStorageAllergies) : [];
        } catch (error) {
            return [];
        }
    });

    const [comorbidities,setComorbidities] = useState(()=>{
        try {
            const localStorageComorbidities = localStorage.getItem("Comorbidities");
            return localStorageComorbidities ? JSON.parse(localStorageComorbidities) : [];
        } catch (error) {
            return [];
        }
    });

    const [warningAllergie, setWarningAllergie] = useState(()=>{
        return(Object.entries(allergies).length===0)? 'Puedes continuar asi, pero recuerda que conocer tus alergias es de vital importancia para nosotoros.':''
    });

    const [warningComorbiditie, setWarningComorbiditie] = useState(() => {
        return(Object.entries(comorbidities).length===0)? 'Puedes continuar asi, pero recuerda que conocer tus comorbilidades es de vital importancia para nosotoros.':''
    });

    const [ingredientsData,setIngredientsData] = useState([]);
    const [comorbiditiesData,setComorbiditiesData] = useState([]);

    const getIngredients = async () =>{
        return await API.get('ingrediente/').then((response) =>{
            setIngredientsData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        })
    };

    const getComorbidities = async () =>{
        return await API.get('enfermedad/').then((response) =>{
            setComorbiditiesData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        })
    };

    const handleChangeAllergie = (event) => {
        if(event.target.value !== 'ninguno'){
            setWarningAllergie('');
            setAllergies([...allergies,event.target.value]);
        }else if(event.target.value === 'ninguno'){
            setAllergies([]);
            setWarningAllergie('Puedes continuar asi, pero recuerda que conocer tus alergias es de vital importancia para nosotoros.')
        }
        
    };

    const handleChangeComorbiditie = (event) => {
        if(event.target.value !== 'ninguno'){
            setWarningComorbiditie('');
            setComorbidities([...comorbidities,event.target.value]);
        }else if(event.target.value === 'ninguno'){
            setComorbidities([]);
            setWarningComorbiditie('Puedes continuar asi, pero recuerda que conocer tus comorbilidades es de vital importancia para nosotoros.');
        }
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);

    };

    const handleDeleteAllergie = (allergie) => {
        const aux = allergies.filter(item => item!==allergie);
        setAllergies(aux);
        if(Object.entries(aux).length === 0){
            setWarningAllergie('Puedes continuar asi, pero recuerda que conocer tus comorbilidades es de vital importancia para nosotoros.');
        }
    }

    const handleDeleteComorbiditie = (comorbiditie) => {
        const aux = comorbidities.filter(item => item!==comorbiditie);
        setComorbidities(aux);
        if(Object.entries(aux).length === 0){
            setWarningComorbiditie('Puedes continuar asi, pero recuerda que conocer tus comorbilidades es de vital importancia para nosotoros.');
        }
    }

    const showAllergies = () => {
        return(<>
        <Stack className="stack-w mb-2" direction="row" spacing={1}>
            {  allergies.map((allergie,id) =>(
                    <Chip label={allergie.split(",")[1]} color="success" variant="outlined" onDelete={() => handleDeleteAllergie(allergie)} />
                ))}   
        </Stack>
        </>)
    }

    const showComorbidities = () => {
        return(<>
        <Box sx={{ width:"100%"}}>
            <Stack className="stack-w mb-2" direction="row" spacing={1}>
                { comorbidities.map((Comorbiditie,id) =>(
                    <Chip label={ Comorbiditie.split(",")[1]} color="secondary" variant="outlined" onDelete={() => handleDeleteComorbiditie(Comorbiditie)} />
                ))}   
            </Stack>
        </Box>
        </>)
    }

    const handleOnChangeBirth = (event) =>{
        console.log(event.target.value);
        formik.values.birth = event.target.value
        getAge(event.target.value);
    }

    const getAge = (birth) =>{
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear()-birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age)
    }

    useEffect(() => {
        getIngredients();
        getComorbidities();
        
    }, []);

    const formik = useFormik({
        initialValues: {
          weight:weight,
          height:height,
          allergie:'',
          comorbiditie:'',
          birth:birth,
        },
        validationSchema:Yup.object({
            weight:Yup.string().required("Este campo es requerido").min(1,"menor a 1 digitos").max(5,"excede los 6 digitos"),
            height:Yup.string().required("Este campo es requerido").min(1,"menor a 1 digitos").max(5,"excede los 6 digitos"),
            birth:Yup.date().required("Este campo es requerido")
        }),
        onSubmit: values => {
          if(age < 15){
            return formik.errors.birth = "No cumples con la edad suficiente para registarte.";
          } else {
            formik.errors.birth = null;
          }
          localStorage.setItem("userData", JSON.stringify(values));
          localStorage.setItem("gender", JSON.stringify({gender:gender}));
          localStorage.setItem("age", JSON.stringify({age:age}));
          localStorage.setItem("Allergies", JSON.stringify(allergies));
          localStorage.setItem("Comorbidities", JSON.stringify(comorbidities));
          window.location.href = "./select-goal";
        },
      });

    return (<>
    <NavbarAll/>
    <h1 className="title">Alergia/Comorbilidades</h1>
    <h1 className="title-secondary">Queremos saber un poco más de ti, por favor completa la siguiente información:</h1>

    <div className="allergies-container mb-4">
        <form className="form mt-0" onSubmit={formik.handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text"><MonitorWeightIcon/></span>
                    <input 
                        className="form-control"
                        type="text" 
                        id="weight" 
                        name= "weight"
                        placeholder="Peso corporal en kilogramos"
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.weight} 
                    />
                </div >
                {formik.touched.weight && formik.errors.weight ? <div className="error">{formik.errors.weight}</div> : null}
            
                <div className="input-group mb-3">
                <span className="input-group-text"><HeightIcon/></span>
                    <input 
                        className="form-control"
                        type="text" 
                        id="height" 
                        name= "height" 
                        placeholder="Estatura en centimetros"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.height} 
                    />
                </div>
                {formik.touched.height && formik.errors.height ? <div className="error">{formik.errors.height}</div> : null}

                <div className="input-group mb-3">
                    <span className="input-group-text"><WcIcon/></span>
                    <select name="gender" id="gender" className="form-control" aria-label="Default select example"
                    defaultValue={(gender==="F" || gender==="M")?(gender):('placeholder')} onChange={(e) => handleChangeGender(e)}  onBlur={formik.handleBlur}>
                        <option value='placeholder'disabled>Sexo </option>
                        <option value="F">Mujer</option>
                        <option value="M">Hombre</option>   
                    </select>
                </div>
                
                <div className="input-group mb-3">
                <span className="input-group-text"><CakeIcon/></span>
                    <input 
                        className="form-control"
                        type="date" 
                        id="birth" 
                        name= "birth" 
                        placeholder="Fecha de nacimiento"
                        onChange={(e)=>handleOnChangeBirth(e)}
                        onBlur={formik.handleBlur}
                        value={formik.values.birth} 
                    />
                </div>
                {formik.touched.birth && formik.errors.birth ? <div className="error">{formik.errors.birth}</div> : null}

                <div className="input-group mb-3">
                    <span className="input-group-text"><VaccinesIcon/></span>
                    <select name="allergie" id="allergie" className="form-control" aria-label="Default select example"
                    defaultValue='placeholder' onChange={(e) => handleChangeAllergie(e)}  onBlur={formik.handleBlur}>
                        <option value='placeholder'disabled>Seleccione los alimentos a los que es alérgico</option>
                        <option value='ninguno'>NINGUNO</option>
                        {ingredientsData.map((ingredient,id) =>(
                            <option key={id} value={[ingredient.id_ingrediente,ingredient.nombre_ingrediente]}>{ingredient.nombre_ingrediente}</option>
                        ))}
                    </select>
                </div>
                { ((Object.entries(allergies).length === 0) && (warningAllergie !== '')) ? <div className="warning mb-3">{warningAllergie}</div> : showAllergies()}
                

                <div className="input-group mb-3">
                    <span className="input-group-text"><LocalHospitalIcon/></span>
                    <select name="comorbiditie" id="comorbiditie" className="form-control" aria-label="Default select example"
                    defaultValue='placeholder' onChange={(e) => handleChangeComorbiditie(e)}  onBlur={formik.handleBlur}>
                        <option value='placeholder'disabled>Indique si padece alguna enfermedad</option>
                        <option value='ninguno'>NINGUNA</option>
                        {comorbiditiesData.map((comorbiditie,id) =>(
                            <option key={id} value={[comorbiditie.id_enfermedad,comorbiditie.nombre_enfermedad]}>{comorbiditie.nombre_enfermedad}</option>
                        ))}
                    </select>
                </div>
                { ((Object.entries(comorbidities).length === 0) && (warningComorbiditie !== '')) ? <div className="warning mb-3">{warningComorbiditie}</div> : showComorbidities()}
                


                <div> 
                    <button className="btn btn-success" type="submit"><SendIcon className="mr-1"/>Siguiente</button>
                </div>
                {/* {error && <p className="error mt-2">{message}</p>} */}
            
            </form>
    </div>
    <Footer/>    
           


    
    </>);
}
 
export default AllergiesComorbidities;