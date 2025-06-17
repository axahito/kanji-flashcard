import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export class AuthService {
  static async SignUp(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return credential.user;
  }

  static async SignIn(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    return credential.user;
  }

  static async SignOut() {
    await signOut(auth);
  }
}
