<?php

function render_a8c_dataviz_preference_item( $attributes, $content ) {
	return sprintf(
		'<div class="%1$s__canvas">
			<svg data="%2$s" />
		</div>',
		$attributes[ 'class_name' ],
		$attributes[ 'chartData' ]
	);
}

function register_a8c_dataviz_preference_item() {
	register_block_type( 'a8c-dataviz/preference-item', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
		'render_callback' => 'render_a8c_dataviz_preference_item',
	] );
}

add_action( 'init', 'register_a8c_dataviz_preference_item' );
