import React, { useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../screens/LogIn';
import PendingOrders from '../screens/PendingOrders';
import OrdersLocation from '../screens/OrdersLocation';
import { CommonContext, PendingOrdersContext } from '../contexts';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
	const [commonStore] = useContext(CommonContext);
	const [_, setPendingOrdersStore] = useContext(PendingOrdersContext);

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			console.log('Message handled in the foreground!', remoteMessage);

			const data = remoteMessage.data;

			PushNotification.localNotification({
				title: data.title,
				message: data.message,
				channelId: `${data.messageType}-channel`,
			});

			if (data.messageType === 'map-location-notification') {
				console.log(data);
				setPendingOrdersStore({
					type: 'SET_LOCATION_MARKER',
					marker: { region: { longitude: parseFloat(data.longitude), latitude: parseFloat(data.latitude) }, title: data.title, description: data.message },
				});
			}
		});

		return unsubscribe;
	}, []);

	return (
		<Stack.Navigator>
			{commonStore.isAuthenticated ? (
				<>
					<Stack.Screen name="PendingOrders" component={PendingOrders} options={{ title: 'Pending Orders' }} />
					<Stack.Screen name="OrdersLocation" component={OrdersLocation} options={{ title: 'Location' }} />
				</>
			) : (
				<Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
			)}
		</Stack.Navigator>
	);
};

export default MainAppNavigator;
