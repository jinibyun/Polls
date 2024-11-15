import { supabase } from 'lib/supabase';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext({
    session: null,
    user: null
});

export default function AuthProvider({children}){
    // ref: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []);

    const authContext = {
        session,
        user:session?.user,
      };

    return(
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

// to eariser access from other children component
export const useAuth = () => useContext(AuthContext);