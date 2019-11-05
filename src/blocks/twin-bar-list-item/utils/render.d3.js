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

	console.log( '---> in render.d3' );

	// clear existing content
	matching.selectAll( '*' ).remove();
	matching.each( renderChart );
}

function renderChart() {
	const svg = d3.select( this );
	// @todo: clk: `data` will contain the right props... [skeptical]
	const data = unpackChartData( svg.attr( 'data' ) );

	renderBars( svg, data );
}

function renderBars( svg, data ) {
	// @todo: clk: make sure bars retain their color despite page background

	console.log( '---> in render.d3 (renderBars)' );

	const rects = svg
		.append( 'g' )
		.selectAll( 'g' )
		.data( data )
		.enter()
		.append( 'rect' );

	rects
		.attr( 'y', 0 )
		.attr( 'x', 0 )
		.attr( 'width', d => `${ d.fill }%` )
		.attr( 'height', '100%' )
		.style( 'fill', d => d.color )
		.style( 'opacity', ( d, i ) => i && 0.5 || 1 );
}
