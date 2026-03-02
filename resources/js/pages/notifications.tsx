import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type NotificationsProps = {
    summary: {
        upcoming_hearings: number;
        expiring_sentences: number;
        recent_transfers: number;
    };
    items: Array<{
        type: string;
        message: string;
        date: string | null;
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notifications', href: '/notifications' },
];

export default function Notifications({ summary, items }: NotificationsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex flex-col gap-4 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">Upcoming Hearings</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.upcoming_hearings}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">Expiring Sentences</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.expiring_sentences}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm text-muted-foreground">Recent Transfers</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-semibold">{summary.recent_transfers}</p></CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No alerts right now.</p>
                        ) : (
                            items.map((item, idx) => (
                                <div key={`${item.type}-${item.date}-${idx}`} className="rounded-md border p-3 text-sm">
                                    <div className="mb-1 flex items-center justify-between">
                                        <Badge variant="outline">{item.type}</Badge>
                                        <span className="text-xs text-muted-foreground">{item.date || '-'}</span>
                                    </div>
                                    <p>{item.message}</p>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
