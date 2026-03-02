<?php

namespace Tests\Feature;

use App\Models\Pdl;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModulePagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_superadmin_can_open_transfers_and_court_calendar_pages(): void
    {
        $user = $this->createUserWithRole('superadmin');
        $this->actingAs($user);

        $this->get(route('notifications.index'))->assertOk();
        $this->get(route('pdls.transfers'))->assertOk();
        $this->get(route('pdls.court-calendar'))->assertOk();
        $this->get(route('reports.index'))->assertOk();
    }

    public function test_superadmin_can_open_backup_tools_and_export(): void
    {
        $user = $this->createUserWithRole('superadmin');
        $this->actingAs($user);

        $this->get(route('backup-tools.index'))->assertOk();
        $this->get(route('backup-tools.export'))
            ->assertOk()
            ->assertHeader('content-type', 'application/sql; charset=UTF-8');
    }

    public function test_non_superadmin_cannot_open_backup_tools_page(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->get(route('backup-tools.index'))->assertForbidden();
        $this->get(route('backup-tools.export'))->assertForbidden();
    }

    public function test_sentence_tracker_page_loads_with_sentence_data(): void
    {
        $user = $this->createUserWithRole('superadmin');
        $this->actingAs($user);

        Pdl::create([
            'surname' => 'Doe',
            'first_name' => 'John',
            'middle_name' => null,
            'alias' => null,
            'contact_number' => '09123456789',
            'case_number' => 'CASE-100',
            'crime_history' => 'Test',
            'remarks' => null,
            'status' => 'active',
            'sentence_start_date' => now()->subYear()->toDateString(),
            'sentence_years' => 3,
        ]);

        $this->get(route('pdls.sentence-tracker'))->assertOk();
    }

    public function test_superadmin_can_apply_bulk_update(): void
    {
        $user = $this->createUserWithRole('superadmin');
        $this->actingAs($user);

        $pdl = Pdl::create([
            'surname' => 'Bulk',
            'first_name' => 'Sample',
            'middle_name' => null,
            'alias' => null,
            'contact_number' => '09123456789',
            'case_number' => 'BULK-001',
            'crime_history' => null,
            'remarks' => null,
            'status' => 'active',
        ]);

        $this->post(route('pdls.bulk-update'), [
            'ids' => [$pdl->id],
            'action' => 'status',
            'status' => 'released',
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('pdls', [
            'id' => $pdl->id,
            'status' => 'released',
        ]);
    }

    private function createUserWithRole(string $roleName): User
    {
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => $roleName], ['label' => ucfirst($roleName)]);
        $user->roles()->syncWithoutDetaching([$role->id]);

        return $user;
    }
}
