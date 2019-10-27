/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import renderChart from './utils/render.d3';

function D3Canvas( { className, data } ) {
	useEffect( () => {
		if ( data ) {
			renderChart( `.${ className }__svg` );
		}
	}, [ data ] );

	return (
		<div className={ className }>
			<svg
				className={ `${ className }__svg` }
				height="100"
				width="500"
				viewBox="0 0 500 100"
				data={ data }
			/>
		</div>
	);
}

const edit = ( { currentUser, className, setAttributes, attributes: { data } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	useEffect( () => {
		setAttributes( {
			class_name: className,
			data: __( 'Preference Item' ),
		} );
	}, [] );

	return (
		<>
			<D3Canvas className={ className } data={ data } />
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody title={ 'Style' }></PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select ) => {
	return {
		currentUser: select( 'core' ).getCurrentUser(),
	};
} )( edit );
