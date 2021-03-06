{{--@extends('layouts.app2')--}}
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta id="csrf-token" name="csrf-token" content="{{ csrf_token() }}">

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
        <div id="react-root" style="display: flex" style="flex-direction: column">
            <div class="Header" id="Header" style="flex-basis: 20%"></div>
            <div id="DocksContainer" class="main" style="flex-basis: 60%"></div>
            <div  id="Column C2" class="C2" style="flex-basis: 20%"></div>        
        </div>
        <script src="{{ asset('js/app.js') }}" ></script>
    </body>
</html>