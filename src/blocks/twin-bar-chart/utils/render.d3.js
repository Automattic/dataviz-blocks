/**
 * External dependencies
 */
import * as d3 from 'd3';

/**
 * Internal dependencies
 */
import { unpackChartData } from '../../../utils/data-utils';

// @todo: clk: `data` will contain the right props... [skeptical]
// can compute text width: https://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text

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
	const data = unpackChartData( svg.attr( 'data' ) );

	const axesMax = [
		d3.max( data.groups, group => Number( group.bars[ 0 ].fill ) ),
		d3.max( data.groups, group => Number( group.bars[ 1 ].fill ) ),
	];
	const max = d3.max( axesMax );
	const spaceAvailable = 100 - data.labelWidth; // % available after subtracting label width

	const barScale = index => (
		data.order === 'split'
			? getScaleForBars( axesMax[ index ], d3.sum( axesMax ), spaceAvailable )
			: getScaleForBars( max, max, spaceAvailable )
	);

	const barOrigins = [
		() => data.order === 'split'
			? data.labelWidth + barScale( 1 )( Number( axesMax[ 1 ] ) )
			: data.labelWidth,
		fill => data.order === 'split'
			? barScale( 1 )( Number( axesMax[ 1 ] ) ) - barScale( 1 )( Number( fill ) )
			: data.labelWidth,
	];

	console.log( data );

	svg.attr( 'data', null ); // clears data attr
	svg.attr( 'height', ( data.barHeight + data.spaceBetween ) * data.groups.length );

	const groups = svg
		.selectAll( 'g' )
		.data( data.groups )
		.join( 'g' )
		.attr( 'transform', function( d, i ) {
			return `translate(0, ${ i * ( data.barHeight + data.spaceBetween ) } )`;
		} );

	// labels
	const textAnchor = data.order === 'split' ? 'middle' : 'start';
	const textX = data.order === 'split' ? `${ barScale( 1 )( axesMax[ 1 ] ) + data.labelWidth / 2 }%` : 0;
	const textY = ( data.barHeight + data.spaceBetween ) / 2;

	groups
		.append( 'text' )
		.text( d => d.label )
		.attr( 'text-anchor', textAnchor )
		.attr( 'x', textX )
		.attr( 'y', textY );

	// bars
	groups
		.selectAll( 'rect' )
		.data( d => d.bars )
		.join( 'rect' )
		.attr( 'x', ( d, i ) => `${ barOrigins[ i ]( Number( d.fill ) ) }%` )
		.attr( 'height', data.barHeight )
		.attr( 'width', ( d, i ) => `${ barScale( i )( Number( d.fill ) ) }%` )
		.attr( 'fill', d => d.color );

	// renderBars( svg, data );
}

function getScaleForBars( axisMax, axesTotal, spaceAvailable ) {
	return d3.scaleLinear()
		.domain( [ 0, axisMax ] )
		.range( [ 0, ( axisMax * spaceAvailable ) / axesTotal ] );
}

function renderBars( svg, data ) {
	// @todo: clk: make sure bars retain their color despite page background

	const rects = svg
		.data( data.bars )
		.enter()
		.append( 'g' )
		.append( 'rect' );

	rects
		.attr( 'y', 0 )
		.attr( 'x', 0 )
		.attr( 'width', d => `${ d.fill }%` )
		.attr( 'height', '100%' )
		.style( 'fill', d => d.color )
		.style( 'opacity', ( d, i ) => i && 0.5 || 1 );

	// const rects = svg
	// 	.append( 'g' )
	// 	.selectAll( 'g' )
	// 	.data( bars )
	// 	.enter()
	// 	.append( 'rect' );

	// rects
	// 	.attr( 'y', 0 )
	// 	.attr( 'x', 0 )
	// 	.attr( 'width', d => `${ d.fill }%` )
	// 	.attr( 'height', '100%' )
	// 	.style( 'fill', d => d.color )
	// 	.style( 'opacity', ( d, i ) => i && 0.5 || 1 );
}
