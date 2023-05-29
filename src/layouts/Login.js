import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//React-Bootstrap-components
import Button from 'react-bootstrap/Button';

//Icons
import LockPersonIcon from '@mui/icons-material/LockPerson';

export const LoginButton = (label) => {
    const {loginWithRedirect} = useAuth0();
    return (  <>
    <Button className="mx-2" variant="success" onClick={() => loginWithRedirect()}><LockPersonIcon/>{label}</Button>
    </>);
}





 
