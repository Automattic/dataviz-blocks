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
// import { packData } from '../../utils/data-utils';

function D3Canvas( { className, chartData } ) {
	useEffect( () => {
		if ( chartData ) {
			renderChart( className );
		}
	}, [ chartData ] );

	return (
		<svg
			className={ className }
			viewBox="0 0 100 100"
			data={ chartData }
		/>
	);
}

const edit = ( { currentUser, className, setAttributes, isSelected, attributes: { chartData, label, barADescription, barAFill, barBDescription, barBFill, color } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packChartData() {
		// return packData...
		return JSON.stringify(
			{
				barAFill,
				barADescription,
				barBFill,
				barBDescription,
				color,
			}
		);
	}

	useEffect( () => {
		setAttributes( {
			class_name: className,
			chartData: packChartData(),
		} );
	}, [] );

	useEffect( () => {
		setAttributes( {
			chartData: packChartData(),
		} );
	}, [ barADescription, barAFill, barBDescription, barBFill, color ] );

	// function updateNumberAttribute( element ) {
	// 	setAttributes( { [ element.target.name ]: parseInt( element.target.value, 10 ) } );
	// }

	// function updateAttribute( element ) {
	// 	setAttributes( { [ element.target.name ]: element.target.value } );
	// }

	return (
		<>
			<div className={ className }>
				<RichText
					tagName={ 'div' }
					className={ `${ className }__label` }
					value={ label }
					onChange={ ( newValue ) => setAttributes( { label: newValue } ) }
					placeholder={ __( 'Preference' ) }
					keepPlaceholderOnFocus
				/>
				{ ! isSelected &&
					<D3Canvas className={ `${ className }__svg` } chartData={ chartData } />
				}
				{ isSelected &&
					<div className={ `${ className }__controls` }>
						<TextControl
							type="number"
							label={ __( 'A' ) }
							value={ barAFill }
							onChange={ ( value ) => setAttributes( { barAFill: value } ) }
						/>
						<TextControl
							type="number"
							label={ __( 'B' ) }
							value={ barBFill }
							onChange={ ( value ) => setAttributes( { barBFill: value } ) }
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
							value={ barADescription }
							onChange={ ( value ) => setAttributes( { barADescription: value } ) }
						/>
						<TextControl
							type="text"
							label={ __( 'Bar B Description' ) }
							value={ barBDescription }
							onChange={ ( value ) => setAttributes( { barBDescription: value } ) }
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
