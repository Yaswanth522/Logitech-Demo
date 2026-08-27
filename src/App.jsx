import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";

export default function App() {
  const { pathname } = useLocation();
  const isStandalonePage = pathname === "/login";

  return (
    <>
      <ScrollToTop />
      <ChatWidget />
      {!isStandalonePage && <Header />}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:slug" element={<Product />} />
        </Routes>
      </main>
      {!isStandalonePage && <Footer />}
    </>
  );
}
