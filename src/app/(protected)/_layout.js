import { Redirect, Slot } from "expo-router";
import { useAuth } from "providers/AuthProvider";
import React from "react";

export default function ProtectedLayout(){
    const {isAuthenticated} = useAuth();
    
    if(isAuthenticated){
        return <Redirect href="/Profile" />
    } 
    
    return (
        <Slot />
    )
}