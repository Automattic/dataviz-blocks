/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { useEffect, createRef, Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import renderHelloD3 from '../../shared/render-hello-d3';

export default class HelloD3 extends Component {
	// ref = createRef();

	componentDidMount() {
		renderHelloD3( `.${ this.props.className }__svg`, this.props.data );
	}

	componentDidUpdate() {
		renderHelloD3( `.${ this.props.className }__svg`, this.props.data );
	}

	render() {
		return (
			<svg
				className={ `${ this.props.className }__svg` }
				height="100"
				width="500"
				viewBox="0 0 500 100"
				data={ this.props.data }
			/>
		);
	}
}

// export function HelloD3( { data } ) {
// 	const ref = createRef();

// 	useEffect( () => {
// 		renderHelloD3( ref );
// 	} );

// 	return (
// 		<div className={ '...' }>
// 			<svg ref={ ref } height="100" width="100" viewBox="0 0 100 100" />
// 		</div>
// 	);
// }
