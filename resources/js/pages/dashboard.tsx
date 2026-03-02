import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type PdlRecord = {
    id: number;
    name: string;
    surname: string;
    first_name: string;
    middle_name: string | null;
    alias: string | null;
    contact_number: string;
    case_number: string;
    crime_history: string | null;
    remarks: string | null;
    status: string;
    transferred_to: string | null;
    sentence_start_date: string | null;
    sentence_years: number | null;
    next_hearing_date: string | null;
    hearing_notes: string | null;
    sentence_tracking: {
        start_date: string | null;
        years: number | null;
        end_date: string | null;
        remaining_years: number | null;
        remaining_months: number | null;
        remaining_days: number | null;
        remaining_label: string | null;
        completed: boolean;
    };
    activity_timeline: Array<{
        type: string;
        title: string | null;
        description: string | null;
        actor: string | null;
        created_at: string | null;
    }>;
    created_at: string | null;
    status_histories: Array<{
        from_status: string | null;
        to_status: string;
        remarks: string | null;
        changed_by: string | null;
        created_at: string | null;
    }>;
};

type PaginatedPdl = {
    data: PdlRecord[];
    current_page: number;
    last_page: number;
};

type DashboardProps = {
    kpis: {
        total: number;
        active: number;
        released: number;
        transferred: number;
    };
    pdls: PaginatedPdl;
    filters: {
        search: string;
    };
};

type RegistrationFormData = {
    surname: string;
    first_name: string;
    middle_name: string;
    alias: string;
    contact_number: string;
    case_number: string;
    crime_history: string;
    remarks: string;
    status: 'active' | 'released' | 'transferred' | 'transfered';
    transferred_to: string;
    sentence_start_date: string;
    sentence_years: string;
    next_hearing_date: string;
    hearing_notes: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'PDL Dashboard',
        href: dashboard(),
    },
];

const normalizeTransferredStatus = (
    status: string | null | undefined,
): RegistrationFormData['status'] =>
    status === 'transfered' ? 'transferred' : (status as RegistrationFormData['status']);

