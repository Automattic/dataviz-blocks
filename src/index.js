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
import * as demoD3 from './blocks/demo-d3';
import * as twinBarList from './blocks/twin-bar-list';
import * as twinBarListItem from './blocks/twin-bar-list-item';

// Instantiate the blocks, adding them to our block category
// TODO: improve this
demoD3.registerBlock();
twinBarList.registerBlock();
twinBarListItem.registerBlock();
