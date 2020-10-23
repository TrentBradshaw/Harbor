{{--@extends('layouts.app2')--}}
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Roller') }}</title>

        <!-- Scripts -->
        

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        <link src='https://unpkg.com/@material-ui/core@4.11.0/umd/material-ui.development.js'>
        <!-- Styles -->
        <link href="{{ asset('css/home.css') }}" rel="stylesheet">
    </head>
    <body>
        <div class="Container" id = "dataHolder" data="{{$data}}">
            <div class="Header" id="Header">
                    
            </div>
            <form action="submit" id="submit-form">
                <div>
                    <h1>Type of Post:</h1>
                </div>
                <div id="submitCategory">
                    <div>
                        <input type="button" value="Status">
                    </div>
                    
                    <Div>
                        <input type="button" value="Dock Topic">

                    </Div>

                    <div>
                        <input type="text" placeholder="Title" id="title">
                    </div>
                    <div>
                        <input type="text" name="body" placeholder='Text(optional)' id="body">
                    </div>
                    
                </div>
            </form>
        </div>

        <script src="{{ asset('js/app.js') }}" ></script>
    </body>
</html>