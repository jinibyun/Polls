import { Stack, useLocalSearchParams } from "expo-router";
import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import Feather from '@expo/vector-icons/Feather';

const poll = {
    question: 'React Native vs Flutter',
    options: [
        'React Native FTW',
        'Flutter',
        'SwiftUI'
    ]
}
export default function PollDetails() {
    const { id } = useLocalSearchParams(); // please note file name [id].js  (this is a special way to pass parameter-->> dynamice pass parameter)
    const [selected, setSelected] = useState('React Native FTW');

    const vote = () => {
        // console.log('vote ' + selected);
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: 'Poll Voting'
            }} />
            <Text style={styles.question}>
                {poll.question}
            </Text>
            <View style={{gap:5}}>
                {poll.options.map(option => (
                    <Pressable 
                        key={option} 
                        style={styles.optionContainer}
                        onPress={() => setSelected(option)}
                    >
                        <Feather name= {option === selected ? "check-circle": 'circle'} size={18} color={option === selected ? "green": 'gray'} />
                        <Text>{option}</Text>
                    </Pressable>
                ))}
            </View>
            <Button title="Vote" onPress={vote}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap:20
    },
    question: {
        fontSize: 20,
        fontWeight: '600',
    },
    optionContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius : 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
});