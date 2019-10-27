/**
 * External dependencies
 */
import * as d3 from 'd3';

export default function render( ref ) {
	const matching = d3.selectAll( ref );

	if ( matching.empty() ) {
		return;
	}

	// clear existing content
	matching.selectAll( '*' ).remove();
	matching.each( renderText );
}

function renderText( d, i ) {
	const svg = d3.select( this );

	svg.append( 'text' )
		.attr( 'fill', 'black' )
		.attr( 'y', '20px' )
		.text( () => {
			return `${ svg.attr( 'data' ) } ${ i + 1 }`;
		} );
}
