<?php

function render_a8c_dataviz_bar_chart_canvas( $attributes, $content ) {
	// enqueue frontend JS scripts here
	if ( ! is_admin() ) {
		wp_enqueue_script( 'dataviz-frontend' );
	}

	return sprintf(
		'<div class="%1$s">
			<div class="%1$s__canvas">
				<svg data="%2$s" />
			</div>
		</div>',
		$attributes[ 'class_name' ],
		$attributes[ 'chartData' ]
	);
}

function register_a8c_dataviz_bar_chart_canvas() {
	register_block_type( 'a8c-dataviz/bar-chart-canvas', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
		'render_callback' => 'render_a8c_dataviz_bar_chart_canvas',
	] );
}

add_action( 'init', 'register_a8c_dataviz_bar_chart_canvas' );
