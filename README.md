# Laravel React Full Stack Application
## Full Stack Take Home Coding Exercise
Please write an app using React JS on the front end and PHP (Laravel) on the back
end. The app should have the following functionality:
● User can create a log in
● Next, user can fill out a profile and upload their picture and some basic
personal information (name + phone number + custom-id)
● This information is saved to the database and a profile URL is generated, e.g.
{server}/profile/{custom-id}

## Installation
Make sure you have environment setup properly. You will need PHP8.2, composer and Node.js.

### Prerequire: Docker, PHP installed
For more information: https://laravel.com/docs/sail

1. Download the project (or clone using GIT)
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal
4. Run `composer install`, `php artisan sail:install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Start local server by executing `./vendor/bin/sail up -d`
7. Run migrations `./vendor/bin/sail artisan migrate`
8. Open new terminal and navigate to the `react` folder
9. Copy `react/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
9. Run `npm install`
10. Run `npm run dev` to start vite server for React

## Output: I was testing on Mac OS environment
- API url: localhost/api
- Frontend url: localhost:3000
- Profile route: http://localhost:3000/profile/232347
