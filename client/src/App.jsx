import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/unauth/landing';
import ErrorPage from './pages/unauth/error';
import axios from 'axios'
import ServerErrorPage from './pages/unauth/serverErr';
import SignInPage from './pages/unauth/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/servererr',
    element: <ServerErrorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: 'signin',
    element: <SignInPage />,
    errorElement: <ErrorPage />
  }
])

function App() {
  const [csrfToken, setCsrfToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  axios.defaults.withCredentials = true

  useEffect(() => {
    if(window.location.pathname !== '/servererr') {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/csrf-token`)
      .then(res => {
        setCsrfToken(res.data.csrfToken)
      })
      .catch(err => {
        window.location.pathname ='/servererr'
      })
    }
  }, [])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
