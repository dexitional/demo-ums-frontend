import React from 'react';
import FMSLayout from '../components/fms/FMSLayout';
import { action as amsVoucherRecover } from '../pages/ams/PgAMSVouchers';
import PgFMSAccounts, { loader as accountsLoader } from '../pages/fms/PgFMSAccounts';
import PgFMSBill, { loader as billLoader } from '../pages/fms/PgFMSBill';
import PgFMSBillAccount, { loader as fmsActionLoader } from '../pages/fms/PgFMSBillAccount';
import PgFMSBillActivity, { loader as fmsActivityLoader } from '../pages/fms/PgFMSBillActivity';
import PgFMSBillForm, { action as billFormAction, loader as billFormLoader } from '../pages/fms/PgFMSBillForm';
import PgFMSBillReceiver, { loader as fmsReceiverLoader } from '../pages/fms/PgFMSBillReceiver';
import PgFMSBills, { action as billsDestroy, loader as billsLoader } from '../pages/fms/PgFMSBills';
import PgFMSChargeForm, { action as chargeFormAction, loader as chargeFormLoader } from '../pages/fms/PgFMSChargeForm';
import PgFMSCharges, { action as chargeDestroy, loader as chargesLoader } from '../pages/fms/PgFMSCharges';
import PgFMSDebts, { loader as debtsLoader } from '../pages/fms/PgFMSDebts';
import PgFMSPaymentForm, { action as paymentFormAction, loader as paymentFormLoader } from '../pages/fms/PgFMSPaymentForm';
import PgFMSPayments, { loader as paymentsLoader } from '../pages/fms/PgFMSPayments';
import PgFMSScostForm, { action as serviceFormAction, loader as serviceFormLoader } from '../pages/fms/PgFMSScostForm';
import PgFMSScosts, { action as serviceDestroy, loader as servicesLoader } from '../pages/fms/PgFMSScosts';
import PgFMSStudentFinance, { loader as accountLoader } from '../pages/fms/PgFMSStudentFinance';
import PgFMSTransactForm, { action as transactFormAction, loader as transactFormLoader } from '../pages/fms/PgFMSTransactForm';
import PgFMSTransacts, { loader as transactsLoader } from '../pages/fms/PgFMSTransacts';
import PgFMSVcostForm, { action as vcostFormAction, loader as vcostFormLoader } from '../pages/fms/PgFMSVcostForm';
import PgFMSVcosts, { action as vcostDestroy, loader as vcostsLoader } from '../pages/fms/PgFMSVcosts';
import PgFMSVouchers, { loader as vouchersLoader } from '../pages/fms/PgFMSVouchers';
import { useUserStore } from '../utils/authService';
import PgFMSDash, { loader as dashLoader } from '../pages/fms/PgFMSDash';
import PgFMSReport, { action as fmsReportAction, loader as fmsReportLoader } from '../pages/fms/PgFMSReport';
import PgFMSPayment, { loader as paymentLoader } from '../pages/fms/PgFMSPayment';

const user = useUserStore.getState().user
const fmsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'fms')
  
