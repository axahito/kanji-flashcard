import { db } from "@/lib/firebase";
import { CreateUser, User } from "@/types/User";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export class UserService {
  static async createUser({ uid, email, firstName, lastName }: CreateUser) {
    try {
      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        firstName,
        lastName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deletedAt: null,
      });

      return { success: true, error: null };
    } catch (error: unknown) {
      return {
        success: false,
        error,
      };
    }
  }

  static async fetchUser(uid: string) {
    try {
      if (!uid?.trim()) {
        throw new Error("Invalid user ID");
      }

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return { user: null, error: null }; // not found
      }

      return {
        user: docSnap.data() as User,
        error: null,
      };
    } catch (error: unknown) {
      return {
        user: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}
