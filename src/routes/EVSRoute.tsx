import React from 'react';
import PgCandidate from '../components/evs/PgCandidate';
import PgControl from '../components/evs/PgControl';
import PgResult from '../components/evs/PgResult';
import EVSDashPage, { loader as dashLoader } from '../pages/evs/EVSDashPage';
// import EVSPage, { loader as pageLoader } from '../pages/evs/EVSPage';
import EVSPage from '../pages/evs/EVSPage';
import { useUserStore } from '../utils/authService';
// import PgRegister, { loader as registerLoader } from '../components/evs/PgRegister';
import EVSAdminLayout from '../components/evs/EVSAdminLayout';
import EVSLayout from '../components/evs/EVSLayout';
import PgAdminControl from '../components/evs/PgAdminControl';
import PgPublic from '../components/evs/PgPublic';
import PgRegister from '../components/evs/PgRegister';
import PgStrongroom from '../components/evs/PgStrongroom';
import PgVoting from '../components/evs/PgVoting';
import PgEVSCandidateForm from '../pages/evs/PgEVSCandidateForm';
import PgEVSCandidates from '../pages/evs/PgEVSCandidates';
// import PgEVSElection, { loader as adminElectionLoader } from '../pages/evs/PgEVSElection';
import PgEVSElection from '../pages/evs/PgEVSElection';
import PgEVSElectionForm from '../pages/evs/PgEVSElectionForm';
import PgEVSElections, { loader as adminElectionsLoader } from '../pages/evs/PgEVSElections';
import PgEVSPortfolioForm from '../pages/evs/PgEVSPortfolioForm';
import PgEVSPortfolios from '../pages/evs/PgEVSPortfolios';

const user = useUserStore.getState().user
const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')

const EVSRoute:any =  {
   path: "evs",
   element: <EVSLayout />,
   //action: chosenAction,
   children: [
      // Dashboard
      {  path:'dash', 
         element: <EVSDashPage />,
         loader: dashLoader,
         index:true
      },
      
      // Election Portal
      {  path:':electionId',
         element: <EVSPage />,
         children: [
            {  
               path:'vip',
               element: <PgStrongroom />, 
            },
            {  
               path:'public',
               element: <PgPublic />, 
            },
            {  
               path:'register',
               element: <PgRegister />, 
               index: true
            },
            {  
               path:'candidate',
               element: <PgCandidate />, 
            },
            {  
               path:'control',
               element: <PgControl />, 
            },
            {  
               path:'result',
               element: <PgResult />, 
            },
            
            // Voting Simulation
            {  path:'voting', 
               element: <PgVoting />,
            },
         ] 
      },

      // Election Admin
      {  path:'admin',
         element: <EVSAdminLayout />,
         children: [
            {  
               path:'elections',
               element: <PgEVSElections />, 
               loader: adminElectionsLoader,
            },
            { 
               path:'elections/create', 
               element: <PgEVSElectionForm />,
            },
            {  
               path:'elections/:electionId',
               element: <PgEVSElection />, 
               children: [
                  {
                     path:'portfolios', 
                     children: [
                        // Portfolios
                        {
                           element: <PgEVSPortfolios />,
                           index: true
                        },
                        {
                           path:':portfolioId/edit', 
                           element: <PgEVSPortfolioForm />,
                        },
                        {
                           path:'create', 
                           element: <PgEVSPortfolioForm />,
                        }
                     ]
                  },
                  {
                     path:'candidates', 
                     children: [
                        {
                           element: <PgEVSCandidates />,
                           index: true
                        },
                        {
                           path:'create', 
                           element: <PgEVSCandidateForm />,
                        },
                        {
                           path:':candidateId/edit', 
                           element: <PgEVSCandidateForm />,
                        }
                     ]
                  },
                  { 
                     path:'voters', 
                     element: <PgRegister />, 
                  },
                  {  
                     path:'controls',
                     element: <PgAdminControl />, 
                  },
                  {  
                     path:'stage',
                     element: <PgCandidate />, 
                  },
                  
                  {  
                     path:'results',
                     element: <PgResult />, 
                  },
                
               ]
            },
            { 
               path:'elections/:electionId/edit', 
               element: <PgEVSElectionForm />, 
            }
            
         ] 
      },
   ]
}

export default EVSRoute