export default function Dashboard({
    kpis,
    pdls,
    filters,
}: DashboardProps) {
    const dashboardKpis = kpis ?? {
        total: 0,
        active: 0,
        released: 0,
        transferred: 0,
    };
    const [search, setSearch] = useState(filters.search ?? '');
    const [selectedPdl, setSelectedPdl] = useState<PdlRecord | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const page = usePage<{ flash?: { success?: string } }>();
    const successMessage = page.props.flash?.success;

    const editForm = useForm<
        RegistrationFormData & {
            status_change_note: string;
        }
    >({
        surname: '',
        first_name: '',
        middle_name: '',
        alias: '',
        contact_number: '',
        case_number: '',
        crime_history: '',
        remarks: '',
        status: 'active',
        transferred_to: '',
        sentence_start_date: '',
        sentence_years: '',
        next_hearing_date: '',
        hearing_notes: '',
        status_change_note: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                dashboard().url,
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['kpis', 'pdls', 'filters'],
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const exportUrl = `/pdls/export${search ? `?search=${encodeURIComponent(search)}` : ''}`;

    useEffect(() => {
        if (!selectedPdl) {
            return;
        }

        editForm.setData({
            surname: selectedPdl.surname ?? '',
            first_name: selectedPdl.first_name ?? '',
            middle_name: selectedPdl.middle_name ?? '',
            alias: selectedPdl.alias ?? '',
            contact_number: selectedPdl.contact_number ?? '',
            case_number: selectedPdl.case_number ?? '',
            crime_history: selectedPdl.crime_history ?? '',
            remarks: selectedPdl.remarks ?? '',
            status: normalizeTransferredStatus(selectedPdl.status) ?? 'active',
            transferred_to: selectedPdl.transferred_to ?? '',
            sentence_start_date: selectedPdl.sentence_start_date ?? '',
            sentence_years: selectedPdl.sentence_years?.toString() ?? '',
            next_hearing_date: selectedPdl.next_hearing_date ?? '',
            hearing_notes: selectedPdl.hearing_notes ?? '',
            status_change_note: '',
        });
    }, [selectedPdl]);

    const submitEdit = (event: FormEvent) => {
        event.preventDefault();

        if (!selectedPdl) {
            return;
        }

        editForm.put(`/pdls/${selectedPdl.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditing(false);
                setSelectedPdl(null);
                editForm.reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="PDL Dashboard" />
            <div className="flex flex-col gap-4 p-4">
                {successMessage ? (
                    <Alert>
                        <AlertTitle>Saved</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total PDL
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">{dashboardKpis.total}</p>
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
                                {dashboardKpis.active}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Released
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-sky-600">
                                {dashboardKpis.released}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Transferred
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-amber-600">
                                {dashboardKpis.transferred}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>PDL Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <Input
                                        id="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search by name, alias, or case number"
                                    />
                                    <Button asChild variant="outline">
                                        <a href={exportUrl}>Export to Excel</a>
                                    </Button>
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
                                                    colSpan={4}
                                                >
                                                    No matching records.
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
                                                        <Badge variant="outline">
                                                            {pdl.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedPdl(
                                                                    pdl,
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Page {pdls.current_page} of {pdls.last_page}
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>

            <Dialog
                open={selectedPdl !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsEditing(false);
                        setSelectedPdl(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>PDL Details</DialogTitle>
                        <DialogDescription>
                            Full record view for printing and review.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPdl ? (
                        <div className="space-y-3 text-sm">
                            {isEditing ? (
                                <form
                                    className="space-y-3"
                                    onSubmit={submitEdit}
                                >
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <Input
                                            value={editForm.data.surname}
                                            onChange={(event) =>
                                                editForm.setData(
                                                    'surname',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Surname"
                                        />
                                        <Input
                                            value={editForm.data.first_name}
                                            onChange={(event) =>
                                                editForm.setData(
                                                    'first_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <Input
                                        value={editForm.data.middle_name}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'middle_name',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Middle Name"
                                    />
                                    <Input
                                        value={editForm.data.alias}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'alias',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Alias"
                                    />
                                    <Input
                                        value={editForm.data.contact_number}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'contact_number',
                                                event.target.value
                                                    .replace(/\D/g, '')
                                                    .slice(0, 11),
                                            )
                                        }
                                        placeholder="Contact Number"
                                    />
                                    <Input
                                        value={editForm.data.case_number}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'case_number',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Case Number"
                                    />
                                    <Input
                                        value={editForm.data.crime_history}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'crime_history',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Crime History"
                                    />
                                    <Input
                                        value={editForm.data.remarks}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'remarks',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Remarks"
                                    />
                                    <Input
                                        type="date"
                                        value={editForm.data.sentence_start_date}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'sentence_start_date',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Sentence Start Date"
                                    />
                                    <Input
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={editForm.data.sentence_years}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'sentence_years',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Sentence Duration (Years)"
                                    />
                                    <Input
                                        type="date"
                                        value={editForm.data.next_hearing_date}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'next_hearing_date',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Next Hearing Date"
                                    />
                                    <Input
                                        value={editForm.data.hearing_notes}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'hearing_notes',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Hearing Notes"
                                    />
                                    <select
                                        value={editForm.data.status}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'status',
                                                event.target
                                                    .value as RegistrationFormData['status'],
                                            )
                                        }
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="released">
                                            Released
                                        </option>
                                        <option value="transferred">
                                            Transferred
                                        </option>
                                    </select>
                                    {editForm.data.status === 'transferred' ||
                                    editForm.data.status === 'transfered' ? (
                                        <Input
                                            value={editForm.data.transferred_to}
                                            onChange={(event) =>
                                                editForm.setData(
                                                    'transferred_to',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Transferred To (facility/place)"
                                        />
                                    ) : null}
                                    <Input
                                        value={editForm.data.status_change_note}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'status_change_note',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Status change note (optional)"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={editForm.processing}
                                        >
                                            {editForm.processing
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p>
                                        <strong>Name:</strong>{' '}
                                        {selectedPdl.name}
                                    </p>
                                    <p>
                                        <strong>Alias:</strong>{' '}
                                        {selectedPdl.alias || '-'}
                                    </p>
                                    <p>
                                        <strong>Contact:</strong>{' '}
                                        {selectedPdl.contact_number}
                                    </p>
                                    <p>
                                        <strong>Case Number:</strong>{' '}
                                        {selectedPdl.case_number}
                                    </p>
                                    <p>
                                        <strong>Crime History:</strong>{' '}
                                        {selectedPdl.crime_history || '-'}
                                    </p>
                                    <p>
                                        <strong>Remarks:</strong>{' '}
                                        {selectedPdl.remarks || '-'}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {selectedPdl.status}
                                    </p>
                                    <p>
                                        <strong>Transferred To:</strong>{' '}
                                        {selectedPdl.transferred_to || '-'}
                                    </p>
                                    <p>
                                        <strong>Sentence Duration:</strong>{' '}
                                        {selectedPdl.sentence_years
                                            ? `${selectedPdl.sentence_years} years`
                                            : '-'}
                                    </p>
                                    <p>
                                        <strong>Sentence Start:</strong>{' '}
                                        {selectedPdl.sentence_start_date || '-'}
                                    </p>
                                    <p>
                                        <strong>Sentence End:</strong>{' '}
                                        {selectedPdl.sentence_tracking.end_date || '-'}
                                    </p>
                                    <p>
                                        <strong>Remaining:</strong>{' '}
                                        {selectedPdl.sentence_tracking.remaining_label || '-'}
                                    </p>
                                    <p>
                                        <strong>Next Hearing Date:</strong>{' '}
                                        {selectedPdl.next_hearing_date || '-'}
                                    </p>
                                    <p>
                                        <strong>Hearing Notes:</strong>{' '}
                                        {selectedPdl.hearing_notes || '-'}
                                    </p>

                                    <div className="space-y-2 rounded-md border p-3">
                                        <p className="font-semibold">
                                            Status History
                                        </p>
                                        {selectedPdl.status_histories.length ===
                                        0 ? (
                                            <p className="text-muted-foreground">
                                                No status history yet.
                                            </p>
                                        ) : (
                                            selectedPdl.status_histories.map(
                                                (item, index) => (
                                                    <div
                                                        key={`${item.created_at}-${index}`}
                                                        className="rounded border p-2"
                                                    >
                                                        <p>
                                                            {item.from_status ??
                                                                'N/A'}{' '}
                                                            {' -> '}
                                                            {item.to_status}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.remarks ||
                                                                'No remarks'}{' '}
                                                            | by{' '}
                                                            {item.changed_by ||
                                                                'System'}{' '}
                                                            |{' '}
                                                            {item.created_at ||
                                                                '-'}
                                                        </p>
                                                    </div>
                                                ),
                                            )
                                        )}
                                    </div>

                                    <div className="space-y-2 rounded-md border p-3">
                                        <p className="font-semibold">
                                            Activity Timeline
                                        </p>
                                        {selectedPdl.activity_timeline.length ===
                                        0 ? (
                                            <p className="text-muted-foreground">
                                                No activity recorded yet.
                                            </p>
                                        ) : (
                                            selectedPdl.activity_timeline.map(
                                                (item, index) => (
                                                    <div
                                                        key={`${item.created_at}-${item.title}-${index}`}
                                                        className="rounded border p-2"
                                                    >
                                                        <p className="font-medium">
                                                            {item.title || '-'}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.description ||
                                                                '-'}{' '}
                                                            | by{' '}
                                                            {item.actor ||
                                                                'System'}{' '}
                                                            |{' '}
                                                            {item.created_at ||
                                                                '-'}
                                                        </p>
                                                    </div>
                                                ),
                                            )
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Record
                                        </Button>
                                        <Button asChild>
                                            <a
                                                href={`/pdls/${selectedPdl.id}/print`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Print Card
                                            </a>
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
