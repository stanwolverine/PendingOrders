import Config from 'react-native-config';

export function sendFcmNotification(token, data = {}) {
	return fetch('https://fcm.googleapis.com/fcm/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `key=${Config.FCM_SERVER_KEY}`,
		},
		body: JSON.stringify({
			to: token,
			data,
			priority: 'high',
		}),
	});
}
