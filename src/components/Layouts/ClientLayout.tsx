import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar/Sidebar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div
      className={`bg-[#F6F0F0] w-screen h-screen overflow-x-hidden no-scrollbar flex`}
    >
      <Sidebar />

      <main className="flex flex-col gap-[32px] px-[16px] py-[32px] lg:p-[32px] items-center justify-start lg:justify-center w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
