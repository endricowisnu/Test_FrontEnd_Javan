import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeneratorUser } from "./GeneratorUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneratorUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;