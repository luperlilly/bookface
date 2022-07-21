import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import { 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom"
import { useSelector } from "react-redux"

const App = () => {
  const user = useSelector((state) => state.authReducer.authData)

  return (
    <>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Login /> } />
        <Route path="/home" element={ user ? <Home /> : <Navigate to='../login' /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App

