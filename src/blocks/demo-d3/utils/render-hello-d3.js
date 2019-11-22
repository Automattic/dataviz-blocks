/**
 * External dependencies
 */
import * as d3 from 'd3';

/**
 * Internal dependencies
 */
import { unpackChartData } from '../../../utils/data-utils';

export default function render( ref ) {
	let matching;

	if ( typeof ref === 'string' ) {
		matching = d3.selectAll( ref );
	} else {
		matching = d3.select( ref );
	}

	if ( matching.empty() ) {
		return;
	}

	// clear existing content
	matching.selectAll( '*' ).remove();
	matching.each( renderChart );
}

function renderChart() {
	const svg = d3.select( this );
	// @todo: clk: `data` will contain the right props... [skeptical]
	const data = unpackChartData( svg.attr( 'data' ) );

	renderText( svg, data );
}

function renderText( svg, data ) {
	svg
		.append( 'g' )
		.selectAll( 'g' )
		.data( data )
		.enter()
		.append( 'text' )
		.attr( 'fill', 'black' )
		.attr( 'y', '20px' )
		.text( ( d ) => {
			return `${ d.text }`;
		} );
}
