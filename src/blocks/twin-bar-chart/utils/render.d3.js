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

	// const margin = { top: 20, right: 30, bottom: 40, left: 30 };
	const margin = {
		top: 10,
		right: 10,
		bottom: 20,
		left: data.order === 'split' ? 10 : data.labelWidth,
	};

	const svgClientSize = svg.node().getBoundingClientRect();
	const elementWidth = svgClientSize.width;
	const computedHeight = data.barHeight * data.groups.length;

	const width = elementWidth - margin.left - margin.right;
	const xAxisSpace = data.axes ? 30 : 0;
	const svgHeight = computedHeight + margin.top + margin.bottom + xAxisSpace;

	const xScale = d3.scaleLinear()
		.domain( [
			data.order === 'stacked' ? 0 : -axesMax[ 1 ],
			data.order === 'stacked' ? max : axesMax[ 0 ],
		] )
		.nice()
		.range( [ 0, width ] );

	const yScale = d3.scaleBand()
		.domain( data.groups.map( ( d, i ) => i ) )
		.rangeRound( [ 0, computedHeight ] )
		.paddingInner( data.spaceBetween / 100 );

	const yScaleAxis = d3.scaleBand()
		.domain( data.groups.map( d => d.label ) )
		.rangeRound( [ 0, computedHeight ] )
		.paddingInner( data.spaceBetween / 100 );

	svg.attr( 'data', null ); // clears data attr
	svg.attr( 'height', svgHeight );
	svg.attr( 'width', elementWidth );
	svg.attr( 'viewBox', `0 0 ${ elementWidth } ${ svgHeight }` );

	const groups = svg
		.selectAll( 'g' )
		.data( data.groups )
		.join( 'g' )
		.attr( 'transform', ( d, i ) => (
			`translate(${ margin.left }, ${ yScale( i ) + margin.top } )`
		) );

	groups.call( renderBars, data, xScale, yScale );
	svg.call( renderYAxis, xScale, yScaleAxis, margin );

	if ( data.axes ) {
		svg.call( renderXAxis, xScale, yScaleAxis, margin, computedHeight, xAxisSpace );
	}
}

function renderBars( groups, data, x, y ) {
	groups.selectAll( 'rect' )
		.data( d => d.bars )
		.join( 'rect' )
		.attr( 'x', ( d, i ) => `${ x( Math.min( 0, transformValue( d.fill, i, data.order ) ) ) }` )
		.attr( 'height', y.bandwidth )
		.attr( 'width', ( d, i ) => `${ Math.abs( x( transformValue( d.fill, i, data.order ) ) - x( 0 ) ) }` )
		.attr( 'fill', d => d.color );
}

function renderXAxis( svg, xScale, yScaleAxis, margin, computedHeight, xAxisSpace ) {
	const xAxis = d3.axisBottom( xScale )
		.ticks( 5 )
		.tickSize( 0 )
		.tickPadding( 9 );
	const container = svg.append( 'g' );

	container
		.attr( 'transform', `translate(${ margin.left }, ${ computedHeight + margin.top + xAxisSpace / 2 })` )
		.call( xAxis );

	container
		.selectAll( 'path' )
		.attr( 'stroke-dasharray', '2,2' );
}

function renderYAxis( svg, xScale, yScaleAxis, margin ) {
	const yAxis = d3.axisLeft( yScaleAxis )
		.tickSize( 0 )
		.tickPadding( 6 );
	const container = svg.append( 'g' );

	container
		.attr( 'transform', `translate(${ xScale( 0 ) + margin.left }, ${ margin.top })` )
		.call( yAxis );

	container
		.selectAll( 'text' )
		.style( 'font-size', '1.5em' );

	container
		.selectAll( 'path' )
		.attr( 'stroke', 'none' );
}

function transformValue( value, index, order ) {
	if ( order === 'split' ) {
		if ( index === 1 ) {
			return -value;
		}
	}
	return value;
}
