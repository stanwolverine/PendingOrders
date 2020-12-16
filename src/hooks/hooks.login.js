import { useContext, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { CommonContext } from '../contexts';
import OtpService from '../services/service.otp';

export function useFcmToken() {
	const [_, setCommonStore] = useContext(CommonContext);

	useEffect(() => {
		messaging()
			.getToken()
			.then((token) => setCommonStore({ type: 'SAVE_FCM_TOKEN', token }))
			.catch((error) => {
				console.log(error);
				ToastAndroid.show('Something Wrong Happened', ToastAndroid.LONG);
			});
	}, []);
}

export function useValidNumber(numberInputRef, isValidNumber) {
	const [commonStore] = useContext(CommonContext);

	useEffect(() => {
		if (isValidNumber) {
			numberInputRef.current?.blur();

			if (commonStore.fcmToken) {
				console.log('token:= ', commonStore.fcmToken);

				OtpService.sendOtp(commonStore.fcmToken)
					.then((res) => (res.ok ? res.text() : Promise.reject(res)))
					.then((data) => {
						console.log(data);
						ToastAndroid.show('OTP sent', ToastAndroid.LONG);
					})
					.catch((error) => {
						console.warn(error);
						ToastAndroid.show("Couldn't send OTP. Try again.", ToastAndroid.LONG);
						if (error instanceof Error) {
							console.warn(error);
						} else {
							error.text().then((data) => {
								console.warn(data);
							});
						}
					});
			} else {
				ToastAndroid.show("Couldn't send OTP. Restart app and try again.", ToastAndroid.LONG);
			}
		}
	}, [isValidNumber]);
}
