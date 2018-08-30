<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <!-- TODO: meta info -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>BB Events</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="{{ 'https://maps.googleapis.com/maps/api/js?key=' . env('GOOGLEAPIKEY') . '&libraries=places' }}"></script>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>