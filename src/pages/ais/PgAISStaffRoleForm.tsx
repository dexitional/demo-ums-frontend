import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Service from "../../utils/aisService";

type Props = {};

// Save Form
export async function action({ request, params }) {
  const id = params?.staffId || 0;
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data.staffNo = id;
  let resp = await Service.postUserRole(data);

  if (resp) {
    return redirect(`/ais/staff/${encodeURIComponent(id)}/roles`);
  }
}
// Load Data of Single
export async function loader({ params }) {
  const roles = await Service.fetchAppRoleList();
  return { roles };
}

function PgAISStaffRoleForm({}: Props) {
  const navigate = useNavigate();
  const { roles }: any = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation?.state;

  return (
    <main className="p-2 md:py-4">
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
        <section className="flex md:space-x-6">
          <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
            <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary/70">
              Add User Role
            </h1>
          </div>
        </section>

        <Form
          method="post"
          className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4"
        >
          {/* Record */}
          <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
            <div className="space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Roles
                </span>
                <select
                  arial-label="appRoleId"
                  name="appRoleId"
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  {roles &&
                    roles
                      ?.filter(
                        (r) =>
                          ![
                            "ais techlead",
                            "fms techlead",
                            "ams techlead",
                          ].includes(r?.title?.toLowerCase())
                      )
                      .map((row: any) => (
                        <option key={row.id} value={row.id}>
                          {row?.title?.toUpperCase()} - [{" "}
                          {row?.description?.toUpperCase()} ]
                        </option>
                      ))}
                </select>
              </label>
            </div>
          </div>

          <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
            <div className="space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">Meta Description</span>
                <input
                  arial-label="roleMeta"
                  name="roleMeta"
                  readOnly={true}
                  className="focus:ring-0 border focus:border-slate-300 read-only:bg-gray-100 read-only:cursor-none  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>

              <div className="flex items-center">
                {/* <input type="hidden" name="studentId" defaultValue={data?.id} /> */}
                <button
                  disabled={loading === "submitting"}
                  className="mr-4 py-1 px-4 w-4/5 rounded-md bg-primary/70 text-white font-semibold disabled:opacity-50 disabled:animate-pulse"
                  type="submit"
                >
                  {loading === "submitting" ? (
                    <span className="animate-pulse">SAVING ...</span>
                  ) : (
                    " SAVE"
                  )}
                </button>
                <button
                  disabled={loading === "submitting"}
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

export default PgAISStaffRoleForm;
