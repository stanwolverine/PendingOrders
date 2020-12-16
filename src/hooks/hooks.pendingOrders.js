import { useContext, useEffect } from 'react';
import Config from 'react-native-config';

import { PendingOrdersContext } from '../contexts';

export function usePendingOrders() {
	const [_, setPendingOrdersStore] = useContext(PendingOrdersContext);

	useEffect(() => {
		fetch('https://test.mioamoreshop.com/rest/V1/customapi/pending', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${Config.ORDERS_TOKEN}`,
				Accept: 'application/json',
			},
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((data) => {
				const parsedData = JSON.parse(data);
				if (parsedData.success) {
					console.table(parsedData.data);
					setPendingOrdersStore({ type: 'SET_PENDING_ORDERS_DATA', pendingOrdersData: parsedData.data });
				}
			})
			.catch((error) => {
				console.log(error);
				error.text().then((errorText) => console.log(errorText));
			})
			.finally(() => setPendingOrdersStore({ type: 'SET_LOADER_OFF' }));
	}, []);
}
