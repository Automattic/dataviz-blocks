/**
 * External dependencies
 */
import { useEffect, createRef } from '@wordpress/element';

export default function D3Canvas( { className, chartData, chartRenderer } ) {
	const ref = createRef();

	useEffect( () => {
		if ( chartData ) {
			chartRenderer( ref.current );
		}
	}, [ chartData ] );

	return (
		<div className={ className }>
			<svg ref={ ref } data={ chartData } />
		</div>
	);
}
