import "./App.css";
import Home from "./component/Home";
import Header from "./component/Header";
import MyLoan from "./component/MyLoan";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan" element={<MyLoan />} />
      </Routes>
    </Router>
  );
}

export default App;
