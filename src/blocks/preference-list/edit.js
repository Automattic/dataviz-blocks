/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import draw from './utils/render-preference-list';

function D3Canvas( { className, data } ) {
	useEffect( () => {
		if ( data ) {
			draw( `.${ className }__svg` );
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

const edit = ( { currentUser, className, setAttributes, attributes: { alignment, data } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	useEffect( () => {
		setAttributes( {
			class_name: className,
			data: __( 'I am a Preference List!' ),
		} );
	}, [] );

	return (
		<>
			<D3Canvas className={ className } data={ data } />
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'align-pull-left',
							title: __( 'Align left' ),
							isActive: alignment === 'left',
							onClick: () => setAttributes( { alignment: 'left' } ),
						},
						{
							icon: 'align-pull-right',
							title: __( 'Align right' ),
							isActive: alignment === 'right',
							onClick: () => setAttributes( { alignment: 'right' } ),
						},
					] }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ 'Preference List Style' }></PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select ) => {
	return {
		currentUser: select( 'core' ).getCurrentUser(),
	};
} )( edit );
