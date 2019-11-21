/**
 * External dependencies.
 */
// eslint-disable-next-line wpcalypso/import-docblock
import { InnerBlocks } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { isEmpty } from 'lodash';
import { useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies.
 */
import { packChartData } from '../../utils/data-utils';
import renderChart from './utils/render.d3';
import D3Canvas from '../../components/d3-canvas';

const ALLOWED_BLOCKS = [ 'a8c-dataviz/twin-bar-list-item' ];
const TEMPLATE = [ [ 'a8c-dataviz/twin-bar-list-item' ] ];

const edit = ( { hasSelectedInnerBlock, updateInnerBlocksAttribute, innerBlocks, className, setAttributes, attributes: { defaultColors, chartSettings, chartData } } ) => {
	function packData() {
		return packChartData(
			{
				...chartSettings,
				groups: ! isEmpty( innerBlocks )
					? innerBlocks.map( block => ( {
						label: block.attributes.label,
						bars: [
							{
								...block.attributes.barA,
								color: block.attributes.barAColor,
							},
							{
								...block.attributes.barB,
								color: block.attributes.barBColor,
							},
						],
					} ) )
					: [],
			}
		);
	}

	useEffect( () => {
		setAttributes( {
			chartData: packData(),
		} );
	}, [ innerBlocks, chartSettings ] );

	useEffect( () => {
		updateInnerBlocksAttribute( { barAColor: defaultColors.barA } );
	}, [ defaultColors.barA ] );

	useEffect( () => {
		updateInnerBlocksAttribute( { barBColor: defaultColors.barB } );
	}, [ defaultColors.barB ] );

	useEffect( () => {
		setAttributes( { class_name: className } );
	}, [] );

	const showInnerBlocks = hasSelectedInnerBlock || isEmpty( innerBlocks );

	return (
		<>
			<div className={ className }>
				{ ! showInnerBlocks &&
					<D3Canvas className={ `${ className }__canvas` } chartData={ chartData } chartRenderer={ renderChart } />
				}
				{ showInnerBlocks &&
					<InnerBlocks
						template={ TEMPLATE }
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
					/>
				}
			</div>
		</>
	);
};

export default compose(
	withSelect( ( select, { clientId } ) => {
		const innerBlocks = select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks || [];
		// Move to store & memoize
		const hasSelectedInnerBlock_mem = () => {
			const selected_mem = select( 'core/block-editor' ).getBlockSelectionStart();

			if ( clientId === selected_mem ) {
				return true;
			}

			// `innerBlocks` may change to default to null if empty...
			if ( ! isEmpty( innerBlocks ) ) {
				for ( const block of innerBlocks ) {
					if ( block.clientId === selected_mem || block.innerBlocks.length && hasSelectedInnerBlock_mem( block ) ) {
						return true;
					}
				}
			}

			return false;
		};

		return {
			innerBlocks,
			hasSelectedInnerBlock: hasSelectedInnerBlock_mem(),
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
