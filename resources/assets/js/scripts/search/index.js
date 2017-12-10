import * as $ from 'jquery';

export default (function () {
	jQuery(document).ready(function($) {
		$('.search-toggle').on('click', e => {
			$('.search-box, .search-input').toggleClass('active');
			$('.search-input input').focus();
			e.preventDefault();
		});
	});
}());
