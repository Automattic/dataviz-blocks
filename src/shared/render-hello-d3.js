/**
 * External dependencies
 */
import * as d3 from 'd3';

export default function renderHelloD3( ref, data ) {
	const svg = d3.select( ref );

	if ( svg.empty() ) {
		return;
	}

	const datum = data ? data : svg.attr( 'data' );

	if ( ! datum ) {
		return;
	}

	// clear existing content
	svg.selectAll( '*' ).remove();

	svg.append( 'text' )
		.attr( 'fill', 'black' )
		.attr( 'y', '20px' )
		.text( datum );
}
