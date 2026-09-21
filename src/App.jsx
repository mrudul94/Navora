import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ForBusiness from "./pages/ForBusiness";
import ResponsibleSourcing from "./pages/ResponsibleSourcing";
import Contact from "./pages/Contact";
import PrivacyNotice from "./pages/PrivacyNotice";
import CookieNotice from "./pages/CookieNotice";
import WebsiteTerms from "./pages/WebsiteTerms";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/for-business" element={<ForBusiness />} />
        <Route path="/responsible-sourcing" element={<ResponsibleSourcing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-notice" element={<PrivacyNotice />} />
        <Route path="/cookie-notice" element={<CookieNotice />} />
        <Route path="/website-terms" element={<WebsiteTerms />} />

        {/* Legacy URLs from the previous site, kept so inbound links and the
            broken /c route reported before handover do not 404. */}
        <Route path="/sustainability" element={<Navigate to="/responsible-sourcing" replace />} />
        <Route path="/wholesale" element={<Navigate to="/for-business" replace />} />
        <Route path="/privacy-policy" element={<Navigate to="/privacy-notice" replace />} />
        <Route path="/terms-conditions" element={<Navigate to="/website-terms" replace />} />
        <Route path="/c" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
