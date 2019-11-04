export function packChartData( data ) {
	// base64
	return btoa( JSON.stringify( data ) );
}

export function unpackChartData( data ) {
	// base64
	try {
		return JSON.parse( atob( data ) );
	} catch {
		return null;
	}
}
