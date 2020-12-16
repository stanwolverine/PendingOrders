import React, { memo, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { PendingOrdersContext } from '../contexts';
import { usePendingOrders } from '../hooks/hooks.pendingOrders';
import PendingOrderItem from '../components/PendingOrderItem';

function PendingOrders() {
	const [pendingOrdersStore] = useContext(PendingOrdersContext);
	usePendingOrders();

	return (
		<View style={styles.container}>
			{pendingOrdersStore.loading ? (
				<ActivityIndicator size="large" color="#000000" />
			) : pendingOrdersStore.orderData.length === 0 ? (
				<Text>No Data Available</Text>
			) : (
				<FlatList initialNumToRender={20} renderItem={_renderItem} keyExtractor={_keyExtractor} style={styles.listStyle} data={pendingOrdersStore.orderData} />
			)}
		</View>
	);
}

export default memo(PendingOrders);

const _renderItem = ({ item: order }) => {
	console.log(order);
	return <PendingOrderItem order={order} />;
};

const _keyExtractor = (item) => item.increment_id;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ecf0f1', justifyContent: 'center' },
	listStyle: { paddingTop: 15 },
});
