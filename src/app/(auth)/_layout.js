import { Redirect, Slot } from "expo-router";
import { useAuth } from "providers/AuthProvider";
import React from "react";

export default function AuthLayout(){
    const {user} = useAuth();
    
    if(user){
        return <Redirect href="/Profile" />
    }
    
    return (
        <Slot />
    )
}