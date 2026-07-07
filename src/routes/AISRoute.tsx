import React from 'react';

import AISLayout from '../components/ais/AISLayout';
import PgAISBacklog, { loader as backlogLoader } from '../pages/ais/PgAISBacklog';
import PgAISBacklogForm, { action as backlogFormAction, loader as backlogFormLoader } from '../pages/ais/PgAISBacklogForm';
import PgAISBacklogManager, { loader as backlogManagerLoader } from '../pages/ais/PgAISBacklogManager';
import PgAISBacklogRecord, { loader as backlogRecordLoader } from '../pages/ais/PgAISBacklogRecord';
import PgAISBacklogs, { loader as backlogsLoader } from '../pages/ais/PgAISBacklogs';
import PgAISCalendar, { loader as aisCalendarLoader } from '../pages/ais/PgAISCalendar';
import PgAISCalendarForm, { action as aisCalendarFormAction, loader as aisCalendarFormLoader } from '../pages/ais/PgAISCalendarForm';
import PgAISCalendars, { action as aisCalendarDestroy, loader as calendarsLoader } from '../pages/ais/PgAISCalendars';
import PgAISCourseForm, { action as aisCourseFormAction, loader as aisCourseFormLoader } from '../pages/ais/PgAISCourseForm';
import PgAISCourses, { action as aisCourseDestroy, loader as coursesLoader } from '../pages/ais/PgAISCourses';
import PgAISDeferment, { loader as aisDefermentLoader } from '../pages/ais/PgAISDeferment';
import PgAISDefermentForm, { action as aisDefermentFormAction, loader as aisDefermentFormLoader } from '../pages/ais/PgAISDefermentForm';
import PgAISDeferments, { action as aisDefermentDestroy, loader as defermentsLoader } from '../pages/ais/PgAISDeferments';
import PgAISDepartments, { loader as departmentsLoader } from '../pages/ais/PgAISDepartments';
import PgAISFaculties, { loader as facultiesLoader } from '../pages/ais/PgAISFaculties';
import PgAISJob, { loader as aisJobLoader } from '../pages/ais/PgAISJob';
import PgAISJobForm, { action as aisJobFormAction, loader as aisJobFormLoader } from '../pages/ais/PgAISJobForm';
import PgAISJobs, { action as aisJobDestroy, loader as jobsLoader } from '../pages/ais/PgAISJobs';
import PgAISLetter, { loader as aisLetterLoader } from '../pages/ais/PgAISLetter';
import PgAISLetterForm, { action as aisLetterFormAction, loader as aisLetterFormLoader } from '../pages/ais/PgAISLetterForm';
import PgAISLetters, { action as aisLetterDestroy, loader as lettersLoader } from '../pages/ais/PgAISLetters';
import PgAISMySheets, { loader as mysheetsLoader } from '../pages/ais/PgAISMySheets';
import PgAISMySheet, { loader as mysheetLoader } from '../pages/ais/PgAISMySheet';
import PgAISProgram, { loader as aisProgramLoader } from '../pages/ais/PgAISProgram';
import PgAISProgramForm, { action as aisProgramFormAction, loader as aisProgramFormLoader } from '../pages/ais/PgAISProgramForm';
import PgAISPrograms, { action as aisProgramDestroy, loader as aisProgramsLoader } from '../pages/ais/PgAISPrograms';
import PgAISProgramStatistics, { loader as aisProgramStatisticsLoader } from '../pages/ais/PgAISProgramStatistics';
import PgAISProgramStructure, { loader as aisProgramStructureLoader } from '../pages/ais/PgAISProgramStructure';
import PgAISProgramStudent, { loader as aisProgramStudentLoader } from '../pages/ais/PgAISProgramStudent';
import PgAISProgramChange, { loader as aisProgramChangeLoader } from '../pages/ais/PgAISProgramChange';

