/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { BlockIcon } from '../../components/block-icons';

export function registerBlock() {
	registerBlockType( 'a8c-dataviz/twin-bar-chart', {
		title: __( 'Twin-Bars Canvas' ),
		description: __( 'The twin-bar chart canvas.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
		supports: {
			inserter: false,
		},
		parent: [ 'a8c-dataviz/twin-bar-list' ],
		styles: [],
		attributes: {
			chartSettings: {
				type: 'object',
				default: {
					order: 'stacked',
					unit: '%',
					barHeight: 40,
					spaceBetween: 10,
					labelWidth: 30,
					axes: true,
				},
			},
			defaultColors: {
				type: 'object',
				default: {
					barA: 'rgba(205, 38, 83, 0.5)',
					barB: 'rgba(205, 38, 83, 1)',
				},
			},
			chartData: {
				type: 'string',
			},
		},
		edit,
		save,
	} );
}
