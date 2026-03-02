<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PdlStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'surname' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'alias' => ['nullable', 'string', 'max:255'],
            'contact_number' => ['required', 'regex:/^\d{11}$/'],
            'case_number' => ['required', 'string', 'max:255'],
            'crime_history' => ['nullable', 'string'],
            'remarks' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['active', 'released', 'transferred', 'transfered'])],
            'transferred_to' => ['nullable', 'string', 'max:255', 'required_if:status,transferred,transfered'],
            'sentence_start_date' => ['nullable', 'date'],
            'sentence_years' => ['nullable', 'integer', 'min:1', 'max:100'],
            'profile_photo' => ['nullable', 'image', 'max:2048'],
            'next_hearing_date' => ['nullable', 'date'],
            'hearing_notes' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'contact_number.regex' => 'Contact number must be exactly 11 digits.',
            'transferred_to.required_if' => 'Transfer destination is required when status is transferred.',
            'profile_photo.image' => 'Profile photo must be an image file.',
            'profile_photo.max' => 'Profile photo must not exceed 2MB.',
        ];
    }
}
