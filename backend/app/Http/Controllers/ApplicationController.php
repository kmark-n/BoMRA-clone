<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductApplication;

class ApplicationController extends Controller
{
    public function index()
    {
        return ProductApplication::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'brand_name'         => 'required|string',
            'atc_code'           => 'required|string',
            'manufacturing_site' => 'required|string',
        ]);
        $data['user_id'] = auth()->id();
        $data['status']  = 'DRAFTS';
        return ProductApplication::create($data);
    }

    public function update(Request $request, $id)
    {
        $application = ProductApplication::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $data = $request->validate([
            'brand_name'         => 'required|string',
            'atc_code'           => 'required|string',
            'manufacturing_site' => 'required|string',
        ]);

        $application->update($data);
        return $application;
    }

    public function destroy($id)
    {
        $application = ProductApplication::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $application->delete();
        return response()->noContent();
    }
}