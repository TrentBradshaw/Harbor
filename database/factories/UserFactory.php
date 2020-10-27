<?php

namespace Database\Factories;

use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;
/** @var \Illuminate\Database\Eloquent\Factory $factory */




class UserFactory extends Factory{

     /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(){
        return [
            'id' => rand( 0, 5000),
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' =>'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => $this->faker->bothify,
            'username' => $this->faker->userName,
            'pfp_url' => '8IYSjofV_400x400.jpg',
            'description' => $this->faker->text($maxNbChars = 100),
            'followers_count' => $this->faker->randomDigit,
            'followed_count' => $this->faker->randomDigit,
            'statements_count' => $this->faker->randomDigit,
            'docks_count' => $this->faker->randomDigit,
        ];

    }    
}
