import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import MatriculantCardItem from "../../components/ams/MatriculantCardItem";
import PageTitle from "../../components/ams/PageTitle";
import Service from "../../utils/amsService";
import { useUserStore } from "../../utils/authService";
type Props = {};

export async function action({ params }) {
  await Service.deleteMatriculant(params.matriculantId);
  return redirect("/ams/matriculants");
}

export async function loader({ request }) {
  const { user } = useUserStore.getState();
  const amsRole = user?.roles?.find(
    (r) => r?.appRole?.app?.tag?.toLowerCase() == "ams"
  );

  const lm = useUserStore.getState().limit;
  const pglimit = lm?.matriculants;
  if (!pglimit) useUserStore.setState({ limit: { ...lm, matriculants: 9 } });
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

  const data = await Service.fetchMatriculants(search, page, group, limit);
  return { data, search, page };
}

function PgAMSMatriculants({}: Props) {
  const [view, setView] = useState("card");
  const { data }: any = useLoaderData();

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle
        title="Matriculants"
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
                <MatriculantCardItem key={row.id} data={row} />
              ))}
            {!data?.data && (
              <div className="p-3 border rounded-xl">
                <h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">
                  No Records ...
                </h1>
              </div>
            )}
          </div>
        )}

        {/* { view == 'list' && (
           <MatriculantListView data={data} />
         )} */}
      </div>
    </div>
  );
}

export default PgAMSMatriculants;
