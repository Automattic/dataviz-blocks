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
import * as preferenceList from './blocks/preference-list';
import * as preferenceItem from './blocks/preference-item';

// Instantiate the blocks, adding them to our block category
// TODO: improve this
demoD3.registerBlock();
preferenceList.registerBlock();
preferenceItem.registerBlock();
