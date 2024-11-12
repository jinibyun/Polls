import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function PollDetails(){
    const { id } = useLocalSearchParams(); // please note file name [id].js  (this is a special way to pass parameter-->> dynamice pass parameter)
    
    return (
        <View>
            <Text>
                Poll Details : {id}
            </Text>
        </View>
    );
}

