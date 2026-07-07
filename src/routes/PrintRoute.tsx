import React from 'react';

import PrintAdmissionSlip, { loader as printAdmissionLoader } from '../components/print/PrintAdmissionSlip';
import PrintLayout from '../components/print/PrintLayout';
import PrintRegisterSlip, { loader as printRegLoader } from '../components/print/PrintRegisterSlip';
import PrintTranscript, { loader as printTranscriptLoader } from '../components/print/PrintTranscript';
import { useUserStore } from '../utils/authService';
import PrintEvaluation, { loader as printEvalLoader} from '../components/print/PrintEvaluation';

const user = useUserStore.getState().user
const isAuthenticated = useUserStore.getState().isAuthenticated

const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')
const amsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'ams')

const PublicRoute:any =   {
   path: "print",
   element: <PrintLayout />,
   children: [
      // Registration Slip
      {  path:'registration', 
         element: <PrintRegisterSlip />,
         loader: printRegLoader
      },
      {  path:'registration/:registrationId', 
         element: <PrintRegisterSlip />,
         loader: printRegLoader
      },
      
      // Admission Slip
      {  path:'admission', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },
      {  path:'admission/:voucherId', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },

      // Transwift
      {  path:'transwift/:studentId/statement', 
         element: <PrintTranscript />,
         loader: printTranscriptLoader
      },
      {  path:'transwift/:studentId/proficiency', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },
      {  path:'transwift/:studentId/attestation', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },
      // Evaluation
      {  path:'evaluation/:studentId', 
         element: <PrintEvaluation />,
         loader: printEvalLoader
      },
      
   ]
}


export default PublicRoute