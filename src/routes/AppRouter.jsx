import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import CategoryDetails from "../pages/CategoryDetails";
import ServiceDetails from "../pages/ServiceDetails";
import Search from "../pages/Search";
import RegisterService from "../pages/RegisterService";
import NotFound from "../pages/NotFound";
import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import RegistrationRequests from "../admin/RegistrationRequests";
import Advertise from "../pages/Advertise";
import More from "../pages/More";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import About from "../pages/About";
import Splash from "../pages/Splash";
import AdsManagement from "../admin/AdsManagement";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
     <Route
  path="/"
  element={<Splash />}
/>

<Route
  path="/home"
  element={<Home />}
/>
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route
  path="/admin/ads"
  element={<AdsManagement />}
/>
        <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

<Route
  path="/privacy"
  element={<Privacy />}
/>

<Route
  path="/terms"
  element={<Terms />}
/>
        <Route path="/category/:categoryId" element={<CategoryDetails />} />
        <Route path="/more" element={<More />} />
        <Route
  path="/advertise"
  element={<Advertise />}
/>
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/requests"
  element={<RegistrationRequests />}
/>
        <Route path="/register-service" element={<RegisterService />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
