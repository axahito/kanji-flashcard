import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Only initialize once (important for hot reload in dev)
const firebaseConfig = {
  apiKey: "AIzaSyDhrGIKqEhJ4E6ZGdLLzPGBMGB7s8oPNAs",
  authDomain: "karyuusaiverse.firebaseapp.com",
  projectId: "karyuusaiverse",
  storageBucket: "karyuusaiverse.firebasestorage.app",
  messagingSenderId: "162652014015",
  appId: "1:162652014015:web:66c1704c78f72935cbcd0a",
  measurementId: "G-YWLTSBL8DK",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Only use analytics if window is defined (browser check)
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

const auth = getAuth(app);

export { auth };
