import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/About Us/AboutUs";
import Properties from "./pages/Product/Properties";
import PropertiesSale from "./pages/Product/PropertiesSale/PropertiesSale";
import PropertiesLease from "./pages/Product/PropertiesLease/PropertiesLease";
import PropertiesDetail from "./pages/Product/PropertiesDetail";
import VillaSale from "./pages/Product/PropertiesSale/VillaSale"
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          {/* DONE */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/aboutus" element={<AboutUs/>}/>
          <Route exact path="/properties" element={<Properties/>}/>
          <Route exact path="/propertiessale" element={<PropertiesSale/>}/>
          <Route exact path="/propertieslease" element={<PropertiesLease/>}/>
          <Route exact path="/propertiesdetail/:id" element={<PropertiesDetail/>}/>
          <Route exact path="/villasale" element={<VillaSale/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;

