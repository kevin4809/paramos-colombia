import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ParamDetail from "./pages/ParamDetail";
import './css/Home.css'
import './css/ParamDetail.css'

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/param/:id" element={<ParamDetail />} />
        </Routes>

      </HashRouter>

    </div>
  );
}

export default App;
