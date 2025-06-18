import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export class AuthService {
  static async signUp(email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: credential.user, error: null };
    } catch (error: unknown) {
      return { user: null, error };
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: credential.user, error: null };
    } catch (error: unknown) {
      return { user: null, error };
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
      return { success: true, error: null };
    } catch (error: unknown) {
      return { success: false, error };
    }
  }
}
