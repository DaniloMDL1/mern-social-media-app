import { Routes, Route, Navigate } from "react-router-dom"
import HeaderLayout from "./layouts/HeaderLayout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import UserProfilePage from "./pages/UserProfilePage"
import CreatePostPage from "./pages/CreatePostPage"
import ChatPage from "./pages/ChatPage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setOnlineUsers, setSocket } from "./redux/socket/socketSlice"
import io from "socket.io-client"

const App = () => {
  const { user } = useSelector((state) => state.user)
  const { socket } = useSelector((state) => state.socket)

  const dispatch = useDispatch()

  useEffect(() => {
    if(user) {
      const socketInstance = io("https://social-media-app-bv78.onrender.com", {
        query: {
          userId: user._id
        }
      })
  
      dispatch(setSocket(socketInstance))
    } else {
      socket?.close()
      dispatch(setSocket(null))
    }
  }, [dispatch, setSocket, user])

  useEffect(() => {
    if(user) {
      socket?.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })
    }
  }, [socket, dispatch, setOnlineUsers, user])

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
