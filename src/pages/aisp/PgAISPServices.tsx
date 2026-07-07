import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import ServiceListView from "../../components/aisp/ServiceListView";
import PageTitle from "../../components/hrs/PageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};
export async function action({ params }) {
  await Service.deleteTranswift(params.transwiftId);
  return redirect("/aisp/services");
}

export async function loader() {
  const user = useUserStore.getState().user;
  const data = await Service.fetchTranswiftByStudent(user?.user?.tag);
  return { data };
}

function PgAISPServices({}: Props) {
  const { data }: any = useLoaderData();

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle
        title="Service Requests"
        createtext=""
        createlink="create"
        setView={() => null}
        view={""}
      />
      <div className="space-y-4">
        <div className="px-4 py-2 bg-blue-200/50 rounded space-y-2">
          <h3 className="font-roboto text-sm text-primary">
            Document Request shall be created automatically after payment at the
            bank or using the USSD. Applicant are required to update the request
            with the receipient information. Thank you.
          </h3>
          <h3 className="font-roboto text-base font-medium italic text-primary">
            Completed document request are available for pickup or mailed
            electronically to the provided receipient email address.
          </h3>
        </div>
        <ServiceListView data={data} />
      </div>
    </div>
  );
}

export default PgAISPServices;
