import React from "react";
import AMSLayout from "../components/ams/AMSLayout";
import PgAMSApplicant, {
  action as amsApplicantShortlist,
  loader as applicantLoader,
} from "../pages/ams/PgAMSApplicant";
import PgAMSApplicantForm, {
  action as amsApplicantFormAction,
  loader as amsApplicantFormLoader,
} from "../pages/ams/PgAMSApplicantForm";
import PgAMSApplicants, {
  loader as applicantsLoader,
} from "../pages/ams/PgAMSApplicants";
import PgAMSDash, { loader as dashLoader } from "../pages/ams/PgAMSDash";
import PgAMSLetter, {
  loader as amsLetterLoader,
} from "../pages/ams/PgAMSLetter";
import PgAMSLetterForm, {
  action as amsLetterFormAction,
  loader as amsLetterFormLoader,
} from "../pages/ams/PgAMSLetterForm";
import PgAMSLetters, {
  action as amsLetterDestroy,
  loader as lettersLoader,
} from "../pages/ams/PgAMSLetters";
import PgAMSMatriculant, {
  loader as amsMatriculantLoader,
} from "../pages/ams/PgAMSMatriculant";
import PgAMSMatriculants, {
  action as amsMatriculantDestroy,
  loader as matriculantsLoader,
} from "../pages/ams/PgAMSMatriculants";
import PgAMSSessionForm, {
  action as amsSessionFormAction,
  loader as amsSessionFormLoader,
} from "../pages/ams/PgAMSSessionForm";
import PgAMSSessions, {
  action as amsSessionDestroy,
  loader as sessionsLoader,
} from "../pages/ams/PgAMSSessions";
import PgAMSShortlist, {
  loader as shortlistLoader,
} from "../pages/ams/PgAMSShortlist";
import PgAMSShortlistForm, {
  action as amsShortlistFormAction,
  loader as amsShortlistFormLoader,
} from "../pages/ams/PgAMSShortlistForm";
import PgAMSShortlists, {
  action as amsShortlistDestroy,
  loader as shortlistsLoader,
} from "../pages/ams/PgAMSShortlists";
import PgAMSVoucherForm, {
  action as amsVoucherFormAction,
  loader as amsVoucherFormLoader,
} from "../pages/ams/PgAMSVoucherForm";
import PgAMSVouchers, {
  action as amsVoucherRecover,
  loader as vouchersLoader,
} from "../pages/ams/PgAMSVouchers";
import PgAMSVoucherSellForm, {
  action as amsVoucherSellFormAction,
  loader as amsVoucherSellFormLoader,
} from "../pages/ams/PgAMSVoucherSellForm";
import { useUserStore } from "../utils/authService";
import PgAMSCorrectForm, { loader as amsCorrectLoader, action as amsCorrectAction} from "../pages/ams/PgAMSCorrectForm";

const user = useUserStore.getState().user;
const amsRole = user?.roles?.find((r) => r?.app_tag?.toLowerCase() == "ams");

const AMSRoute: any = {
  path: "ams",
  element: <AMSLayout />,
  // action: chosenAction,
  children: [
    {
      path: "dash",
      element: <PgAMSDash />,
      loader: dashLoader,
      index: true,
    },
    /* Admission Session Module */
    {
      path: "sessions",
      element: <PgAMSSessions />,
      loader: sessionsLoader,
    },
    {
      path: "sessions/create",
      element: <PgAMSSessionForm />,
      loader: amsSessionFormLoader,
      action: amsSessionFormAction,
    },
    {
      path: "sessions/:sessionId/destroy",
      action: amsSessionDestroy,
    },
    {
      path: "sessions/:sessionId/edit",
      element: <PgAMSSessionForm />,
      loader: amsSessionFormLoader,
      action: amsSessionFormAction,
    },

    /* Admission Letter Module */
    {
      path: "letters",
      element: <PgAMSLetters />,
      loader: lettersLoader,
    },
    {
      path: "letters/create",
      element: <PgAMSLetterForm />,
      loader: amsLetterFormLoader,
      action: amsLetterFormAction,
    },
    {
      path: "letters/:letterId",
      element: <PgAMSLetter />,
      loader: amsLetterLoader,
    },
    {
      path: "letters/:letterId/destroy",
      action: amsLetterDestroy,
    },
    {
      path: "letters/:letterId/edit",
      element: <PgAMSLetterForm />,
      loader: amsLetterFormLoader,
      action: amsLetterFormAction,
    },

    /* Vouchers Module */
    {
      path: "vouchers",
      element: <PgAMSVouchers />,
      loader: vouchersLoader,
    },
    {
      path: "vouchers/create",
      element: <PgAMSVoucherForm />,
      loader: amsVoucherFormLoader,
      action: amsVoucherFormAction,
    },
    {
      path: "vouchers/:voucherId/sell",
      element: <PgAMSVoucherSellForm />,
      loader: amsVoucherSellFormLoader,
      action: amsVoucherSellFormAction,
    },
    {
      path: "vouchers/:voucherId/recover",
      action: amsVoucherRecover,
    },
    {
      path: "vouchers/:voucherId/reset",
      action: amsVoucherRecover,
    },

    /* Applicant Module */
    {
      path: "applicants",
      element: <PgAMSApplicants />,
      loader: applicantsLoader,
    },
    {
      path: "applicants/create",
      element: <PgAMSApplicantForm />,
      loader: amsApplicantFormLoader,
      action: amsApplicantFormAction,
    },
    {
      path: "applicants/:applicantId",
      element: <PgAMSApplicant />,
      loader: applicantLoader,
    },
    {
      path: "applicants/:applicantId/shortlist",
      action: amsApplicantShortlist,
    },
    {
      path: "applicants/:applicantId/edit",
      element: <PgAMSApplicantForm />,
      loader: amsApplicantFormLoader,
      action: amsApplicantFormAction,
    },

    /* Shortlist Module */
    {
      path: "shortlists",
      element: <PgAMSShortlists />,
      loader: shortlistsLoader,
    },
    {
      path: "shortlists/create",
      element: <PgAMSShortlistForm />,
      loader: amsShortlistFormLoader,
      action: amsShortlistFormAction,
    },
    {
      path: "shortlists/:shortlistId",
      element: <PgAMSShortlist />,
      loader: shortlistLoader,
    },
    {
      path: "shortlists/:shortlistId/destroy",
      action: amsShortlistDestroy,
    },
    {
      path: "shortlists/:shortlistId/reverse",
      action: amsMatriculantDestroy,
    },
    {
      path: "shortlists/:shortlistId/process",
      element: <PgAMSShortlistForm />,
      loader: amsShortlistFormLoader,
      action: amsShortlistFormAction,
    },

    /* Matriculants Module */
    {
      path: "matriculants",
      element: <PgAMSMatriculants />,
      loader: matriculantsLoader,
    },
    {
      path: "matriculants/:matriculantId",
      element: <PgAMSMatriculant />,
      loader: amsMatriculantLoader,
    },
    {
      path: "matriculants/:matriculantId/edit",
      element: <PgAMSCorrectForm />,
      loader: amsCorrectLoader,
      action: amsCorrectAction,
    },
    {
      path: "matriculants/:matriculantId/destroy",
      action: amsMatriculantDestroy,
    },
  ],
};

export default AMSRoute;
