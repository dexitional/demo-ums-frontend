import React from "react";
// @ts-ignore
import { useNavigate, useRouteError } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useUserStore } from "../utils/authService";

function Error() {
  const { user, logout } = useUserStore((state) => state);
  const navigate = useNavigate();
  let error: any = useRouteError();
  console.log(error);

  if (error.status == "401") {
    // If token expired
    logout();
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header user={user} logout={logout} />
      <main className="w-full flex-1 flex flex-col overflow-y-scroll">
        <section className="mx-auto py-6 w-full max-w-6xl space-y-2">
          {/* <h1 className="px-6 md:px-0 text-zinc-400 font-medium md:font-semibold md:text-xl">Browse By Services</h1> */}
          <div className="p-3 md:p-0 w-full bg-blue-50/50 md:bg-transparent grid grid-cols-1 gap-y-4">
            {/* <ServiceCard title="General Elections Portal" Icon={GiVote} link="" />  */}
            <div>{error}</div>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded bg-red-50/30 font-medium text-base"
            >
              Error Occurred, Please try again
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Error;
