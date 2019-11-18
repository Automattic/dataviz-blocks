/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText, InnerBlocks, PanelColorSettings } from '@wordpress/block-editor';
import { Toolbar, PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { isEmpty } from 'lodash';
import { useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies.
 */
import HeadingToolbar from '../../components/heading-toolbar';

const ALLOWED_BLOCKS = [ 'a8c-dataviz/twin-bar-chart' ];
const TEMPLATE = [ [ 'a8c-dataviz/twin-bar-chart' ] ];

const edit = ( { currentUser, updateInnerBlocksAttribute, className, setAttributes, attributes: { defaultColors, chartSettings, chartData, heading, level, subheading } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	useEffect( () => {
		updateInnerBlocksAttribute( { chartSettings } );
	}, [ chartSettings ] );

	useEffect( () => {
		updateInnerBlocksAttribute( { defaultColors } );
	}, [ defaultColors ] );

	return (
		<>
			<div className={ className }>
				<RichText
					tagName={ `h${ level }` }
					className={ `${ className }__heading` }
					value={ heading }
					onChange={ ( newValue ) => setAttributes( { heading: newValue } ) }
					placeholder={ __( 'Heading' ) }
					keepPlaceholderOnFocus
				/>
				<RichText
					tagName={ 'div' }
					className={ `${ className }__subheading` }
					value={ subheading }
					onChange={ ( newValue ) => setAttributes( { subheading: newValue } ) }
					placeholder={ __( 'Sub Heading' ) }
					keepPlaceholderOnFocus
					multiline={ false }
				/>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>

			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'text',
							title: __( 'Split at zero' ),
							isActive: chartSettings.order === 'split',
							onClick: () => setAttributes( { chartSettings: { ...chartSettings, order: 'split' } } ),
						},
						{
							icon: 'editor-alignleft',
							title: __( 'Stacked bars' ),
							isActive: chartSettings.order === 'stacked',
							onClick: () => setAttributes( { chartSettings: { ...chartSettings, order: 'stacked' } } ),
						},
					] }
				/>
				{/* <HeadingToolbar
					minLevel={ 2 }
					maxLevel={ 5 }
					selectedLevel={ level }
					onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) }
				/> */}
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
				<PanelBody title={ __( 'Chart Settings' ) }>
					<Toolbar
						controls={ [
							{
								icon: 'text',
								title: __( 'Split at zero' ),
								isActive: chartSettings.order === 'split',
								onClick: () => setAttributes( { chartSettings: { ...chartSettings, order: 'split' } } ),
							},
							{
								icon: 'editor-alignleft',
								title: __( 'Stacked bars' ),
								isActive: chartSettings.order === 'stacked',
								onClick: () => setAttributes( { chartSettings: { ...chartSettings, order: 'stacked' } } ),
							},
						] }
					/>
					<RangeControl
						label={ __( 'Label Width' ) }
						value={ chartSettings.labelWidth }
						onChange={ value => {
							setAttributes( { chartSettings: { ...chartSettings, labelWidth: value } } );
						} }
						min={ 1 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Padding' ) }
						value={ chartSettings.spaceBetween }
						onChange={ value => {
							setAttributes( { chartSettings: { ...chartSettings, spaceBetween: value } } );
						} }
						min={ 1 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Bar Thickness' ) }
						value={ chartSettings.barHeight }
						onChange={ value => {
							setAttributes( { chartSettings: { ...chartSettings, barHeight: value } } );
						} }
						min={ 1 }
						max={ 100 }
					/>
					<ToggleControl
						label={ __( 'Show Axes' ) }
						checked={ chartSettings.axes }
						onChange={ value => setAttributes( { chartSettings: { ...chartSettings, axes: value } } ) }
					/>
					<TextControl
						type="text"
						label={ __( 'Units (for axis)' ) }
						value={ chartSettings.unit }
						onChange={ value => setAttributes( { chartSettings: { ...chartSettings, unit: value } } ) }
					/>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen
						colorSettings={ [
							{
								value: defaultColors.barA,
								onChange: color => setAttributes( { defaultColors: { ...defaultColors, barA: color } } ),
								label: __( 'Apply to Bars A (+ve)' ),
							},
							{
								value: defaultColors.barB,
								onChange: color => setAttributes( { defaultColors: { ...defaultColors, barB: color } } ),
								label: __( 'Apply to Bars B (-ve)' ),
							},
						] }
					></PanelColorSettings>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default compose(
	withSelect( ( select, { clientId } ) => {
		const innerBlocks = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks || [];

		return {
			currentUser: select( 'core' ).getCurrentUser(),
			innerBlocks,
		};
	} ),
	withDispatch( ( dispatch, { clientId }, { select } ) => {
		return {
			// [NOT USED]
			updateInnerBlocksAttribute( attribute ) {
				const innerBlocks = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks || [];

				if ( ! isEmpty( innerBlocks ) ) {
					innerBlocks.map( block => {
						dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, attribute );
					} );
				}
			},
		};
	} ),
)( edit );
