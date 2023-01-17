<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Get the profile.
     *
     * @param string $id
     * @return \Illuminate\Http\Response
     */
    public function getProfile(string $id)
    {
        $user = User::where('custom_id', '=', $id)->first();

        return new UserResource($user);
    }
}
