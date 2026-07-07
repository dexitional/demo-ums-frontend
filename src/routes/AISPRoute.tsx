import React from 'react';
import AISPLayout from '../components/aisp/AISPLayout';
import AISPPager from '../components/aisp/AISPPager';
import PgAISPDash from '../pages/aisp/PgAISPDash';
import PgAISPFees, { loader as aispFeesLoader } from '../pages/aisp/PgAISPFees';
import PgAISPNotices, { loader as nssNoticesLoader } from '../pages/aisp/PgAISPNotices';
import PgAISPPasswordForm, { action as nssPasswordFormAction } from '../pages/aisp/PgAISPPasswordForm';
import PgAISPProfile, { loader as aispProfileLoader } from '../pages/aisp/PgAISPProfile';
import PgAISPProfileForm, { action as aispProfileAction, loader as aispProfileFormLoader } from '../pages/aisp/PgAISPProfileForm';
import PgAISPRegistrations, { loader as aispRegistrationsLoader } from '../pages/aisp/PgAISPRegistrations';
import PgAISPResults, { loader as aispResultsLoader } from '../pages/aisp/PgAISPResults';
import PgAISPService, { loader as nssServiceLoader } from '../pages/aisp/PgAISPService';
import PgAISPServiceForm, { action as nssServiceFormAction, loader as nssServiceFormLoader } from '../pages/aisp/PgAISPServiceForm';
import PgAISPServices, { loader as nssServicesLoader } from '../pages/aisp/PgAISPServices';
import PgCourseEvaluation, { loader as aispEvaluationsLoader } from '../pages/eva/PgCourseEvaluation';

import { useUserStore } from '../utils/authService';

const user = useUserStore.getState().user
const dricRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'dric')

const AISRoute:any =  {
   path: "aisp",
   element: <AISPLayout />,
   //action: chosenAction,
   children: [
      {  element: <AISPPager />,
         children: [
            {  
               path:'dash',
               element: <PgAISPDash />, 
               loader: null,
            }
         ] 
      },
      
      // Profile
      {  path:'profile', 
         element: <PgAISPProfile />,
         loader: aispProfileLoader,
         index:true
      },
      { 
         path:'profile/:profileId/edit', 
         element: <PgAISPProfileForm />, 
         loader: aispProfileFormLoader,
         action: aispProfileAction
      },

      // Notices
      {  path:'notices', 
         element: <PgAISPNotices />,
         loader: nssNoticesLoader,
      },
      
      // Fees & Charges
      {  path:'fees', 
         element: <PgAISPFees />,
         loader: aispFeesLoader,
      },
      
      // Results
      {  path:'results', 
         element: <PgAISPResults />,
         loader: aispResultsLoader,
      },
      
       // Registrations
      {  path:'registration', 
         element: <PgAISPRegistrations />,
         loader: aispRegistrationsLoader,
      },

      // Registrations
      {  path:'evaluation', 
         element: <PgCourseEvaluation />,
         loader: aispEvaluationsLoader,
      },


      // Services
      {  path:'services', 
         element: <PgAISPServices />,
         loader: nssServicesLoader,
      },
      { 
         path:'services/:transwiftId', 
         element: <PgAISPService />,
         loader: nssServiceLoader
      },
      { 
         path:'services/create', 
         element: <PgAISPServiceForm />,
         loader: nssServiceFormLoader,
         action: nssServiceFormAction
      },
      { 
         path:'services/:transwiftId/edit/', 
         element: <PgAISPServiceForm />, 
         loader: nssServiceFormLoader,
         action: nssServiceFormAction
      },
      { 
         path:'services/:transwiftId/destroy', 
         //action: lasRolesDestroy,
      },

      // Password Change
      {  path:'changepwd', 
         element: <PgAISPPasswordForm />,
         action: nssPasswordFormAction
      },
      

   ]
}

export default AISRoute