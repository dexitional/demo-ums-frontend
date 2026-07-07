import React from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { useUserStore } from "../../utils/authService";
import Footer from "../Footer";
import Header from "../Header";
import AISLogoBox from "./AISLogoBox";
import AISNav from "./AISNav";
import AISRoleNav from "./AISRoleNav";

type Props = {
  children?: React.ReactNode;
};

function AISLayout({ children }: Props) {
  const navigation = useNavigation();
  const location = useLocation();
  const loading = navigation.state === "loading";
  const pathname: any = navigation.location?.pathname;

  const { logout, user } = useUserStore((state) => state);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header user={user} logout={logout} />
      <AISRoleNav user={user} />
      <main className="w-full flex-1 flex flex-col md:overflow-y-scroll">
        <section className="md:mx-auto w-full md:max-w-7xl flex">
          <div className="z-20 w-64 h-full bg-gradient-to-r from-white to-primary/5 bg-opacity-5 hidden md:flex flex-col space-y-1">
            <AISLogoBox />
            <AISNav user={user} />
          </div>
          <div className={`${loading && "overflow-hidden"} flex-1`}>
            {/* { loading &&
            <Loader>
               <Outlet />
            </Loader>
             } */}
            {/* { !loading && <Outlet /> } */}
            {/* <Loader><Outlet /></Loader> */}
            {/* { AllowedPaths.includes(pathname) && <div><Outlet /></div> } */}
            <Outlet key={location.pathname} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AISLayout;
