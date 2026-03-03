import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SentenceTracking = {
    start_date: string | null;
    years: number | null;
    end_date: string | null;
    remaining_total_days: number | null;
    remaining_years: number | null;
    remaining_months: number | null;
    remaining_days: number | null;
    remaining_label: string | null;
    completed: boolean;
};

type SentenceTrackerRecord = {
    id: number;
    name: string;
    case_number: string;
    status: string;
    sentence_years: number | null;
    sentence_tracking: SentenceTracking;
};

type SentenceTrackerProps = {
    pdls: {
        data: SentenceTrackerRecord[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search: string;
        filter: 'all' | 'active' | 'expiring_soon' | 'expiring_90' | 'completed';
        sort: 'asc' | 'desc';
    };
    preset_defaults: Array<{
        name: string;
        filters: {
            search: string;
            filter: 'all' | 'active' | 'expiring_soon' | 'expiring_90' | 'completed';
            sort: 'asc' | 'desc';
        };
    }>;
    summary: {
        total: number;
        active: number;
        expiring_soon: number;
        completed: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sentence Tracker',
        href: '/sentence-tracker',
    },
];

export default function SentenceTracker({
    pdls,
    filters,
    preset_defaults,
    summary,
}: SentenceTrackerProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [filter, setFilter] = useState(filters.filter ?? 'all');
    const [sort, setSort] = useState(filters.sort ?? 'asc');
    const [presetName, setPresetName] = useState('');
    const [savedPresets, setSavedPresets] = useState<Array<{ name: string; filters: typeof filters }>>([]);

    useEffect(() => {
        const raw = localStorage.getItem('sentence_tracker_presets');
        if (raw) {
            try {
                setSavedPresets(JSON.parse(raw));
            } catch {
                setSavedPresets([]);
            }
        }
    }, []);

    const savePreset = () => {
        if (presetName.trim() === '') {
            return;
        }
        const next = [
            ...savedPresets,
            {
                name: presetName.trim(),
                filters: { search, filter, sort },
            },
        ];
        setSavedPresets(next);
        localStorage.setItem('sentence_tracker_presets', JSON.stringify(next));
        setPresetName('');
    };

    const applyPreset = (preset: { filters: typeof filters }) => {
        setSearch(preset.filters.search ?? '');
        setFilter(preset.filters.filter ?? 'all');
        setSort(preset.filters.sort ?? 'asc');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/sentence-tracker',
                {
                    search,
                    filter,
                    sort,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['pdls', 'filters', 'summary'],
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, filter, sort]);

    const goToPage = (page: number) => {
        router.get(
            '/sentence-tracker',
            { search, filter, sort, page },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['pdls', 'filters', 'summary'],
            },
        );
    };

    const exportUrl = `/sentence-tracker/export?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&sort=${encodeURIComponent(sort)}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sentence Tracker" />
            <div className="flex flex-col gap-4 p-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total With Sentence
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">
                                {summary.total}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-emerald-600">
                                {summary.active}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Expiring Soon
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-amber-600">
                                {summary.expiring_soon}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Completed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-slate-600 dark:text-slate-300">
                                {summary.completed}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Sentence Tracker</CardTitle>
                            <Button asChild variant="outline">
                                <a href={exportUrl}>Export CSV</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2 md:grid-cols-3">
                            <div className="flex gap-2">
                                <Input
                                    value={presetName}
                                    onChange={(event) => setPresetName(event.target.value)}
                                    placeholder="Preset name"
                                />
                                <Button type="button" onClick={savePreset}>
                                    Save Preset
                                </Button>
                            </div>
                            <select
                                value=""
                                onChange={(event) => {
                                    const idx = Number(event.target.value);
                                    if (! Number.isNaN(idx) && savedPresets[idx]) {
                                        applyPreset(savedPresets[idx]);
                                    }
                                }}
                                className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                            >
                                <option value="">Apply saved preset</option>
                                {savedPresets.map((preset, idx) => (
                                    <option key={`${preset.name}-${idx}`} value={idx}>
                                        {preset.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value=""
                                onChange={(event) => {
                                    const idx = Number(event.target.value);
                                    if (! Number.isNaN(idx) && preset_defaults[idx]) {
                                        applyPreset({ filters: preset_defaults[idx].filters });
                                    }
                                }}
                                className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                            >
                                <option value="">Apply default preset</option>
                                {preset_defaults.map((preset, idx) => (
                                    <option key={`${preset.name}-${idx}`} value={idx}>
                                        {preset.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-3">
                            <div className="space-y-2 lg:col-span-1">
                                <Label htmlFor="sentence-search">Search</Label>
                                <Input
                                    id="sentence-search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search by name or case number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sentence-filter">
                                    Filter
                                </Label>
                                <select
                                    id="sentence-filter"
                                    value={filter}
                                    onChange={(event) =>
                                        setFilter(
                                            event.target
                                                .value as SentenceTrackerProps['filters']['filter'],
                                        )
                                    }
                                    className="border-input bg-background ring-offset-background h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="expiring_soon">
                                        Expiring Soon (&lt;= 180 days)
                                    </option>
                                    <option value="expiring_90">
                                        Expiring Soon (&lt;= 90 days)
                                    </option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sentence-sort">
                                    Sort Remaining
                                </Label>
                                <select
                                    id="sentence-sort"
                                    value={sort}
                                    onChange={(event) =>
                                        setSort(
                                            event.target
                                                .value as SentenceTrackerProps['filters']['sort'],
                                        )
                                    }
                                    className="border-input bg-background ring-offset-background h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    <option value="asc">
                                        Nearest completion first
                                    </option>
                                    <option value="desc">
                                        Longest remaining first
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Name
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Case Number
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Sentence
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            End Date
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Remaining
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Status
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pdls.data.length === 0 ? (
                                        <tr>
                                            <td
                                                className="px-3 py-6 text-center text-muted-foreground"
                                                colSpan={7}
                                            >
                                                No sentence records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        pdls.data.map((pdl) => (
                                            <tr
                                                key={pdl.id}
                                                className="border-t"
                                            >
                                                <td className="px-3 py-2">
                                                    {pdl.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {pdl.case_number}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {pdl.sentence_years
                                                        ? `${pdl.sentence_years} years`
                                                        : '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {pdl.sentence_tracking
                                                        .end_date || '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {pdl.sentence_tracking
                                                        .remaining_label || '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Badge variant="outline">
                                                        {
                                                            pdl.sentence_tracking
                                                                .completed
                                                                ? 'completed'
                                                                : pdl.status
                                                        }
                                                    </Badge>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <a
                                                            href={`/pdl-profiles?pdl=${pdl.id}`}
                                                        >
                                                            View Profile
                                                        </a>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                                Page {pdls.current_page} of {pdls.last_page}{' '}
                                ({pdls.total} records)
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={pdls.current_page <= 1}
                                    onClick={() =>
                                        goToPage(pdls.current_page - 1)
                                    }
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                        pdls.current_page >= pdls.last_page
                                    }
                                    onClick={() =>
                                        goToPage(pdls.current_page + 1)
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
