import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBike from "./AddBike";
import Content from "./Content";
import ViewBike from "./ViewBike";
import ViewUsers from "./ViewUsers";
import Update from "./Update";
function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/content" element={<Content></Content>}></Route>
                <Route path="/addbike" element={<AddBike></AddBike>}></Route>
                <Route path="/viewbike" element={<ViewBike></ViewBike>}></Route>
                <Route path="/bikeupdate" element={<Update/>}></Route>
                <Route path="/viewuser" element={<ViewUsers></ViewUsers>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;