import { Redirect, router, Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useAuth } from "providers/AuthProvider";
import { supabase } from "lib/supabase";

export default function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const createPoll = async () => {
        setError('');
        if(!question){
            setError('Please provide the question');
            return;
        }
        const validOptions = options.filter(x => !!x);
        if(validOptions.length < 2 ){
            setError('Please provide at least two valid options');
            return;
        }

        // ref: https://supabase.com/dashboard/project/atlcphyotrpwzdvkomqj/editor/29023?schema=public
        const { data, error } = await supabase
        .from('polls')
        .insert([
        { question, options: validOptions },
        ])
        .select();

        if (error){
            Alert.alert('Failed to create the poll');
            console.log(error);
            return;
        }

        router.back();

        console.log('create');
    }
    if(!user){
        return <Redirect href="/Login" />
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
            <Text style={{color:'crimson'}}>{error}</Text>
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