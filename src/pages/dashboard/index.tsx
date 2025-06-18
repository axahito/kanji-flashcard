import ClientLayout from "@/components/Layouts/ClientLayout";
import React, { ReactElement } from "react";

export default function Dashboard() {
  return <div>index</div>;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
