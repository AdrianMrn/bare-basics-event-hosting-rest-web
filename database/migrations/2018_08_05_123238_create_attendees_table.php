<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAttendeesTable extends Migration {

	public function up()
	{
		Schema::create('attendees', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->index();
			$table->integer('event_id')->index();
			$table->boolean('is_speaker')->default(false);
			$table->boolean('is_host')->default(false);
			$table->timestamps();
			$table->softDeletes();
		});
	}

	public function down()
	{
		Schema::drop('attendees');
	}
}