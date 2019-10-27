/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText, InnerBlocks } from '@wordpress/block-editor';
import { Toolbar, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import HeadingToolbar from '../../components/heading-toolbar';

const ALLOWED_BLOCKS = [ 'a8c-dataviz/preference-item' ];
const TEMPLATE = [ [ 'a8c-dataviz/preference-item' ] ];

const edit = ( { currentUser, className, setAttributes, attributes: { alignment, heading, level } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	return (
		<>
			<div className={ className }>
				<RichText
					tagName={ `h${ level }` }
					className={ `${ className }__heading` }
					value={ heading }
					onChange={ ( newValue ) => setAttributes( { heading: newValue } ) }
					placeholder={ __( 'Preferences' ) }
					keepPlaceholderOnFocus
				/>

				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				/>
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
				<HeadingToolbar
					minLevel={ 2 }
					maxLevel={ 5 }
					selectedLevel={ level }
					onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Heading Settings' ) }>
					<HeadingToolbar
						minLevel={ 2 }
						maxLevel={ 5 }
						selectedLevel={ level }
						onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) }
					/>
				</PanelBody>
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
