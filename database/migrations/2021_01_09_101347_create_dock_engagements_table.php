<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDockEngagementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dock_engagements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('subscriber_id')->default(null);
            $table->boolean('subscribed')->default(false);
            $table->integer('dock_id')->length(10)->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dock_engagements');
    }
}
