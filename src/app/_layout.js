import { Slot, Stack, Tabs } from 'expo-router';
import AuthProvider from 'providers/AuthProvider';
import React from 'react';

// for all glbal configuration. global provider. It IS pre-defined by expo-router: it means "index.js" will be wrpped up "inside" this component
export default function RootLayout(){
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name ='(auth)' options={{ title: 'Login'}} />
            </Stack> 
        </AuthProvider>
    );
}