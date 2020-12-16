import OtpService from '../services/service.otp';
import Config from 'react-native-config';

export function login(otp) {
	if (OtpService.isValidOtp(otp)) {
		return fetch('https://test.mioamoreshop.com/rest/V1/integration/admin/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: Config.LOGIN_USERNAME, password: Config.LOGIN_PASSWORD }),
		})
			.then((res) => (res.ok ? res.text() : Promise.reject(res)))
			.catch((error) => {
				console.log(error);
				return Promise.reject('Oops! Something Went Wrong. Try again.');
			});
	}

	return Promise.reject('Incorrect OTP! Try again.');
}
