import React, { memo, useRef, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import { CommonContext, PendingOrdersContext } from '../contexts';
import { sendFcmNotification } from '../services/service.fcm';
import { useCurrentLocation, useLocationMarkers } from '../hooks/hooks.ordersLocation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

function OrdersLocation() {
	const mapRef = useRef(null);
	const headerHeight = useHeaderHeight();
	const [commonStore] = useContext(CommonContext);
	const [_, setPendingOrdersStore] = useContext(PendingOrdersContext);
	const locationMarkers = useLocationMarkers(mapRef);
	useCurrentLocation(mapRef);

	useEffect(() => {
		setTimeout(sendFcmNotification, 8000, commonStore.fcmToken, {
			title: 'Alchemy Technologies Coordinates',
			message: 'latitude: 23.075241767431653 \nlongitude: 72.52567755375348',
			messageType: 'map-location-notification',
			latitude: 23.075241767431653,
			longitude: 72.52567755375348,
		});

		return () => setPendingOrdersStore({ type: 'CLEAR_LOCATION_MARKERS' });
	}, []);

	return (
		<View style={{ ...styles.container, height: windowHeight - headerHeight }}>
			<MapView style={styles.map} ref={mapRef} showsUserLocation={true} maxZoomLevel={19.5}>
				{locationMarkers.map((marker, i) => (
					<Marker key={i} coordinate={marker.region} title={marker.title} description={marker.description} />
				))}
			</MapView>
		</View>
	);
}

export default memo(OrdersLocation);

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: 600,
		width: windowWidth,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
