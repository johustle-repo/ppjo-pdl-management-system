import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type TransferRecord = {
    id: number;
    name: string;
    case_number: string;
    transferred_to: string | null;
    updated_at: string | null;
    last_transfer: {
        from_status: string | null;
        to_status: string;
        changed_by: string | null;
        created_at: string | null;
    } | null;
};

type TransfersPageProps = {
    transfers: {
        data: TransferRecord[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
        destination: string;
        sort: 'latest' | 'oldest';
        period: 'all' | 'this_month' | 'last_30_days';
    };
    preset_defaults: Array<{
        name: string;
        filters: {
            search: string;
            destination: string;
            sort: 'latest' | 'oldest';
            period: 'all' | 'this_month' | 'last_30_days';
        };
    }>;
    destination_options: string[];
    stats: {
        total_transferred: number;
        destinations: Array<{ name: string; total: number }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transfers', href: '/transfers' },
];

export default function Transfers({
    transfers,
    filters,
    preset_defaults,
    destination_options,
    stats,
}: TransfersPageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [destination, setDestination] = useState(filters.destination ?? '');
    const [sort, setSort] = useState<'latest' | 'oldest'>(filters.sort ?? 'latest');
    const [period, setPeriod] = useState<'all' | 'this_month' | 'last_30_days'>(filters.period ?? 'all');
    const [presetName, setPresetName] = useState('');
    const [savedPresets, setSavedPresets] = useState<Array<{ name: string; filters: typeof filters }>>([]);

    useEffect(() => {
        const raw = localStorage.getItem('transfers_presets');
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
            { name: presetName.trim(), filters: { search, destination, sort, period } },
        ];
        setSavedPresets(next);
        localStorage.setItem('transfers_presets', JSON.stringify(next));
        setPresetName('');
    };

    const applyPreset = (preset: { filters: typeof filters }) => {
        setSearch(preset.filters.search ?? '');
        setDestination(preset.filters.destination ?? '');
        setSort((preset.filters.sort ?? 'latest') as 'latest' | 'oldest');
        setPeriod((preset.filters.period ?? 'all') as 'all' | 'this_month' | 'last_30_days');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/transfers',
                { search, destination, sort, period },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['transfers', 'filters', 'destination_options', 'stats', 'preset_defaults'],
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, destination, sort, period]);

    const exportUrl = `/transfers/export?search=${encodeURIComponent(search)}&destination=${encodeURIComponent(destination)}&sort=${encodeURIComponent(sort)}&period=${encodeURIComponent(period)}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transfers" />
            <div className="flex flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Total Transferred
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">{stats.total_transferred}</p>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Top Destinations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {stats.destinations.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No destination data yet.</p>
                            ) : (
                                stats.destinations.map((item) => (
                                    <Badge key={item.name} variant="outline">
                                        {item.name}: {item.total}
                                    </Badge>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Transfer Records</CardTitle>
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

                        <div className="grid gap-3 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by name or case number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destination">Destination</Label>
                                <select
                                    id="destination"
                                    value={destination}
                                    onChange={(event) => setDestination(event.target.value)}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="">All destinations</option>
                                    {destination_options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sort">Sort</Label>
                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(event) => setSort(event.target.value as 'latest' | 'oldest')}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="latest">Latest updated first</option>
                                    <option value="oldest">Oldest updated first</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="period">Period</Label>
                                <select
                                    id="period"
                                    value={period}
                                    onChange={(event) =>
                                        setPeriod(
                                            event.target.value as
                                                | 'all'
                                                | 'this_month'
                                                | 'last_30_days',
                                        )
                                    }
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="all">All time</option>
                                    <option value="this_month">This month</option>
                                    <option value="last_30_days">Last 30 days</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                        <th className="px-3 py-2 text-left font-medium">Case Number</th>
                                        <th className="px-3 py-2 text-left font-medium">Transferred To</th>
                                        <th className="px-3 py-2 text-left font-medium">Last Transfer Event</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transfers.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                                                No transfer records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        transfers.data.map((row) => (
                                            <tr key={row.id} className="border-t">
                                                <td className="px-3 py-2">{row.name}</td>
                                                <td className="px-3 py-2">{row.case_number}</td>
                                                <td className="px-3 py-2">{row.transferred_to || '-'}</td>
                                                <td className="px-3 py-2">
                                                    {row.last_transfer ? (
                                                        <span>
                                                            {row.last_transfer.from_status || 'N/A'} to{' '}
                                                            {row.last_transfer.to_status} by{' '}
                                                            {row.last_transfer.changed_by || 'System'} on{' '}
                                                            {row.last_transfer.created_at || '-'}
                                                        </span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Page {transfers.current_page} of {transfers.last_page}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
