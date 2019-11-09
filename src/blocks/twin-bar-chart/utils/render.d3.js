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

// Generic entry function.
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

	console.log( data );

	const axesMax = [
		d3.max( data.groups, group => Number( group.bars[ 0 ].fill ) ),
		d3.max( data.groups, group => Number( group.bars[ 1 ].fill ) ),
	];
	const max = d3.max( axesMax );

	const spaceAvailableForBars = 100 - data.labelWidth; // % available after subtracting label width

	// @todo: clk: refactor
	const getBarScale = index => (
		data.order === 'split'
			? getScaleForBars( axesMax[ index ], d3.sum( axesMax ), spaceAvailableForBars )
			: getScaleForBars( max, max, spaceAvailableForBars )
	);

	// @todo: clk: gradually move out
	function getSectionOriginGetters() {
		// three sections per dimension, per chart style (in this order): barA, barB, label
		// potentially extended for vertical/horizontal charts
		// y in pixels
		// x in %
		return {
			stacked: {
				x: [
					() => data.labelWidth,
					() => data.labelWidth,
					() => data.labelWidth - 1,
				],
				y: [
					null,
					null,
					() => data.barHeight / 2,
				],
			},
			split: {
				x: [
					() => data.labelWidth + getBarScale( 1 )( axesMax[ 1 ] ),
					fill => getBarScale( 1 )( axesMax[ 1 ] ) - getBarScale( 1 )( fill ),
					() => getBarScale( 1 )( axesMax[ 1 ] ) + data.labelWidth / 2,
				],
				y: [
					null,
					null,
					() => data.barHeight / 2,
				],
			},
		};
	}

	svg.attr( 'data', null ); // clears data attr
	svg.attr( 'height', ( data.barHeight + data.spaceBetween ) * data.groups.length );

	const sectionOriginGetters = getSectionOriginGetters();

	const groups = svg
		.selectAll( 'g' )
		.data( data.groups )
		.join( 'g' )
		.attr( 'transform', function( d, i ) {
			return `translate(0, ${ i * ( data.barHeight + data.spaceBetween ) } )`;
		} );

	groups.call( renderLabels, sectionOriginGetters, data.order );
	groups.call( renderBars, sectionOriginGetters, data.order, data.barHeight, getBarScale );
}

function renderBars( groups, sectionOriginGetters, order, barHeight, barScaleGetter ) {
	groups.selectAll( 'rect' )
		.data( d => d.bars )
		.join( 'rect' )
		.attr( 'x', ( d, i ) => `${ sectionOriginGetters[ order ].x[ i ]( Number( d.fill ) ) }%` )
		.attr( 'height', barHeight )
		.attr( 'width', ( d, i ) => `${ barScaleGetter( i )( Number( d.fill ) ) }%` )
		.attr( 'fill', d => d.color );
}

function renderLabels( groups, sectionOriginGetters, order ) {
	const textAnchor = order === 'split' ? 'middle' : 'end';
	const dominantBaseline = 'middle';
	const textX = `${ sectionOriginGetters[ order ].x[ 2 ]() }%`;
	const textY = sectionOriginGetters[ order ].y[ 2 ]();

	groups.append( 'text' )
		.text( d => d.label )
		.attr( 'text-anchor', textAnchor )
		.attr( 'dominant-baseline', dominantBaseline )
		.attr( 'x', textX )
		.attr( 'y', textY );
}

function getScaleForBars( axisMax, axesTotal, spaceAvailable ) {
	return d3.scaleLinear()
		.domain( [ 0, axisMax ] )
		.range( [ 0, ( axisMax * spaceAvailable ) / axesTotal ] );
}
