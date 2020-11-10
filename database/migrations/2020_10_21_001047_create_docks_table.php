<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docks', function (Blueprint $table) {
            $table->id();
            $table->integer('community_id')->length(50);
            $table->integer('creator_id')->length(25);
            $table->string('title')->length(200);
            $table->string('content')->length(2000);
            $table->string('link')->length(2000);
            $table->integer('votes');
            $table->string('media_url')->length(2000);
            $table->string('type')->length(15);
            $table->string('description');
            $table->string('mods');
            $table->string('tags');
            $table->boolean('spoiler')->default(0);
            $table->boolean('nsfw')->default(0);
            $table->timestamps();
            /*
            CREATE TABLE reddit_post
(
 
  link varchar(2083) NOT NULL,
  user_id varchar(25) NOT NULL,
  pic varchar(2083),
  status varchar(15) NOT NULL,
  type varchar(15) NOT NULL,
  votes INTEGER,
  created_time TIMESTAMP default CURRENT_TIMESTAMP,
  primary key(post_id)
);
            */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docks');
    }
}
