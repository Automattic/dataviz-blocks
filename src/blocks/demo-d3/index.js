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
	registerBlockType( 'a8c-dataviz/demo-d3', {
		title: __( 'Demo D3' ),
		description: __( 'This is a demo.' ),
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
		},
		edit,
		save,
	} );
}
