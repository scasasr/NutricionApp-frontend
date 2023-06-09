import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./layouts/Main.js";
import AllergiesComorbidities from "./layouts/Allergies-Comorbidities.js";
import Goal from "./layouts/Goal.js";
import Recipes from "./layouts/Recipes/Recipes.js";
import UserView from "./layouts/UserView";
import AboutUs from "./layouts/AboutUs.js";
import Legal from "./layouts/Legal.js";
import Recipe_register from "./layouts/CreateRecipe/Recipe-register.js";
import PreparationIngredients from "./layouts/CreateRecipe/PreparationAndIngredients.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={4}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/allergies-comorbidities' element={
            <ProtectedRoute>
              <AllergiesComorbidities/>
            </ProtectedRoute>
          }/>
          <Route path='/select-goal' element={
            <ProtectedRoute>
              <Goal/>
            </ProtectedRoute>
          }/>
          <Route path='/recipes' element={<Recipes/>}/>
          <Route path='/dailyProgress' element={<UserView/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/legal' element={<Legal/>}/>
          <Route path='/CreateRecipe' element={<Recipe_register/>}/>
          <Route path='/finishRecipe' element={<PreparationIngredients/>}/>
        </Routes>
        </BrowserRouter>
      </SnackbarProvider>  
    </div>
  );
}

export default App;
