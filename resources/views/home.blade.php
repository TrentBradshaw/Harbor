@extends('layouts.app')
@include('inc.navbar')
@section('content')
<div class="container middle">
    <div class=" justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div >
                <div id='main'>
                    <div id='topic-statement-holder'>
                        <div>
                            <h1>STATEMENTS</h1>
                        </div>
                        <div>
                            <h1>TOPICS</h1>
                        </div>
                    </div>
                    <div id='statements'>
                        <h1>STATEMENTS</h1>
                        {{--> INSERT STATEMENTS LOADING HERE <--}}
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
</div>

@endsection
<div id='trending' class='right-column'>
    <h1>trending</h1>
</div>
