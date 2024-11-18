import { Stack, useLocalSearchParams } from "expo-router";
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Pressable, Button, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator } from "react-native";
import { supabase } from "lib/supabase";

export default function PollDetails() {
    const { id } = useLocalSearchParams(); // please note file name [id].js  (this is a special way to pass parameter-->> dynamice pass parameter)
    const [selected, setSelected] = useState('');
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        console.log(id);
		const fetcthPolls = async () => {
			// console.log('fetching....');
			// ref: https://supabase.com/dashboard/project/atlcphyotrpwzdvkomqj/editor/29023?schema=public
			let { data, error } = await supabase
				.from('polls')
				.select('*').eq('id', +id).single();
			if (error) {
				Alert.alert(error + ' -- Error fetching data');
				//console.log(error);
			}
            console.log(data)
			setPoll(data);
		};

		fetcthPolls();
	}, []);
    
    const vote = () => {
        // console.log('vote ' + selected);
    }

    if(!poll){
        return <ActivityIndicator />;
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