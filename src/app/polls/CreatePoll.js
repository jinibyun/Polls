import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const createPoll = () => {
        console.log('create');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Create a Poll" }} />
            <Text style={styles.label}>Title</Text>
            <TextInput value={question} onChangeText={setQuestion} placeholder="Type your question here" style={styles.input} />

            <Text style={styles.label}>Options</Text>
            {/* <TextInput placeholder="Option 1" style={styles.input} />
            <TextInput placeholder="Option 2" style={styles.input} /> */}
            {options.map((option, index) => (
                <View style={{justifyContent:'center'}} key={index}>
                    <TextInput
                        value={option}
                        onChangeText={(text) => {
                            const updated = [...options];
                            updated[index] = text;
                            setOptions(updated);
                        }}
                        placeholder={`Option ${index + 1}`}
                        style={styles.input}
                    />
                    <Feather 
                        name="x" 
                        size={18} 
                        color="gray" 
                        style={{position : 'absolute', right:10}} 
                        onPress={() => {
                            const updated = [...options];
                            updated.splice(index, 1);
                            setOptions(updated);
                        }}
                    />
                </View>
            ))}

            <Button title='Add an option' onPress={() => setOptions([...options, ''])} />
            <Button title='Create a Poll' onPress={createPoll} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5
    },
    label: {
        fontWeight: '500',
        marginTop: 10
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    }
});