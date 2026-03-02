<?php

namespace Database\Seeders;

use App\Models\Pdl;
use Illuminate\Database\Seeder;

class PangasinanPdlSeeder extends Seeder
{
    /**
     * Seed sample PDL records for Pangasinan.
     */
    public function run(): void
    {
        $records = [
            [
                'surname' => 'Dela Cruz',
                'first_name' => 'Ramon',
                'middle_name' => 'Santos',
                'alias' => 'Mon',
                'contact_number' => '09171234567',
                'case_number' => 'PANG-2026-0001',
                'crime_history' => 'Theft',
                'remarks' => 'Resident of Lingayen, Pangasinan.',
                'status' => 'active',
                'transferred_to' => null,
                'sentence_start_date' => '2024-06-15',
                'sentence_years' => 4,
                'next_hearing_date' => '2026-04-10',
                'hearing_notes' => 'Pre-trial hearing at RTC Lingayen.',
            ],
            [
                'surname' => 'Garcia',
                'first_name' => 'Joel',
                'middle_name' => 'Reyes',
                'alias' => 'Joey',
                'contact_number' => '09182345678',
                'case_number' => 'PANG-2026-0002',
                'crime_history' => 'Illegal possession of firearm',
                'remarks' => 'Resident of Dagupan City.',
                'status' => 'transferred',
                'transferred_to' => 'Pangasinan Provincial Jail Annex, Urdaneta',
                'sentence_start_date' => '2023-11-20',
                'sentence_years' => 6,
                'next_hearing_date' => null,
                'hearing_notes' => null,
            ],
            [
                'surname' => 'Aquino',
                'first_name' => 'Marvin',
                'middle_name' => 'Tolentino',
                'alias' => 'Mav',
                'contact_number' => '09193456789',
                'case_number' => 'PANG-2026-0003',
                'crime_history' => 'Robbery',
                'remarks' => 'From Mangaldan, Pangasinan.',
                'status' => 'active',
                'transferred_to' => null,
                'sentence_start_date' => '2025-01-05',
                'sentence_years' => 7,
                'next_hearing_date' => '2026-03-25',
                'hearing_notes' => 'Witness presentation.',
            ],
            [
                'surname' => 'Fernandez',
                'first_name' => 'Cesar',
                'middle_name' => 'Mendoza',
                'alias' => 'Cez',
                'contact_number' => '09204567891',
                'case_number' => 'PANG-2026-0004',
                'crime_history' => 'Drug possession',
                'remarks' => 'From Urdaneta City.',
                'status' => 'released',
                'transferred_to' => null,
                'sentence_start_date' => '2020-08-01',
                'sentence_years' => 5,
                'next_hearing_date' => null,
                'hearing_notes' => null,
            ],
            [
                'surname' => 'Navarro',
                'first_name' => 'Peter',
                'middle_name' => 'Lopez',
                'alias' => 'Pit',
                'contact_number' => '09215678912',
                'case_number' => 'PANG-2026-0005',
                'crime_history' => 'Frustrated homicide',
                'remarks' => 'From San Carlos City, Pangasinan.',
                'status' => 'active',
                'transferred_to' => null,
                'sentence_start_date' => '2024-02-12',
                'sentence_years' => 8,
                'next_hearing_date' => '2026-05-14',
                'hearing_notes' => 'Cross examination.',
            ],
            [
                'surname' => 'Bautista',
                'first_name' => 'Ronnie',
                'middle_name' => 'Diaz',
                'alias' => 'Ron',
                'contact_number' => '09226789123',
                'case_number' => 'PANG-2026-0006',
                'crime_history' => 'Qualified theft',
                'remarks' => 'From Bayambang, Pangasinan.',
                'status' => 'transferred',
                'transferred_to' => 'Bureau of Jail Management and Penology - Dagupan City Jail',
                'sentence_start_date' => '2022-09-30',
                'sentence_years' => 5,
                'next_hearing_date' => null,
                'hearing_notes' => null,
            ],
        ];

        foreach ($records as $record) {
            Pdl::updateOrCreate(
                ['case_number' => $record['case_number']],
                $record
            );
        }
    }
}

