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
        <div class="Container" id = "dataHolder" 
            data="{{$data ?? ''}}" 
            user="{{$user ?? ''}}" 
            currentUser = "{{$currentUser ?? ''}}"
            pageOwnerInfo="{{$pageOwnerInfo}}"
            feedInfo="{{$feedInfo ?? ''}}">
            <div class="Header" id="Header">
                
            </div>
            <div class="HeightTaker">
                <div class="Wrapper Container Inverse">
                    <div class="HeightTaker">
                        <div class="Wrapper Content">
                            <div class="Table">
                                <div  id="Column C2" class="C2">
                                    <div id='UserPageContainer'>

                                    </div>
                                    <div id='content'>

                                    </div>
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