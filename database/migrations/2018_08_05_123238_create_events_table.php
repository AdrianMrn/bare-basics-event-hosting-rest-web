<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventsTable extends Migration {

	public function up()
	{
		Schema::create('events', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->string('slug')->nullable()->unique();
			$table->string('address')->nullable();
			$table->string('city')->nullable();
			$table->string('country')->nullable();
			$table->string('venue_name')->nullable();
			$table->text('description')->nullable();
			$table->datetime('date_start')->nullable();
			$table->datetime('date_end')->nullable();
			$table->integer('owner_id');
			$table->integer('type')->default(1);
			$table->decimal('coords_lon', 10, 7)->nullable();
			$table->decimal('coords_lat', 10, 7)->nullable();
			$table->boolean('is_private')->default(false);
			$table->boolean('is_published')->default(false);
			$table->timestamps();
			$table->softDeletes();
		});
	}

	public function down()
	{
		Schema::drop('events');
	}
}