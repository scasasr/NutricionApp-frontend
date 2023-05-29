import React, {useEffect,useState} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import NavbarAll from "../components/Navbar.js";

import API from "../services/http-common.js";
import { useFormik } from 'formik';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SendIcon from '@mui/icons-material/Send';

import { Snackbar,Alert } from "@mui/material";

const Goal = () => {


    const {user,isAuthenticated} = useAuth0();

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [userId,setUserId] = useState('');
 

    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);


    const [goal,setGoal] = useState('');
    const [lifestyle,setLifestyle] = useState('');
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

    const handleChangeLifeStyle = (event) =>{
        setLifestyle(event.target.value);
        
    }

    const handleChangeGoal = (event) =>{
        setGoal(event.target.value);
    }

    const getDatewithFormat = () =>{
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10){
          return (`${day}-0${month}-${year}`)
        }else{
          return(`${day}-${month}-${year}`)
        }
    }


    const formik = useFormik({
        initialValues: {},
        onSubmit: values => {
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
            const userData =JSON.stringify({nombre_usuario:user.name,fecha_nacimiento:birth,id_estilo_vida:lifestyle}, null, 2);
            console.log(userData);
            API.post('user/',userData).then((response)=>{
                if(response.status === 201){
                    setUserId(response.data.id_usuario)
                }else if(response.status === 422){
                    setMessage("Error al guardar usuario");
                    setError(true)
                    setTimeout(() => setError(false),5000);
                    return false;
                }
            }).catch(error =>{
                var error_data = error.response.data["error"] ;
                setMessage(error_data);
                setError(true);
                setTimeout(() => setError(false),3000);
                return false;
            });
    
            const weightData =JSON.stringify({peso:weight,fecha_toma:dateTaken,id_usuario:userId}, null, 2);
            API.post('peso/',weightData).then((response)=>{
                if(response.status === 200){
                    console.log("weight:ok");
                }else if(response.status === 422){
                    setMessage("Error al guardar peso");
                    setError(true)
                    setTimeout(() => setError(false),5000);
                    return false;
                }
            }).catch(error =>{
                var error_data = error.response.data["error"] ;
                setMessage(error_data);
                setError(true);
                setTimeout(() => setError(false),3000);
                return false;
            });
    
            const heightData =JSON.stringify({estatura:height,fecha_toma:dateTaken,id_usuario:userId}, null, 2);
            API.post('estatura/',heightData).then((response)=>{
                if(response.status === 200){
                    console.log("height:ok");
                }else if(response.status === 422){
                    setMessage("Error al guardar estatura");
                    setError(true)
                    setTimeout(() => setError(false),5000);
                    return false;
                }
            }).catch(error =>{
                var error_data = error.response.data["error"] ;
                setMessage(error_data);
                setError(true);
                setTimeout(() => setError(false),3000);
                return false;
            });
    
            var comorbiditieData;
            comorbidities.map((comorbiditie,id) =>{
                comorbiditieData =JSON.stringify({id_usuario:userId,id_enfermedad:comorbiditie.split(",")[0]}, null, 2);
                API.post('enfermedad_usuario/',comorbiditieData).then((response)=>{
                    if(response.status === 200){
                        console.log("Comorbitie:ok");
                    }else if(response.status === 422){
                        setMessage("Error al guardar comorbiditie");
                        setError(true)
                        setTimeout(() => setError(false),5000);
                        return false;
                    }
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    setMessage(error_data);
                    setError(true);
                    setTimeout(() => setError(false),3000);
                    return false;
            });
            })
    
            var allergieData;
            allergies.map((allergie,id) =>{
                allergieData =JSON.stringify({id_usuario:userId,id_ingrediente:allergie.split(",")[0]}, null, 2);
                API.post('alergia/',allergieData).then((response)=>{
                    if(response.status === 200){
                        console.log("allergie:ok");
                    }else if(response.status === 422){
                        setMessage("Error al guardar alergia");
                        setError(true)
                        setTimeout(() => setError(false),5000);
                        return false;
                    }
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    setMessage(error_data);
                    setError(true);
                    setTimeout(() => setError(false),3000);
                    return false;
            });
            })
    
            setShowSendVerification(true);
            window.location.href="./recipes";
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

    <div className="allergies-container">
        <form className="form mt-0" onSubmit={formik.handleSubmit}>
        <div className="input-group mb-3">
            <span className="input-group-text"><SettingsAccessibilityIcon/></span>
            <select name="lifestyle" id="lifestyle" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handleChangeLifeStyle(e)} >
                <option value='placeholder'disabled>Con qué estilo de vida se siente mas identificado</option>
                {lifestyleData.map((lifestyle,id) =>(
                    <option key={id} value={lifestyle.id_estilo}>{lifestyle.nombre_estilo}</option>
                ))}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text"><EmojiEventsIcon/></span>
            <select name="allergie" id="allergie" className="form-control" aria-label="Default select example"
            defaultValue='placeholder' onChange={(e) => handleChangeGoal(e)}>
                <option value='placeholder'disabled>Indique cuál es su objetivo nutricional</option>
                {goalData.map((goal,id) =>(
                    <option key={id} value={goal.id_objetivo}>{goal.nombre_objetivo}</option>
                ))}
            </select>
        </div>

        <div> 
            <button className="btn btn-success" type="submit"><SendIcon className="mr-1"/>Siguiente</button>
        </div>
        {error && <p className="error mt-2">{message}</p>} 
        </form>
    </div>
    
    <Snackbar open={showSendVerification} autoHideDuration={6000} onClose={handleCloseSendVerification}>
        <Alert onClose={handleCloseSendVerification} severity="success" sx={{ width: '100%' }}>
            Guardado con exito!!
        </Alert>
    </Snackbar>
    </> );
}
 
export default Goal;