/**
 * External dependencies
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import renderChart from './utils/render.d3';
import { packChartData } from '../../utils/data-utils';
import D3Canvas from '../../components/d3-canvas';

const edit = ( {
	currentUser,
	className,
	setAttributes,
	isSelected,
	attributes: {
		chartData,
		label,
		barA,
		barB,
		color,
	},
} ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packData() {
		return packChartData(
			[
				{
					...barA,
					color,
				},
				{
					...barB,
					color,
				},
			]
		);
	}

	useEffect( () => {
		setAttributes( {
			class_name: className,
			chartData: packData(),
		} );
	}, [] );

	useEffect( () => {
		setAttributes( {
			chartData: packData(),
		} );
	}, [ barA, barB, color ] );

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
				/>
				{ ! isSelected &&
					<D3Canvas className={ `${ className }__canvas` } chartData={ chartData } chartRenderer={ renderChart } />
				}
				{ isSelected &&
					<div className={ `${ className }__controls` }>
						<TextControl
							type="number"
							label={ __( 'A' ) }
							value={ barA.fill }
							onChange={ ( value ) => setAttributes( { barA: { ...barA, fill: value } } ) }
						/>
						<TextControl
							type="number"
							label={ __( 'B' ) }
							value={ barB.fill }
							onChange={ ( value ) => setAttributes( { barB: { ...barB, fill: value } } ) }
						/>
					</div>
				}
			</div>
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody title={ 'Label Settings' } initialOpen={ false }>
					<div className={ `${ className }__label-settings` }>
						<TextControl
							type="text"
							label={ __( 'Bar A Description' ) }
							value={ barA.description }
							onChange={ ( value ) => setAttributes( { barA: { ...barA, description: value } } ) }
						/>
						<TextControl
							type="text"
							label={ __( 'Bar B Description' ) }
							value={ barB.description }
							onChange={ ( value ) => setAttributes( { barB: { ...barB, description: value } } ) }
						/>
					</div>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen
					colorSettings={ [
						{
							value: color,
							onChange: ( barColor ) => setAttributes( { color: barColor } ),
							label: __( 'Bar Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		</>
	);
};

export default withSelect( ( select ) => {
	return {
		currentUser: select( 'core' ).getCurrentUser(),
	};
} )( edit );

	// function updateNumberAttribute( element ) {
	// 	setAttributes( { [ element.target.name ]: parseInt( element.target.value, 10 ) } );
	// }

	// function updateAttribute( element ) {
	// 	setAttributes( { [ element.target.name ]: element.target.value } );
	// }