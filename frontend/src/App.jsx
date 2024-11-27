import { Routes, Route, Navigate, } from "react-router-dom"
import Login from "./component/Authentication/Login"
import Signup from "./component/Authentication/Signup"
import HomePage from "./component/Pages/Home/HomePage"
import Footer from "./component/Pages/Footer"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import WatchPage from "./component/Pages/WatchPage"

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
