import { Routes, Route } from "react-router-dom"
import Login from "./component/Authentication/Login"
import Signup from "./component/Authentication/Signup"
import HomePage from "./component/Pages/Home/HomePage"
import Footer from "./component/Pages/Footer"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
