Installation:

-Set up MySQL database
-Make sure medialibrary's requirements are met: https://docs.spatie.be/laravel-medialibrary/v7/requirements
-composer install
-composer install --optimize-autoloader --no-dev
-Copy and fill .env file
-Copy and fill config.js file (/resources/assets/js/config.js)
-php artisan key:generate
-php artisan migrate
-php artisan storage:link
-php artisan passport:install
-php artisan config:cache
-npm install