# PPJO PDL Management System

## 1) Finalized Project Checklist

### Foundation
- [x] Laravel + Inertia + React project initialized
- [x] MySQL environment configured in `.env`
- [x] Authentication (Fortify) available
- [x] Superadmin seeder created (`SuperAdminSeeder`)

### PDL Core Module
- [x] PDL database table created (`pdls`)
- [x] PDL model created (`App\Models\Pdl`)
- [x] Multi-step registration form implemented
- [x] Server-side validation for required fields
- [x] Contact number validation (exactly 11 digits)
- [x] Smart casing formatter for text fields
- [x] Dashboard listing with live search
- [x] Details modal for selected PDL

### Operations
- [x] Export endpoint implemented (`pdls.export`)
- [x] Export generates 2 sheets:
  - [x] `Pdl masterlist`
  - [x] `crime history`
- [x] Print card endpoint + printable layout (`pdls.print`)

### UI/UX
- [x] Welcome page customized to project context
- [x] Login page redesigned
- [x] Sidebar color theme customized (dark orange)

### Remaining Work (Recommended Before Production)
- [ ] Edit existing PDL record
- [ ] Update status workflow with history trail
- [ ] Role-based access control (superadmin, encoder, viewer)
- [ ] Audit log for create/update/print/export actions
- [ ] Automated tests for PDL CRUD, export, print
- [ ] Rate limit and harden auth/security rules

---

## 2) Finalized Delivery Plan

### Phase 1: Core Data + Registration (Completed)
1. Create `pdls` schema and model.
2. Build registration (multi-step) and validation rules.
3. Save and show records in dashboard.

### Phase 2: Search + Detail + Operational Output (Completed)
1. Add search/filter behavior to dashboard.
2. Add record detail modal.
3. Add export and print routes/views.

### Phase 3: Admin Governance (Pending)
1. Introduce roles and permissions.
2. Add status lifecycle controls with status history.
3. Add activity/audit logs.

### Phase 4: Quality + Release Hardening (Pending)
1. Write feature tests for core user flows.
2. Add validation edge-case tests.
3. Add monitoring/logging policy and backup plan.
4. Production deployment checklist and rollback plan.

---

## 3) Database Schema

## A. Current Implemented Schema

### `users`
Source: default Laravel users migration + two-factor migration
- `id` (bigint, PK)
- `name` (string)
- `email` (string, unique)
- `email_verified_at` (timestamp, nullable)
- `password` (string)
- `remember_token` (string, nullable)
- `two_factor_secret` (text, nullable)
- `two_factor_recovery_codes` (text, nullable)
- `two_factor_confirmed_at` (timestamp, nullable)
- `created_at` / `updated_at` (timestamps)

### `pdls`
Source: `2026_03_01_230000_create_pdls_table.php`
- `id` (bigint, PK)
- `surname` (string, required)
- `first_name` (string, required)
- `middle_name` (string, nullable)
- `alias` (string, nullable, indexed)
- `contact_number` (string length 11, required)
- `case_number` (string, required, indexed)
- `crime_history` (text, nullable)
- `remarks` (text, nullable)
- `status` (string, default: `active`)
- `created_at` / `updated_at` (timestamps)
- Indexes:
  - `(surname, first_name)`
  - `case_number`
  - `alias`

### Other Laravel support tables
- `sessions`
- `password_reset_tokens`
- `cache`, `cache_locks`
- `jobs`, `job_batches`, `failed_jobs`

## B. Recommended Final Schema (For Full Operations)

### `roles`
- `id`, `name` (`superadmin`, `encoder`, `viewer`), timestamps

### `role_user` (pivot)
- `user_id`, `role_id` (composite unique), timestamps

### `pdl_status_histories`
- `id`
- `pdl_id` (FK -> `pdls.id`)
- `from_status` (string, nullable)
- `to_status` (string, required)
- `remarks` (text, nullable)
- `changed_by` (FK -> `users.id`)
- `created_at`

### `audit_logs`
- `id`
- `actor_id` (FK -> `users.id`, nullable)
- `action` (string) e.g. `pdl.create`, `pdl.update`, `pdl.print`, `pdl.export`
- `target_type` (string)
- `target_id` (bigint, nullable)
- `meta` (json, nullable)
- `ip_address` (string, nullable)
- `created_at`

---

## 4) Route/Module Map (Current)

- `GET /` -> Welcome page
- `GET /dashboard` -> PDL dashboard
- `POST /pdls` -> Register/store PDL
- `GET /pdls/export` -> Export records
- `GET /pdls/{pdl}/print` -> Print card view

---

## 5) Definition of Done (Project Final)

Project is considered final when:
1. All items in “Remaining Work” are completed.
2. Role-based access and audit logging are active.
3. Export/print flows are validated in testing.
4. Migration + seeding + deployment steps are documented and repeatable.
