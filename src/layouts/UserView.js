import React,{useState, useEffect} from "react";

import style from "../layouts/Recipes/style.module.scss"

import Button from 'react-bootstrap/Button';

import NavbarAll from "../components/Navbar.js";
import ProgressBar from "../components/progressBar/ProgressBar.js";

import Divider from '@mui/material/Divider';

import AddIcon from '@mui/icons-material/Add';
import API from "../services/http-common.js";



const UserView = () =>{

    const [sum, setSum] = useState(0)
    const [progress,setProgress] = useState(0);
    const [goal,setGoal] =useState(2500);
    const [desayuno, setDesayuno] = useState([]);
    const [almuerzo, setAlmuerzo] = useState([]);

 
    const state =  {
        size :250,
        goal :goal,
        progress:sum,
        strokeWidth:15,
        circleOneStroke: '#D1f8cf',
        circleTwoStroke: '#198754'
    }

    const getDesayuno=async () =>{
        return await API.get('/receta/tipo_comida/Desayuno').then((response)=>{
            setDesayuno(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        });
        
    }
    
    const getAlmuerzo=async () =>{
        return await API.get('/receta/tipo_comida/Almuerzo').then((response)=>{
            setAlmuerzo(JSON.parse(JSON.stringify(response.data)));
        }).catch((error)=>{
            console.log(error);
        });
        
    }

    const onChangeProgress = (event) =>{
        if(event.target.value){
            let progressAux= parseInt(event.target.value, 10);
            if(progressAux>goal){
                progressAux = goal;
            }
            setProgress(progressAux);
        }else{
            setProgress(0);
        }
    }

    const sumProgress = () =>{
        setSum(sum+progress);
        document.getElementById("progress-bar").value = "";
    }


    useEffect(() => {
        getDesayuno();
        getAlmuerzo();
      }, []);

    return(
        <>
        <NavbarAll/>
        <div> 
            <ProgressBar {... state }/>
            <div className="progress-bar-container">
                <div className="principal">
                    <p>
                        <input
                            type="text"
                            id="progress-bar"
                            name="progress-bar"
                            placeholder="Agrega la cantidad de calorias consumidas"
                            onChange={(e) => onChangeProgress(e)}
                        />
                    </p>
                    <p>
                        <Button variant="success" onClick={() => sumProgress()}><AddIcon/>Agregar</Button>
                    </p>

                    <h2 className="title-secondary">Desayuno</h2>
                    {desayuno.map((recipe,i) =>(     
                        <div key={i} className={style.product}>
                                    <img src={recipe.url_imagen} alt={recipe.nombre_receta} width="250" height="200"/>
                                    <>
                                    <div>
                                        <p>{recipe.nombre_receta} - {recipe.tipo_comida}</p>
                                    </div>
                                    <a>Agregar</a>
                                    </>
                                </div> 
                            ))}
                        </div> 
                </div>  
        </div>

        <Divider/>
        
        </>
       
    )

}

export default UserView;