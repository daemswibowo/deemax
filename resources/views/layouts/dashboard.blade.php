<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Deemax</title>
    <!-- Styles -->
    <style>
      .pace {
        z-index: 9999999 !important;
      }
    </style>
    <link href="{{ asset('assets/bower_components/PACE/themes/blue/pace-theme-flash.css') }}" rel="stylesheet">
    <script src="{{ asset('assets/bower_components/PACE/pace.min.js') }}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="app is-collapsed">
   
    <div id='loader'>
      <div class="spinner"></div>
    </div>

    <script type="text/javascript">
      window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
          loader.classList.add('fadeOut');
        }, 300);
      });
    </script>

    <!-- @App Content -->
    <!-- =================================================== -->
    <div id="app">
      <App></App>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
  </body>
</html>
