import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import ApplicantCardItem from "../../components/ams/ApplicantCardItem";
import PageTitle from "../../components/ams/PageTitle";
import Service from "../../utils/amsService";
import { useUserStore } from "../../utils/authService";
type Props = {};

// Delete Action for Phase
export async function action({ params }) {
  await Service.deleteApplicant(params.applicantId);
  return redirect(`/ams/applicants`);
}

export async function loader({ request }) {
  const { user } = useUserStore.getState();
  const amsRole = user?.roles?.find(
    (r) => r?.appRole?.app?.tag?.toLowerCase() == "ams"
  );
  const lm = useUserStore.getState().limit;
  const pglimit = lm?.applicants;
  if (!pglimit) useUserStore.setState({ limit: { ...lm, applicants: 9 } });
  const search = new URL(request.url).searchParams.get("search") || "";
  const page = new URL(request.url).searchParams.get("page") || 1;
  const limit = new URL(request.url).searchParams.get("limit") || pglimit || 9;
  const group = ["ams clerk i", "ams admin i"].includes(
    amsRole?.appRole?.title?.toLowerCase()
  )
    ? "undergrad"
    : ["ams clerk ii", "ams admin ii"].includes(
        amsRole?.appRole?.title?.toLowerCase()
      )
    ? "postgrad"
    : "all";

  const data = await Service.fetchApplicants(search, page, group, limit);
  return { data, search, page };
}

function PgAMSApplicants({}: Props) {
  const [view, setView] = useState("card");
  const { data }: any = useLoaderData();

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle
        title="Applicants"
        createtext=""
        createlink=""
        pages={data?.totalPages}
        setView={setView}
        view={view}
      />
      <div className="">
        {view == "card" && (
          <div className="grid md:grid-cols-3 gap-3 md:gap-6">
            {data?.data &&
              data?.data?.map((row: any) => (
                <ApplicantCardItem key={row.id} data={row} />
              ))}
            {!data?.data?.length && (
              <div className="p-3 border rounded-xl">
                <h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">
                  No Records ...
                </h1>
              </div>
            )}
          </div>
        )}

        {/* {view == "list" && <ApplicantListView data={data} />} */}
      </div>
    </div>
  );
}

export default PgAMSApplicants;
