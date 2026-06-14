<?php

namespace App\Http\Controllers;

use App\Models\Stakeholder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class StakeholdersController extends Controller
{
    // GET ALL
    public function index()
    {
        $stakeholders = Stakeholder::latest()->get();
        return response()->json($stakeholders);
    }

    public function create()
    {
        //
    }

    // REGISTER - Public
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name'        => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:stakeholders',
            'contact_person'      => 'required|string|max:255',
            'email'               => 'required|email|max:255',
            'phone'               => 'required|string|max:20',
            'physical_address'    => 'required|string',
            'product_category'    => 'required|in:Human Medicine,Animal Medicine,Cosmetics,Medical Device',
            'stakeholder_type'    => 'required|in:Exporter,Importer,Manufacturer,Distributor,Retailer',
            'notes'               => 'nullable|string'
        ]);

        $stakeholder = Stakeholder::create($validated);

        return response()->json([
            'message'     => 'Stakeholder application submitted successfully.',
            'stakeholder' => $stakeholder
        ], 201);
    }

    public function show(Stakeholder $stakeholder)
    {
        return response()->json($stakeholder);
    }

    public function edit(Stakeholder $stakeholder)
    {
        //
    }

    public function update(Request $request, Stakeholder $stakeholder)
    {
        //
    }

    // APPROVE
    public function approve($id)
    {
        $stakeholder = Stakeholder::findOrFail($id);

        $code = strtoupper(
            Str::random(4) . '-' . Str::random(4) . '-' . Str::random(4)
        );

        $stakeholder->update([
            'status'      => 'Approved',
            'access_code' => $code
        ]);

        Mail::raw(
            "Dear {$stakeholder->contact_person},\n\n" .
            "Your BoMRA Stakeholder application has been APPROVED.\n\n" .
            "Your MIS Access Code is: {$code}\n\n" .
            "Please visit http://localhost:4200/mis-access and enter this code.\n\n" .
            "Regards,\nBoMRA Team",
            function ($message) use ($stakeholder) {
                $message->to($stakeholder->email)
                        ->subject('BoMRA Application Approved - Your Access Code');
            }
        );

        return response()->json([
            'message'     => 'Stakeholder approved and access code sent via email.',
            'access_code' => $stakeholder->access_code
        ]);
    }

    // DECLINE
    public function decline($id)
    {
        $stakeholder = Stakeholder::findOrFail($id);

        $stakeholder->update(['status' => 'Declined']);

        Mail::raw(
            "Dear {$stakeholder->contact_person},\n\n" .
            "We regret to inform you that your BoMRA Stakeholder application has been DECLINED.\n\n" .
            "For enquiries contact: info@bomra.co.bw\n\n" .
            "Regards,\nBoMRA Team",
            function ($message) use ($stakeholder) {
                $message->to($stakeholder->email)
                        ->subject('BoMRA Application Status Update');
            }
        );

        return response()->json([
            'message' => 'Stakeholder declined and email sent.'
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        Stakeholder::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Stakeholder deleted successfully.'
        ]);
    }

    // VERIFY ACCESS CODE
    public function verifyCode(Request $request)
    {
        $request->validate([
            'access_code' => 'required|string'
        ]);

        $stakeholder = Stakeholder::where('access_code', $request->access_code)
                                  ->where('status', 'Approved')
                                  ->first();

        if ($stakeholder) {
            return response()->json([
                'valid'       => true,
                'stakeholder' => $stakeholder
            ]);
        }

        return response()->json([
            'valid'   => false,
            'message' => 'Invalid access code.'
        ], 400);
    }
}
