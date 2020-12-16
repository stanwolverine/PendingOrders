import { sendFcmNotification } from './service.fcm';

function instantiateOtpService() {
	let _otp = null;

	return {
		sendOtp: (token) => {
			_otp = parseInt(Math.random() * 10000);

			return sendFcmNotification(token, { title: `OTP: ${_otp}`, message: `Hello, Your login OTP is ${_otp}. Please don't share it with anyone.`, messageType: 'otp-notification' });
		},
		isValidOtp: (otp) => parseInt(otp) === _otp,
	};
}

export default instantiateOtpService();
