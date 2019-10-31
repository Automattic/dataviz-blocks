/**
 * External dependencies
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
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
			height="30"
			width="500"
			viewBox="0 0 500 30"
			chartData={ chartData }
		/>
	);
}

const edit = ( { currentUser, className, setAttributes, isSelected, attributes: { chartData, label, barALabel, barAFill, barBLabel, barBFill, color } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packChartData() {
		// return packData...
		return JSON.stringify(
			{
				barAFill,
				barALabel,
				barBFill,
				barBLabel,
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
	}, [ barALabel, barAFill, barBLabel, barBFill, color ] );

	function updateNumberAttribute( element ) {
		setAttributes( { [ element.target.name ]: parseInt( element.target.value, 10 ) } );
	}

	function updateAttribute( element ) {
		setAttributes( { [ element.target.name ]: element.target.value } );
	}

	return (
		<>
			<div className={ className }>
				<RichText
					tagName={ 'p' }
					className={ `${ className }__label` }
					value={ label }
					onChange={ ( newValue ) => setAttributes( { label: newValue } ) }
					placeholder={ __( 'Preference' ) }
				/>
				{ ! isSelected &&
					<D3Canvas className={ `${ className }__svg` } chartData={ chartData } />
				}
				{ isSelected &&
					<div className={ `${ className }__controls` }>
						<label>{ __( 'A: ' ) }
							<input
								type="number"
								placeholder={ __( 'A' ) }
								name={ 'barAFill' }
								value={ barAFill }
								onChange={ updateNumberAttribute }
							/>
						</label>
						<label>{ __( 'B: ' ) }
							<input
								type="number"
								placeholder={ __( 'B' ) }
								name={ 'barBFill' }
								value={ barBFill }
								onChange={ updateNumberAttribute }
							/>
						</label>
					</div>
				}
			</div>
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
