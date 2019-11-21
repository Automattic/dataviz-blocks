<?php

function register_a8c_dataviz_bar_chart() {
	register_block_type( 'a8c-dataviz/bar-chart', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
	] );
}

add_action( 'init', 'register_a8c_dataviz_bar_chart' );
