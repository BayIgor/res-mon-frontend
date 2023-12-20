import SignUpInPage from "./components/auth/SignUpInPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmailEnterPage from "./components/passwordRecovery/EmailEnterPage";
import PasswordResetPage from "./components/passwordRecovery/PasswordResetPage";
import Dashboard from "./scenes/dashboard/dashboard";
import MainBar from "./scenes/global/MainBar";
import Measurements from "./scenes/mesurements/measurements";
import Meters from "./scenes/meters/meters";
import Archive from "./scenes/archive/archive";
import FAQ from "./scenes/faq/faq";



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account" element={<><SignUpInPage/></>}/>
                <Route path="/forgot_password" element={<><EmailEnterPage/></>}/>
                <Route path="/reset_password" element={<><PasswordResetPage/></>}/>
                <Route path="/main" element={<><MainBar contentComponent={<Dashboard/>}/></>}/>
                <Route path="/meters" element={<><MainBar contentComponent={<Meters/>}/></>}/>
                <Route path="/measurements" element={<><MainBar contentComponent={<Measurements/>}/></>}/>
                <Route path="/archive" element={<><MainBar contentComponent={<Archive/>}/></>}/>
                <Route path="/faq" element={<><MainBar contentComponent={<FAQ/>}/></>}/>
            </Routes>
        </Router>
    );
};

export default App;