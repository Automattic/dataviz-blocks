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
	registerBlockType( 'a8c-dataviz/preference-list', {
		title: __( 'Simple Stacked-Bar List' ),
		description: __( 'Simple stacked barchart for producing lists with labels and bars.' ),
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
			alignment: {
				type: 'string',
				default: 'left',
			},
			level: {
				type: 'number',
				default: 3,
			},
			heading: {
				source: 'html',
				selector: '.wp-blocks-a8c-dataviz-preference-list__heading',
			},
		},
		edit,
		save,
	} );
}
