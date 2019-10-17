/**
 * External dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default ( { className } ) => {
	return (
		<div className={ className }>
			<div className={ 'wp-block-a8c-foo__text' }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};
