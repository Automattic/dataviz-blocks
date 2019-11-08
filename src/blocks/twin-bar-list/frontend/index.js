/**
 * Internal dependencies
 */
import renderChart from '../utils/render.d3';

export default function render() {
	console.log( 'in frontend.js' );
	renderChart( '.wp-block-a8c-dataviz-preference-item__canvas > svg' );
}
