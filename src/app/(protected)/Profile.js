import { Redirect } from "expo-router";
import { supabase } from "lib/supabase";
import { useAuth } from "providers/AuthProvider";
import React from "react";
import { View, Text, Button } from "react-native";

export default function Profile() {
    const {user} = useAuth();
    
    return (
        <View>
            <Text>
                User Id: {user?.id}
            </Text>

            <Button title="sign out" onPress={()=> supabase.auth.signOut()} />
        </View>
    )
}