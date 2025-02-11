import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Websites from "./pages/Websites";
import Subscription from "./pages/Subscription";
import More from "./pages/More";
import { SharedStateProvider } from "./SharedStateProvider";
import "./App.css";
import CurrencyConverter from "./pages/CurrencyConvert";

function App() {
  return (
    <BrowserRouter>
      <SharedStateProvider>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/more" element={<More />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
          </Routes>
        </Layout>
      </SharedStateProvider>
    </BrowserRouter>
  );
}

export default App;
