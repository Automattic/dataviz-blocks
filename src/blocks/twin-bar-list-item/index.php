<?php

function register_a8c_dataviz_twin_bar_list_item() {
	register_block_type( 'a8c-dataviz/twin-bar-list-item', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
	] );
}

add_action( 'init', 'register_a8c_dataviz_twin_bar_list_item' );
