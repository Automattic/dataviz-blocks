/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
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
			renderChart( `.${ className }__svg` );
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

const edit = ( { currentUser, className, setAttributes, isSelected, attributes: { data, max, barALabel, barAFill, barBLabel, barBFill, color } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packData() {
		return JSON.stringify(
			{
				max,
				barAFill,
				barALabel,
				barBFill,
				barBLabel,
				color,
			}
		);
	}

	useEffect( () => {
		// console.log( 123 );
		setAttributes( {
			class_name: className,
			data: packData(),
		} );
	}, [] );

	useEffect( () => {
		// console.log( 234 );
		setAttributes( {
			data: packData(),
		} );
	}, [ max, barALabel, barAFill, barBLabel, barBFill, color ] );

	function updateNumberAttribute( element ) {
		setAttributes( { [ element.target.name ]: parseInt( element.target.value, 10 ) } )
	}

	function updateAttribute( element ) {
		setAttributes( { [ element.target.name ]: element.target.value } );
	}

	function renderControls() {
		return (
			<>
				<label>Max:
					<input
						type="number"
						placeholder={ __( 'Max' ) }
						name={ 'max' }
						value={ max }
						onChange={ updateNumberAttribute }
					/>
				</label>
				<label>Bar A:
					<input
						type="number"
						placeholder={ __( 'Bar A' ) }
						name={ 'barAFill' }
						value={ barAFill }
						onChange={ updateNumberAttribute }
					/>
				</label>
				<label>Bar B:
					<input
						type="number"
						placeholder={ __( 'Bar B' ) }
						name={ 'barBFill' }
						value={ barBFill }
						onChange={ updateNumberAttribute }
					/>
				</label>
			</>
		);
	}

	return (
		<>
			{ isSelected && renderControls() }
			{ ! isSelected && <D3Canvas className={ className } data={ data } />}
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
