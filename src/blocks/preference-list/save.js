/**
 * External dependencies
 */
import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default ( { attributes: { level, heading }, className } ) => {
	return (
		<div className={ className }>
			<RichText.Content
				className={ `${ className }__heading` }
				tagName={ `h${ level }` }
				value={ heading }
			/>

			<InnerBlocks.Content />
		</div>
	);
};
