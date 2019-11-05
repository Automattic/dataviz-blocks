/**
 * External dependencies
 */
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

export default ( { attributes: { level, heading } } ) => {
	const className = getBlockDefaultClassName( 'a8c-dataviz/preference-list' );

	return (
		<div>
			<RichText.Content
				className={ `${ className }__heading` }
				tagName={ `h${ level }` }
				value={ heading }
			/>
			<InnerBlocks.Content />
		</div>
	);
};
