import React from 'react'

import Login from '../pages/Login';

import { useUserStore } from '../utils/authService';
import { Navigate } from 'react-router';
import PgCourseEvaluation from '../pages/eva/PgCourseEvaluation';

const user = useUserStore.getState().user
const isAuthenticated = useUserStore.getState().isAuthenticated

const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')
const lasRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'las')

const PublicRoute:any =   [
    { 
      path:'/aisp/evaluation',
      element: <div>test</div>,
      children: [
         {
            element: <PgCourseEvaluation />,
            // loader: evaFormLoader,
            // action: evaFormAction,
            index: true 
         },
         {  path:'/:courseId', 
            element: <PgCourseEvaluation />, 
            // loader: evaFormLoader,
            // action: evaFormAction,
         },
      ]
    },
    
]

export default PublicRoute