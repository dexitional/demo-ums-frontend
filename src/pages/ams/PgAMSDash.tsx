import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GiFiles } from "react-icons/gi";
import { LuReceiptCent } from "react-icons/lu";
import { MdOutlineReceipt, MdReceipt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";
import DashPillet from "../../components/ams/DashPillet";
import ProgramStatPill from "../../components/ams/ProgramStatPill";
import Service from "../../utils/amsService";
import { useUserStore } from "../../utils/authService";
const { REACT_APP_API_URL } = import.meta.env;

type Props = {};

// Loader for Single Project
export async function loader({ params }) {
  const data = await Service.fetchDashboard();
  return { data };
}

function PgAMSDash({}: Props) {
  const { data }: any = useLoaderData();
  const { user } = useUserStore((state) => state);
  const amsRole = user?.roles?.find(
    (r) => r?.appRole?.app?.tag?.toLowerCase() == "ams"
  );

  console.log(data);

  return (
    <main className="md:my-6 md:px-6 p-2 grid md:grid-cols-6 gap-4 font-inter">
      <section className="md:col-span-5 md:max-h-screen shadow-[0px_0px_10px_#ccc_inset] rounded-xl place-self-center overflow-auto scrollbar-hide">
        {/* Main Statistics */}
        <div className="m-2 md:m-4 md:w-fit min-h-fit bg-[#1e1d22] rounded-xl flex flex-col justify-between items-center">
          <div className="pt-6 px-6 w-full self-start flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="px-3 md:px-6 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">
              {data?.session}
            </h1>
            <div className="px-4 py-1 bg-[#fbfd8e] rounded-lg">
              <p className="text-xs">VOUCHER SALES</p>
              <h3 className="font-poppins font-bold text-gray-700">
                GHC {data?.general?.sale}
              </h3>
            </div>
          </div>
          <div className="p-3 md:p-6 md:w-fit grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-3">
            <DashPillet
              label="Applicant"
              value={data?.general?.applicant}
              Icon={GiFiles}
              iconBg="bg-[#fbfd8e]"
            />
            <DashPillet
              label="Shortlist"
              value={data?.general?.sort}
              Icon={AiOutlineFileSearch}
              iconBg="bg-[#fdc6ee]"
            />
            <DashPillet
              label="Admitted"
              value={data?.general?.fresher}
              Icon={PiStudentBold}
              iconBg="bg-[#8efdb4]"
            />
            <DashPillet
              label="Vouchers"
              value={data?.general?.voucher}
              Icon={MdReceipt}
              iconBg="bg-[#ffcb85]"
            />
            <DashPillet
              label="Sold Voucher"
              value={data?.general?.sold}
              Icon={LuReceiptCent}
              iconBg="bg-[#fdc6ee]"
            />
            <DashPillet
              label="Voucher Left"
              value={data?.general?.unsold}
              Icon={MdOutlineReceipt}
              iconBg="bg-[#fdc6ee]"
            />
          </div>
        </div>

        {/* Roles Description */}
        {/* <div className="m-2 md:m-4 p-3 md:p-6 flex flex-col space-y-4 rounded-xl shadow-[0px_0px_5px_#bbb] bg-primary-dark/10">
          <h2 className="px-6 py-1.5 w-fit rounded-xl bg-[#fbfd8e] font-semibold font-poppins tracking-wider">
            ROLES DESCRIPTION</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab officia
            voluptates consequuntur debitis facere nulla, asperiores quae unde
            fugit sint cum blanditiis fugiat molestias eaque totam numquam
            aperiam ex vel quia dolore.
          </p>
        </div> */}

        {/* Program Statistics */}
        <div className="w-full">
          {data?.program?.map((r: any, i: number) => (
            <ProgramStatPill key={i} data={r} />
          ))}
        </div>
      </section>

      <section className="col-span-1 h-full rounded-xl">
        <div className="py-6 w-full flex flex-col justify-center items-center space-y-2 shadow rounded">
          {/* Image */}
          <div className="p-3 flex justify-center items-center h-32 w-32 rounded-full border-2 border-slate-100  shadow-md overflow-hidden">
            <img
              src={`${REACT_APP_API_URL}/auth/photos/?tag=${user?.user?.tag}`}
              className="object-cover"
            />
          </div>
          <div className="px-4 text-xs text-center space-y-3">
            <h2 className="leading-4 uppercase font-sans font-medium">
              {user?.user?.fname?.toLowerCase()}{" "}
              {user?.user?.mname?.toLowerCase()}{" "}
              {user?.user?.lname?.toLowerCase()}
            </h2>
            <h3 className="text-xs font-bold font-noto">
              {amsRole?.appRole?.title?.toUpperCase()}
            </h3>
          </div>
        </div>
        <div className="p-3 my-6 space-y-2">
          {/* <div className="px-4 py-2  rounded shadow flex items-center justify-center text-center">
            Profile
          </div>
          <div className="px-4 py-2  rounded shadow flex items-center justify-center text-center">
            Activity
          </div> */}
          {/* <div className="px-4 py-2  rounded shadow flex items-center justify-center text-center hover:shadow cursor-pointer">
            Logout
          </div> */}
          <div></div>
        </div>
      </section>
    </main>
  );
}

export default PgAMSDash;
