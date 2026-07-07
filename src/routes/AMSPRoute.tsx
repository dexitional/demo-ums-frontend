import React from "react";
import AMSPLayout from "../components/amsp/AMSPLayout";
import AMSPSwitcher, {
  loader as switchLoader,
} from "../components/amsp/AMSPSwitcher";
import PgStepChoice, {
  action as stepChoiceAction,
  loader as stepChoiceLoader,
} from "../pages/amsp/PgStepChoice";
import PgStepConfigure, {
  action as stepConfigureAction,
  loader as stepConfigureLoader,
} from "../pages/amsp/PgStepConfigure";
import PgStepDocument, {
  action as stepDocumentAction,
  loader as stepDocumentLoader,
} from "../pages/amsp/PgStepDocument";
import PgStepEducation, {
  action as stepEducationAction,
  loader as stepEducationLoader,
} from "../pages/amsp/PgStepEducation";
import PgStepEmployment, {
  action as stepEmploymentAction,
  loader as stepEmploymentLoader,
} from "../pages/amsp/PgStepEmployment";
import PgStepGuardian, {
  action as stepGuardianAction,
  loader as stepGuardianLoader,
} from "../pages/amsp/PgStepGuardian";
import PgStepPrintForm from "../pages/amsp/PgStepPrintForm";
import PgStepPrintLetter, {
  loader as stepPrintLetterLoader,
} from "../pages/amsp/PgStepPrintLetter";
import PgStepProfile, {
  action as stepProfileAction,
  loader as stepProfileLoader,
} from "../pages/amsp/PgStepProfile";
import PgStepReferee, {
  action as stepRefereeAction,
  loader as stepRefereeLoader,
} from "../pages/amsp/PgStepReferee";
import PgStepResult, {
  action as stepResultAction,
  loader as stepResultLoader,
} from "../pages/amsp/PgStepResult";
import PgStepReview, {
  action as stepReviewAction,
  loader as stepReviewLoader,
} from "../pages/amsp/PgStepReview";
import { useUserStore } from "../utils/authService";

const user = useUserStore.getState().user;
// const dricRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'dric')

const AMSPRoute: any = {
  path: "amsp",
  element: <AMSPLayout />,
  children: [
    {
      element: <AMSPSwitcher />,
      loader: switchLoader,
      children: [
        {
          path: "dash",
          element: <PgStepConfigure />,
          loader: stepConfigureLoader,
          action: stepConfigureAction,
          children: [
            {
              element: <div></div>,
              index: true,
            },
            {
              path: "form",
              element: <PgStepPrintForm />,
              loader: stepReviewLoader,
            },
            {
              path: "letter",
              element: <PgStepPrintLetter />,
              loader: stepPrintLetterLoader,
            },
          ],
        },
        {
          path: "profile",
          element: <PgStepProfile />,
          loader: stepProfileLoader,
          action: stepProfileAction,
        },
        {
          path: "guardian",
          element: <PgStepGuardian />,
          loader: stepGuardianLoader,
          action: stepGuardianAction,
        },
        {
          path: "education",
          element: <PgStepEducation />,
          loader: stepEducationLoader,
          action: stepEducationAction,
        },
        {
          path: "result",
          element: <PgStepResult />,
          loader: stepResultLoader,
          action: stepResultAction,
        },
        {
          path: "document",
          element: <PgStepDocument />,
          loader: stepDocumentLoader,
          action: stepDocumentAction,
        },
        {
          path: "choice",
          element: <PgStepChoice />,
          loader: stepChoiceLoader,
          action: stepChoiceAction,
        },
        {
          path: "employment",
          element: <PgStepEmployment />,
          loader: stepEmploymentLoader,
          action: stepEmploymentAction,
        },
        {
          path: "referee",
          element: <PgStepReferee />,
          loader: stepRefereeLoader,
          action: stepRefereeAction,
        },
        {
          path: "review",
          element: <PgStepReview />,
          loader: stepReviewLoader,
          action: stepReviewAction,
        },
      ],
    },
  ],
};

export default AMSPRoute;
