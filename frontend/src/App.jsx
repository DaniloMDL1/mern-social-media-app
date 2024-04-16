import { Routes, Route, Navigate } from "react-router-dom"
import HeaderLayout from "./layouts/HeaderLayout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import UserProfilePage from "./pages/UserProfilePage"
import CreatePostPage from "./pages/CreatePostPage"
import ChatPage from "./pages/ChatPage"
import { useSelector } from "react-redux"

const App = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={user ? <HomePage /> : <Navigate to={"/signin"}/>}/>
          <Route path="/update-profile" element={user ? <UpdateProfilePage /> : <Navigate to={"/signin"}/>}/>
          <Route path="/create-post" element={user ? <CreatePostPage /> : <Navigate to={"/signin"}/>}/>
          <Route path="/profile/:username" element={<UserProfilePage />}/>
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"}/>}/>
          <Route path="/signin" element={!user ? <SignInPage /> : <Navigate to={"/"}/>}/>
        </Route>
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to={"/signin"}/>}/>
      </Routes>
    </>
  )
}

export default App
