import React, { memo } from 'react';
import { View, Pressable, Text, StyleSheet, InteractionManager } from 'react-native';

import { useNavigation } from '@react-navigation/native';

function PendingOrderItem({ order }) {
	const navigation = useNavigation();
	const seeLocation = () => InteractionManager.runAfterInteractions(() => navigation.navigate('OrdersLocation'));

	const date = new Date(order.pickup_date);
	const pickUpDate = `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}`;
	return (
		<View style={styles.container}>
			<Text style={styles.receivedTime}>{getOrderedTimeString(order.order_date)}</Text>

			<Pressable android_ripple={styles.ripple} style={styles.itemCard} onPress={seeLocation}>
				<View style={styles.orderDetails}>
					<View style={styles.customerDetails}>
						<Text style={styles.customerName} numberOfLines={1}>
							{order.name}
						</Text>
						<Text>{order.mobile_number}</Text>
					</View>

					<Text># {order.increment_id}</Text>
				</View>

				<View style={styles.priceContainer}>
					<Text style={styles.price}>₹ {parseFloat(order.grand_total).toFixed(2)}</Text>
				</View>

				<View style={styles.orderAdditionalDetails}>
					<View style={styles.deliveryDetails}>
						<View style={styles.deliveryItemDetail}>
							<Text>{pickUpDate}</Text>
							<Text style={styles.label}>Pick up date</Text>
						</View>
						<View style={styles.deliveryItemDetail}>
							<Text style={styles.pickupTime}>{order.pickup_time}</Text>
							<Text style={styles.label}>Pick up time</Text>
						</View>
						<View style={styles.deliveryItemDetail}>
							<Text>{order.items.padStart(2, '0')}</Text>
							<Text style={styles.label}>Items</Text>
						</View>
					</View>
					<View style={styles.paymentStatusContainer}>
						<Text style={styles.paymentStatus}>{order.payment_status}</Text>
						<Text style={styles.statusLabel}>Payment Status</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
}

export default memo(PendingOrderItem);

const styles = StyleSheet.create({
	container: { paddingHorizontal: 20, marginBottom: 15 },
	receivedTime: { fontSize: 11, textAlign: 'right', marginBottom: 15 },
	itemCard: { padding: 20, borderRadius: 12, backgroundColor: '#fefefe' },
	ripple: { color: '#ECFAF7' },
	orderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
	customerDetails: { flexShrink: 1, marginRight: 20 },
	customerName: { fontSize: 22, fontWeight: '700', textTransform: 'capitalize', color: '#333333' },
	priceContainer: { marginBottom: 10, flexDirection: 'row-reverse' },
	price: { borderRadius: 5, backgroundColor: '#ECFAF7', color: '#389B85', paddingHorizontal: 14, paddingVertical: 8 },
	orderAdditionalDetails: { flexDirection: 'row', justifyContent: 'space-between' },
	deliveryDetails: { flexDirection: 'row', justifyContent: 'space-between' },
	deliveryItemDetail: { marginRight: 15 },
	pickupTime: { textTransform: 'uppercase' },
	label: { color: '#888', fontSize: 8, textTransform: 'uppercase', fontWeight: 'bold' },
	statusLabel: { color: '#888', fontSize: 8, textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'right' },
	paymentStatusContainer: { textAlign: 'right' },
	paymentStatus: { textAlign: 'right', color: '#389B85' },
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getOrderedTimeString(orderDate) {
	const currentDate = new Date();
	const endDate = new Date(orderDate.replace(' ', 'T') + '+05:30');

	const diffInSecs = Math.floor((currentDate - endDate) / 1000);

	let value = 'moments ago';

	if (diffInSecs >= 60) {
		const remainingDays = Math.floor(diffInSecs / (60 * 60 * 24));

		if (remainingDays > 0) {
			value = `on ${endDate.getDate().toString().padStart(2, '0')}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getFullYear()}`;
		} else {
			let remainingHours = Math.floor(diffInSecs / (60 * 60));

			if (remainingHours > 0) {
				value = `${remainingHours} hours ago`;
			} else {
				value = `${Math.floor(diffInSecs / 60)} mins ago`;
			}
		}
	}

	return 'Received ' + value;
}