const FMSRoute:any =  { 
   path: "fms",
   element: <FMSLayout />,
   // action: chosenAction,
   children: [
      {  path:'dash',
         element: <PgFMSDash />,
         loader: dashLoader,
         index: true
      },
      {  path:'reports', 
         element: <PgFMSReport />,
         loader: fmsReportLoader,
         action: fmsReportAction
      },
      /* Student Bills Module */
      { 
         path:'bills', 
         element: <PgFMSBills />,
         loader: billsLoader,
         //index: true
      },
      { 
         path:'bills/:billId', 
         id:'billId',
         element: <PgFMSBill />,
         loader: billLoader,
         children: [
            {
               path:'actions', 
               element: <PgFMSBillAccount />,
               loader: fmsActionLoader,
               index: true
            },
            {
               path:'receivers', 
               element: <PgFMSBillReceiver />,
               loader: fmsReceiverLoader,
            },
            {
               path:'activity', 
               element: <PgFMSBillActivity />,
               loader: fmsActivityLoader,
            }
         ]
      },
      { 
         path:'bills/create', 
         element: <PgFMSBillForm />,
         loader: billFormLoader,
         action: billFormAction
      },
      { 
         path:'bills/:billId/destroy', 
         action: billsDestroy,
      },
      { 
         path:'bills/:billId/edit', 
         element: <PgFMSBillForm />, 
         loader: billFormLoader,
         action: billFormAction
      },


      /* Student Charges Module */
      { 
         path:'charges', 
         element: <PgFMSCharges />,
         loader: chargesLoader,
      },
      { 
         path:'charges/create', 
         element: <PgFMSChargeForm />,
         loader: chargeFormLoader,
         action: chargeFormAction
      },
      { 
         path:'charges/:chargeId/destroy', 
         action: chargeDestroy,
      },
      { 
         path:'charges/:chargeId/edit', 
         element: <PgFMSChargeForm />,
         loader: chargeFormLoader,
         action: chargeFormAction
      },

      /* Student Accounts Module */
      { 
         path:'accounts', 
         element: <PgFMSAccounts />,
         loader: accountsLoader,
         index: true
      },
      { 
         path:'accounts/:accountId', 
         id:'accountSid',
         element: <PgFMSStudentFinance />,
         loader: accountLoader,
      },
      { 
         path:'accounts/:accountId/retire', 
         action: amsVoucherRecover,
      },
      { 
         path:'accounts/:accountId/fine', 
         action: amsVoucherRecover,
      },

      /* Student Debtors Module */
      { 
         path:'debtors', 
         element: <PgFMSDebts />,
         loader: debtsLoader,
      },
      
      /* Fees Payments Module */
      { 
         path:'payments', 
         element: <PgFMSPayments />,
         loader: paymentsLoader,
      },
      { 
         path:'payments/create', 
         element: <PgFMSPaymentForm />,
         loader: paymentFormLoader,
         action: paymentFormAction
      },
      { 
         path:'payments/:paymentId', 
         element: <PgFMSPayment />,
         loader: paymentLoader,
      },
      // { 
      //    path:'payments/:paymentId/destroy', 
      //    action: amsShortlistDestroy,
      // },
      // { 
      //    path:'payments/:paymentId/process', 
      //    element: <PgAMSShortlistForm />, 
      //    loader: amsShortlistFormLoader,
      //    action: amsShortlistFormAction
      // },

       /* Other Payments Module */
       { 
         path:'transacts', 
         element: <PgFMSTransacts />,
         loader: transactsLoader,
      },
      { 
         path:'transacts/create', 
         element: <PgFMSTransactForm />,
         loader: transactFormLoader,
         action: transactFormAction
      },
      // { 
      //    path:'transacts/:transactId', 
      //    element: <PgAMSMatriculant />,
      //    loader: amsMatriculantLoader,
      // },
      // { 
      //    path:'transacts/:transactId/destroy', 
      //    action: amsMatriculantDestroy,
      // },

      /* Voucher Payments/Sales Module */
      { 
         path:'vsales', 
         element: <PgFMSVouchers />,
         loader: vouchersLoader,
      },

      /* Service Costs Module */
      { 
         path:'services', 
         element: <PgFMSScosts />,
         loader: servicesLoader,
      },
      { 
         path:'services/create', 
         element: <PgFMSScostForm />,
         loader: serviceFormLoader,
         action: serviceFormAction
      },
      { 
         path:'services/:serviceId/destroy', 
         action: serviceDestroy,
      },
      { 
         path:'services/:serviceId/edit', 
         element: <PgFMSScostForm />,
         loader: serviceFormLoader,
         action: serviceFormAction
      },

      /* Voucher Costs Module */
      { 
         path:'vcosts', 
         element: <PgFMSVcosts />,
         loader: vcostsLoader,
      },
      { 
         path:'vcosts/create', 
         element: <PgFMSVcostForm />,
         loader: vcostFormLoader,
         action: vcostFormAction
      },
      { 
         path:'vcosts/:costId/edit', 
         element: <PgFMSVcostForm />,
         loader: vcostFormLoader,
         action: vcostFormAction
      },
      { 
         path:'vcosts/:costId/destroy', 
         action: vcostDestroy,
      }

      
   ]
}

export default FMSRoute