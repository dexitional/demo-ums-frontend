import React from 'react'

import Login from '../pages/Login';
import NSSSiteLayout from '../components/nss/NSSSiteLayout';
import PgNSSRegisterForm, { loader as nssFormLoader, action as nssFormAction } from '../pages/nss/PgNSSRegisterForm';
import PgNSSRegisterDone, { loader as nssRegisterLoader } from '../pages/nss/PgNSSRegisterDone';

import { useUserStore } from '../utils/authService';
import { Navigate } from 'react-router';

const user = useUserStore.getState().user
const isAuthenticated = useUserStore.getState().isAuthenticated

const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')
const lasRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'las')

const PublicRoute:any =   [
    { 
      path:'/register/nss',
      element: <NSSSiteLayout />,
      children: [
         {
            element: <PgNSSRegisterForm />,
            loader: nssFormLoader,
            action: nssFormAction,
            index: true 
         },
         {  path:':pin', 
            element: <PgNSSRegisterDone />, 
            loader: nssRegisterLoader,
         },
      ]
    },
]

export default PublicRoute