/**
 * External dependencies
 */
import * as d3 from 'd3';

/**
 * Internal dependencies
 */
// import { unpackData } from '../../../utils/data-utils';

export default function render( className ) {
	const matching = d3.selectAll( `.${ className }` );

	if ( matching.empty() ) {
		return;
	}

	// clear existing content
	matching.selectAll( '*' ).remove();
	matching.each( renderBar );
}

function renderBar( d, i ) {
	const svg = d3.select( this );

	let data;

	try {
		// `data` will contain the right props... [skeptical]
		data = JSON.parse( svg.attr( 'chartData' ) );
	} catch ( error ) {
		return;
	}

	svg.append( 'text' )
		.attr( 'fill', 'black' )
		.attr( 'y', '20px' )
		.text( () => {
			return `${ data.barAFill } ${ i + 1 }`;
		} );
}
