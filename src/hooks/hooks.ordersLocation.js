import { useContext, useEffect } from 'react';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import { PendingOrdersContext } from '../contexts';

export function useCurrentLocation(mapRef) {
	useEffect(() => {
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'Location Permission',
			message: 'App needs access to your location ',
		}).then((granted) => {
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				Geolocation.getCurrentPosition(
					(position) => {
						console.log(position);
						mapRef.current?.fitToCoordinates([{ latitude: position.coords.latitude, longitude: position.coords.longitude }], {
							edgePadding: { top: 0, right: 0, bottom: 0, left: 0 },
							animated: true,
						});
					},
					(error) => {
						console.log(error.code, error.message);
						ToastAndroid.show("Couldn't get your current location", ToastAndroid.LONG);
					},
					{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
				);
			} else {
				ToastAndroid.show('Please allow location permission.', ToastAndroid.LONG);
			}
		});
	}, []);
}

export function useLocationMarkers(mapRef) {
	const [pendingOrdersStore] = useContext(PendingOrdersContext);

	const markers = pendingOrdersStore.locationMarkers;

	useEffect(() => {
		console.log('useLocationMarkers effect called');
		if (markers.length > 0) {
			mapRef.current?.fitToCoordinates([markers[markers.length - 1].region], {
				edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
				animated: true,
			});
		}
	}, [markers]);

	return markers;
}
