import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Transaction from './pages/transaction/transaction'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:hotelId" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
