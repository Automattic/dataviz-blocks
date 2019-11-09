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
	registerBlockType( 'a8c-dataviz/twin-bar-list', {
		title: __( 'Twin-Bars' ),
		description: __( 'A simple stacked-bars list.' ),
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
					spaceBetween: 10, // px
					labelWidth: 10, // %
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
				source: 'html',
				selector: '.wp-blocks-a8c-dataviz-twin-bar-list__heading',
			},
			subheading: {
				source: 'html',
				selector: '.wp-blocks-a8c-dataviz-twin-bar-list__subheading',
			},
		},
		edit,
		save,
	} );
}
