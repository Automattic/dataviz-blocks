<?php

function render_a8c_dataviz_demo_d3( $attributes, $content ) {
	if ( ! is_admin() ) {
		wp_enqueue_script( 'dataviz-frontend' );
	}

	return sprintf(
		'<div class="%1$s__canvas">
			<svg data="%2$s" />
		</div>',
		$attributes[ 'class_name' ],
		$attributes[ 'chartData' ]
	);
}

function register_a8c_dataviz_demo_d3() {
	register_block_type( 'a8c-dataviz/demo-d3', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
		'render_callback' => 'render_a8c_dataviz_demo_d3',
	] );
}

add_action( 'init', 'register_a8c_dataviz_demo_d3' );