import PgAISProgressions, { loader as progressionsLoader } from '../pages/ais/PgAISProgressions';
import PgAISRegistrations, { action as aisRegistrationDestroy, loader as registrationsLoader } from '../pages/ais/PgAISRegistrations';
import PgAISRegsitration, { loader as aisRegistrationLoader } from '../pages/ais/PgAISRegsitration';
import PgAISRoles from '../pages/ais/PgAISRoles';
import PgAISScheme, { loader as aisSchemeLoader } from '../pages/ais/PgAISScheme';
import PgAISSchemeForm, { action as aisSchemeFormAction, loader as aisSchemeFormLoader } from '../pages/ais/PgAISSchemeForm';
import PgAISSchemes, { action as aisSchemeDestroy, loader as schemesLoader } from '../pages/ais/PgAISSchemes';
import PgAISSheet, { loader as sheetLoader } from '../pages/ais/PgAISSheet';
import PgAISSheetAccount, { loader as sheetAccountLoader } from '../pages/ais/PgAISSheetAccount';
import PgAISSheetActivity, { loader as sheetActivityLoader } from '../pages/ais/PgAISSheetActivity';
import PgAISSheetCapture, { action as sheetCaptureAction, loader as sheetCaptureLoader } from '../pages/ais/PgAISSheetCapture';
import PgAISSheetForm, { action as sheetFormAction, loader as sheetFormLoader } from '../pages/ais/PgAISSheetForm';
import PgAISSheets, { loader as sheetsLoader } from '../pages/ais/PgAISSheets';
import PgAISSheetScore, { loader as sheetScoreLoader } from '../pages/ais/PgAISSheetScore';
import PgAISSheetStudent, { loader as sheetStudentLoader } from '../pages/ais/PgAISSheetStudent';
import PgAISStaff, { loader as staffLoader } from '../pages/ais/PgAISStaff';
import PgAISStaffAccount, { loader as aisStaffAccountLoader } from '../pages/ais/PgAISStaffAccount';
import PgAISStaffForm, { action as aisStaffFormAction, loader as aisStaffFormLoader } from '../pages/ais/PgAISStaffForm';
import PgAISStaffIDCard from '../pages/ais/PgAISStaffIDCard';
import PgAISStaffProfile from '../pages/ais/PgAISStaffProfile';
import PgAISStaffRole, { action as aisStaffRoleDestroy, loader as aisStaffRoleLoader } from '../pages/ais/PgAISStaffRole';
import PgAISStaffRoleForm, { action as aisStaffRoleFormAction, loader as aisStaffRoleFormLoader } from '../pages/ais/PgAISStaffRoleForm';
import PgAISStaffs, { loader as staffsLoader, action as aisStaffDestroy } from '../pages/ais/PgAISStaffs';
import PgAISStructureForm, { action as aisCurriculumFormAction, loader as aisCurriculumFormLoader } from '../pages/ais/PgAISStructureForm';
import PgAISStructures, { action as aisCurriculumDestroy, loader as curriculumsLoader } from '../pages/ais/PgAISStructures';
import PgAISStudent, { loader as studentLoader } from '../pages/ais/PgAISStudent';
import PgAISStudentAccount, { loader as aisStudentAccountLoader } from '../pages/ais/PgAISStudentAccount';
import PgAISStudentActivity from '../pages/ais/PgAISStudentActivity';
import PgAISStudentFinance, { loader as aisStudentFinanceLoader } from '../pages/ais/PgAISStudentFinance';
import PgAISStudentForm, { action as aisStudentFormAction, loader as aisStudentFormLoader } from '../pages/ais/PgAISStudentForm';
import PgAISStudentIDCard, { loader as aisStudentIDCardLoader } from '../pages/ais/PgAISStudentIDCard';
import PgAISStudentProfile from '../pages/ais/PgAISStudentProfile';
import PgAISStudents, { loader as studentsLoader } from '../pages/ais/PgAISStudents';
import PgAISStudentTranscript, { loader as aisStudentTranscriptLoader } from '../pages/ais/PgAISStudentTranscript';
import PgAISUnit, { loader as aisUnitLoader } from '../pages/ais/PgAISUnit';
import PgAISUnitForm, { action as aisUnitFormAction, loader as aisUnitFormLoader } from '../pages/ais/PgAISUnitForm';
import PgAISUnits, { action as aisUnitDestroy, loader as unitsLoader } from '../pages/ais/PgAISUnits';

import PgAISResitForm, { action as resitFormAction, loader as resitFormLoader } from '../pages/ais/PgAISResitForm';
import PgAISResits, { loader as resitsLoader } from '../pages/ais/PgAISResits';

