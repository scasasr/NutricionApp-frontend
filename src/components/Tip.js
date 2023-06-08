import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import BoltIcon from '@mui/icons-material/Bolt';

const FAB = () => {
    const {user,isAuthenticated} = useAuth0();
    return (
        <>
        {isAuthenticated ?(
            <Box sx={{ position:"fixed",bottom:50 ,left:16 }}>
                <Fab color="success" aria-label="Tip">
                    <BoltIcon />
                </Fab>
            </Box>
            ):(<></>)}
        </>  
    );
}
 
export default FAB;