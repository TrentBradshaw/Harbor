<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statement extends Model
{
    //use HasFactory;

    protected $table = "statements";
    public $primaryKey = "statement_id";
    
}
