import React, {useEffect, useState} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import API from "../services/http-common.js"

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Tooltip } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BoltIcon from '@mui/icons-material/Bolt';



const FAB = () => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const {user,isAuthenticated} = useAuth0();
    const [showTips, setShowTips] = useState(false);
    const [tip,setTip] = useState('');
    const [tipData,setTipData] = useState([]);

    const getUserId = async() =>{
        await API.get('/user/correo/'+user.email).then((response)=>{
            if(response.status === 200){
                getGoalId(response.data.id_usuario);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getGoalId = async (userId) =>{
        await API.get('/rutinas/'+userId).then((response)=>{
            if(response.status === 200){
                getTipData(response.data[0].objetivo.id_objetivo);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getTipData = async (goalId) =>{
        await API.get('/tip/'+goalId).then((response)=>{
            if(response.status === 200){
                setTipData(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    

    const toggleTips = () => {
      setTip((tipData[Math.floor(Math.random() * tipData.length)]).tip)
      setShowTips(true);
      setTimeout(()=>setShowTips(false),4000);
    };

    useEffect(() => {
        getUserId();
    },);



    return (
        <>
        {isAuthenticated ?(
            <div>
                <Box sx={{position:"fixed",bottom:50 ,left:16 }}>
                    <Tooltip title='Tip objetivo'>
                        <Fab color="success" aria-label="Tip" onClick={toggleTips}>
                            <BoltIcon />
                        </Fab>
                    </Tooltip>
                </Box>
                <Snackbar  anchorOrigin={{vertical:'top', horizontal:'left'}} open={showTips} autoHideDuration={4000} onClose={() => setShowTips(false) }>
                    <Alert onClose={() => setShowTips(false)} severity="success" sx={{ width: '100%' }}>
                        {tip}
                    </Alert>
                </Snackbar>
            </div>
            
            
            ):(<></>)}
        </>  
    );
}
 
export default FAB;