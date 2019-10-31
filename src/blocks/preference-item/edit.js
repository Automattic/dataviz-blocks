/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
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
			renderChart( className );
		}
	}, [ data ] );

	return (
		<svg
			className={ className }
			height="30"
			width="500"
			viewBox="0 0 500 30"
			data={ data }
		/>
	);
}

const edit = ( { currentUser, className, setAttributes, isSelected, attributes: { data, label, barALabel, barAFill, barBLabel, barBFill, color } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packData() {
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
			data: packData(),
		} );
	}, [] );

	useEffect( () => {
		setAttributes( {
			data: packData(),
		} );
	}, [ barALabel, barAFill, barBLabel, barBFill, color ] );

	function updateNumberAttribute( element ) {
		setAttributes( { [ element.target.name ]: parseInt( element.target.value, 10 ) } );
	}

	function updateAttribute( element ) {
		setAttributes( { [ element.target.name ]: element.target.value } );
	}

	function renderControls() {
		return (
			<>
				<RichText
					tagName={ 'p' }
					className={ `${ className }__label` }
					value={ label }
					onChange={ ( newValue ) => setAttributes( { label: newValue } ) }
					placeholder={ __( 'Preference' ) }
				/>
				{ ! isSelected &&
					<D3Canvas className={ `${ className }__svg` } data={ data } />
				}
				{ isSelected &&
					<div>
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
			</>
		);
	}

	return (
		<>
			<div className={ className }>{ renderControls() }</div>
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
