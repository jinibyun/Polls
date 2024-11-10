import React from "react";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

const polls = [1, 2, 3];

export default function HomeScreen() {
	return (
		<>
			<Stack.Screen options={{
				title: 'Polls',
				headerStyle:{
					backgroundColor: '#f4511e'
				},
				headerTintColor : '#fff',
				headerTitleStyle:{
					fontWeight: 'bold'
				}
			}} />
			<FlatList
				data={polls}
				style={{ backgroundColor: 'gainsboro' }}
				contentContainerStyle={styles.container}
				renderItem={() => (
					<View style={styles.pollContainer}>
						<Text style={styles.pollTitle}>Example poll question</Text>
					</View>
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