import PgAISResitSession, { action as resitSessionDestroy, loader as resitSessionLoader } from '../pages/ais/PgAISResitSession';
import PgAISResitSessionForm, { action as resitSessionFormAction, loader as resitSessionFormLoader } from '../pages/ais/PgAISResitSessionForm';
import PgAISResitSessions, { loader as resitSessionsLoader } from '../pages/ais/PgAISResitSessions';
import PaperTranscriptView, { loader as transcriptLoader } from '../components/print/PaperTranscriptView';
import PgAISCircularForm, { action as noticeFormAction, loader as noticeFormLoader } from '../pages/ais/PgAISCircularForm';
import PgAISCirculars, { action as noticesAction, loader as noticesLoader } from '../pages/ais/PgAISCirculars';
import PgAISGraduateForm, { action as graduateFormAction, loader as graduateFormLoader } from '../pages/ais/PgAISGraduateForm';
import PgAISGraduates, { loader as graduatesLoader } from '../pages/ais/PgAISGraduates';
import PgAISGraduateSession, { action as graduateSessionDestroy, loader as graduateSessionLoader } from '../pages/ais/PgAISGraduateSession';
import PgAISGraduateSessionAction, { loader as graduateSessionActionLoader } from '../pages/ais/PgAISGraduateSessionAction';
import PgAISGraduateSessionForm, { action as graduateSessionFormAction, loader as graduateSessionFormLoader } from '../pages/ais/PgAISGraduateSessionForm';
import PgAISGraduateSessions, { loader as graduateSessionsLoader } from '../pages/ais/PgAISGraduateSessions';
import PgAISGraduateSessionStudent, { loader as graduateSessionStudentLoader } from '../pages/ais/PgAISGraduateSessionStudent';
import PgAISResitSessionAction, { loader as resitSessionActionLoader } from '../pages/ais/PgAISResitSessionAction';
import PgAISResitSessionCapture, { action as resitSessionCaptureAction, loader as resitSessionCaptureLoader } from '../pages/ais/PgAISResitSessionCapture';
import PgAISResitSessionScore, { loader as resitSessionScoreLoader } from '../pages/ais/PgAISResitSessionScore';
import PgAISResitSessionStudent, { loader as resitSessionStudentLoader } from '../pages/ais/PgAISResitSessionStudent';
import PgAISTranswift, { action as transwiftDestroy, loader as transwiftLoader } from '../pages/ais/PgAISTranswift';
import PgAISTranswiftForm, { action as transwiftFormAction, loader as transwiftFormLoader } from '../pages/ais/PgAISTranswiftForm';
import PgAISTranswifts, { loader as transwiftsLoader } from '../pages/ais/PgAISTranswifts';
import PgDocument, { loader as documentLoader } from '../pages/ais/PgDocument';
import Error from '../pages/Error';
import { useUserStore } from '../utils/authService';
import PgAISPasswordForm, { action as passwordFormAction } from '../pages/ais/PgAISPasswordForm';
import PgAISDash, { loader as dashLoader } from '../pages/ais/PgAISDash';
import PgAISReport, { action as aisReportAction, loader as aisReportLoader } from '../pages/ais/PgAISReport';
import PgAISProgramIDCard from '../pages/ais/PgAISProgramIDCard';
import PgAISBacklogSample, { action as backlogSampleAction, loader as backlogSampleLoader } from '../pages/ais/PgAISBacklogSample';
import PgAISEvaluations, { loader as aisEvaluationsLoader } from '../pages/ais/PgAISEvaluations';
import PrintBroadsheet from '../components/print/PrintBroadsheet';
import PrintCertificates, { loader as certficatesLoader } from '../components/print/PrintCertificates';
import PgAISGraduateLogs, { loader as graduateLogsLoader } from '../pages/ais/PgAISGraduateLogs';
import PgAISGraduateSessionStudentIssue from '../pages/ais/PgAISGraduateSessionStudentIssue';
import PgAISGraduateSessionStudentClean from '../pages/ais/PgAISGraduateSessionStudentClean';

const user = useUserStore.getState().user
const aisRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'ais')

