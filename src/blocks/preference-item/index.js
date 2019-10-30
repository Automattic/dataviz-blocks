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
	registerBlockType( 'a8c-dataviz/preference-item', {
		title: __( 'Preference Item' ),
		description: __( 'This is a preference item.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
		supports: {
			inserter: true,
			reusable: false,
			html: false,
		},
		parent: [ 'a8c-dataviz/preference-list' ],
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
			data: {
				type: 'string',
			},
			barAFill: {
				type: 'number',
				default: 100,
			},
			barALabel: {
				type: 'string',
				default: 'Bar A',
			},
			barBFill: {
				type: 'number',
				default: 0,
			},
			barBLabel: {
				type: 'string',
				default: 'Bar B',
			},
			color: {
				type: 'string',
				default: 'blue',
			},
		},
		edit,
		save,
	} );
}
