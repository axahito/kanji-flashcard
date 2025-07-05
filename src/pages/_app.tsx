import WelcomeOverlay from "@/components/Tour/WelcomeOverlay";
import { AuthProvider } from "@/contexts/AuthProvider";
import { TourProvider } from "@/contexts/TourProvider";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <TourProvider config={{ forced: true }}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
        <WelcomeOverlay />
      </AuthProvider>
    </TourProvider>
  );
}
