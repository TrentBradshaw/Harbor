<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostEngagementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_engagements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('engager_id')->default(null);
            $table->boolean('upvoted')->default(false);
            $table->boolean('downvoted')->default(false);
            $table->integer('post_id')->length(10)->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_engagements');
    }
}
