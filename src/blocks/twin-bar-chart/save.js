export default function save() {
	return <InnerBlocks.Content />;
}

/**
 * External dependencies
 */
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

const foo = ( { attributes: { level, heading, subheading } } ) => {
	const className = getBlockDefaultClassName( 'a8c-dataviz/twin-bar-list' );

	return (
		<div>
			<RichText.Content
				className={ `${ className }__heading` }
				tagName={ `h${ level }` }
				value={ heading }
			/>
			<RichText.Content
				className={ `${ className }__subheading` }
				tagName={ 'div' }
				value={ subheading }
			/>
			<InnerBlocks.Content />
		</div>
	);
};
