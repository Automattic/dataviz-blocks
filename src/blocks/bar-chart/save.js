/**
 * External dependencies
 */
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

const save = ( { attributes: { level, heading, subheading } } ) => {
	const className = getBlockDefaultClassName( 'a8c-dataviz/bar-chart' );

	return (
		<div>
			{ heading &&
				<RichText.Content
					className={ `${ className }__heading` }
					tagName={ `h${ level }` }
					value={ heading }
				/>
			}
			{ subheading &&
				<RichText.Content
					className={ `${ className }__subheading` }
					tagName={ 'div' }
					value={ subheading }
				/>
			}
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
