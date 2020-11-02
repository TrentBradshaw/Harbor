<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TextDock extends Model
{
    use HasFactory;
    protected $table = 'textDocks';
    public static function boot(){
        parent::boot();

        self::creating(function($model){
            error_log('booting');
        });
    
        self::created(function($model){
            // ... code here
        });
    
        self::updating(function($model){
            // ... code here
        });
    
        self::updated(function($model){
            // ... code here
        });
    
        self::deleting(function($model){
            // ... code here
        });
    
        self::deleted(function($model){
            // ... code here
        });
    }
   
}
