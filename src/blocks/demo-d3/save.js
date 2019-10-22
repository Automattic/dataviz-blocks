/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import HelloD3 from './hello-d3';

export default function save( { attributes } ) {
	return (
		<div>
			<HelloD3 className={ attributes.className } data={ __( 'I am just D3 on the front end.' ) } />
		</div>
	);

}
