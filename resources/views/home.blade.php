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

        <!-- Styles -->
        <link href="{{ asset('css/home.css') }}" rel="stylesheet">
    </head>
    <body>
        <div class="Container">
            <div class="Header">
                <h1>Header</h1>
                <p>if The Header height is not fixed, It will span excatly his needed space.</p>
                <p>The Padding/Margin between the header and the content and around the layout is optional</p>
            </div>
            <div class="HeightTaker">
                <div class="Wrapper Container Inverse">
                    <div class="HeightTaker">
                        <div class="Wrapper Content">
                            <div class="Table">
                                <div class="Column C1">
                                    <h1>Column 1</h1>
                                    <p>The Content div should always span the available Container space.</p>
                                </div>
                                <div class="Column C2" id="example" data="{{$data}}" >
                                     
                                </div>
                                <div class="Column C3">
                                    <h1>Column 3</h1>
                                    <p class="Important">This Layout has been tested on: IE10, FireFox, Chrome, Safari, Opera. using Pure CSS only</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}" ></script>
    </body>
</html>


