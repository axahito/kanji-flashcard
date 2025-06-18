// context/AuthContext.tsx
import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Profile } from "@/types/User";
import { UserService } from "@/services/users";
import { AuthService } from "@/services/auth";

const AuthContext = createContext<{
  user: User | null;
  profile: Profile | null;
  logout: () => Promise<void>;
}>({ user: null, profile: null, logout: () => Promise.resolve() });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const { user: userData, error } = await UserService.fetchUser(
            firebaseUser.uid
          );
          if (!userData || error) {
            throw error;
          }

          setProfile({
            email: userData?.email,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            createdAt: userData?.createdAt,
            updatedAt: userData?.updatedAt,
            deletedAt: userData?.deletedAt,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      const { error } = await AuthService.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
