import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/unauth/landing';
import ErrorPage from './pages/unauth/error';
import axios from 'axios'
import ServerErrorPage from './pages/unauth/serverErr';
import SignInPage from './pages/unauth/login';
import SignUpPage from './pages/unauth/signup';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/auth/dashboard';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

function App() {
  const [user, setUser] = React.useState('loading')
  axios.defaults.withCredentials = true

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage user={user} />,
      errorElement: <ErrorPage />
    },
    {
      path: '/servererr',
      element: <ServerErrorPage />,
      errorElement: <ErrorPage />
    },
    {
      path: 'signin',
      element: <SignInPage  user={user}/>,
      errorElement: <ErrorPage />
    },
    {
      path: 'signup',
      element: <SignUpPage user={user} />,
      errorElement: <ErrorPage />
    
    },
    {
      path: 'dash',
      element: <DashboardPage user={user} />,
      errorElement: <ErrorPage />
    }
  ])

   const fetchAndSetCsrfToken = () => {
    if(window.location.pathname !== '/servererr') {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/csrf-token`)
      .then((response) => {
        const csrfToken = response.data.csrfToken;
        axios.defaults.headers.common['CSRF-Token'] = csrfToken;
      })
      .catch((error) => {
        console.error('Could not fetch CSRF token', error);
        window.location.pathname = '/servererr'
      });
    }
  };

  useEffect(() => {
    fetchAndSetCsrfToken();

    const axiosInterceptor = axios.interceptors.response.use(
      response => {
        const { method } = response.config;
        if (['post', 'put', 'delete', 'patch'].includes(method)) {
          fetchAndSetCsrfToken();
        }
        return response;
      }, error => {
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`)
    .then((res) => {
      setUser(res.data.authenticated ? res.data.user : null)
    })
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
