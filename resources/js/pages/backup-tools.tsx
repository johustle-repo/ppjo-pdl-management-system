import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type BackupToolsProps = {
    generated_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Backup Tools', href: '/backup-tools' },
];

export default function BackupTools({ generated_at }: BackupToolsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Backup Tools" />
            <div className="flex flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Database Backup</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Generated timestamp: {generated_at}
                        </p>
                        <Button asChild>
                            <a href="/backup-tools/export">Download SQL Backup</a>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Restore Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>1. Create a fresh database (or backup the current one first).</p>
                        <p>2. Open your SQL client (phpMyAdmin or MySQL CLI).</p>
                        <p>3. Import the downloaded `.sql` backup file.</p>
                        <p>4. Run `php artisan migrate:status` to verify schema alignment.</p>
                        <p>5. Run `php artisan storage:link` if media links are missing.</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
