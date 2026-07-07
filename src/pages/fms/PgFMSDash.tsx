import React from "react";
import { useLoaderData } from "react-router-dom";
import PaymentDashStats from "../../components/fms/PaymentDashStats";
import PaymentODashStats from "../../components/fms/PaymentODashStats";
import { useUserStore } from "../../utils/authService";
import Service from "../../utils/fmsService";
const { REACT_APP_API_URL } = import.meta.env;

type Props = {};

// Loader for Single Project
export async function loader({ params }) {
  const data = await Service.loadDashboard();
  return { data };
}

function PgFMSDash({}: Props) {
  const { data }: any = useLoaderData();
  const { user } = useUserStore((state) => state);
  const fmsRole = user?.roles?.find(
    (r) => r?.appRole?.app?.tag?.toLowerCase() == "fms"
  );

  return (
    <main className="md:my-6 md:px-6 p-2 grid md:grid-cols-6 gap-4 font-inter">
      <section className="p-3 md:col-span-6 md:max-h-screen space-y-4 shadow-[0px_0px_10px_#ccc_inset] rounded-xl place-self-center overflow-auto scrollbar-hide">
        {/* Payment Statistics */}
        <PaymentDashStats data={data.feesPayment} />
        {/* Payment Statistics */}
        <PaymentODashStats data={data.otherPayment} />
      </section>

      {/* <section className="col-span-1 h-full rounded-xl">
        <div className="py-6 w-full flex flex-col justify-center items-center space-y-2 shadow rounded">
          <div className="p-3 flex justify-center items-center h-32 w-32 rounded-full border-2 border-slate-100  shadow-md overflow-hidden">
            <img
              src={`${REACT_APP_API_URL}/auth/photos/?tag=${user?.user?.tag}`}
              className="object-cover"
            />
          </div>
          <div className="px-4 text-xs text-center space-y-3">
            <h2 className="leading-4 uppercase font-sans font-medium">{user?.user?.fname?.toLowerCase()}{" "}{user?.user?.mname?.toLowerCase()}{" "}{user?.user?.lname?.toLowerCase()}</h2>
            <h3 className="text-xs font-bold font-noto">{aisRole?.appRole?.title?.toUpperCase()}</h3>
          </div>
        </div>
      </section> */}
    </main>
  );
}

export default PgFMSDash;
