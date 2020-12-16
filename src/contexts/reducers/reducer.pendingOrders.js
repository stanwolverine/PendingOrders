export const PENDING_ORDERS_INITIAL_STATE = {
	locationMarkers: [],
	loading: true,
	paymentMethods: {},
	storeName: '',
	storeData: {},
	orderData: [],
	totalCount: 0,
};

export const PendingOrdersReducer = (state = PENDING_ORDERS_INITIAL_STATE, action) => {
	let newState = Object.assign({}, state);

	if (action.type === 'SET_PENDING_ORDERS_DATA') {
		newState.paymentMethods = action.pendingOrdersData.payment_methods;
		newState.storeName = action.pendingOrdersData.store_name;
		newState.storeData = action.pendingOrdersData.store_data;
		newState.orderData = action.pendingOrdersData.order_data;
		newState.totalCount = action.pendingOrdersData.total_count;
		return newState;
	}

	if (action.type === 'SET_LOADER_OFF') {
		newState.loading = false;
		return newState;
	}

	if (action.type === 'CLEAR_LOCATION_MARKERS') {
		newState.locationMarkers = [];
		return newState;
	}

	if (action.type === 'SET_LOCATION_MARKER') {
		newState.locationMarkers = [...state.locationMarkers, action.marker];
		return newState;
	}

	return state;
};
