import React,{useState} from "react";
import {LoginButton} from "../layouts/Login.js";
import { useAuth0 } from "@auth0/auth0-react";
//React-Bootstrap-components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

//MUI components
import { Avatar,Stack,Divider, List,ListItem,ListItemButton,ListItemIcon, SwipeableDrawer} from "@mui/material";

//Icons
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddIcon from '@mui/icons-material/Add';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';


//Images 
import logo from "../assets/logo.png";

const NavbarAll = () => {

    const {logout,user,isAuthenticated} = useAuth0();
    const [openDrawer,setOpenDrawer] = useState(false);
    const handleCloseDrawer = () => setOpenDrawer(false);
    const handleShowDrawer = () => setOpenDrawer(true);
    const photo = user?.picture;
    return (<>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="./">
          <div className="d-flex">
            <img
              alt=""
              src={logo}
              width="50"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <h3 style={{color:"#198754",alignItems:"center"}}>NutricionApp</h3>
          </div>  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            {/* <Nav.Link href="/ingredients">Alimentos</Nav.Link> */}
            <Nav.Link href="/recipes">Recetas</Nav.Link>
            <Nav.Link href="/AboutUs">Nosotros</Nav.Link>
            <Nav.Link href="/legal">Terminos y condiciones</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <div>
              <Stack  className="row mr-4"spacing={2} border={0}>
                  <Avatar   border={0} spacing={2} style={{height:"3.5rem",width:"3.5rem"}}
                   alt={user?.name} 
                   src={photo}
                   onClick={handleShowDrawer}/>
              </Stack>

          </div>
          ):(
            <>
            {LoginButton("Iniciar sesión")}
            {/* <Button variant="outline-success" href="register"><HowToRegIcon/>Registrarse</Button> */}
            </>  
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* DRAWER START */}
    <SwipeableDrawer
        anchor={'right'}
        open={openDrawer}
        onClose={handleCloseDrawer}
        onOpen={handleShowDrawer}   
    >
        <div className="d-flex px-3">
            <div className="py-3 mx-2">
                <Avatar border={0} spacing={2}
                alt={user?.name} 
                src={photo}
                />
            </div>
            <div className="ml-2">
                <small className="pt-3">Hola</small>
                <h5 className="mt-0">{user?.name}</h5>
                <small className="mt-0">{user?.email}</small>
            </div>
        </div>
        <Divider/>
        <Divider/>
        <List>

          <ListItem key={'dailyProgress'} onClick={() => window.location.href ='dailyProgress'} disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <DonutLargeIcon className="mr-2"/>Progreso diario
            </ListItemIcon>
            </ListItemButton>
            </ListItem>

            <ListItem key={'CreateRecipe'} onClick={() => window.location.href ='CreateRecipe'} disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <AddIcon className="mr-2"/>Crear Receta 
            </ListItemIcon>
            </ListItemButton>
            </ListItem>

            <ListItem key={'suggestions'} disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <TipsAndUpdatesIcon className="mr-2"/>Sugerencias
            </ListItemIcon>
            </ListItemButton>
            </ListItem>

            <ListItem key={'account'} disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <ManageAccountsIcon className="mr-2"/>Mi cuenta
            </ListItemIcon>
            </ListItemButton>
            </ListItem>
            
            
            <ListItem className="LogOut"  key={'LogOut'} onClick={() => logout({logoutParams: { returnTo: window.location.origin }})} disablePadding>
            <ListItemButton>
            <ListItemIcon>
                <ExitToAppIcon  className="mr-2"/> Cerrar sesión
            </ListItemIcon>
            </ListItemButton>
            </ListItem>
        
            
            
        </List>
    </SwipeableDrawer>
        {/* DRAWER END */}

    </>);
}
 
export default NavbarAll;