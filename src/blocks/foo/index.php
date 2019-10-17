<?php

add_action( 'init', function() {
	register_block_type( 'a8c/foo', [
		'editor_script' => 'dataviz-blocks',
		'style' => 'dataviz-blocks',
		'editor_style' => 'dataviz-blocks-editor',
	] );
} );