const AISRoute:any =  {
   path: "ais",
   element: <AISLayout />,
   errorElement: <Error />,
   // action: chosenAction,
   children: [
      {  path:'dash',
         element: <PgAISDash />,
         loader: dashLoader,
         index: true,
         hydrateFallbackElement: <div>testing hydration</div>
      },
      {  path:'roles', 
         element: <PgAISRoles />,
      },
      {  path:'reports', 
         element: <PgAISReport />,
         loader: aisReportLoader,
         action: aisReportAction
      },

      /* Password Change */
      {  path:'changepwd', 
         element: <PgAISPasswordForm />,
         action: passwordFormAction
      },

      /* Evaluations */
      { 
         path:'evaluations',
         element: <PgAISEvaluations />,
         loader: aisEvaluationsLoader
      },
      { 
         path:'evaluations/:evaluationId', 
         element: <PgAISEvaluations />,
         // loader: aisEvaluationLoader,
      },

      /* Student Module */
      { 
         path:'students', 
         element: <PgAISStudents />,
         loader: studentsLoader,
      },
      { 
         path:'students/create', 
         // element: ['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) ? <PgAISStudentForm /> :<Navigate to={{ pathname: '/dash' }} replace />,
         element: <PgAISStudentForm />,
         loader: aisStudentFormLoader,
         action: aisStudentFormAction
      },
      { 
         path:'students/:studentId', 
         element: <PgAISStudent />,
         loader: studentLoader,
         children: [
            {
               path:'profile', 
               element: <PgAISStudentProfile />,
               loader: studentLoader,
               index: true
            },
            {
               path:'finance', 
               element: <PgAISStudentFinance />,
               loader: aisStudentFinanceLoader,
            },
            {
               path:'transcript', 
               element: <PgAISStudentTranscript />,
               loader: aisStudentTranscriptLoader,
            },
            {
               path:'account', 
               element: <PgAISStudentAccount />,
               loader: aisStudentAccountLoader,
            },
            {
               path:'activity', 
               element: <PgAISStudentActivity />,
               loader: studentLoader,
            },
            {
               path:'idcard', 
               element: <PgAISStudentIDCard />,
               loader: aisStudentIDCardLoader,
            }
         ]
      },
      { 
         path:'students/:studentId/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'students/:studentId/edit', 
         // element: ['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) ? <PgAISStudentForm /> :<Navigate to={{ pathname: '/dash' }} replace />,
         element: <PgAISStudentForm />,
         loader: aisStudentFormLoader,
         action: aisStudentFormAction
      },

      /* Course Module */
      { 
         path:'courses', 
         element: <PgAISCourses />,
         loader: coursesLoader,
      },
      { 
         path:'courses/create', 
         element: <PgAISCourseForm />,
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },
      { 
         path:'courses/:courseId/destroy', 
         action: aisCourseDestroy,
      },
      { 
         path:'courses/:courseId/edit', 
         element: <PgAISCourseForm />, 
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },

      /* Program Module */
      { 
         path:'programs', 
         element: <PgAISPrograms />,
         loader: aisProgramsLoader,
      },
      { 
         path:'programs/create', 
         element: <PgAISProgramForm />,
         loader: aisProgramFormLoader,
         action: aisProgramFormAction
      },
      { 
         path:'programs/:programId', 
         element: <PgAISProgram />,
         loader: aisProgramLoader,
         children: [
            {
               index: true,
               path:'curriculum', 
               element: <PgAISProgramStructure />,
               loader: aisProgramStructureLoader,
            },
            {
               path:'students', 
               element: <PgAISProgramStudent />,
               loader: aisProgramStudentLoader,
            },
            {
               path:'change', 
               element: <PgAISProgramChange />,
               loader: aisProgramChangeLoader,
            },
            {
               path:'statistics', 
               element: <PgAISProgramStatistics />,
               loader: aisProgramStudentLoader,
            },
            ,
            {
               path:'idcards', 
               element: <PgAISProgramIDCard />,
               loader: aisProgramStatisticsLoader,
            }
         ]
      },
      { 
         path:'programs/:programId/destroy', 
         action: aisProgramDestroy,
      },
      { 
         path:'programs/:programId/edit', 
         element: <PgAISProgramForm />, 
         loader: aisProgramFormLoader,
         action: aisProgramFormAction
      },

       /* Faculty Module */
       { 
         path:'faculties', 
         element: <PgAISFaculties />,
         loader: facultiesLoader,
      },
      { 
         path:'departments/create', 
         element: <PgAISCourseForm />,
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },
      { 
         path:'departments/:departmentId/destroy', 
         action: aisCourseDestroy,
      },
      { 
         path:'departments/:departmentId/edit', 
         element: <PgAISCourseForm />, 
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },

      /* Department Module */
      { 
         path:'departments', 
         element: <PgAISDepartments />,
         loader: departmentsLoader,
      },
      { 
         path:'departments/create', 
         element: <PgAISCourseForm />,
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },
      { 
         path:'departments/:departmentId/destroy', 
         action: aisCourseDestroy,
      },
      { 
         path:'departments/:departmentId/edit', 
         element: <PgAISCourseForm />, 
         loader: aisCourseFormLoader,
         action: aisCourseFormAction
      },

      /* Curriculum & Structure Module */
      { 
         path:'curriculums', 
         element: <PgAISStructures />,
         loader: curriculumsLoader,
      },
      { 
         path:'curriculums/create', 
         element: <PgAISStructureForm />,
         loader: aisCurriculumFormLoader,
         action: aisCurriculumFormAction
      },
      { 
         path:'curriculums/:curriculumId/destroy', 
         action: aisCurriculumDestroy,
      },
      { 
         path:'curriculums/:curriculumId/edit', 
         element: <PgAISStructureForm />, 
         loader: aisCurriculumFormLoader,
         action: aisCurriculumFormAction
      },

      /* Calendars */
      { 
         path:'calendars', 
         element: <PgAISCalendars />,
         loader: calendarsLoader,
      },
      { 
         path:'calendars/create', 
         element: <PgAISCalendarForm />,
         loader: aisCalendarFormLoader,
         action: aisCalendarFormAction
      },
      { 
         path:'calendars/:calendarId', 
         element: <PgAISCalendar />,
         loader: aisCalendarLoader,
      },
      { 
         path:'calendars/:calendarId/destroy', 
         action: aisCalendarDestroy,
      },
      { 
         path:'calendars/:calendarId/edit', 
         element: <PgAISCalendarForm />, 
         loader: aisCalendarFormLoader,
         action: aisCalendarFormAction
      },

      /* Scheme Module */
      { 
         path:'schemes', 
         element: <PgAISSchemes />,
         loader: schemesLoader,
      },
      { 
         path:'schemes/create', 
         element: <PgAISSchemeForm />,
         loader: aisSchemeFormLoader,
         action: aisSchemeFormAction
      },
      { 
         path:'schemes/:schemeId', 
         element: <PgAISScheme />,
         loader: aisSchemeLoader,
      },
      { 
         path:'schemes/:schemeId/destroy', 
         action: aisSchemeDestroy,
      },
      { 
         path:'schemes/:schemeId/edit', 
         element: <PgAISSchemeForm />, 
         loader: aisSchemeFormLoader,
         action: aisSchemeFormAction
      },


      /* Progression Module */
      { 
         path:'progression', 
         element: <PgAISProgressions />,
         loader: progressionsLoader,
      },


      /* Registrations Module */
      { 
         path:'registrations', 
         element: <PgAISRegistrations />,
         loader: registrationsLoader,
      },
      { 
         path:'registrations/create', 
         element: <PgAISSchemeForm />,
         loader: aisSchemeFormLoader,
         action: aisSchemeFormAction
      },
      { 
         path:'registrations/:registrationId', 
         element: <PgAISRegsitration />,
         loader: aisRegistrationLoader,
      },
      { 
         path:'registrations/:registrationId/destroy', 
         action: aisRegistrationDestroy,
      },
      { 
         path:'registrations/:registrationId/edit', 
         element: <PgAISSchemeForm />, 
         loader: aisSchemeFormLoader,
         action: aisSchemeFormAction
      },

      /* Deferment Module */
      { 
         path:'deferments', 
         element: <PgAISDeferments />,
         loader: defermentsLoader,
      },
      { 
         path:'deferments/create', 
         element: <PgAISDefermentForm />,
         loader: aisDefermentFormLoader,
         action: aisDefermentFormAction
      },
      { 
         path:'deferments/:defermentId', 
         element: <PgAISDeferment />,
         loader: aisDefermentLoader,
      },
      { 
         path:'deferments/:defermentId/destroy', 
         action: aisDefermentDestroy,
      },
      { 
         path:'deferments/:defermentId/edit', 
         element: <PgAISDefermentForm />, 
         loader: aisDefermentFormLoader,
         action: aisDefermentFormAction
      },


       /* Service Letters Module */
       { 
         path:'letters', 
         element: <PgAISLetters />,
         loader: lettersLoader,
      },
      { 
         path:'letters/create', 
         element: <PgAISLetterForm />,
         loader: aisLetterFormLoader,
         action: aisLetterFormAction
      },
      { 
         path:'letters/:letterId', 
         element: <PgAISLetter />,
         loader: aisLetterLoader,
      },
      { 
         path:'letters/:letterId/destroy', 
         action: aisLetterDestroy,
      },
      { 
         path:'letters/:letterId/edit', 
         element: <PgAISLetterForm />, 
         loader: aisLetterFormLoader,
         action: aisLetterFormAction
      },

      /* Sheet Module */
      { 
         path:'sheets', 
         element: <PgAISSheets />,
         loader: sheetsLoader,
      },
      { 
         path:'sheets/create', 
         element: <PgAISSheetForm />,
         loader: sheetFormLoader,
         action: sheetFormAction
      },
      { 
         path:'sheets/:sheetId', 
         element: <PgAISSheet />,
         loader: sheetLoader,
         children: [
            {
               path:'students', 
               element: <PgAISSheetStudent />,
               loader: sheetStudentLoader,
               index: true
            },
            {
               path:'scores', 
               element: <PgAISSheetScore />,
               loader: sheetScoreLoader,
            },
            {
               path:'capture', 
               element: <PgAISSheetCapture />,
               loader: sheetCaptureLoader,
               action: sheetCaptureAction,
            },
            {
               path:'account', 
               element: <PgAISSheetAccount />,
               loader: sheetAccountLoader,
            },
            {
               path:'activity', 
               element: <PgAISSheetActivity />,
               loader: sheetActivityLoader,
            }
         ]
      },
      { 
         path:'sheets/:sheetId/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'sheets/:sheetId/edit', 
         element: <PgAISSheetForm />,
         loader: sheetFormLoader,
         action: sheetFormAction
      },

      
      /* MySheet Module */
      { 
         path:'mysheets', 
         element: <PgAISMySheets />,
         loader: mysheetsLoader,
      },
      { 
         path:'mysheets/create', 
         element: <PgAISSheetForm />,
         loader: sheetFormLoader,
         action: sheetFormAction
      },
      { 
         path:'mysheets/:sheetId', 
         element: <PgAISMySheet />,
         loader: sheetLoader,
         children: [
            {
               path:'students', 
               element: <PgAISSheetStudent />,
               loader: sheetStudentLoader,
               index: true
            },
            {
               path:'scores', 
               element: <PgAISSheetScore />,
               loader: sheetScoreLoader,
            },
            {
               path:'capture', 
               element: <PgAISSheetCapture />,
               loader: sheetCaptureLoader,
               action: sheetCaptureAction,
            },
            {
               path:'account', 
               element: <PgAISSheetAccount />,
               loader: sheetAccountLoader,
            },
            {
               path:'activity', 
               element: <PgAISSheetActivity />,
               loader: sheetActivityLoader,
            }
         ]
      },
      { 
         path:'mysheets/:sheetId/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'mysheets/:sheetId/edit', 
         element: <PgAISSheetForm />,
         loader: sheetFormLoader,
         action: sheetFormAction
      },


       /* Backlog Module */
       { 
         path:'backlogs', 
         element: <PgAISBacklogs />,
         loader: backlogsLoader,
      },
      { 
         path:'backlogs/sample', 
         element: <PgAISBacklogSample />,
         loader: backlogSampleLoader,
         action: backlogSampleAction
      },
      { 
         path:'backlogs/create', 
         element: <PgAISBacklogForm />,
         loader: backlogFormLoader,
         action: backlogFormAction
      },
      { 
         path:'backlogs/:backlogId', 
         element: <PgAISBacklog />,
         loader: backlogLoader,
         children: [
            {
               path:'records', 
               element: <PgAISBacklogRecord />,
               loader: backlogRecordLoader,
               index: true
            },
            {
               path:'manager', 
               element: <PgAISBacklogManager />,
               loader: backlogManagerLoader,
            }
         ]
      },
      { 
         path:'backlogs/:backlog/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'backlogs/:backlogId/edit', 
         element: <PgAISBacklogForm />,
         loader: backlogFormLoader,
         action: backlogFormAction
      },


      /* Resit Session Module */
      { 
         path:'resit-sessions', 
         element: <PgAISResitSessions />,
         loader: resitSessionsLoader,
      },
      { 
         path:'resit-sessions/create', 
         element: <PgAISResitSessionForm />,
         loader: resitSessionFormLoader,
         action: resitSessionFormAction
      },
      { 
         path:'resit-sessions/:sessionId', 
         element: <PgAISResitSession />,
         loader: resitSessionLoader,
         children: [
            {
               path:'students', 
               element: <PgAISResitSessionStudent />,
               loader: resitSessionStudentLoader,
               index: true
            },
            {
               path:'scores', 
               element: <PgAISResitSessionScore />,
               loader: resitSessionScoreLoader,
            },
            {
               path:'capture', 
               element: <PgAISResitSessionCapture />,
               loader: resitSessionCaptureLoader,
               action: resitSessionCaptureAction,
            },
            {
               path:'action', 
               element: <PgAISResitSessionAction />,
               loader: resitSessionActionLoader,
            }
         ]
      },
      { 
         path:'resit-sessions/:sessionId/destroy', 
         action: resitSessionDestroy,
      },
      { 
         path:'resit-sessions/:sessionId/edit', 
         element: <PgAISResitSessionForm />,
         loader: resitSessionFormLoader,
         action: resitSessionFormAction
      },


       /* Resit Module */
       { 
         path:'resits', 
         element: <PgAISResits />,
         loader: resitsLoader,
      },
      { 
         path:'resits/create', 
         element: <PgAISResitForm />,
         loader: resitFormLoader,
         action: resitFormAction
      },
      // { 
      //    path:'resits/:resitId', 
      //    element: <PgAISResit />,
      //    loader: resitLoader,
      // },
      { 
         path:'resits/:resit/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'resits/:resitId/edit', 
         element: <PgAISResitForm />,
         loader: resitFormLoader,
         action: resitFormAction
      },


      /* Graduation Logs */
      { 
         path:'graduate-logs', 
         element: <PgAISGraduateLogs />,
         loader: graduateLogsLoader,
      },

      /* Graduation Session Module */
      { 
         path:'graduate-sessions', 
         element: <PgAISGraduateSessions />,
         loader: graduateSessionsLoader,
      },
      { 
         path:'graduate-sessions/create', 
         element: <PgAISGraduateSessionForm />,
         loader: graduateSessionFormLoader,
         action: graduateSessionFormAction
      },
      { 
         path:'graduate-sessions/:sessionId', 
         element: <PgAISGraduateSession />,
         loader: graduateSessionLoader,
         children: [
            {
               path:'graduants', 
               element: <PgAISGraduateSessionStudent />,
               loader: graduateSessionStudentLoader,
               index: true
            },
            {
               path:'issues', 
               element: <PgAISGraduateSessionStudentIssue />,
               loader: graduateSessionStudentLoader,
            },
            {
               path:'verified', 
               element: <PgAISGraduateSessionStudentClean />,
               loader: graduateSessionStudentLoader,
            },
            {
               path:'action', 
               element: <PgAISGraduateSessionAction />,
               loader: graduateSessionActionLoader,
            },
            {
               path:'print', 
               element: <div className="max-h-screen overflow-scroll"><PrintBroadsheet /></div>,
            },
            {
               path:'certs', 
               element: <div className="max-h-screen overflow-scroll"><PrintCertificates /></div>,
               loader: certficatesLoader,
            },
         ]
      },
      { 
         path:'graduate-sessions/:sessionId/destroy', 
         action: graduateSessionDestroy,
      },
      { 
         path:'graduate-sessions/:sessionId/edit', 
         element: <PgAISGraduateSessionForm />,
         loader: graduateSessionFormLoader,
         action: graduateSessionFormAction
      },


       /* Graduation Module */
       { 
         path:'graduates', 
         element: <PgAISGraduates />,
         loader: graduatesLoader,
      },
      { 
         path:'graduates/create', 
         element: <PgAISGraduateForm />,
         loader: graduateFormLoader,
         action: graduateFormAction
      },
      { 
         path:'graduates/:graduate/destroy', 
         // action: nssMainDestroy,
      },
      { 
         path:'graduates/:graduateId/edit', 
         element: <PgAISGraduateForm />,
         loader: graduateFormLoader,
         action: graduateFormAction
      },


       /* Transwift Module */
       { 
         path:'transwifts', 
         element: <PgAISTranswifts />,
         loader: transwiftsLoader,
      },
      { 
         path:'transwifts/create', 
         element: <PgAISTranswiftForm />,
         loader: transwiftFormLoader,
         action: transwiftFormAction
      },
      { 
         path:'transwifts/:transwiftId', 
         element: <PgAISTranswift  />,
         loader: transwiftLoader,
         children: [
            {
               path:'transcript', 
               element: <PaperTranscriptView />,
               loader: transcriptLoader,
               index: true
            },
            {
               path:'document', 
               element: <PgDocument />,
               loader: documentLoader,
            }
         ]
      },
      { 
         path:'transwifts/:transwiftId/destroy', 
         action: transwiftDestroy,
      },
      { 
         path:'transwifts/:transwiftId/edit', 
         element: <PgAISTranswiftForm />, 
         loader: transwiftFormLoader,
         action: transwiftFormAction
      },

       /* Circular Module */
       { 
         path:'notices', 
         element: <PgAISCirculars />,
         loader: noticesLoader,
         action: noticesAction
      },
      { 
         path:'notices/create', 
         element: <PgAISCircularForm />,
         loader: noticeFormLoader,
         action: noticeFormAction
      },
      { 
         path:'notices/:noticeId/send', 
         action: noticesAction,
      },
      { 
         path:'notices/:noticeId/destroy', 
         action: noticesAction,
      },
      { 
         path:'notices/:noticeId/edit', 
         element: <PgAISCircularForm />, 
         loader: noticeFormLoader,
         action: noticeFormAction
      },


      /* Staff Module */
      { 
         path:'staff', 
         element: <PgAISStaffs />,
         loader: staffsLoader,
      },
      { 
         path:'staff/create', 
         element: <PgAISStaffForm />,
         loader: aisStaffFormLoader,
         action: aisStaffFormAction
      },
      { 
         path:'staff/:staffId', 
         element: <PgAISStaff />,
         loader: staffLoader,
         children: [
            {
               path:'profile', 
               element: <PgAISStaffProfile />,
               loader: staffLoader,
               index: true
            },
            {
               path:'roles', 
               element: <PgAISStaffRole />,
               loader: aisStaffRoleLoader,
            },
            {
               path:'roles/create', 
               element: <PgAISStaffRoleForm />,
               loader: aisStaffRoleFormLoader,
               action: aisStaffRoleFormAction,
            },
            {
               path:'roles/:roleId/destroy', 
               action: aisStaffRoleDestroy,
            },
            {
               path:'account', 
               element: <PgAISStaffAccount />,
               loader: aisStaffAccountLoader,
            },
            {
               path:'idcard', 
               element: <PgAISStaffIDCard />,
               loader: aisStudentIDCardLoader,
            }
         ]
      },
      { 
         path:'staff/:staffId/destroy', 
         action: aisStaffDestroy,
      },
      { 
         path:'staff/:staffId/edit', 
         element: <PgAISStaffForm />, 
         loader: aisStaffFormLoader,
         action: aisStaffFormAction
      },

       /* Job Designation Module */
       { 
         path:'jobs', 
         element: <PgAISJobs />,
         loader: jobsLoader,
      },
      { 
         path:'jobs/create', 
         element: <PgAISJobForm />,
         loader: aisJobFormLoader,
         action: aisJobFormAction
      },
      { 
         path:'jobs/:jobId', 
         element: <PgAISJob />,
         loader: aisJobLoader,
      },
      { 
         path:'jobs/:jobId/destroy', 
         action: aisJobDestroy,
      },
      { 
         path:'jobs/:jobId/edit', 
         element: <PgAISJobForm />, 
         loader: aisJobFormLoader,
         action: aisJobFormAction
      },


      /* Units Module */
      { 
         path:'units', 
         element: <PgAISUnits />,
         loader: unitsLoader,
      },
      { 
         path:'units/create', 
         element: <PgAISUnitForm />,
         loader: aisUnitFormLoader,
         action: aisUnitFormAction
      },
      { 
         path:'units/:unitId', 
         element: <PgAISUnit />,
         loader: aisUnitLoader,
      },
      { 
         path:'units/:unitId/destroy', 
         action: aisUnitDestroy,
      },
      { 
         path:'units/:unitId/edit', 
         element: <PgAISUnitForm />, 
         loader: aisUnitFormLoader,
         action: aisUnitFormAction
      },

   ]
}

export default AISRoute