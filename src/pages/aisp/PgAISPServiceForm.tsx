import React from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import SubPageTitle from "../../components/aisp/SubPageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};

// Save Form
export async function action({ request, params }) {
  const id = params?.transwiftId || 0;
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  let resp;
  if (id != 0) resp = await Service.updateTranswift(id, data);
  else resp = await Service.postTranswift(data);

  if (resp) {
    return redirect(`/aisp/services`);
  }
}
// Load Data of Single
export async function loader({ params }) {
  let data = { id: 0 };
  const id = params?.transwiftId || 0;
  if (id != 0) data = await Service.fetchTranswift(id);
  return { data };
}

function PgAISPServiceForm({}: Props) {
  const navigate = useNavigate();
  const { data }: any = useLoaderData();
  const user = useUserStore((state) => state.user);

  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle
        title={`${data?.id ? "Update" : "Create"} Service Request`}
        page="Service Request"
      />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
        <section className="flex md:space-x-6">
          <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
            <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-blue-950/70">
              {data?.id ? "Update" : "Create"} Service Request
            </h1>
            <div className="flex items-center space-x-2 text-zinc-400 text-base">
              <span className="text-xs md:tracking-wider">
                Please provide neccessary information
              </span>
            </div>
          </div>
        </section>

        <Form method="post" className="grid">
          {/* Record */}
          <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
            <div className="md:p-6 space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Receipient's Postal address or Email address
                </span>
                <textarea
                  arial-label="receipient"
                  name="receipient"
                  defaultValue={data?.receipient}
                  required
                  rows={4}
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Mode of Delivery
                </span>
                <select
                  arial-label="mode"
                  name="mode"
                  defaultValue={data?.mode}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  <option value="PICKUP">PICKUP</option>
                  <option value="INLAND">INLAND MAIL</option>
                  <option value="FOREIGN">FOREIGN MAIL</option>
                </select>
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Document Type
                </span>
                <select
                  arial-label="version"
                  name="version"
                  defaultValue={data?.version}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  <option value="SOFTCOPY">SOFTCOPY</option>
                  <option value="HARDCOPY">HARDCOPY</option>
                </select>
              </label>

              <div className="flex items-center justify-between space-x-2">
                <button
                  className="py-1 px-4 w-4/5 rounded-md bg-primary/70 text-white font-semibold"
                  type="submit"
                >
                  SAVE
                </button>
                <button
                  onClick={() => {
                    if (confirm("Cancel")) navigate(-1);
                  }}
                  className="py-1 px-4 rounded-md  bg-slate-50 border text-sm text-gray-600"
                  type="button"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default PgAISPServiceForm;
