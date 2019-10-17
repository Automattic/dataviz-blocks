/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Toolbar, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const edit = ( { currentUser, className, setAttributes, attributes: { alignment } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	return (
		<>
			<div className={ className }>
				<div className={ 'wp-block-a8c-foo__text' }>
					<InnerBlocks
						template={ [
							[
								'core/heading',
								{
									level: 3,
									placeholder: 'Your name.',
									content: currentUser.name,
								},
							],
							[
								'core/paragraph',
								{
									placeholder: 'Your description.',
									content: currentUser.description,
								},
							],
						] }
					/>
				</div>
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
				<PanelBody title={ 'Foo Style' }>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select ) => {
	return {
		currentUser: select( 'core' ).getCurrentUser(),
	};
} )( edit );
