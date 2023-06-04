import React,{useState, useEffect} from "react";

import style from "./style.module.scss"

import { useAuth0 } from "@auth0/auth0-react";

import NavbarAll from "../components/Navbar.js";
import Footer from "../components/footer.js";
import ProgressBar from "../components/progressBar/ProgressBar.js";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Divider } from "@mui/material";


import AddIcon from '@mui/icons-material/Add';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import API from "../services/http-common.js";


const UserView = () =>{

    const {user} = useAuth0();
    const [progress,setProgress] = useState(0);
    const [userId,setUserId] =useState();
    const [goal,setGoal] =useState();

    const [weight,setWeight] = useState(0);
    const [height,setHeight] = useState(0);
    const [imc,setImc] = useState(0);
    const [foodData, setFoodData] = useState([]);

    
    const [foodType, setFoodType] = useState('Desayuno');

    const handleChangeFood = (event, newTypeFood) =>{
        setFoodType(newTypeFood); 
    }

    const state= {
        size :250,
        goal :goal,
        progress:progress,
        strokeWidth:15,
        circleOneStroke: '#D1f8cf',
        circleTwoStroke: '#198754'
    };


    const getUserData = async () => {
        let email  = user.email;
        return await API.get('user/correo/'+ email).then((response) => {
            setUserId(JSON.parse(JSON.stringify(response.data)).id_usuario);
        }).catch((error) =>{
            console.log(error);
        });
    }

    const getWeight = async (user) =>{
        return await API.get('peso/'+user).then((response) => {
            setWeight(JSON.parse(JSON.stringify(response.data))[0].peso);
        }).catch((error) =>{
            console.log(error);
        });
    }

    const getHeight = async (user) =>{
        return await API.get('estatura/'+user).then((response) => {
            setHeight(JSON.parse(JSON.stringify(response.data))[0].estatura);
        }).catch((error) =>{
            console.log(error);
        });  
    }

    const getGoal = async (user) => {
        return await API.get('rutinas/'+user).then((response) => {
            setGoal(parseFloat(JSON.parse(JSON.stringify(response.data))[0].calorias_diarias));
        }).catch((error) =>{
            console.log(error);
        });  
    }

    const getFoodData = async () =>{
        console.log(foodType)
        return await API.get('/receta/tipo_comida/'+foodType).then((response)=>{
            setFoodData(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        });
    }

    // const onChangeProgress = (event) =>{
    //     if(event.target.value){
    //         let progressAux= parseInt(event.target.value, 10);
    //         if(progressAux>goal){
    //             progressAux = goal;
    //         }
    //         setProgress(progressAux);
    //     }else{
    //         setProgress(0);
    //     }
    // }

    const sumProgress = (recipe) =>{
        setProgress(progress+ parseFloat(recipe.cantidad_calorias));
        document.getElementById("progress-bar").value = "";
    }


    useEffect(() => {
        getUserData();
        getGoal(userId)
        getWeight(userId);
        getHeight(userId);
        setImc(parseInt(parseInt(weight,10)/(Math.pow((parseInt(height,10)/100),2))),10);
        getFoodData();
      },[]);

    useEffect(() => {
        getFoodData();
      },foodType);

    return(
        <>
        <NavbarAll/>
        <div> 
            <ProgressBar {...state}/>

            <div className="d-flex justify-content-around align-items-center" style={{backgroundColor:"#FDEBD0"}}>
                <div className="d-flex flex-column mt-2 mb-2 userView-container">
                    <h4 style={{color:"#DC7633"}}>{weight}</h4>
                    <MonitorWeightIcon  sx={{ fontSize: 45, color:"#198754" }}/>
                    <h5 style={{color:"#DC7633"}}>Peso</h5>

                </div>
                <div className="d-flex flex-column mt-2 mb-2 userView-container">
                    <h4 style={{color:"#DC7633"}}>{height}</h4>
                    <AccessibilityIcon  sx={{ fontSize: 45, color:"#198754" }}/>
                    <h5 style={{color:"#DC7633"}}>Talla</h5>
                </div>
                <div className="d-flex flex-column mt-2 mb-2 userView-container">
                    <h4 style={{color:"#DC7633"}}>{imc}</h4>
                    <FitnessCenterIcon sx={{ fontSize: 45, color:"#198754" }}/>
                    <h5 style={{color:"#DC7633"}}>IMC</h5>
                </div>   
            </div>
        
           <div className="mt-4 mb-4">
           <ToggleButtonGroup
                color="primary"
                value={foodType}
                exclusive
                onChange={handleChangeFood}
                aria-label="Platform"
                >
                <ToggleButton value="Desayuno"><Brightness5Icon/>Desayuno</ToggleButton>
                <ToggleButton value="Almuerzo"><Brightness6Icon/>Almuerzo</ToggleButton>
                <ToggleButton value="Cena"><NightlightIcon/>Cena</ToggleButton>
                <ToggleButton value="Merienda"><HourglassBottomIcon/>Merienda</ToggleButton>
            </ToggleButtonGroup>
           </div>
           <Divider/>
           
           <div className="mb-5">
           {foodData.map((item,id) =>(
                <div className={style.cartItem}>
                    <img src={item.url_imagen} alt={item.nombre_receta}/>
                    <div className={style.dataContainer}>
                        <div className={style.left}>
                            <p> {item.nombre_receta} - Calorias: {item.cantidad_calorias}</p>
                            <div className={style.buttons}>
                                <button  onClick={()=> sumProgress(item)}>AGREGAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

           </div>
            


        </div>
        <Divider/>
        
        <Footer/>
        
        </>
       
    )

}

export default UserView;