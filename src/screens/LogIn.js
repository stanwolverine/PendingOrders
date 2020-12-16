import React, { memo, useContext, useState, useRef } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native';

import { CommonContext } from '../contexts';
import { useFcmToken, useValidNumber } from '../hooks/hooks.login';
import { login } from '../actions/action.login';

function LogIn() {
	useFcmToken();
	const numberInputRef = useRef(null);
	const [_, setCommonStore] = useContext(CommonContext);
	const [number, setNumber] = useState('');
	const [otp, setOtp] = useState('');
	const [verifying, setVerifying] = useState(false);
	useValidNumber(numberInputRef, number.length === 10);

	const handleMobileNumber = (text) => {
		if (/^[0-9]*$/.test(text)) {
			setNumber(text);
		}
	};

	const handleOtp = (text) => {
		if (/^[0-9]*$/.test(text)) {
			setOtp(text);
		}
	};

	const handleSubmit = () => {
		setVerifying(true);

		login(otp)
			.then((token) => {
				console.log('token: ', token);
				setCommonStore({ type: 'AUTHENTICATION_SUCCESS' });
			})
			.catch((error) => {
				ToastAndroid.show(error, ToastAndroid.LONG);
				setVerifying(false);
			});
	};

	return (
		<View style={style.container}>
			<Text style={style.inputLabel}>Mobile Number</Text>
			<TextInput disabled={verifying} ref={numberInputRef} style={style.numberInput} value={number} onChangeText={handleMobileNumber} maxLength={10} keyboardType="phone-pad" />

			<Text style={style.inputLabel}>OTP</Text>
			<TextInput disabled={verifying} onEndEditing={handleSubmit} style={style.otpInput} value={otp} onChangeText={handleOtp} maxLength={4} keyboardType="phone-pad" />

			{verifying ? <ActivityIndicator size="small" color="#000000" /> : <Button title="Verify" disabled={number.length < 10} onPress={handleSubmit} color="#000000" />}
		</View>
	);
}

export default memo(LogIn);

const style = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ecf0f1', justifyContent: 'center', paddingHorizontal: 20 },
	inputLabel: { fontSize: 17, marginBottom: 5 },
	numberInput: { fontSize: 16, borderBottomColor: '#000000', borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10 },
	otpInput: { fontSize: 16, borderBottomColor: '#000000', borderBottomWidth: 1, paddingVertical: 5, marginBottom: 30 },
});
