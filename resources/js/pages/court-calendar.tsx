import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type HearingRecord = {
    id: number;
    name: string;
    case_number: string;
    status: string;
    next_hearing_date: string | null;
    hearing_notes: string | null;
    days_away: number | null;
};

type CourtCalendarProps = {
    hearings: {
        data: HearingRecord[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
        window: 'all' | 'upcoming' | 'this_week' | 'this_month' | 'past';
        sort: 'asc' | 'desc';
    };
    summary: {
        today: number;
        this_week: number;
        this_month: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Court Calendar', href: '/court-calendar' },
];

export default function CourtCalendar({ hearings, filters, summary }: CourtCalendarProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [window, setWindow] = useState(filters.window ?? 'all');
    const [sort, setSort] = useState(filters.sort ?? 'asc');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/court-calendar',
                { search, window, sort },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['hearings', 'filters', 'summary'],
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, window, sort]);

    const exportUrl = `/court-calendar/export?search=${encodeURIComponent(search)}&window=${encodeURIComponent(window)}&sort=${encodeURIComponent(sort)}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Court Calendar" />
            <div className="flex flex-col gap-4 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">Today</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.today}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">This Week</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.this_week}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">This Month</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.this_month}</p></CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>Hearing Schedule</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-end">
                            <Button asChild variant="outline">
                                <a href={exportUrl}>Export CSV</a>
                            </Button>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by name/case number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="window">Window</Label>
                                <select
                                    id="window"
                                    value={window}
                                    onChange={(event) => setWindow(event.target.value as CourtCalendarProps['filters']['window'])}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="all">All</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="this_week">This Week</option>
                                    <option value="this_month">This Month</option>
                                    <option value="past">Past</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sort">Sort</Label>
                                <select
                                    id="sort"
                                    value={sort}
                                    onChange={(event) => setSort(event.target.value as 'asc' | 'desc')}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="asc">Nearest date first</option>
                                    <option value="desc">Latest date first</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                        <th className="px-3 py-2 text-left font-medium">Case Number</th>
                                        <th className="px-3 py-2 text-left font-medium">Hearing Date</th>
                                        <th className="px-3 py-2 text-left font-medium">Days Away</th>
                                        <th className="px-3 py-2 text-left font-medium">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hearings.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                                                No hearing records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        hearings.data.map((row) => (
                                            <tr key={row.id} className="border-t">
                                                <td className="px-3 py-2">{row.name}</td>
                                                <td className="px-3 py-2">{row.case_number}</td>
                                                <td className="px-3 py-2">{row.next_hearing_date || '-'}</td>
                                                <td className="px-3 py-2">{row.days_away ?? '-'}</td>
                                                <td className="px-3 py-2">{row.hearing_notes || '-'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Page {hearings.current_page} of {hearings.last_page}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
