import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import { getInitializedStatus, getLoggedInStatus } from './Redux/AuthDataSelectors';
import { connect } from 'react-redux';
import { authUserThunkCreator } from './Redux/AuthDataReducer';
import React, { Suspense, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from './Redux/Store';
import Header from './components/Header/Header';
import { ChatSlideOver } from './components/ChatSlideOver/ChatSlideOver';

const MainPage = React.lazy(() => import('./components/MainPage/MainPage'))
const Login = React.lazy(() => import('./components/Login/Login'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'))
const ChatContainer = React.lazy(() => import('./components/Chat/ChatContainer'))

function App() {
  const dispatch = useAppDispatch()
  //global state
  const isInitialized = useAppSelector(state => getInitializedStatus(state))
  const isLoggedIn = useAppSelector(state => getLoggedInStatus(state))
  //mapDTP
  const authUser = () => dispatch(authUserThunkCreator())

  useEffect(() => {
    authUser()
  })

  if(!isInitialized) return (<div></div>)
  return (
    <div className="App">
      <Header/>
      <Navigation/>
      <ChatSlideOver/>
      <div className='Wrapper'>
        <Routes>
          <Route path="/" element={<Suspense fallback={<></>}><MainPage/></Suspense>}></Route>
          <Route path="/Login" element={<Suspense fallback={<></>}><Login/></Suspense>}></Route>
          <Route path="/Profile/" element={<Suspense fallback={<></>}><ProfileContainer isLoggedIn={isLoggedIn}/></Suspense>}>
            <Route path=":userID/" element={<Suspense fallback={<></>}><ProfileContainer isLoggedIn={isLoggedIn}/></Suspense>}></Route>
          </Route>
          <Route path="/Friends/" element={<Suspense fallback={<></>}><FriendsContainer isLoggedIn={isLoggedIn}/></Suspense>}></Route>
          <Route path="/Chat" element={<Suspense fallback={<></>}><ChatContainer isLoggedIn={isLoggedIn}/></Suspense>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
