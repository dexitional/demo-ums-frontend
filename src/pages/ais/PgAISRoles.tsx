import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import PageTitle from "../../components/ais/PageTitle";

type Props = {};
export async function action({ params }) {
  // await Service.deleteRole(params.roleId);
  return redirect("/ais/roles");
}

export async function loader() {
  // const data = await Service.fetchRoles();
  // return { data }
}

function PgAISRoles({}: Props) {
  const { data }: any = useLoaderData();

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle
        title="Roles"
        createtext="New Role"
        createlink="create"
        setView={() => null}
        view={""}
      />
      <div className="">{/* <RoleListView data={data} /> */}</div>
    </div>
  );
}

export default PgAISRoles;
