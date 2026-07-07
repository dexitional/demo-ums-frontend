import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { useUserStore } from "../../utils/authService";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";
import AISPLogoBox from "./AISPLogoBox";
import AISPNav from "./AISPNav";
import AISPRoleNav from "./AISPRoleNav";

type Props = {
  children?: React.ReactNode;
};

function AISPLayout({ children }: Props) {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const { logout, user } = useUserStore((state) => state);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header user={user} logout={logout} />
      <AISPRoleNav user={user} />
      <main className="w-full flex-1 flex flex-col md:overflow-y-scroll">
        <section className="md:mx-auto w-full md:max-w-7xl flex">
          <div className="md:fixed my-8 py-20 z-20 md:w-60 h-fit border-r-[12px] rounded-l-[4.5rem] rounded-r bg-primary/80 hidden md:flex flex-col space-y-3 overflow-hidden">
            <AISPLogoBox />
            <AISPNav user={user} />
          </div>
          <div className={`${loading && "overflow-hidden"} flex-1 md:ml-64`}>
            {loading && <Loader />}
            <Outlet />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AISPLayout;
