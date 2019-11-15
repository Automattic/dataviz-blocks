/**
 * External dependencies
 */
import * as d3 from 'd3';

/**
 * Internal dependencies
 */
import { unpackChartData } from '../../../utils/data-utils';

// ------------------------
// Notes
// ------------------------
// @todo: clk: `data` will contain the right props... [skeptical]
// can compute text width: https://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text
// ------------------------

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
	const axesMax = [
		d3.max( data.groups, group => Number( group.bars[ 0 ].fill ) ),
		d3.max( data.groups, group => Number( group.bars[ 1 ].fill ) ),
	];
	const max = d3.max( axesMax );
	// % available after subtracting label width
	const spaceAvailableForBars = 100 - data.labelWidth;
	const svgHeight = data.barHeight * data.groups.length;

	// @todo: clk: refactor
	const barScale = index => (
		data.order === 'split'
			? getScaleForBars( axesMax[ index ], d3.sum( axesMax ), spaceAvailableForBars )
			: getScaleForBars( max, max, spaceAvailableForBars )
	);
	const yScale = getOrdinalScale( data, svgHeight );

	/**
	 * @todo: clk: gradually move out
	 * y in pixels
	 * x in %
	 */
	const barOrigins = {
		vertical: {
			stacked: {
				x: [
					() => data.labelWidth,
					() => data.labelWidth,
				],
				y: [
					null,
					null,
				],
			},
			split: {
				x: [
					() => data.labelWidth + barScale( 1 )( axesMax[ 1 ] ),
					fill => barScale( 1 )( axesMax[ 1 ] ) - barScale( 1 )( fill ),
				],
				y: [
					null,
					null,
				],
			},
		},
	};

	/**
	 * @todo: clk: gradually move out
	 * y in pixels
	 * x in %
	 */
	const labelOrigins = {
		vertical: {
			stacked: {
				x: () => data.labelWidth - 1,
				y: () => yScale.bandwidth() / 2, // data.barHeight / 2,
			},
			split: {
				x: () => barScale( 1 )( axesMax[ 1 ] ) + data.labelWidth / 2,
				y: () => yScale.bandwidth() / 2,
			},
		},
	};

	svg.attr( 'data', null ); // clears data attr
	svg.attr( 'height', svgHeight + 50 );

	const axis = d3.axisBottom( yScale );

	const groups = svg
		.selectAll( 'g' )
		.data( data.groups )
		.join( 'g' )
		.attr( 'transform', ( d, i ) => (
			`translate(0, ${ yScale( i ) } )`
		) );

	groups.call( renderLabels, labelOrigins, data.order );
	// groups.call( renderBars, barOrigins, data.order, data.barHeight, barScale );
	groups.call( renderBars, barOrigins, data.order, yScale.bandwidth(), barScale );

	svg
		.append( 'g' )
		.attr( 'transform', `translate(0, ${ svgHeight } )` )
		.call( axis );
}

function renderBars( groups, barOrigins, order, barHeight, barScale ) {
	groups.selectAll( 'rect' )
		.data( d => d.bars )
		.join( 'rect' )
		.attr( 'x', ( d, i ) => `${ barOrigins.vertical[ order ].x[ i ]( Number( d.fill ) ) }%` )
		.attr( 'height', barHeight )
		.attr( 'width', ( d, i ) => `${ barScale( i )( Number( d.fill ) ) }%` )
		.attr( 'fill', d => d.color );
}

function renderLabels( groups, labelOrigins, order ) {
	const textAnchor = order === 'split' ? 'middle' : 'end';
	const dominantBaseline = 'middle';
	const textX = `${ labelOrigins.vertical[ order ].x() }%`;
	const textY = labelOrigins.vertical[ order ].y();

	groups.append( 'text' )
		.text( d => d.label )
		.attr( 'text-anchor', textAnchor )
		.attr( 'dominant-baseline', dominantBaseline )
		.attr( 'x', textX )
		.attr( 'y', textY );
}

function getOrdinalScale( data, rangeMax ) {
	return d3.scaleBand()
		.domain( data.groups.map( ( d, i ) => i ) )
		.rangeRound( [ 0, rangeMax ] )
		.paddingInner( data.spaceBetween / 100 );
}

function getScaleForBars( axisMax, axesTotal, spaceAvailable ) {
	return d3.scaleLinear()
		.domain( [ 0, axisMax ] )
		.range( [ 0, ( axisMax * spaceAvailable ) / axesTotal ] );
}
