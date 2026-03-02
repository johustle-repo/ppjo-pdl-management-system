import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type ReportsProps = {
    generated_at: string;
    transfer_summary: Array<{
        destination: string;
        total: number;
    }>;
    hearing_schedule: Array<{
        id: number;
        name: string;
        case_number: string;
        next_hearing_date: string | null;
        days_away: number | null;
        notes: string | null;
    }>;
    sentence_nearing_completion: Array<{
        id: number;
        name: string;
        case_number: string;
        sentence_tracking: {
            remaining_label: string | null;
            end_date: string | null;
        };
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Reports', href: '/reports' },
];

export default function Reports({
    generated_at,
    transfer_summary,
    hearing_schedule,
    sentence_nearing_completion,
}: ReportsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Generated at: {generated_at}
                    </p>
                    <Button type="button" onClick={() => window.print()}>
                        Print Reports
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Transfers Summary</CardTitle>
                            <Button asChild variant="outline" size="sm">
                                <a href="/reports/export?section=transfers">Export CSV</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">Destination</th>
                                        <th className="px-3 py-2 text-left font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transfer_summary.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} className="px-3 py-6 text-center text-muted-foreground">
                                                No transfer records.
                                            </td>
                                        </tr>
                                    ) : (
                                        transfer_summary.map((row) => (
                                            <tr key={row.destination} className="border-t">
                                                <td className="px-3 py-2">{row.destination}</td>
                                                <td className="px-3 py-2">{row.total}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Hearings Schedule</CardTitle>
                            <Button asChild variant="outline" size="sm">
                                <a href="/reports/export?section=hearings">Export CSV</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
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
                                    {hearing_schedule.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                                                No hearing schedule records.
                                            </td>
                                        </tr>
                                    ) : (
                                        hearing_schedule.map((row) => (
                                            <tr key={row.id} className="border-t">
                                                <td className="px-3 py-2">{row.name}</td>
                                                <td className="px-3 py-2">{row.case_number}</td>
                                                <td className="px-3 py-2">{row.next_hearing_date || '-'}</td>
                                                <td className="px-3 py-2">{row.days_away ?? '-'}</td>
                                                <td className="px-3 py-2">{row.notes || '-'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Sentence Nearing Completion (&lt;= 180 Days)</CardTitle>
                            <Button asChild variant="outline" size="sm">
                                <a href="/reports/export?section=sentences">Export CSV</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                        <th className="px-3 py-2 text-left font-medium">Case Number</th>
                                        <th className="px-3 py-2 text-left font-medium">Remaining</th>
                                        <th className="px-3 py-2 text-left font-medium">End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sentence_nearing_completion.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                                                No nearing-completion records.
                                            </td>
                                        </tr>
                                    ) : (
                                        sentence_nearing_completion.map((row) => (
                                            <tr key={row.id} className="border-t">
                                                <td className="px-3 py-2">{row.name}</td>
                                                <td className="px-3 py-2">{row.case_number}</td>
                                                <td className="px-3 py-2">
                                                    {row.sentence_tracking.remaining_label || '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {row.sentence_tracking.end_date || '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
