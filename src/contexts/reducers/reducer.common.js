export const COMMON_INITIAL_STATE = {
	isAuthenticated: false,
	fcmToken: '',
};

export const CommonReducer = (state = COMMON_INITIAL_STATE, action) => {
	let newState = Object.assign({}, state);

	if (action.type === 'AUTHENTICATION_SUCCESS') {
		newState.isAuthenticated = true;
		return newState;
	}

	if (action.type === 'SAVE_FCM_TOKEN') {
		newState.fcmToken = action.token;
		return newState;
	}

	return state;
};
