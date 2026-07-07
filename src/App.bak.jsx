import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
const Home = lazy(() => import('./pages/Home'));

import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
import AISPRoute from './routes/AISPRoute';
import AISRoute from './routes/AISRoute';
import AMSPRoute from './routes/AMSPRoute';
import AMSRoute from './routes/AMSRoute';
import EVSRoute from './routes/EVSRoute';
import FMSRoute from './routes/FMSRoute';
import PrintRoute from './routes/PrintRoute';
import { useUserStore } from './utils/authService';

function App() {
  
  const { isAuthenticated, user } = useUserStore(state => state);
  const router = createBrowserRouter([
         
    // Public Routes
    // { path: "/", element: <Navigate to={{ pathname: isAuthenticated() ? '/dash' : '/login' }} replace />,  },
    { path: "/", element: <Navigate to={{ pathname: '/dash' }} replace />,  },
    // { path: "/login", element: isAuthenticated() ? user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/evs/dash'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Navigate to={{ pathname:'/dash'}} replace /> : <Login /> },

    /*
    //  Maintenance Mode
    { path: "/login", element: isAuthenticated() ? user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/aisp/profile'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Navigate to={{ pathname:'/dash'}} replace /> : <Maintenance /> },
    { path: "/admin", element: isAuthenticated() ? user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/aisp/profile'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Navigate to={{ pathname:'/dash'}} replace /> : <Login /> },
    */

    // Live Mode
    { path: "/login", element: isAuthenticated() ? user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/aisp/profile'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Navigate to={{ pathname:'/dash'}} replace /> : <Login /> },
    // Protected Routes
    { 
      element: isAuthenticated() ? <Outlet/> : <Navigate to={{ pathname:'/login'}} replace />,
      children:[
        //  { path: "dash", element: user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/evs/dash'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Suspense fallback={<Loader/>}><Home /></Suspense> },
         { path: "dash", element: user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/aisp/profile'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Suspense fallback={<Loader/>}><Home /></Suspense> },
         /* ADMISSION PORTAL ROUTE */
         {...AMSPRoute },
         /* STUDENT PORTAL ROUTE */
         {...AISPRoute },
         /* ADMISSION SYSTEM ROUTE */
         {...AMSRoute },
         /* ACADEMIC SYSTEM ROUTE */
         {...AISRoute },
         /* FINANCE SYSTEM ROUTE */
         {...FMSRoute },
         /* ELECTA SYSTEM ROUTE */
         {...EVSRoute },
         /* PRINT LAYOUT & ROUTE */
         {...PrintRoute },
      ]
    },
    { path: "*", element: isAuthenticated() ? <Navigate to={{ pathname:'/dash'}} replace /> : <Navigate to={{ pathname:'/login'}} replace /> },
  ]
);

  return (
     <>
        <Toaster />
        <RouterProvider router={router} />
     </>
   );
}

export default App;
