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
	registerBlockType( 'a8c/stacked-bar', {
		title: __( 'Stacked Barchart Block' ),
		description: __( 'This is a Stacked Barchart block.' ),
		icon: BlockIcon,
		category: 'dataviz-blocks',
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
			name: {
				type: 'string',
			},
			description: {
				type: 'string',
			},
			alignment: {
				type: 'string',
				default: 'left',
			},
		},
		edit,
		save,
	} );
}
