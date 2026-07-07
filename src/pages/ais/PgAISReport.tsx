import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../../components/ais/PageTitle";
import ReportListView from "../../components/ais/ReportListView";
import Service from "../../utils/aisService";
import { jsonToExcel } from "../../utils/util";

type Props = {};

export async function action({ request, params }) {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  console.log(data)
  let resp:any;
  if(data?.type == 'graduate_sheet'){
    resp = await Service.loadBroadsheet(data);
  } else {
    resp = await Service.loadReport(data);
  }
  console.log(resp);
  if (resp?.data?.length)
    jsonToExcel(resp.data, data?.type + "_" + Date.now());
  return true;
}

export async function loader({ params }) {
  const sessions = await Service.fetchSessionList();
  const rsessions = await Service.fetchResitSessionsList();
  const gsessions = await Service.fetchGraduateSessionsList();
  const programs = await Service.fetchProgramList();
  const majors = await Service.fetchMajorList();

  return { programs, sessions, majors, rsessions, gsessions };
}

function PgAISReport({}: Props) {
  const { programs, sessions, majors, gsessions, rsessions }: any =
    useLoaderData();

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle
        title="Reports"
        createtext=""
        createlink=""
        setView={() => null}
        view={""}
      />
      <div className="">
        <ReportListView
          programs={programs}
          majors={majors}
          sessions={sessions}
          rsessions={rsessions}
          gsessions={gsessions}
        />
      </div>
    </div>
  );
}

export default PgAISReport;
