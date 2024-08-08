import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./assets/pages/Form";
import Tab from "./assets/pages/Tab";
import Error from "./assets/pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/Tab" element={<Tab />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
