import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "L I V E A Q I";
      default:
        return "LiveAQI";
    }
  };
  return (
    <HelmetProvider>
      <div className="bg-gradient-to-b from-slate-800 from-5% via-slate-700 via-30% to-slate-700 to-100%">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default App;
