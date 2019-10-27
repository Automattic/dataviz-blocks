<?php
function register_a8c_dataviz_preference_list() {
	register_block_type( 'a8c-dataviz/preference-list', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
	] );
}

add_action( 'init', 'register_a8c_dataviz_preference_list' );
