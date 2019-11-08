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
	registerBlockType( 'a8c-dataviz/twin-bar-list-item', {
		title: __( 'Twin-Bars Row' ),
		description: __( 'A stacked-bars list item.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
		supports: {
			inserter: true,
			reusable: false,
			html: false,
		},
		parent: [ 'a8c-dataviz/twin-bar-chart' ],
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
			label: {
				type: 'string',
				default: 'Label',
			},
			barAColor: {
				type: 'string',
				default: 'rgba(205, 38, 83, 0.5)',
			},
			barBColor: {
				type: 'string',
				default: 'rgba(205, 38, 83, 1)',
			},
			barA: {
				type: 'object',
				default: {
					fill: 10,
					description: 'Bar A description',
				},
			},
			barB: {
				type: 'object',
				default: {
					fill: 5,
					description: 'Bar B description',
				},
			},
		},
		edit,
		save,
	} );
}
