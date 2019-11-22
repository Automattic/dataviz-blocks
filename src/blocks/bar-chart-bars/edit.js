/**
 * External dependencies
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const edit = ( {
	className,
	setAttributes,
	attributes: {
		label,
		barAColor,
		barBColor,
		barA,
		barB,
	},
} ) => {
	return (
		<>
			<div className={ className }>
				<RichText
					tagName={ 'div' }
					className={ `${ className }__label` }
					value={ label }
					onChange={ ( newValue ) => setAttributes( { label: newValue } ) }
					placeholder={ __( 'Label' ) }
					keepPlaceholderOnFocus
					allowedFormats={ [] }
					multiline={ false }
				/>
				<div className={ `${ className }__controls` }>
					<TextControl
						type="number"
						label={ __( 'Bar A (+ve)' ) }
						value={ barA.fill }
						onChange={ fill => setAttributes( { barA: { ...barA, fill } } ) }
					/>
					<TextControl
						type="number"
						label={ __( 'Bar B (-ve)' ) }
						value={ barB.fill }
						onChange={ fill => setAttributes( { barB: { ...barB, fill } } ) }
					/>
				</div>
			</div>

			<BlockControls></BlockControls>

			<InspectorControls>
				<PanelBody title={ 'Meta Settings' } initialOpen={ false }>
					<div className={ `${ className }__label-settings` }>
						<TextControl
							type="text"
							label={ __( 'Bar A Description' ) }
							value={ barA.description }
							onChange={ description => setAttributes( { barA: { ...barA, description } } ) }
						/>
						<TextControl
							type="text"
							label={ __( 'Bar B Description' ) }
							value={ barB.description }
							onChange={ description => setAttributes( { barB: { ...barB, description } } ) }
						/>
					</div>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen
					colorSettings={ [
						{
							value: barAColor,
							onChange: color => setAttributes( { barAColor: color } ),
							label: __( 'Bar A Color' ),
						},
						{
							value: barBColor,
							onChange: color => setAttributes( { barBColor: color } ),
							label: __( 'Bar B Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		</>
	);
};

export default edit;
