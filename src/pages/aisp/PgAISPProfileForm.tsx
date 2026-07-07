import moment from "moment";
import React, { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import SubPageTitle from "../../components/aisp/SubPageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};

// Save Form
export async function action({ request, params }) {
  const user = useUserStore.getState().user;
  const id = user?.user?.tag || 0;
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data.dob = moment(data.dob);
  data.entryDate = moment(data.entryDate);
  data.completeStatus = data.completeStatus == 1;
  data.deferStatus = data.deferStatus == 1;
  data.graduateStatus = data.graduateStatus == 1;
  delete data.indexno;

  let resp;
  if (id != 0) resp = await Service.updateStudent(id, data);
  else resp = await Service.postStudent(data);

  if (resp) {
    return redirect(`/aisp/profile`);
  }
}

// Load Data of Single
export async function loader() {
  const countries = await Service.fetchCountries();
  const regions = await Service.fetchRegions();
  const religions = await Service.fetchReligions();
  const disabilities = await Service.fetchDisabilities();
  const titles = await Service.fetchTitles();
  const programs = await Service.fetchProgramList();
  const majors = await Service.fetchMajorList();
  const user = useUserStore.getState().user;
  const data = await Service.fetchStudent(user?.user?.tag);

  return { data, countries, regions, religions, disabilities, titles, majors };
}

function PgAISPProfileForm({}: Props) {
  const navigate = useNavigate();
  const { data, countries, regions, religions, titles, majors }: any =
    useLoaderData();
  const [programId, setprogramId] = useState(data?.programId);

  return (
    <main className="p-2 md:pr-4 md:col-span-2 space-y-4">
      <SubPageTitle
        title={`${data?.id ? "Edit" : "Create"} Profile`}
        page="Student Profile"
      />
      <div className="p-2 border bg-slate-50/50 rounded-xl space-y-4">
        <section className="px-4 flex md:space-x-6">
          <div className="flex-1 flex flex-col space-y-1">
            <h1 className="text-lg md:text-lg tracking-wide font-semibold text-primary/70">
              {data?.id ? "Edit" : "Create"} Student Profile
            </h1>
            <div className="flex items-center space-x-2 text-zinc-400 text-base">
              <span className="text-xs md:tracking-wider">
                Please provide neccessary information
              </span>
            </div>
          </div>
        </section>

        <Form
          method="post"
          className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4"
        >
          {/* Record */}
          <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
            <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">
              Personal Information
            </h1>
            <div className="md:pl-6 space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Title
                </span>
                <select
                  arial-label="titleId"
                  name="titleId"
                  defaultValue={data?.titleId}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  {titles &&
                    titles?.map((row: any) => (
                      <option key={row.id} value={row.id}>
                        {row.label}
                      </option>
                    ))}
                </select>
              </label>

              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Phone Number
                </span>
                <input
                  arial-label="phone"
                  name="phone"
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  defaultValue={data?.phone}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Email Address
                </span>
                <input
                  arial-label="email"
                  name="email"
                  type="email"
                  defaultValue={data?.email}
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Hometown
                </span>
                <input
                  arial-label="hometown"
                  name="hometown"
                  defaultValue={data?.hometown}
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Residential Address
                </span>
                <textarea
                  arial-label="address"
                  name="address"
                  defaultValue={data?.address}
                  rows={2}
                  className="focus:ring-0 border focus:border-slate-300 border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                ></textarea>
              </label>
            </div>
          </div>

          <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
            {/* <h1 className="py-0.5 px-4 w-fit text-base font-semibold rounded-md bg-blue-950/60 text-white tracking-widest uppercase -skew-x-6">SECURE PORTAL</h1> */}
            <div className="md:pl-6 space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Ghana Card Number
                </span>
                <input
                  arial-label="ghcardNo"
                  name="ghcardNo"
                  defaultValue={data?.ghcardNo}
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                />
              </label>
            </div>

            <div className="md:pl-6 space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Religion
                </span>
                <select
                  arial-label="religionId"
                  name="religionId"
                  defaultValue={data?.religionId}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  {religions &&
                    religions?.map((row: any) => (
                      <option key={row.id} value={row.id}>
                        {row.title}
                      </option>
                    ))}
                </select>
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Region
                </span>
                <select
                  arial-label="regionId"
                  name="regionId"
                  defaultValue={data?.regionId}
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  {regions &&
                    regions?.map((row: any) => (
                      <option key={row.id} value={row.id}>
                        {row.title}
                      </option>
                    ))}
                </select>
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Country of Citizenship
                </span>
                <select
                  arial-label="countryId"
                  name="countryId"
                  defaultValue={data?.countryId}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected disabled>
                    -- Choose --
                  </option>
                  {countries &&
                    countries?.map((row: any) => (
                      <option key={row.id} value={row.id}>
                        {row.longName}
                      </option>
                    ))}
                </select>
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-sm md:text-base text-gray-500 font-medium">
                  Major
                </span>
                <select
                  arial-label="majorId"
                  name="majorId"
                  defaultValue={data?.majorId}
                  required
                  className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md"
                >
                  <option selected value="NONE">
                    -- NONE --
                  </option>
                  {majors &&
                    majors?.map((row: any) => {
                      if (programId == row.programId)
                        return (
                          <option key={row.id} value={row.id}>
                            {row.longName}
                          </option>
                        );
                      return null;
                    })}
                </select>
              </label>

              <div className="flex items-center">
                {/* <input type="hidden" name="studentId" defaultValue={data?.id} /> */}
                <button
                  className="mr-4 py-1 px-4 w-4/5 rounded-md bg-primary/70 text-white font-semibold"
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

export default PgAISPProfileForm;
