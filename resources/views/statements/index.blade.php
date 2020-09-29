
@extends('layouts.app')

@section('content')
    <h1>STATEMENTS</h1>
    @if(count($statements) > 1)
        @foreach($statements as $statement)
            <div class="well">
                {{-- <h3><a href="/{{$statement->username}}/{{$statement->statement_id}}"> {{$statement->body}}</h3> --}}
            <h3><a href="/{{$statement->username}}/{{$statement->statement_id}}"> {{$statement->body}}</h3>
            </div>
        @endforeach
    @else
        <p>No Posts Found</p>
    @endif
@endsection