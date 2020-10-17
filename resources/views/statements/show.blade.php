@extends('layouts.app')
{{/*when you make the statement, return the view  on top of the current one*/}}
@section('content')
    <h1>{{$statement->body}}</h1>
@endsection