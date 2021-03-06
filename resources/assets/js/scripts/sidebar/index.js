import * as $ from 'jquery';

export default (function () {
  // Sidebar links
  jQuery(document).ready(function($) {
    $('.sidebar .sidebar-menu li a').on('click', function () {
      const $this = $(this);

      if ($this.parent().hasClass('open')) {
        $this
        .parent()
        .children('.dropdown-menu')
        .slideUp(200, () => {
          $this.parent().removeClass('open');
        });
      } else {
        $this
        .parent()
        .parent()
        .children('li.open')
        .children('.dropdown-menu')
        .slideUp(200);

        $this
        .parent()
        .parent()
        .children('li.open')
        .children('a')
        .removeClass('open');

        $this
        .parent()
        .parent()
        .children('li.open')
        .removeClass('open');

        $this
        .parent()
        .children('.dropdown-menu')
        .slideDown(200, () => {
          $this.parent().addClass('open');
        });
      }
    });

    const sidebarLinks = $('.sidebar').find('.sidebar-link');

    sidebarLinks
    .each((index, el) => {
      $(el).removeClass('active');
    })
    .filter(function () {
      const href = $(this).attr('href');
      const pattern = href[0] === '/' ? href.substr(1) : href;
      return pattern === (window.location.pathname).substr(1);
    })
    .addClass('active');

    $('.sidebar-toggle').on('click', e => {
      // $('.app').removeClass('is-collapsed');
      $('.app').toggleClass('is-collapsed');

      if (localStorage.getItem('sidebar-collapsed') === null || localStorage.getItem('sidebar-collapsed')==0) {
        localStorage.setItem('sidebar-collapsed', 1);
      } else {
        localStorage.setItem('sidebar-collapsed', 0);
      }
      // e.preventDefault();
    });

    // $('#sidebar-toggle').click(e => {
    //   e.preventDefault();
    //   setTimeout(() => {
    //     window.dispatchEvent(window.EVENT);
    //   }, 300);
    // });

  });
}());
