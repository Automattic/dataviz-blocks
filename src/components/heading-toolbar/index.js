/**
 * External dependencies
 */
import { Toolbar } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { range } from 'lodash';

function createLevelControl( targetLevel, selectedLevel, onChange ) {
	return {
		icon: 'heading',
		// translators: %s: heading level e.g: "1", "2", "3"
		title: sprintf( __( 'Heading %d' ), targetLevel ),
		isActive: targetLevel === selectedLevel,
		onClick: () => onChange( targetLevel ),
		subscript: String( targetLevel ),
	};
}

export default function HeadingToolbar( { minLevel, maxLevel, selectedLevel, onChange } ) {
	return (
		<Toolbar controls={ range( minLevel, maxLevel ).map( ( index ) => createLevelControl( index, selectedLevel, onChange ) ) } />
	);
}
