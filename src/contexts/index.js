import React, { memo, createContext, useReducer } from 'react';

import { CommonReducer, COMMON_INITIAL_STATE } from './reducers/reducer.common';
import { PendingOrdersReducer, PENDING_ORDERS_INITIAL_STATE } from './reducers/reducer.pendingOrders';

export const CommonContext = createContext(COMMON_INITIAL_STATE);
export const PendingOrdersContext = createContext(PENDING_ORDERS_INITIAL_STATE);

const Store = (props) => {
	const commonReducer = useReducer(CommonReducer, COMMON_INITIAL_STATE);
	const pendingOrdersReducer = useReducer(PendingOrdersReducer, PENDING_ORDERS_INITIAL_STATE);

	return (
		<CommonContext.Provider value={commonReducer}>
			<PendingOrdersContext.Provider value={pendingOrdersReducer}>{props.children}</PendingOrdersContext.Provider>
		</CommonContext.Provider>
	);
};

export default memo(Store);
