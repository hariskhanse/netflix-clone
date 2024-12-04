import Login from "./component/Authentication/Login"
import Signup from "./component/Authentication/Signup"
import HomePage from "./component/Pages/Home/HomePage"
import Footer from "./component/Pages/Footer"
import WatchPage from "./component/Pages/WatchPage"
import SearchPage from "./component/Pages/SearchPage"
import SearchHistoryPage from "./component/Pages/SearchHistoryPage"
import NotFoundPage from "./component/Pages/NotFoundPage"
import Profile from "./component/subscription/Profile"

import { Routes, Route, Navigate, } from "react-router-dom"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

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
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
        <Route path='/profile' element={user ? <Profile /> : <Navigate to={"/login"} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
