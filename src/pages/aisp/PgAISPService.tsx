import React from "react";
import SubPageTitle from "../../components/aisp/SubPageTitle";
// @ts-ignore
import moment from "moment";
import { TbEdit } from "react-icons/tb";
import { Link, useLoaderData } from "react-router-dom";
import Logo from "../../assets/img/logo/aucc/logo.png";
import Service from "../../utils/aisService";

type Props = {};

export async function loader({ params }) {
  const data = await Service.fetchTranswift(params.transwiftId);
  return { data };
}

function PgAISPService({}: Props) {
  const { data }: any = useLoaderData();
  return (
    <main className="md:pl-10 p-3 md:p-6 space-y-3 md:space-y-10">
      <SubPageTitle title={data?.title} page="Notice" />
      <div className="p-3 md:p-6 border bg-slate-50/50 rounded-xl md:space-y-6 space-y-6 ">
        <section className="relative flex space-x-2 md:space-x-6">
          <div className="hidden md:block p-2 md:p-2 h-16 w-16 md:h-24 md:w-24 border rounded-xl shadow-lg bg-white">
            <img
              src={Logo}
              className="h-12 w-12 md:h-20 md:w-20 object-contain"
            />
          </div>

          {!["COMPLETED", "PRINTED"].includes(data.status) && (
            <Link
              to={`edit`}
              className="p-1 md:py-1.5 md:px-2 absolute right-0 top-0 bg-slate-50 border border-gray-200 rounded flex"
            >
              {/* <span className="text-gray-400">EDIT</span> */}
              <TbEdit className="h-5 w-5 text-gray-300" />
            </Link>
          )}
          <div className="flex-1 flex flex-col space-y-4 md:space-y-3">
            <div className="flex space-x-2">
              <div className="block md:hidden p-2 md:p-4 h-16 w-16 border rounded-xl shadow-lg bg-white">
                <img src={Logo} className="h-12 w-12 object-contain" />
              </div>
              <h1 className="text-md md:text-3xl md:tracking-wide leading-5 font-semibold text-primary/70">
                {data?.transact?.transtype?.title}
              </h1>
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-zinc-400 text-lg">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 text-xs md:text-sm font-medium tracking-wider capitalize bg-primary rounded-md text-white">
                  {data?.status}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                <span className="tracking-wider text-xs md:text-base capitalize">
                  {data?.studentId}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 bg-white border border-primary/40 text-sm text-gray-500 relative">
                  {data?.student.fname}{" "}
                  {data?.student.mname ? data?.student.mname + " " : ""}
                  {data?.student.fname}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-y-2 ">
          <div className="p-2 w-full md:py-4 md:px-6 text-[0.65rem] md:text-xs text-gray-500 border rounded-md md:rounded-md bg-white grid grid-cols-1 md:grid-cols-5 space-y-4 md:space-y-0">
            <div className="space-y-2 md:space-y-4 md:col-span-2">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                {data.version == "HARDCOPY" ? "POSTAL" : "EMAIL"} ADDRESS
              </h2>
              <div className="px-4 font-bold italic">
                {data?.receipient || "-- NOT PROVIDED YET --"}
              </div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                DELIVERY MODE
              </h2>
              <div className="px-4 font-bold italic">{data?.mode}</div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                DOCUMENT TYPE
              </h2>
              <div className="px-4 font-bold italic">{data?.version}</div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                QUANTITY
              </h2>
              <div className="px-4 font-bold italic">{data?.quantity}</div>
            </div>
          </div>
          <div className="p-2 w-full md:py-4 md:px-6 text-[0.65rem] md:text-xs text-gray-500 border rounded-md md:rounded-md bg-white grid grid-cols-1 md:grid-cols-5 space-y-4 md:space-y-0">
            <div className="space-y-2 md:space-y-4 md:col-span-2">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                TRANSACTION ID
              </h2>
              <div className="px-4 font-bold italic">
                {data?.transact?.transtag}
              </div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                PAYMENT AMOUNT
              </h2>
              <div className="px-4 font-bold italic">
                {data?.transact?.amount}
              </div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="px-3 md:px-4 py-0.5 md:py-1 w-fit order-2 md:order-1 bg-primary/80 text-white font-medium font-roboto tracking-wider rounded-tr-xl rounded-bl-xl">
                PAYMENT DATE
              </h2>
              <div className="px-4 font-bold italic">
                {data?.transact?.createdAt &&
                  moment(data?.transact?.createdAt).format("LL")}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PgAISPService;
