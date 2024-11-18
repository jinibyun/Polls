import { Stack, useLocalSearchParams } from "expo-router";
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Pressable, Button, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator } from "react-native";
import { supabase } from "lib/supabase";
import { useAuth } from "providers/AuthProvider";

export default function PollDetails() {
    const { id } = useLocalSearchParams(); // please note file name [id].js  (this is a special way to pass parameter-->> dynamice pass parameter)
    const [selected, setSelected] = useState('');
    const [poll, setPoll] = useState(null);
    const [userVote, setUserVote] = useState(null);

    const { user } = useAuth();
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

        // fetch user's vote
        const fetchUserVote = async() => {
            let { data, error } = await supabase
				.from('vote')
				.select('*')
                .eq('poll_id', +id)
                .eq('user_id', user.id)
                //.limit(1)
                .single();
			// if (error) {
			// 	Alert.alert(error + ' -- Error fetching user vote');
			// 	//console.log(error);
			// }
            //console.log(data)
			setUserVote(data);
            if(data){
                setSelected(data.option);
            }
        }

        fetchUserVote();
		fetcthPolls();
	}, []);
    
    const vote = async () => {
        // ref: https://supabase.com/dashboard/project/atlcphyotrpwzdvkomqj/editor/32791?schema=public
        const newVote ={
            option: selected,
            poll_id: poll.id,
            user_id: user.id
        }
        if(userVote){
            newVote.id = userVote.id;
        }

        const { data, error } = await supabase
        .from('vote')
        // .insert([
        // { option: selected, poll_id: poll.id, user_id: user.id },
        // ])
        .upsert([newVote])
        .select().single();

        if(error){
            Alert.alert('Failed to vote');
        } else{
            setUserVote(data);
            Alert.alert('Thank you for your vote');
        }
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