import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import App from './App';
import { name as appName } from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage);

	if (!!remoteMessage.notification) return;

	PushNotification.localNotification({
		title: remoteMessage.data.title,
		message: remoteMessage.data.message,
		channelId: `${remoteMessage.data.messageType}-channel`,
	});
});

AppRegistry.registerComponent(appName, () => App);
