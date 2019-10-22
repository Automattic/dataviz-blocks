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
// import renderHelloD3 from '../../shared/render-hello-d3';
import HelloD3 from './hello-d3';

const edit = ( { currentUser, className, setAttributes, attributes: { alignment } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	useEffect( () => {
		setAttributes( { className } );
	}, [] );

	return (
		<>
			<div className={ className }>
				<HelloD3 className={ className } data={ __( 'I am a React+D3 block in the editor.' ) } />
			</div>
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
				<PanelBody title={ 'Demo D3 Style' }></PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select ) => {
	return {
		currentUser: select( 'core' ).getCurrentUser(),
	};
} )( edit );
