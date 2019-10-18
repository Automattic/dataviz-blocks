/**
 * External dependencies
 */

import { getCategories, setCategories } from '@wordpress/blocks';

setCategories( [
	{
		slug: 'dataviz-blocks',
		title: 'Dataviz Blocks',
	},
	...getCategories(),
] );

/**
 * Load all our blocks
 */
// import * as foo from './blocks/foo';
import * as stackedBarchart from './blocks/stacked-bar';

// Instantiate the blocks, adding them to our block category
// TODO: improve this
// foo.registerBlock();
stackedBarchart.registerBlock();
