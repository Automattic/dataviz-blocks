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
		title: __( 'Twin-bar List Item' ),
		description: __( 'A stacked-bars list item.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
		supports: {
			inserter: true,
			reusable: false,
			html: false,
		},
		parent: [ 'a8c-dataviz/twin-bar-list' ],
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
			alignment: {
				type: 'string',
				default: 'left',
			},
			class_name: {
				type: 'string',
			},
			chartData: {
				type: 'string',
			},
			label: {
				type: 'string',
			},
			barA: {
				type: 'object',
				default: {
					fill: 100,
					description: 'Bar A description',
				},
			},
			barB: {
				type: 'object',
				default: {
					fill: 100,
					description: 'Bar B description',
				},
			},
			color: {
				type: 'string',
				default: 'rgb(205, 38, 83)',
			},
		},
		edit,
		save,
	} );
}
