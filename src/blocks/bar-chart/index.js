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
	registerBlockType( 'a8c-dataviz/bar-chart', {
		title: __( 'Bar Chart' ),
		description: __( 'A simple stacked-bar chart.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
		supports: {
			inserter: true,
			html: false,
			align: [ 'wide', 'full' ],
		},
		styles: [
			{
				name: 'horizontal',
				label: 'Horizontal',
				isDefault: true,
			},
			{
				name: 'vertical',
				label: 'Vertical',
			},
		],
		attributes: {
			chartSettings: {
				type: 'object',
				default: {
					order: 'stacked',
					unit: '%',
					barHeight: 40, // px
					spaceBetween: 10, // %
					labelWidth: 30, // %
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
			level: {
				type: 'number',
				default: 3,
			},
			heading: {
				type: 'string',
			},
			subheading: {
				type: 'string',
			},
		},
		edit,
		save,
	} );
}
