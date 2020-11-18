<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('community_id')->length(50);
            $table->integer('creator_id')->length(25);
            $table->string('title')->length(200);
            $table->string('text')->length(2000);
            $table->string('link')->length(2000);
            $table->integer('votes');
            $table->string('media_url')->length(2000);
            $table->string('type')->length(15);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
