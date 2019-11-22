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
import * as barChart from './blocks/bar-chart';
import * as barChartCanvas from './blocks/bar-chart-canvas';
import * as barChartBars from './blocks/bar-chart-bars';

// Instantiate the blocks, adding them to our block category
// TODO: improve this
demoD3.registerBlock();
barChart.registerBlock();
barChartCanvas.registerBlock();
barChartBars.registerBlock();
