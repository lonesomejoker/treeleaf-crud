import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import App from "../App";
import Profiles from "../pages/Profiles";

export const MainRouter=createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<UserLayout/>}>
            <Route index element={<App/>}/>
            <Route path="profile" element={<Profiles/>}/>
            </Route>
        </Route>
    )
)