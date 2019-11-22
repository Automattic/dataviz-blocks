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
import renderHelloD3 from './utils/render-hello-d3';
import { packChartData } from '../../utils/data-utils';
import D3Canvas from '../../components/d3-canvas';

const edit = ( { currentUser, className, setAttributes, attributes: { alignment, chartData } } ) => {
	if ( currentUser.name === undefined ) {
		return null;
	}

	function packData() {
		return packChartData(
			[
				{
					text: __( 'I am a D3 block!' ),
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

	return (
		<>
			<D3Canvas className={ className } chartData={ chartData } chartRenderer={ renderHelloD3 } />
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
