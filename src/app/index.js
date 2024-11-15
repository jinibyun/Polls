import React, { useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from "lib/supabase";

// const polls = [
// 	{ id: 1 },
// 	{ id: 2 },
// 	{ id: 3 },
// ];

export default function HomeScreen() {
	const [polls, setPolls] = useState([]);

	//console.log(process.env.EXPO_PUBLIC_SUPABASE_URL);
	useEffect(() => {
		const fetcthPolls = async () => {
			// console.log('fetching....');
			// ref: https://supabase.com/dashboard/project/atlcphyotrpwzdvkomqj/editor/29023?schema=public
			let { data, error } = await supabase
				.from('polls')
				.select('*');
			if(error){
				Alert.alert(error + ' -- Error fetching data');
				//console.log(error);
			}
			//console.log(data);
			setPolls(data);
		};

		fetcthPolls();
	}, []);

	return (
		<>
			<Stack.Screen options={{
				title: 'Polls',
				headerStyle: {
					backgroundColor: '#f4511e'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				},
				// headerRight: () => (
				// 	<Link href={"/polls/CreatePoll"}>
				// 		<AntDesign name="plus" size={20} color="black" />
				// 	</Link>
				// ),
				headerRight: () => (
					<AntDesign onPress={() => router.push("/polls/CreatePoll")} name="plus" size={20} color="black" />
				),
			}} />
			<FlatList
				data={polls}
				// style={{ backgroundColor: 'gainsboro' }}
				contentContainerStyle={styles.container}
				renderItem={({ item }) => (
					<Link href={`/polls/${item.id}`} style={styles.pollContainer}>
						<Text style={styles.pollTitle}>
							{item.id} : Example poll question
						</Text>
					</Link>
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 5
	},
	pollContainer: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
	},
	pollTitle: {
		fontWeight: 'bold',
		fontSize: 16
	}
});
