import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./layouts/Main.js";
import AllergiesComorbidities from "./layouts/Allergies-Comorbidities.js";
import Goal from "./layouts/Goal.js";
import Recipes from "./layouts/Recipes/Recipes.js";
import UserView from "./layouts/UserView";
import { ProtectedRoute } from "./components/ProtectedRoute.js";

function App() {
  return (
    <div className="App">
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
       </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
