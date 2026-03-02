<?php

namespace App\Http\Controllers;

use App\Http\Requests\PdlStoreRequest;
use App\Models\AuditLog;
use App\Models\Pdl;
use App\Models\PdlStatusHistory;
use App\Support\MongoPdlMirror;
use App\Support\SmartCaseFormatter;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PdlController extends Controller
{
    /**
     * Display the PDL dashboard.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $baseQuery = Pdl::query();
        $query = $this->applySearch(
            $baseQuery->with(['statusHistories.changedBy']),
            $search
        )->latest();

        $kpis = [
            'total' => (clone $baseQuery)->count(),
            'active' => (clone $baseQuery)->where('status', 'active')->count(),
            'released' => (clone $baseQuery)->where('status', 'released')->count(),
            'transferred' => (clone $baseQuery)->where('status', 'transferred')->count(),
        ];

        $paginated = $query->paginate(15);
        $auditLogsByPdlId = $this->auditLogsByPdlIds($paginated->getCollection()->pluck('id')->all());

        return Inertia::render('dashboard', [
            'kpis' => $kpis,
            'pdls' => $paginated->through(function (Pdl $pdl) use ($auditLogsByPdlId) {
                return [
                    'sentence_tracking' => $this->buildSentenceTracking($pdl),
                    'activity_timeline' => $this->buildActivityTimeline($pdl, $auditLogsByPdlId[$pdl->id] ?? collect()),
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'surname' => $pdl->surname,
                    'first_name' => $pdl->first_name,
                    'middle_name' => $pdl->middle_name,
                    'alias' => $pdl->alias,
                    'contact_number' => $pdl->contact_number,
                    'case_number' => $pdl->case_number,
                    'crime_history' => $pdl->crime_history,
                    'remarks' => $pdl->remarks,
                    'status' => $pdl->status,
                    'transferred_to' => $pdl->transferred_to,
                    'profile_photo_url' => $this->resolveProfilePhotoUrl($pdl->profile_photo_path),
                    'sentence_start_date' => $pdl->sentence_start_date?->toDateString(),
                    'sentence_years' => $pdl->sentence_years,
                    'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
                    'hearing_notes' => $pdl->hearing_notes,
                    'created_at' => $pdl->created_at?->toDateTimeString(),
                    'status_histories' => $pdl->statusHistories->take(5)->map(function (PdlStatusHistory $history) {
                        return [
                            'from_status' => $history->from_status,
                            'to_status' => $history->to_status,
                            'remarks' => $history->remarks,
                            'changed_by' => $history->changedBy?->name,
                            'created_at' => $history->created_at?->toDateTimeString(),
                        ];
                    })->values(),
                ];
            }),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display the PDL profiles screen.
     */
    public function profiles(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $selectedPdlId = (int) $request->query('pdl', 0);
        $query = $this->applySearch(
            Pdl::query()->with(['statusHistories.changedBy']),
            $search
        )->latest();

        $selectedPdl = null;
        if ($selectedPdlId > 0) {
            $found = Pdl::query()
                ->with(['statusHistories.changedBy'])
                ->find($selectedPdlId);

            if ($found) {
                $selectedAuditLogs = AuditLog::query()
                    ->with('actor')
                    ->where('target_type', 'pdl')
                    ->where('target_id', $found->id)
                    ->latest('created_at')
                    ->limit(50)
                    ->get();
                $selectedPdl = [
                    'sentence_tracking' => $this->buildSentenceTracking($found),
                    'activity_timeline' => $this->buildActivityTimeline($found, $selectedAuditLogs),
                    'id' => $found->id,
                    'name' => $this->formatName($found),
                    'surname' => $found->surname,
                    'first_name' => $found->first_name,
                    'middle_name' => $found->middle_name,
                    'alias' => $found->alias,
                    'contact_number' => $found->contact_number,
                    'case_number' => $found->case_number,
                    'crime_history' => $found->crime_history,
                    'remarks' => $found->remarks,
                    'status' => $found->status,
                    'transferred_to' => $found->transferred_to,
                    'profile_photo_url' => $this->resolveProfilePhotoUrl($found->profile_photo_path),
                    'sentence_start_date' => $found->sentence_start_date?->toDateString(),
                    'sentence_years' => $found->sentence_years,
                    'next_hearing_date' => $found->next_hearing_date?->toDateString(),
                    'hearing_notes' => $found->hearing_notes,
                    'created_at' => $found->created_at?->toDateTimeString(),
                    'status_histories' => $found->statusHistories->take(5)->map(function (PdlStatusHistory $history) {
                        return [
                            'from_status' => $history->from_status,
                            'to_status' => $history->to_status,
                            'remarks' => $history->remarks,
                            'changed_by' => $history->changedBy?->name,
                            'created_at' => $history->created_at?->toDateTimeString(),
                        ];
                    })->values(),
                ];
            }
        }

        $paginated = $query->paginate(15);
        $auditLogsByPdlId = $this->auditLogsByPdlIds($paginated->getCollection()->pluck('id')->all());

        return Inertia::render('pdl-profiles', [
            'can' => [
                'create' => $request->user()?->hasAnyRole(['superadmin', 'encoder']) ?? false,
            ],
            'pdls' => $paginated->through(function (Pdl $pdl) use ($auditLogsByPdlId) {
                return [
                    'sentence_tracking' => $this->buildSentenceTracking($pdl),
                    'activity_timeline' => $this->buildActivityTimeline($pdl, $auditLogsByPdlId[$pdl->id] ?? collect()),
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'surname' => $pdl->surname,
                    'first_name' => $pdl->first_name,
                    'middle_name' => $pdl->middle_name,
                    'alias' => $pdl->alias,
                    'contact_number' => $pdl->contact_number,
                    'case_number' => $pdl->case_number,
                    'crime_history' => $pdl->crime_history,
                    'remarks' => $pdl->remarks,
                    'status' => $pdl->status,
                    'transferred_to' => $pdl->transferred_to,
                    'profile_photo_url' => $this->resolveProfilePhotoUrl($pdl->profile_photo_path),
                    'sentence_start_date' => $pdl->sentence_start_date?->toDateString(),
                    'sentence_years' => $pdl->sentence_years,
                    'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
                    'hearing_notes' => $pdl->hearing_notes,
                    'created_at' => $pdl->created_at?->toDateTimeString(),
                    'status_histories' => $pdl->statusHistories->take(5)->map(function (PdlStatusHistory $history) {
                        return [
                            'from_status' => $history->from_status,
                            'to_status' => $history->to_status,
                            'remarks' => $history->remarks,
                            'changed_by' => $history->changedBy?->name,
                            'created_at' => $history->created_at?->toDateTimeString(),
                        ];
                    })->values(),
                ];
            }),
            'filters' => [
                'search' => $search,
                'pdl' => $selectedPdlId > 0 ? $selectedPdlId : null,
            ],
            'selected_pdl' => $selectedPdl,
        ]);
    }

    /**
     * Display sentence tracker with filters and remaining-time sorting.
     */
    public function sentenceTracker(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $filter = (string) $request->query('filter', 'all');
        $sort = (string) $request->query('sort', 'asc');
        $page = max((int) $request->query('page', 1), 1);
        $perPage = 15;
        if (! in_array($filter, ['all', 'active', 'expiring_soon', 'expiring_90', 'completed'], true)) {
            $filter = 'all';
        }

        if (! in_array($sort, ['asc', 'desc'], true)) {
            $sort = 'asc';
        }

        $expiringSoonDays = $filter === 'expiring_90' ? 90 : 180;

        $baseRecords = $this->applySearch(Pdl::query(), $search)
            ->whereNotNull('sentence_years')
            ->where('sentence_years', '>', 0)
            ->latest()
            ->get()
            ->map(function (Pdl $pdl) {
                $sentenceTracking = $this->buildSentenceTracking($pdl);

                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'status' => $pdl->status,
                    'sentence_years' => $pdl->sentence_years,
                    'sentence_tracking' => $sentenceTracking,
                ];
            })
            ->values();

        $summary = [
            'total' => $baseRecords->count(),
            'active' => $baseRecords->where('sentence_tracking.completed', false)->count(),
            'expiring_soon' => $baseRecords
                ->where('sentence_tracking.completed', false)
                ->filter(fn (array $record) => ($record['sentence_tracking']['remaining_total_days'] ?? PHP_INT_MAX) <= $expiringSoonDays)
                ->count(),
            'completed' => $baseRecords->where('sentence_tracking.completed', true)->count(),
        ];

        $filtered = $baseRecords->filter(function (array $record) use ($filter, $expiringSoonDays) {
            $completed = (bool) ($record['sentence_tracking']['completed'] ?? false);
            $remainingDays = $record['sentence_tracking']['remaining_total_days'] ?? PHP_INT_MAX;

            return match ($filter) {
                'active' => ! $completed,
                'expiring_soon', 'expiring_90' => ! $completed && $remainingDays <= $expiringSoonDays,
                'completed' => $completed,
                default => true,
            };
        });

        $sorted = $sort === 'desc'
            ? $filtered->sortByDesc(fn (array $record) => $record['sentence_tracking']['remaining_total_days'] ?? -1)
            : $filtered->sortBy(fn (array $record) => $record['sentence_tracking']['remaining_total_days'] ?? PHP_INT_MAX);

        $sorted = $sorted->values();
        $total = $sorted->count();
        $lastPage = max((int) ceil($total / $perPage), 1);
        $data = $sorted->forPage($page, $perPage)->values();

        return Inertia::render('sentence-tracker', [
            'pdls' => [
                'data' => $data,
                'current_page' => $page,
                'last_page' => $lastPage,
                'total' => $total,
            ],
            'filters' => [
                'search' => $search,
                'filter' => $filter,
                'sort' => $sort,
            ],
            'preset_defaults' => [
                [
                    'name' => 'Expiring in 90 days',
                    'filters' => [
                        'search' => '',
                        'filter' => 'expiring_90',
                        'sort' => 'asc',
                    ],
                ],
                [
                    'name' => 'Completed',
                    'filters' => [
                        'search' => '',
                        'filter' => 'completed',
                        'sort' => 'asc',
                    ],
                ],
            ],
            'summary' => $summary,
        ]);
    }

    /**
     * Display notifications center.
     */
    public function notifications(Request $request): Response
    {
        $today = Carbon::today();
        $hearingWindowDays = 7;
        $sentenceWindowDays = 90;
        $transferWindowDays = 7;

        $upcomingHearings = Pdl::query()
            ->whereNotNull('next_hearing_date')
            ->whereBetween('next_hearing_date', [
                $today->toDateString(),
                $today->copy()->addDays($hearingWindowDays)->toDateString(),
            ])
            ->orderBy('next_hearing_date')
            ->limit(20)
            ->get()
            ->map(fn (Pdl $pdl) => [
                'type' => 'hearing',
                'message' => $this->formatName($pdl).' hearing on '.$pdl->next_hearing_date?->toDateString(),
                'date' => $pdl->next_hearing_date?->toDateString(),
            ]);

        $expiringSentences = Pdl::query()
            ->whereNotNull('sentence_years')
            ->where('sentence_years', '>', 0)
            ->get()
            ->map(function (Pdl $pdl) {
                return [
                    'pdl' => $pdl,
                    'tracking' => $this->buildSentenceTracking($pdl),
                ];
            })
            ->filter(function (array $row) use ($sentenceWindowDays) {
                $remaining = $row['tracking']['remaining_total_days'] ?? null;
                return $remaining !== null && $remaining >= 0 && $remaining <= $sentenceWindowDays;
            })
            ->sortBy(fn (array $row) => $row['tracking']['remaining_total_days'])
            ->take(20)
            ->map(fn (array $row) => [
                'type' => 'sentence',
                'message' => $this->formatName($row['pdl']).' sentence ends in '.($row['tracking']['remaining_label'] ?? '-'),
                'date' => $row['tracking']['end_date'] ?? null,
            ]);

        $recentTransfers = Pdl::query()
            ->whereIn('status', ['transferred', 'transfered'])
            ->whereDate('updated_at', '>=', $today->copy()->subDays($transferWindowDays)->toDateString())
            ->latest('updated_at')
            ->limit(20)
            ->get()
            ->map(fn (Pdl $pdl) => [
                'type' => 'transfer',
                'message' => $this->formatName($pdl).' transferred to '.($pdl->transferred_to ?: 'N/A'),
                'date' => $pdl->updated_at?->toDateString(),
            ]);

        $items = collect()
            ->concat($upcomingHearings)
            ->concat($expiringSentences)
            ->concat($recentTransfers)
            ->sortByDesc('date')
            ->values();

        return Inertia::render('notifications', [
            'summary' => [
                'upcoming_hearings' => $upcomingHearings->count(),
                'expiring_sentences' => $expiringSentences->count(),
                'recent_transfers' => $recentTransfers->count(),
            ],
            'items' => $items,
        ]);
    }

    /**
     * Display backup tools page.
     */
    public function backupTools(): Response
    {
        return Inertia::render('backup-tools', [
            'generated_at' => now()->toDateTimeString(),
        ]);
    }

    /**
     * Export database backup as SQL.
     */
    public function exportBackup(): StreamedResponse
    {
        $filename = 'backup-'.now()->format('Ymd-His').'.sql';

        return response()->streamDownload(function (): void {
            $out = fopen('php://output', 'wb');
            if (! $out) {
                return;
            }

            fwrite($out, "-- PDL backup generated at ".now()->toDateTimeString()."\n");
            fwrite($out, "SET FOREIGN_KEY_CHECKS=0;\n\n");

            $tablesRaw = DB::select('SHOW TABLES');
            foreach ($tablesRaw as $row) {
                $table = (string) array_values((array) $row)[0];
                $create = DB::select("SHOW CREATE TABLE `{$table}`");
                if ($create === []) {
                    continue;
                }

                $createRow = (array) $create[0];
                $createSql = (string) ($createRow['Create Table'] ?? array_values($createRow)[1] ?? '');

                fwrite($out, "DROP TABLE IF EXISTS `{$table}`;\n");
                fwrite($out, $createSql.";\n\n");

                $records = DB::table($table)->get();
                foreach ($records as $record) {
                    $values = [];
                    foreach ((array) $record as $value) {
                        if ($value === null) {
                            $values[] = 'NULL';
                        } elseif (is_bool($value)) {
                            $values[] = $value ? '1' : '0';
                        } elseif (is_numeric($value)) {
                            $values[] = (string) $value;
                        } else {
                            $values[] = DB::getPdo()->quote((string) $value);
                        }
                    }
                    $columns = array_map(fn ($col) => '`'.$col.'`', array_keys((array) $record));
                    fwrite(
                        $out,
                        "INSERT INTO `{$table}` (".implode(', ', $columns).") VALUES (".implode(', ', $values).");\n"
                    );
                }

                fwrite($out, "\n");
            }

            fwrite($out, "SET FOREIGN_KEY_CHECKS=1;\n");
            fclose($out);
        }, $filename, [
            'Content-Type' => 'application/sql; charset=UTF-8',
        ]);
    }

    /**
     * Export sentence tracker as CSV.
     */
    public function exportSentenceTracker(Request $request): StreamedResponse
    {
        $search = trim((string) $request->query('search', ''));
        $filter = (string) $request->query('filter', 'all');
        $sort = (string) $request->query('sort', 'asc');

        if (! in_array($filter, ['all', 'active', 'expiring_soon', 'expiring_90', 'completed'], true)) {
            $filter = 'all';
        }
        if (! in_array($sort, ['asc', 'desc'], true)) {
            $sort = 'asc';
        }

        $thresholdDays = $filter === 'expiring_90' ? 90 : 180;

        $rows = $this->applySearch(Pdl::query(), $search)
            ->whereNotNull('sentence_years')
            ->where('sentence_years', '>', 0)
            ->get()
            ->map(function (Pdl $pdl) {
                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'status' => $pdl->status,
                    'sentence_years' => $pdl->sentence_years,
                    'tracking' => $this->buildSentenceTracking($pdl),
                ];
            })
            ->filter(function (array $row) use ($filter, $thresholdDays) {
                $completed = (bool) ($row['tracking']['completed'] ?? false);
                $remainingDays = $row['tracking']['remaining_total_days'] ?? PHP_INT_MAX;

                return match ($filter) {
                    'active' => ! $completed,
                    'expiring_soon', 'expiring_90' => ! $completed && $remainingDays <= $thresholdDays,
                    'completed' => $completed,
                    default => true,
                };
            });

        $rows = $sort === 'desc'
            ? $rows->sortByDesc(fn (array $row) => $row['tracking']['remaining_total_days'] ?? -1)->values()
            : $rows->sortBy(fn (array $row) => $row['tracking']['remaining_total_days'] ?? PHP_INT_MAX)->values();

        $filename = 'sentence-tracker-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($rows): void {
            $out = fopen('php://output', 'wb');
            if (! $out) {
                return;
            }

            fputcsv($out, ['ID', 'Name', 'Case Number', 'Status', 'Sentence Years', 'End Date', 'Remaining']);
            foreach ($rows as $row) {
                fputcsv($out, [
                    $row['id'],
                    $row['name'],
                    $row['case_number'],
                    $row['status'],
                    $row['sentence_years'],
                    $row['tracking']['end_date'] ?? '',
                    $row['tracking']['remaining_label'] ?? '',
                ]);
            }
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Display transfers module with destination analytics.
     */
    public function transfers(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $destination = trim((string) $request->query('destination', ''));
        $sort = (string) $request->query('sort', 'latest');
        $period = (string) $request->query('period', 'all');
        $query = $this->applySearch(
            Pdl::query()->with(['statusHistories.changedBy']),
            $search
        )->whereIn('status', ['transferred', 'transfered']);

        if ($destination !== '') {
            $query->where('transferred_to', $destination);
        }

        if (! in_array($sort, ['latest', 'oldest'], true)) {
            $sort = 'latest';
        }
        if (! in_array($period, ['all', 'this_month', 'last_30_days'], true)) {
            $period = 'all';
        }
        if ($period === 'this_month') {
            $query->whereBetween('updated_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth(),
            ]);
        } elseif ($period === 'last_30_days') {
            $query->whereDate('updated_at', '>=', Carbon::now()->subDays(30)->toDateString());
        }

        if ($sort === 'oldest') {
            $query->oldest('updated_at');
        } else {
            $query->latest('updated_at');
        }

        $destinationOptions = Pdl::query()
            ->whereIn('status', ['transferred', 'transfered'])
            ->whereNotNull('transferred_to')
            ->where('transferred_to', '!=', '')
            ->orderBy('transferred_to')
            ->pluck('transferred_to')
            ->unique()
            ->values();

        $destinationStats = Pdl::query()
            ->whereIn('status', ['transferred', 'transfered'])
            ->whereNotNull('transferred_to')
            ->where('transferred_to', '!=', '')
            ->selectRaw('transferred_to, COUNT(*) as total')
            ->groupBy('transferred_to')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return Inertia::render('transfers', [
            'transfers' => $query->paginate(15)->withQueryString()->through(function (Pdl $pdl) {
                $lastTransfer = $pdl->statusHistories
                    ->first(fn (PdlStatusHistory $history) => in_array($history->to_status, ['transferred', 'transfered'], true));

                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'transferred_to' => $pdl->transferred_to,
                    'updated_at' => $pdl->updated_at?->toDateTimeString(),
                    'last_transfer' => $lastTransfer ? [
                        'from_status' => $lastTransfer->from_status,
                        'to_status' => $lastTransfer->to_status,
                        'changed_by' => $lastTransfer->changedBy?->name,
                        'created_at' => $lastTransfer->created_at?->toDateTimeString(),
                    ] : null,
                ];
            }),
            'filters' => [
                'search' => $search,
                'destination' => $destination,
                'sort' => $sort,
                'period' => $period,
            ],
            'preset_defaults' => [
                [
                    'name' => 'Transferred this month',
                    'filters' => [
                        'search' => '',
                        'destination' => '',
                        'sort' => 'latest',
                        'period' => 'this_month',
                    ],
                ],
                [
                    'name' => 'Last 30 days',
                    'filters' => [
                        'search' => '',
                        'destination' => '',
                        'sort' => 'latest',
                        'period' => 'last_30_days',
                    ],
                ],
            ],
            'destination_options' => $destinationOptions,
            'stats' => [
                'total_transferred' => Pdl::query()->whereIn('status', ['transferred', 'transfered'])->count(),
                'destinations' => $destinationStats->map(fn ($row) => [
                    'name' => $row->transferred_to,
                    'total' => (int) $row->total,
                ])->values(),
            ],
        ]);
    }

    /**
     * Export transfers module as CSV.
     */
    public function exportTransfers(Request $request): StreamedResponse
    {
        $search = trim((string) $request->query('search', ''));
        $destination = trim((string) $request->query('destination', ''));
        $sort = (string) $request->query('sort', 'latest');
        $period = (string) $request->query('period', 'all');

        $query = $this->applySearch(Pdl::query()->with(['statusHistories.changedBy']), $search)
            ->whereIn('status', ['transferred', 'transfered']);

        if ($destination !== '') {
            $query->where('transferred_to', $destination);
        }
        if ($period === 'this_month') {
            $query->whereBetween('updated_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth(),
            ]);
        } elseif ($period === 'last_30_days') {
            $query->whereDate('updated_at', '>=', Carbon::now()->subDays(30)->toDateString());
        }
        if ($sort === 'oldest') {
            $query->oldest('updated_at');
        } else {
            $query->latest('updated_at');
        }

        $rows = $query->get()->map(function (Pdl $pdl) {
            $lastTransfer = $pdl->statusHistories
                ->first(fn (PdlStatusHistory $history) => in_array($history->to_status, ['transferred', 'transfered'], true));

            return [
                'id' => $pdl->id,
                'name' => $this->formatName($pdl),
                'case_number' => $pdl->case_number,
                'transferred_to' => $pdl->transferred_to,
                'last_transfer' => $lastTransfer?->created_at?->toDateTimeString(),
                'changed_by' => $lastTransfer?->changedBy?->name,
            ];
        });

        $filename = 'transfers-'.now()->format('Ymd-His').'.csv';
        return response()->streamDownload(function () use ($rows): void {
            $out = fopen('php://output', 'wb');
            if (! $out) {
                return;
            }

            fputcsv($out, ['ID', 'Name', 'Case Number', 'Transferred To', 'Last Transfer Date', 'Changed By']);
            foreach ($rows as $row) {
                fputcsv($out, [
                    $row['id'],
                    $row['name'],
                    $row['case_number'],
                    $row['transferred_to'],
                    $row['last_transfer'],
                    $row['changed_by'],
                ]);
            }
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Display court calendar module for upcoming hearings.
     */
    public function courtCalendar(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $window = (string) $request->query('window', 'all');
        $sort = (string) $request->query('sort', 'asc');

        $query = $this->applySearch(Pdl::query(), $search)->whereNotNull('next_hearing_date');
        $today = Carbon::today();

        if (! in_array($window, ['all', 'upcoming', 'this_week', 'this_month', 'past'], true)) {
            $window = 'all';
        }

        if ($window === 'upcoming') {
            $query->whereDate('next_hearing_date', '>=', $today->toDateString());
        } elseif ($window === 'this_week') {
            $query->whereBetween('next_hearing_date', [
                $today->copy()->startOfWeek()->toDateString(),
                $today->copy()->endOfWeek()->toDateString(),
            ]);
        } elseif ($window === 'this_month') {
            $query->whereBetween('next_hearing_date', [
                $today->copy()->startOfMonth()->toDateString(),
                $today->copy()->endOfMonth()->toDateString(),
            ]);
        } elseif ($window === 'past') {
            $query->whereDate('next_hearing_date', '<', $today->toDateString());
        }

        if (! in_array($sort, ['asc', 'desc'], true)) {
            $sort = 'asc';
        }

        $query->orderBy('next_hearing_date', $sort);

        return Inertia::render('court-calendar', [
            'hearings' => $query->paginate(15)->withQueryString()->through(function (Pdl $pdl) use ($today) {
                $hearingDate = $pdl->next_hearing_date?->copy()->startOfDay();
                $daysAway = $hearingDate ? $today->diffInDays($hearingDate, false) : null;

                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'status' => $pdl->status,
                    'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
                    'hearing_notes' => $pdl->hearing_notes,
                    'days_away' => $daysAway,
                ];
            }),
            'filters' => [
                'search' => $search,
                'window' => $window,
                'sort' => $sort,
            ],
            'summary' => [
                'today' => Pdl::query()->whereDate('next_hearing_date', $today->toDateString())->count(),
                'this_week' => Pdl::query()->whereBetween('next_hearing_date', [
                    $today->copy()->startOfWeek()->toDateString(),
                    $today->copy()->endOfWeek()->toDateString(),
                ])->count(),
                'this_month' => Pdl::query()->whereBetween('next_hearing_date', [
                    $today->copy()->startOfMonth()->toDateString(),
                    $today->copy()->endOfMonth()->toDateString(),
                ])->count(),
            ],
        ]);
    }

    /**
     * Export court calendar module as CSV.
     */
    public function exportCourtCalendar(Request $request): StreamedResponse
    {
        $search = trim((string) $request->query('search', ''));
        $window = (string) $request->query('window', 'all');
        $sort = (string) $request->query('sort', 'asc');
        $query = $this->applySearch(Pdl::query(), $search)->whereNotNull('next_hearing_date');
        $today = Carbon::today();

        if ($window === 'upcoming') {
            $query->whereDate('next_hearing_date', '>=', $today->toDateString());
        } elseif ($window === 'this_week') {
            $query->whereBetween('next_hearing_date', [
                $today->copy()->startOfWeek()->toDateString(),
                $today->copy()->endOfWeek()->toDateString(),
            ]);
        } elseif ($window === 'this_month') {
            $query->whereBetween('next_hearing_date', [
                $today->copy()->startOfMonth()->toDateString(),
                $today->copy()->endOfMonth()->toDateString(),
            ]);
        } elseif ($window === 'past') {
            $query->whereDate('next_hearing_date', '<', $today->toDateString());
        }

        $query->orderBy('next_hearing_date', $sort === 'desc' ? 'desc' : 'asc');
        $rows = $query->get();

        $filename = 'court-calendar-'.now()->format('Ymd-His').'.csv';
        return response()->streamDownload(function () use ($rows, $today): void {
            $out = fopen('php://output', 'wb');
            if (! $out) {
                return;
            }

            fputcsv($out, ['ID', 'Name', 'Case Number', 'Status', 'Hearing Date', 'Days Away', 'Notes']);
            foreach ($rows as $pdl) {
                $daysAway = $pdl->next_hearing_date ? $today->diffInDays($pdl->next_hearing_date, false) : null;
                fputcsv($out, [
                    $pdl->id,
                    $this->formatName($pdl),
                    $pdl->case_number,
                    $pdl->status,
                    $pdl->next_hearing_date?->toDateString(),
                    $daysAway,
                    $pdl->hearing_notes,
                ]);
            }
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Store a newly created PDL record.
     */
    public function store(PdlStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $status = $this->normalizeStatus($validated['status'] ?? null);
        $sentenceYears = $this->normalizeSentenceYears($validated['sentence_years'] ?? null);
        $sentenceStartDate = $this->normalizeSentenceStartDate($validated['sentence_start_date'] ?? null, $sentenceYears);
        $hasProfilePhotoColumn = Schema::hasColumn('pdls', 'profile_photo_path');
        $profilePhotoPath = $request->hasFile('profile_photo')
            ? $request->file('profile_photo')?->store('pdl-profile-photos', 'public')
            : null;

        $createData = [
            'surname' => SmartCaseFormatter::title($validated['surname']) ?? '',
            'first_name' => SmartCaseFormatter::title($validated['first_name']) ?? '',
            'middle_name' => SmartCaseFormatter::title($validated['middle_name'] ?? null),
            'alias' => SmartCaseFormatter::title($validated['alias'] ?? null),
            'contact_number' => $validated['contact_number'],
            'case_number' => SmartCaseFormatter::title($validated['case_number']) ?? '',
            'crime_history' => SmartCaseFormatter::title($validated['crime_history'] ?? null),
            'remarks' => SmartCaseFormatter::title($validated['remarks'] ?? null),
            'status' => $status,
            'transferred_to' => $status === 'transferred'
                ? SmartCaseFormatter::title($validated['transferred_to'] ?? null)
                : null,
            'sentence_start_date' => $sentenceStartDate,
            'sentence_years' => $sentenceYears,
            'next_hearing_date' => $validated['next_hearing_date'] ?? null,
            'hearing_notes' => SmartCaseFormatter::title($validated['hearing_notes'] ?? null),
        ];

        if ($hasProfilePhotoColumn) {
            $createData['profile_photo_path'] = $profilePhotoPath;
        }

        try {
            $pdl = Pdl::create($createData);
        } catch (QueryException $exception) {
            if (! str_contains($exception->getMessage(), 'profile_photo_path')) {
                throw $exception;
            }

            unset($createData['profile_photo_path']);
            $pdl = Pdl::create($createData);
        }

        $this->recordStatusChange($request, $pdl, null, $pdl->status, 'Initial status');
        MongoPdlMirror::syncPdl($pdl);
        $this->logAudit($request, 'pdl.create', 'pdl', $pdl->id, [
            'status' => $pdl->status,
            'transferred_to' => $pdl->transferred_to,
            'sentence_start_date' => $pdl->sentence_start_date?->toDateString(),
            'sentence_years' => $pdl->sentence_years,
            'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
            'hearing_notes' => $pdl->hearing_notes,
            'profile_photo_path' => $pdl->profile_photo_path,
        ]);

        return to_route('dashboard')->with('success', 'PDL record saved successfully.');
    }

    /**
     * Update an existing PDL record.
     */
    public function update(PdlStoreRequest $request, Pdl $pdl): RedirectResponse
    {
        $validated = $request->validated();
        $oldStatus = $pdl->status;
        $status = $this->normalizeStatus($validated['status'] ?? null);
        $sentenceYears = $this->normalizeSentenceYears($validated['sentence_years'] ?? null);
        $sentenceStartDate = $this->normalizeSentenceStartDate($validated['sentence_start_date'] ?? null, $sentenceYears);
        $hasProfilePhotoColumn = Schema::hasColumn('pdls', 'profile_photo_path');
        $profilePhotoPath = $pdl->profile_photo_path;
        if ($hasProfilePhotoColumn && $request->hasFile('profile_photo')) {
            $uploadedPath = $request->file('profile_photo')?->store('pdl-profile-photos', 'public');
            if ($uploadedPath) {
                if ($profilePhotoPath) {
                    Storage::disk('public')->delete($profilePhotoPath);
                }
                $profilePhotoPath = $uploadedPath;
            }
        }

        $updateData = [
            'surname' => SmartCaseFormatter::title($validated['surname']) ?? '',
            'first_name' => SmartCaseFormatter::title($validated['first_name']) ?? '',
            'middle_name' => SmartCaseFormatter::title($validated['middle_name'] ?? null),
            'alias' => SmartCaseFormatter::title($validated['alias'] ?? null),
            'contact_number' => $validated['contact_number'],
            'case_number' => SmartCaseFormatter::title($validated['case_number']) ?? '',
            'crime_history' => SmartCaseFormatter::title($validated['crime_history'] ?? null),
            'remarks' => SmartCaseFormatter::title($validated['remarks'] ?? null),
            'status' => $status,
            'transferred_to' => $status === 'transferred'
                ? SmartCaseFormatter::title($validated['transferred_to'] ?? null)
                : null,
            'sentence_start_date' => $sentenceStartDate,
            'sentence_years' => $sentenceYears,
            'next_hearing_date' => $validated['next_hearing_date'] ?? null,
            'hearing_notes' => SmartCaseFormatter::title($validated['hearing_notes'] ?? null),
        ];

        if ($hasProfilePhotoColumn) {
            $updateData['profile_photo_path'] = $profilePhotoPath;
        }

        $pdl->fill($updateData);
        try {
            $pdl->save();
        } catch (QueryException $exception) {
            if (! str_contains($exception->getMessage(), 'profile_photo_path')) {
                throw $exception;
            }

            unset($updateData['profile_photo_path']);
            $pdl->fill($updateData);
            $pdl->save();
        }

        $statusChangeNote = trim((string) $request->input('status_change_note', ''));
        if ($oldStatus !== $pdl->status) {
            $this->recordStatusChange(
                $request,
                $pdl,
                $oldStatus,
                $pdl->status,
                $statusChangeNote !== '' ? $statusChangeNote : null
            );
        }

        MongoPdlMirror::syncPdl($pdl);
        $this->logAudit($request, 'pdl.update', 'pdl', $pdl->id, [
            'old_status' => $oldStatus,
            'new_status' => $pdl->status,
            'transferred_to' => $pdl->transferred_to,
            'sentence_start_date' => $pdl->sentence_start_date?->toDateString(),
            'sentence_years' => $pdl->sentence_years,
            'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
            'hearing_notes' => $pdl->hearing_notes,
            'profile_photo_path' => $pdl->profile_photo_path,
        ]);

        return to_route('dashboard')->with('success', 'PDL record updated successfully.');
    }

    /**
     * Bulk-update selected PDL records.
     */
    public function bulkUpdate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:pdls,id'],
            'action' => ['required', 'in:status,transfer_destination,hearing_date'],
            'status' => ['nullable', 'in:active,released,transferred,transfered'],
            'transferred_to' => ['nullable', 'string', 'max:255'],
            'next_hearing_date' => ['nullable', 'date'],
            'hearing_notes' => ['nullable', 'string'],
        ]);

        $ids = collect($validated['ids'])->map(fn ($id) => (int) $id)->unique()->values()->all();
        $records = Pdl::query()->whereIn('id', $ids)->get();
        $count = 0;

        foreach ($records as $pdl) {
            $dirty = false;
            $oldStatus = $pdl->status;

            if ($validated['action'] === 'status' && isset($validated['status'])) {
                $newStatus = $this->normalizeStatus((string) $validated['status']);
                $pdl->status = $newStatus;
                if ($newStatus === 'transferred') {
                    $pdl->transferred_to = SmartCaseFormatter::title($validated['transferred_to'] ?? $pdl->transferred_to);
                } else {
                    $pdl->transferred_to = null;
                }
                $dirty = true;
            }

            if ($validated['action'] === 'transfer_destination') {
                $pdl->status = 'transferred';
                $pdl->transferred_to = SmartCaseFormatter::title($validated['transferred_to'] ?? null);
                $dirty = true;
            }

            if ($validated['action'] === 'hearing_date') {
                $pdl->next_hearing_date = $validated['next_hearing_date'] ?? null;
                $pdl->hearing_notes = SmartCaseFormatter::title($validated['hearing_notes'] ?? null);
                $dirty = true;
            }

            if ($dirty) {
                $pdl->save();
                MongoPdlMirror::syncPdl($pdl);
                $count++;

                if ($oldStatus !== $pdl->status) {
                    $this->recordStatusChange(
                        $request,
                        $pdl,
                        $oldStatus,
                        $pdl->status,
                        'Bulk update'
                    );
                }
            }
        }

        $this->logAudit($request, 'pdl.bulk_update', 'pdl', null, [
            'action' => $validated['action'],
            'count' => $count,
            'ids' => $ids,
        ]);

        return back()->with('success', "Bulk update applied to {$count} record(s).");
    }

    /**
     * Export dashboard records to an Excel-compatible workbook with two sheets.
     */
    public function export(Request $request): HttpResponse
    {
        $search = trim((string) $request->query('search', ''));
        $records = $this->applySearch(Pdl::query(), $search)->latest()->get();

        $masterRows = $records->map(function (Pdl $pdl): array {
            $sentenceTracking = $this->buildSentenceTracking($pdl);

            return [
                (string) $pdl->id,
                $this->formatName($pdl),
                $pdl->surname,
                $pdl->first_name,
                $pdl->middle_name ?? '',
                $pdl->alias ?? '',
                $pdl->contact_number,
                $pdl->case_number,
                $pdl->status,
                $pdl->transferred_to ?? '',
                $pdl->sentence_start_date?->toDateString() ?? '',
                $pdl->sentence_years !== null ? (string) $pdl->sentence_years : '',
                $sentenceTracking['end_date'] ?? '',
                $sentenceTracking['remaining_label'] ?? '',
                $pdl->remarks ?? '',
                $pdl->created_at?->toDateTimeString() ?? '',
            ];
        })->all();

        $crimeRows = $records->map(function (Pdl $pdl): array {
            return [
                (string) $pdl->id,
                $this->formatName($pdl),
                $pdl->case_number,
                $pdl->crime_history ?? '',
            ];
        })->all();

        $xml = $this->buildExcelXml($masterRows, $crimeRows);
        $filename = 'pdl-report-'.now()->format('Ymd-His').'.xls';

        $this->logAudit($request, 'pdl.export', 'pdl', null, [
            'search' => $search,
            'record_count' => $records->count(),
        ]);

        return response($xml, 200, [
            'Content-Type' => 'application/vnd.ms-excel; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
            'Cache-Control' => 'max-age=0, no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Display print-ready operational reports.
     */
    public function reports(Request $request): Response
    {
        $reportData = $this->buildReportData();

        return Inertia::render('reports', [
            'generated_at' => now()->toDateTimeString(),
            'transfer_summary' => $reportData['transfer_summary'],
            'hearing_schedule' => $reportData['hearing_schedule'],
            'sentence_nearing_completion' => $reportData['sentence_nearing_completion'],
        ]);
    }

    /**
     * Export print-ready report sections as CSV.
     */
    public function exportReports(Request $request): StreamedResponse
    {
        $section = (string) $request->query('section', 'transfers');
        if (! in_array($section, ['transfers', 'hearings', 'sentences'], true)) {
            $section = 'transfers';
        }

        $reportData = $this->buildReportData();
        $filename = 'reports-'.$section.'-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($section, $reportData): void {
            $out = fopen('php://output', 'wb');
            if (! $out) {
                return;
            }

            if ($section === 'transfers') {
                fputcsv($out, ['Destination', 'Total']);
                foreach ($reportData['transfer_summary'] as $row) {
                    fputcsv($out, [$row['destination'], $row['total']]);
                }
            } elseif ($section === 'hearings') {
                fputcsv($out, ['ID', 'Name', 'Case Number', 'Hearing Date', 'Days Away', 'Notes']);
                foreach ($reportData['hearing_schedule'] as $row) {
                    fputcsv($out, [
                        $row['id'],
                        $row['name'],
                        $row['case_number'],
                        $row['next_hearing_date'],
                        $row['days_away'],
                        $row['notes'],
                    ]);
                }
            } else {
                fputcsv($out, ['ID', 'Name', 'Case Number', 'Remaining', 'End Date']);
                foreach ($reportData['sentence_nearing_completion'] as $row) {
                    fputcsv($out, [
                        $row['id'],
                        $row['name'],
                        $row['case_number'],
                        $row['sentence_tracking']['remaining_label'] ?? '',
                        $row['sentence_tracking']['end_date'] ?? '',
                    ]);
                }
            }

            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Show printable card view for a PDL.
     */
    public function printCard(Pdl $pdl): HttpResponse
    {
        $this->logAudit(request(), 'pdl.print', 'pdl', $pdl->id);

        return response()->view('pdl-print-card', [
            'pdl' => $pdl,
            'formatted_name' => $this->formatName($pdl),
            'sentence_tracking' => $this->buildSentenceTracking($pdl),
        ]);
    }

    private function formatName(Pdl $pdl): string
    {
        $middleInitial = $pdl->middle_name ? mb_substr($pdl->middle_name, 0, 1).'.' : '';
        $alias = $pdl->alias ? ' "'.$pdl->alias.'"' : '';

        return trim(sprintf(
            '%s, %s %s%s',
            $pdl->surname,
            $pdl->first_name,
            $middleInitial,
            $alias
        ));
    }

    private function applySearch($query, string $search)
    {
        return $query->when($search !== '', function ($builder) use ($search) {
            $builder->where(function ($nested) use ($search) {
                $nested->where('surname', 'like', '%'.$search.'%')
                    ->orWhere('first_name', 'like', '%'.$search.'%')
                    ->orWhere('middle_name', 'like', '%'.$search.'%')
                    ->orWhere('alias', 'like', '%'.$search.'%')
                    ->orWhere('case_number', 'like', '%'.$search.'%')
                    ->orWhere('transferred_to', 'like', '%'.$search.'%');
            });
        });
    }

    /**
     * @param  array<int, array<int, string>>  $masterRows
     * @param  array<int, array<int, string>>  $crimeRows
     */
    private function buildExcelXml(array $masterRows, array $crimeRows): string
    {
        $masterHeaders = [
            'ID',
            'Display Name',
            'Surname',
            'First Name',
            'Middle Name',
            'Alias',
            'Contact Number',
            'Case Number',
            'Status',
            'Transferred To',
            'Sentence Start Date',
            'Sentence Years',
            'Sentence End Date',
            'Remaining',
            'Remarks',
            'Created At',
        ];

        $crimeHeaders = ['ID', 'Display Name', 'Case Number', 'Crime History'];

        return '<?xml version="1.0"?>'."\n"
            .'<?mso-application progid="Excel.Sheet"?>'."\n"
            .'<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"'
            .' xmlns:o="urn:schemas-microsoft-com:office:office"'
            .' xmlns:x="urn:schemas-microsoft-com:office:excel"'
            .' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"'
            .' xmlns:html="http://www.w3.org/TR/REC-html40">'."\n"
            .'  <Styles><Style ss:ID="Header"><Font ss:Bold="1"/></Style></Styles>'."\n"
            .$this->worksheetXml('Pdl masterlist', $masterHeaders, $masterRows)
            .$this->worksheetXml('crime history', $crimeHeaders, $crimeRows)
            .'</Workbook>';
    }

    /**
     * @param  array<int, string>  $headers
     * @param  array<int, array<int, string>>  $rows
     */
    private function worksheetXml(string $name, array $headers, array $rows): string
    {
        $xml = '  <Worksheet ss:Name="'.$this->xmlEscape($name).'"><Table>'."\n";
        $xml .= '    <Row>';

        foreach ($headers as $header) {
            $xml .= '<Cell ss:StyleID="Header"><Data ss:Type="String">'
                .$this->xmlEscape($header)
                .'</Data></Cell>';
        }

        $xml .= "</Row>\n";

        foreach ($rows as $row) {
            $xml .= '    <Row>';

            foreach ($row as $value) {
                $xml .= '<Cell><Data ss:Type="String">'
                    .$this->xmlEscape($value)
                    .'</Data></Cell>';
            }

            $xml .= "</Row>\n";
        }

        $xml .= "  </Table></Worksheet>\n";

        return $xml;
    }

    private function xmlEscape(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_COMPAT, 'UTF-8');
    }

    private function resolveProfilePhotoUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }

    /**
     * @return array{
     *   transfer_summary: Collection<int, array{destination:string,total:int}>,
     *   hearing_schedule: Collection<int, array{id:int,name:string,case_number:string,next_hearing_date:?string,days_away:?int,notes:?string}>,
     *   sentence_nearing_completion: Collection<int, array{id:int,name:string,case_number:string,sentence_tracking:array<string,mixed>}>
     * }
     */
    private function buildReportData(): array
    {
        $today = Carbon::today();
        $expiringSoonDays = 180;

        $transferByDestination = Pdl::query()
            ->whereIn('status', ['transferred', 'transfered'])
            ->whereNotNull('transferred_to')
            ->where('transferred_to', '!=', '')
            ->selectRaw('transferred_to, COUNT(*) as total')
            ->groupBy('transferred_to')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'destination' => $row->transferred_to,
                'total' => (int) $row->total,
            ])
            ->values();

        $hearingSchedule = Pdl::query()
            ->whereNotNull('next_hearing_date')
            ->orderBy('next_hearing_date')
            ->limit(50)
            ->get()
            ->map(function (Pdl $pdl) use ($today) {
                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
                    'days_away' => $pdl->next_hearing_date
                        ? $today->diffInDays($pdl->next_hearing_date, false)
                        : null,
                    'notes' => $pdl->hearing_notes,
                ];
            })
            ->values();

        $sentenceNearingCompletion = Pdl::query()
            ->whereNotNull('sentence_years')
            ->where('sentence_years', '>', 0)
            ->get()
            ->map(function (Pdl $pdl) {
                return [
                    'id' => $pdl->id,
                    'name' => $this->formatName($pdl),
                    'case_number' => $pdl->case_number,
                    'sentence_tracking' => $this->buildSentenceTracking($pdl),
                ];
            })
            ->filter(function (array $row) use ($expiringSoonDays) {
                $remaining = $row['sentence_tracking']['remaining_total_days'] ?? null;
                return $remaining !== null && $remaining >= 0 && $remaining <= $expiringSoonDays;
            })
            ->sortBy(fn (array $row) => $row['sentence_tracking']['remaining_total_days'])
            ->values()
            ->take(50)
            ->values();

        return [
            'transfer_summary' => $transferByDestination,
            'hearing_schedule' => $hearingSchedule,
            'sentence_nearing_completion' => $sentenceNearingCompletion,
        ];
    }

    private function normalizeStatus(?string $status): string
    {
        $normalized = strtolower(trim((string) $status));

        if ($normalized === 'transfered') {
            return 'transferred';
        }

        if (in_array($normalized, ['active', 'released', 'transferred'], true)) {
            return $normalized;
        }

        return 'active';
    }

    private function normalizeSentenceYears(mixed $years): ?int
    {
        if ($years === null || $years === '') {
            return null;
        }

        $value = (int) $years;

        return $value > 0 ? $value : null;
    }

    private function normalizeSentenceStartDate(mixed $startDate, ?int $sentenceYears): ?string
    {
        if ($sentenceYears === null) {
            return null;
        }

        if (is_string($startDate) && trim($startDate) !== '') {
            return $startDate;
        }

        return Carbon::now()->toDateString();
    }

    /**
     * @return array{
     *     start_date: string|null,
     *     years: int|null,
     *     end_date: string|null,
     *     remaining_total_days: int|null,
     *     remaining_years: int|null,
     *     remaining_months: int|null,
     *     remaining_days: int|null,
     *     remaining_label: string|null,
     *     completed: bool
     * }
     */
    private function buildSentenceTracking(Pdl $pdl): array
    {
        $startDate = $pdl->sentence_start_date?->copy()->startOfDay()
            ?? $pdl->created_at?->copy()->startOfDay();
        $years = $pdl->sentence_years;

        if (! $startDate || $years === null || $years < 1) {
            return [
                'start_date' => $startDate?->toDateString(),
                'years' => $years,
                'end_date' => null,
                'remaining_total_days' => null,
                'remaining_years' => null,
                'remaining_months' => null,
                'remaining_days' => null,
                'remaining_label' => null,
                'completed' => false,
            ];
        }

        $endDate = $startDate->copy()->addYears($years);
        $today = Carbon::now()->startOfDay();

        if ($today->greaterThanOrEqualTo($endDate)) {
            return [
                'start_date' => $startDate->toDateString(),
                'years' => $years,
                'end_date' => $endDate->toDateString(),
                'remaining_total_days' => 0,
                'remaining_years' => 0,
                'remaining_months' => 0,
                'remaining_days' => 0,
                'remaining_label' => '0 years, 0 months, 0 days',
                'completed' => true,
            ];
        }

        $diff = $today->diff($endDate);

        return [
            'start_date' => $startDate->toDateString(),
            'years' => $years,
            'end_date' => $endDate->toDateString(),
            'remaining_total_days' => $today->diffInDays($endDate),
            'remaining_years' => $diff->y,
            'remaining_months' => $diff->m,
            'remaining_days' => $diff->d,
            'remaining_label' => sprintf('%d years, %d months, %d days', $diff->y, $diff->m, $diff->d),
            'completed' => false,
        ];
    }

    /**
     * @param  array<int, int>  $ids
     * @return array<int, Collection<int, AuditLog>>
     */
    private function auditLogsByPdlIds(array $ids): array
    {
        if ($ids === []) {
            return [];
        }

        return AuditLog::query()
            ->with('actor')
            ->where('target_type', 'pdl')
            ->whereIn('target_id', $ids)
            ->latest('created_at')
            ->get()
            ->groupBy('target_id')
            ->all();
    }

    /**
     * @param  Collection<int, AuditLog>  $auditLogs
     * @return array<int, array<string, string|null>>
     */
    private function buildActivityTimeline(Pdl $pdl, Collection $auditLogs): array
    {
        $statusEvents = $pdl->statusHistories->map(function (PdlStatusHistory $history) {
            return [
                'type' => 'status',
                'title' => 'Status changed',
                'description' => sprintf(
                    '%s to %s%s',
                    $history->from_status ?? 'N/A',
                    $history->to_status,
                    $history->remarks ? ' ('.$history->remarks.')' : ''
                ),
                'actor' => $history->changedBy?->name,
                'created_at' => $history->created_at?->toDateTimeString(),
            ];
        });

        $auditEvents = $auditLogs->map(function (AuditLog $log) {
            $meta = is_array($log->meta) ? $log->meta : [];
            $description = match ($log->action) {
                'pdl.create' => 'PDL record created.',
                'pdl.update' => 'PDL record updated.',
                'pdl.print' => 'PDL card printed.',
                'pdl.bulk_update' => 'PDL included in a bulk update.',
                default => 'Activity logged.',
            };

            if (($meta['next_hearing_date'] ?? null) !== null) {
                $description .= ' Next hearing: '.$meta['next_hearing_date'].'.';
            }

            return [
                'type' => 'audit',
                'title' => $log->action,
                'description' => $description,
                'actor' => $log->actor?->name,
                'created_at' => $log->created_at?->toDateTimeString(),
            ];
        });

        return $statusEvents
            ->concat($auditEvents)
            ->sortByDesc('created_at')
            ->values()
            ->all();
    }

    private function recordStatusChange(
        Request $request,
        Pdl $pdl,
        ?string $fromStatus,
        string $toStatus,
        ?string $remarks = null
    ): void {
        PdlStatusHistory::create([
            'pdl_id' => $pdl->id,
            'from_status' => $fromStatus,
            'to_status' => $toStatus,
            'remarks' => $remarks,
            'changed_by' => $request->user()?->id,
        ]);
    }

    /**
     * @param  array<string, mixed>|null  $meta
     */
    private function logAudit(
        Request $request,
        string $action,
        string $targetType,
        ?int $targetId = null,
        ?array $meta = null
    ): void {
        AuditLog::create([
            'actor_id' => $request->user()?->id,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'meta' => $meta,
            'ip_address' => $request->ip(),
            'created_at' => Carbon::now(),
        ]);
    }
}
