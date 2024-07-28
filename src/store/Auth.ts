import { account } from "@/models/client/config";
import { AppwriteException, ID,Models } from "appwrite";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface UserPrefs {
    reputation: number
}

export interface IAuthStore {
    session: Models.Session | null;
    jwt: string | null
    user: Models.User<UserPrefs> | null
    hydrated: boolean

    setHydrated(): void;
    verifySession(): Promise<void>;
    login(
        email: string,
        password: string,
    ): Promise<{success: boolean; 
        error?: AppwriteException | null
    }>
    createAccount(
        name: string,
        email: string,
        password: string,
    ): Promise<{success: boolean; 
        error?: AppwriteException | null
    }>
    logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
     immer((set) => ({
        session:null,
        jwt:null,
        user:null,
        hydrated:false,

        setHydrated() {
            set({hydrated:true})
        },

        async verifySession() {
            try {
                const session = await account.getSession("current");
                set({session})

            } catch (error) {
                console.log(error);
                
            }
        },
        async login(email: string, password: string) {
            try {
                const session=await account.createEmailPasswordSession(email,password);
                const [user,{jwt}] = await Promise.all([
                    account.get<UserPrefs>(),
                    account.createJWT(),

                ])
                if(!user.prefs?.reputation)
                    await account.updatePrefs<UserPrefs>({
                        reputation: 0
                    })

                    set({session,user,jwt});
                return {success: true}
            } catch (error) {
                console.log(error);

                return {
                    success: false,
                    error: error instanceOf AppwriteException ?
                    error: null,
                }
                
            }
        },

        async createAccount(name: string,email: string,password: string) {
            try {
                await account.create(ID.unique(), email, password, name)
                return {success: true}
            } catch (error) {
                console.log(error);

                return {
                    success: false,
                    error: error instanceOf AppwriteException ? error: null,
                }
                
            }
        },
        async logout() {

        }
     })),
     {
        name: "auth",
        onRehydrateStorage() {
            return (state,error) => {
                if(!error) state?.setHydrated()
            }
        }
     }
    )
) 