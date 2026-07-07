import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../../components/ais/PageTitle";
import ReportListView from "../../components/fms/ReportListView";
import Service from "../../utils/aisService";
import AmsService from "../../utils/amsService";
import FmsService from "../../utils/fmsService";
import { jsonToExcel } from "../../utils/util";

type Props = {};

export async function action({ request, params }) {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  let resp = await FmsService.loadReport(data);
  if (resp.data?.length)
    return jsonToExcel(resp.data, data?.type + "_" + Date.now());
  return null;
}

export async function loader({ params }) {
  const sessions = await Service.fetchSessionList();
  const asessions = await AmsService.fetchSessionList();
  const services = await FmsService.fetchServiceList();
  const programs = await Service.fetchProgramList();
  const majors = await Service.fetchMajorList();

  return { programs, sessions, majors, asessions, services };
}

function PgFMSReport({}: Props) {
  const { programs, sessions, majors, asessions, services }: any =
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
          asessions={asessions}
          services={services}
        />
      </div>
    </div>
  );
}

export default PgFMSReport;
