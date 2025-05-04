import WelcomeOverlay from "@/components/Tour/WelcomeOverlay";
import { TourProvider } from "@/contexts/TourProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TourProvider config={{ forced: true }}>
      <Component {...pageProps} />
      <WelcomeOverlay />
    </TourProvider>
  );
}
