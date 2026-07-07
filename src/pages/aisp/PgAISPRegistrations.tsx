import React, { useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { GrDocumentLocked } from "react-icons/gr";
import { redirect, useLoaderData } from "react-router-dom";
import RegistrationListView from "../../components/aisp/RegistrationListView";
import RegistrationSlipView from "../../components/aisp/RegistrationSlipView";
import PageTitle from "../../components/las/PageTitle";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";

type Props = {};

export async function loader() {
  const user = useUserStore.getState().user;
  const data = await Service.fetchRegistrationMount(user?.user?.tag);
  const slip = await Service.fetchRegistration(user?.user?.tag);
  const student = await Service.fetchStudent(user?.user?.tag);
  const fees = await Service.fetchStudentFinance(user?.user?.tag);
  
  if (student?.completeStatus) {
    toast("Program completed 💥💥💥", { className: "text-xl text-primary-dark" });
    return redirect("/aisp/profile");
  }
  return { data, slip, student, fees };
}

function PgAISPRegistrations({}: Props) {
  const { data, slip, student, fees }: any = useLoaderData();
  const runDefault = () => {
    // Update Compulsory & Locked Courses
    const cdata = data?.courses
      ?.filter((row: any) => row.type == "C" || (row.type == "E" && row.lock))
      ?.map((row: any) => row.code);
    useUserStore.setState({ courses: cdata });
  };
  const sum = fees?.reduce((sum: any, cur: any) => cur.amount + sum, 0);
  useLayoutEffect(() => runDefault(), []);

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <div className="space-y-6">
        <PageTitle
          title="Registration"
          createtext=""
          createlink=""
          setView={() => null}
          view={""}
        />
        {/* If Student Not Owing Registration */}
        {/* {!slip?.length && (sum <= 0 || student?.flagPardon) ? ( */}
        {!slip?.length ? (
          <RegistrationListView
            title={`${data?.session?.toUpperCase()} REGISTRATION PROCEDURE !!`}
            data={data}
          />
        // ) : sum <= 0 || student?.flagPardon ? (
        ) : (
          <RegistrationSlipView
            title={`${data?.session?.toUpperCase()} REGISTRATION SLIP`}
            data={slip}
          />
        // ) : null}
        )}

        {/* If Student Owning */}
        {/* {sum > 0 && !student?.flagPardon ? (
          <div className="px-4 py-4 md:pl-6 md:pr-10 md:py-6 md:w-fit border rounded-xl shadow flex ">
            <GrDocumentLocked className="hidden md:flex md:h-20 md:w-32 text-primary-dark" />
            <div className="flex flex-col">
              <h2 className="text-base md:text-2xl font-roboto text-primary-dark uppercase">
                Registration of courses disabled
              </h2>
              <h3 className="text-sm md:text-lg font-roboto">
                Sorry You have an accrued Debt of{" "}
                <b>
                  {fees && fees[0]?.currency} {sum.toFixed(2) || 0}
                </b>
              </h3>
              <p className="text-xs md:text-base italic font-roboto">
                Please contact the <b>Finance office</b> to resolve any debt
                related issues with your receipts.
              </p>
            </div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default PgAISPRegistrations;
