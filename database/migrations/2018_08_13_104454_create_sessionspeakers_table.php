<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionspeakersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessionspeakers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('speaker_id')->index();
            $table->integer('session_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessionspeakers');
    }
}
