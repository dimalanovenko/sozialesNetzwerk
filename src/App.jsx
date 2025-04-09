import {useEffect} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import ChangeProfile from "./pages/ChangeProfile.jsx";
import Nav from "./components/Nav.jsx";
import Feed from "./pages/Feed.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import UserList from "./pages/UserList.jsx";
import User from "./pages/User.jsx";
import Transaction from "./pages/Transaction.jsx";

function App() {
    const navigate = useNavigate();

    const location = useLocation();
    const hideNavPaths = ['/auth'];

    useEffect(() => {
        console.log("Текущий путь:", location.pathname);
        if (location.pathname === "/") {
            navigate("/auth");
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Feed/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/feed" element={<Feed />}>
                    <Route path=":username" element={<User/>}/>
                </Route>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/change_profile" element={<ChangeProfile/>}/>
                <Route path="/search" element={<UserList/>}/>
                <Route path="/search/:username" element={<User/>}/>
                <Route path="/transaction" element={<Transaction/>}/>
            </Routes>
            {!hideNavPaths.includes(location.pathname) && <Nav/>}
        </>
    )
}

export default App
