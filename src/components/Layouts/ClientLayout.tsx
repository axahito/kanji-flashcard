import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`bg-[#F6F0F0] w-screen h-screen overflow-x-hidden no-scrollbar`}
    >
      <Navbar />
      Client Layout

      <main className="flex flex-col gap-[32px] px-[16px] py-[32px] lg:p-[32px] items-center justify-start lg:justify-center w-full h-full">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ClientLayout;
