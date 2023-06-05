import React, {useEffect,useState} from "react";

import { useAuth0 } from "@auth0/auth0-react";
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Terms from "../components/Terms.js";

import API from "../services/http-common.js";
import { useFormik } from 'formik';

import {useSnackbar } from "notistack";

import { Backdrop } from "@mui/material";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const Goal = () => {

    const [showModalTerms, setShowModalTerms] = useState(false);

    const handleCloseModalTerms = () => setShowModalTerms(false);
    
    const [selected,setSelected] = useState(false);


    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);

    
    const {user} = useAuth0();

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
 

    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);


    const [goal,setGoal] = useState('');
    const [lifestyle,setLifestyle] = useState('');
    const [activityFactor,setActivityFactor] = useState('');

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

    const [gender ,setGender ] = useState(()=>{
        try {
            const genderData = localStorage.getItem("gender");
            return genderData ? JSON.parse(genderData).gender : '';
        } catch (error) {
            return '';
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

    const dailyCalories = (gender) =>{ //Fórmula de Harris-Benedict 
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear()-birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log(age);

        if (gender === 'F'){
            console.log((655+(9.6*parseInt(weight),10)+(1.8*parseInt(height,10))-(4.7)*age)*activityFactor)
            return (655+(9.6*parseInt(weight),10)+(1.8*parseInt(height,10))-(4.7)*age)*activityFactor 
        }else if(gender === 'M'){
            console.log((66+(13.7*parseInt(weight,10))+(5*parseInt(height,10))-(6.8)*age)*activityFactor)
            return (66+(13.7*parseInt(weight,10))+(5*parseInt(height,10))-(6.8)*age) *activityFactor
        }
    }   

    const [goalData,setGoalData] = useState([]);
    const [lifestyleData,setLifestyleData] = useState([]);

    const getGoals= async () =>{
        return await API.get('objetivo/').then((response) =>{
            setGoalData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        })
    };

    const getLifestyle  = async () =>{
        return await API.get('estilo_vida/').then((response) =>{
            setLifestyleData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        })
    };

    const createWeight = async (dateTaken,userId) =>{
        let weightData =JSON.stringify({
            'peso':parseInt(weight, 10),
            'fecha_toma':dateTaken,
            'id_usuario':userId
        });
        console.log('Print weight data')
        console.log(weightData)
        await API.post('peso/',weightData).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar("Medida guardada - estatura",{variant:'success'})
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar - peso",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });
    }

    const createHeight = async (dateTaken,userId) =>{
        let heightData =JSON.stringify({
            'estatura':parseInt(height, 10),
            'fecha_toma':dateTaken,
            'id_usuario':userId
        });
        console.log('Print height data')
        console.log(heightData)
        await API.post('estatura/',heightData).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar("Medida guardada - estatura",{variant:'success'})
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar - estatura",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });

    }

    const createRutine = async (userId) =>{
        let rutineData =JSON.stringify({
            'id_objetivo':parseInt(goal, 10),
            'calorias_diarias': dailyCalories(gender),
            'vigente':1,
            'id_usuario':userId
        });
        console.log('Print rutine data')
        console.log(rutineData)
        await API.post('rutinas/',rutineData).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar("Rutina guardada",{variant:'success'})
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar rutina",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });
    }

    const createComorbiditie = async(userId, comorbiditieId) => {
        var comorbiditieData;
        comorbiditieData =JSON.stringify({
            'id_usuario':userId,
            'id_enfermedad':comorbiditieId
        });
        console.log(comorbiditieData);
        await API.post('enfermedad_usuario/',comorbiditieData).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar('Comorbilidad registrada',{varian:'success'});
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar comorbilidad",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });
    }

    const createComorbidities = (userId) => {
       
        console.log('print comorbiditie data ')
        comorbidities.map((comorbiditie,id) =>{
            createComorbiditie(userId,parseInt(comorbiditie.split(",")[0], 10));
        })
    }

    const createAllergie = async(userId, allergieId) =>{ 
        var allergieData;
        allergieData =JSON.stringify({
            'id_usuario':userId,
            'id_ingrediente':allergieId
        });
        console.log(allergieData);
        await API.post('alergia/',allergieData).then((response)=>{
            if(response.status === 200){
                enqueueSnackbar('Alergia registrada',{variant:'success'});
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar alergia",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });
        }

    const createAllergies = async(userId) => {
        
        console.log('print allergie data ')
        allergies.map((allergie,id) =>{
            createAllergie(userId,parseInt(allergie.split(",")[0], 10));  
        }) 
    }

    const createUser = async (dateTaken) =>{
        setOpen(true);
        let userData =JSON.stringify({
            'nombre_usuario':user.name,
            'fecha_nacimiento':birth,
            'id_estilo_vida':parseInt(lifestyle,10),
            "registro_completo": 1,
            'correo':user.email,
            'sexo':gender
        });

        console.log('Print user data')
        console.log(userData)
        await API.post('user/',userData).then((response)=>{
            console.log(response)
            if(response.status === 201){
                console.log(response.data.id_usuario);
                let userId = response.data.id_usuario;
                console.log(userId);
                enqueueSnackbar('Usuario registrado con exito',{variant:'success'});
                createWeight(dateTaken,userId);
                createHeight(dateTaken,userId);
                createComorbidities(userId);
                createAllergies(userId);
                createRutine(userId);
                 //delete localstorage
            }else if(response.status === 422){
                enqueueSnackbar("Error al guardar usuario",{variant:'error'})
            }
        }).catch(error =>{
            var errorData = error.response.data["error"] ;
            enqueueSnackbar(errorData,{variant:'error'})
        });
    }

    const handleChangeLifeStyle = (event) =>{
        var aux = event.target.value.split(',')
        setLifestyle(aux[0]);
        setActivityFactor(parseFloat(aux[1]));
    }

    const handleChangeGoal = (event) =>{
        setGoal(event.target.value);
    }

    const handleChangeTerms = (event) =>{
        setSelected(event.target.checked);
    }
      
    const closeTerms = () =>{
        setSelected(true);
        handleCloseModalTerms();
    }

    const getDatewithFormat = () =>{
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10){
          return (`${year}-0${month}-${day}`)
        }else{
          return(`${year}-${month}-${day}`)
        }
    }


    const formik = useFormik({
        initialValues: {},
        onSubmit: async values => {
            var dateTaken = getDatewithFormat();
            if(lifestyle === '' ){
                setMessage("Selecciona un estilo de vida por favor");
                setError(true)
                setTimeout(() => setError(false),7000);
                return false;
            }else if(goal === ''){
                setMessage("Selecciona un objetivo por favor");
                setError(true)
                setTimeout(() => setError(false),7000);
                return false;
            }
            createUser(dateTaken);
            localStorage.clear();
            setTimeout(()=>window.location.href="./",4000);
              
        },

        
      });


    useEffect(() => {
        getLifestyle();
        getGoals();
    }, []);
    return ( <>
    <NavbarAll/>
    <h1 className="title">Objetivo</h1>
    <h1 className="title-secondary">Falta poco, cuéntanos cuál es tu objetivo nutricional</h1>

    <div className="allergies-container mb-4">
        <form className="form mt-0" onSubmit={formik.handleSubmit}>
        <div className="input-group mb-3">
            <span className="input-group-text"><SettingsAccessibilityIcon/></span>
            <select name="lifestyle" id="lifestyle" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handleChangeLifeStyle(e)} >
                <option value='placeholder'disabled>Con qué estilo de vida se siente mas identificado</option>
                {lifestyleData.map((lifestyle,id) =>(
                    <option key={id} value={[lifestyle.id_estilo,lifestyle.multiplicador]}>{lifestyle.nombre_estilo}</option>
                ))}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text"><EmojiEventsIcon/></span>
            <select name="goal" id="goal" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handleChangeGoal(e)}>
                <option value='placeholder'disabled>Indique cuál es su objetivo nutricional</option>
                {goalData.map((goal,id) =>(
                    <option key={id} value={goal.id_objetivo}>{goal.nombre_objetivo}</option>
                ))}
            </select>
        </div>

        <div>
            <FormControlLabel
                label="He leido y acepto terminos y condiciones"
                control={<Checkbox color="success" checked={selected} onChange={handleChangeTerms}/>} 
            /> 
            <a style={{color:"#FFC600"}} onClick={() => setShowModalTerms(true)}>de NutricionApp</a>
        </div>

        <div> 
            <button className="btn btn-success" type="submit" disabled={!selected}><SendIcon className="mr-1"/>Siguiente</button>
        </div>
        {error && <p className="error mt-2">{message}</p>} 
        </form>
    </div>

    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
    ></Backdrop>

    <Modal show={showModalTerms} onHide={handleCloseModalTerms}>
        <ModalHeader closeButton>
                <Modal.Title><HelpIcon/>Terminos y Condiciones</Modal.Title>
        </ModalHeader>
        <ModalBody>
            <Terms/>
        </ModalBody>
        <ModalFooter>
                <button className="btn btn-success" onClick={()=>closeTerms()}>Aceptar</button>
        </ModalFooter>
    </Modal>

    
    <Footer/>    
    </> );
}
 
export default Goal;