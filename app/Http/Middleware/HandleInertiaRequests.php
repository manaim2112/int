<?php

namespace App\Http\Middleware;

use App\Models\User_history;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if($request->user()) {
            $histoy = User_history::where("user_id", $request->user()->id)->get();
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'history' => $histoy ?? null,
            ],
            'flash' => [
                "message" => $request->session()->get("message")
            ]
        ];
    }
}
