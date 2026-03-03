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
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
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
    profile_photo_url: string | null;
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

type PdlProfilesProps = {
    can: {
        create: boolean;
    };
    pdls: PaginatedPdl;
    filters: {
        search: string;
        pdl?: number | null;
    };
    selected_pdl?: PdlRecord | null;
};

type EditFormData = {
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
    profile_photo: File | null;
    next_hearing_date: string;
    hearing_notes: string;
    status_change_note: string;
};

type CreateFormData = {
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
    profile_photo: File | null;
    next_hearing_date: string;
    hearing_notes: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'PDL Profiles',
        href: '/pdl-profiles',
    },
];

const normalizeTransferredStatus = (
    status: string | null | undefined,
): EditFormData['status'] =>
    status === 'transfered' ? 'transferred' : (status as EditFormData['status']);

export default function PdlProfiles({
    can,
    pdls,
    filters,
    selected_pdl,
}: PdlProfilesProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedPdl, setSelectedPdl] = useState<PdlRecord | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkAction, setBulkAction] = useState<
        'status' | 'transfer_destination' | 'hearing_date'
    >('status');
    const [bulkStatus, setBulkStatus] = useState<'active' | 'released' | 'transferred'>(
        'active',
    );
    const [bulkTransferredTo, setBulkTransferredTo] = useState('');
    const [bulkHearingDate, setBulkHearingDate] = useState('');
    const [bulkHearingNotes, setBulkHearingNotes] = useState('');
    const page = usePage<{ flash?: { success?: string; photo_saved?: boolean } }>();
    const successMessage = page.props.flash?.success;
    const photoSaved = page.props.flash?.photo_saved === true;
    const [showPhotoSnackbar, setShowPhotoSnackbar] = useState(false);

    const editForm = useForm<EditFormData>({
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
        profile_photo: null,
        next_hearing_date: '',
        hearing_notes: '',
        status_change_note: '',
    });
    const createForm = useForm<CreateFormData>({
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
        profile_photo: null,
        next_hearing_date: '',
        hearing_notes: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/pdl-profiles',
                {
                    search,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['pdls', 'filters'],
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [
        search,
    ]);

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
            profile_photo: null,
            next_hearing_date: selectedPdl.next_hearing_date ?? '',
            hearing_notes: selectedPdl.hearing_notes ?? '',
            status_change_note: '',
        });
    }, [selectedPdl]);

    useEffect(() => {
        if (selected_pdl) {
            setSelectedPdl(selected_pdl);
        }
    }, [selected_pdl]);

    useEffect(() => {
        if (!photoSaved) {
            return;
        }

        setShowPhotoSnackbar(true);
        const timer = setTimeout(() => setShowPhotoSnackbar(false), 2600);
        return () => clearTimeout(timer);
    }, [photoSaved]);

    const submitEdit = (event: FormEvent) => {
        event.preventDefault();

        if (!selectedPdl) {
            return;
        }

        const requestOptions = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setIsEditing(false);
                setSelectedPdl(null);
                editForm.reset();
            },
        };

        if (editForm.data.profile_photo) {
            editForm.transform((data) => ({ ...data, _method: 'put' }));
            editForm.post(`/pdls/${selectedPdl.id}`, requestOptions);
            return;
        }

        editForm.transform((data) => data);
        editForm.put(`/pdls/${selectedPdl.id}`, {
            preserveScroll: true,
            onSuccess: requestOptions.onSuccess,
        });
    };
    const submitCreate = (event: FormEvent) => {
        event.preventDefault();

        createForm.post('/pdls', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const toggleRowSelection = (id: number) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const toggleSelectAllVisible = () => {
        const currentPageIds = pdls.data.map((row) => row.id);
        const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds((current) => current.filter((id) => !currentPageIds.includes(id)));
            return;
        }

        setSelectedIds((current) => Array.from(new Set([...current, ...currentPageIds])));
    };

    const submitBulkAction = () => {
        if (selectedIds.length === 0) {
            return;
        }

        router.post(
            '/pdls/bulk-update',
            {
                ids: selectedIds,
                action: bulkAction,
                status: bulkStatus,
                transferred_to: bulkTransferredTo,
                next_hearing_date: bulkHearingDate,
                hearing_notes: bulkHearingNotes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedIds([]);
                },
            },
        );
    };

    const exportUrl = `/pdls/export${search ? `?search=${encodeURIComponent(search)}` : ''}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="PDL Profiles" />
            <div className="flex flex-col gap-4 p-4">
                {successMessage ? (
                    <Alert>
                        <AlertTitle>Saved</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                ) : null}

                <Card>
                    <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <CardTitle>PDL Profiles</CardTitle>
                        <div className="flex flex-col gap-2 md:flex-row">
                            {can.create ? (
                                <Button type="button" onClick={() => setIsCreateOpen(true)}>
                                    Add PDL
                                </Button>
                            ) : null}
                            <Button asChild variant="outline">
                                <a href={exportUrl}>Export to Excel</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by name, alias, or case number"
                                />
                            </div>
                        </div>

                        <div className="rounded-md border p-3">
                            <p className="mb-2 text-sm font-semibold">
                                Bulk Actions ({selectedIds.length} selected)
                            </p>
                            <div className="grid gap-2 md:grid-cols-4">
                                <select
                                    value={bulkAction}
                                    onChange={(event) =>
                                        setBulkAction(
                                            event.target.value as
                                                | 'status'
                                                | 'transfer_destination'
                                                | 'hearing_date',
                                        )
                                    }
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                >
                                    <option value="status">Bulk Status Update</option>
                                    <option value="transfer_destination">Bulk Transfer Destination</option>
                                    <option value="hearing_date">Bulk Hearing Update</option>
                                </select>
                                {(bulkAction === 'status' || bulkAction === 'transfer_destination') ? (
                                    <Input
                                        value={bulkTransferredTo}
                                        onChange={(event) => setBulkTransferredTo(event.target.value)}
                                        placeholder="Transferred To"
                                    />
                                ) : (
                                    <Input
                                        type="date"
                                        value={bulkHearingDate}
                                        onChange={(event) => setBulkHearingDate(event.target.value)}
                                        placeholder="Next Hearing Date"
                                    />
                                )}
                                {bulkAction === 'status' ? (
                                    <select
                                        value={bulkStatus}
                                        onChange={(event) =>
                                            setBulkStatus(
                                                event.target.value as
                                                    | 'active'
                                                    | 'released'
                                                    | 'transferred',
                                            )
                                        }
                                        className="border-input bg-background h-9 w-full rounded-md border px-3 py-1 text-sm"
                                    >
                                        <option value="active">Active</option>
                                        <option value="released">Released</option>
                                        <option value="transferred">Transferred</option>
                                    </select>
                                ) : (
                                    <Input
                                        value={bulkHearingNotes}
                                        onChange={(event) => setBulkHearingNotes(event.target.value)}
                                        placeholder="Hearing Notes"
                                    />
                                )}
                                <Button
                                    type="button"
                                    disabled={selectedIds.length === 0}
                                    onClick={submitBulkAction}
                                >
                                    Apply Bulk Update
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    pdls.data.length > 0 &&
                                                    pdls.data.every((row) =>
                                                        selectedIds.includes(row.id),
                                                    )
                                                }
                                                onChange={toggleSelectAllVisible}
                                            />
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                        <th className="px-3 py-2 text-left font-medium">Case Number</th>
                                        <th className="px-3 py-2 text-left font-medium">Crime History</th>
                                        <th className="px-3 py-2 text-left font-medium">Remaining</th>
                                        <th className="px-3 py-2 text-left font-medium">Status</th>
                                        <th className="px-3 py-2 text-left font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pdls.data.length === 0 ? (
                                        <tr>
                                            <td className="px-3 py-6 text-center text-muted-foreground" colSpan={7}>
                                                No matching records.
                                            </td>
                                        </tr>
                                    ) : (
                                        pdls.data.map((pdl) => (
                                            <tr key={pdl.id} className="border-t">
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(pdl.id)}
                                                        onChange={() => toggleRowSelection(pdl.id)}
                                                    />
                                                </td>
                                                <td className="px-3 py-2">{pdl.name}</td>
                                                <td className="px-3 py-2">{pdl.case_number}</td>
                                                <td className="px-3 py-2">{pdl.crime_history || '-'}</td>
                                                <td className="px-3 py-2">
                                                    {pdl.sentence_tracking.remaining_label || '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Badge variant="outline">{pdl.status}</Badge>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setSelectedPdl(pdl)}
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

            <Dialog
                open={isCreateOpen}
                onOpenChange={(open) => {
                    setIsCreateOpen(open);
                    if (!open) {
                        createForm.reset();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add PDL</DialogTitle>
                        <DialogDescription>Create a new PDL profile record.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-3" onSubmit={submitCreate}>
                        <div className="grid gap-2 md:grid-cols-2">
                            <Input
                                value={createForm.data.surname}
                                onChange={(event) => createForm.setData('surname', event.target.value)}
                                placeholder="Surname"
                            />
                            <Input
                                value={createForm.data.first_name}
                                onChange={(event) => createForm.setData('first_name', event.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <Input
                            value={createForm.data.middle_name}
                            onChange={(event) => createForm.setData('middle_name', event.target.value)}
                            placeholder="Middle Name"
                        />
                        <Input
                            value={createForm.data.alias}
                            onChange={(event) => createForm.setData('alias', event.target.value)}
                            placeholder="Alias"
                        />
                        <Input
                            value={createForm.data.contact_number}
                            onChange={(event) =>
                                createForm.setData(
                                    'contact_number',
                                    event.target.value.replace(/\D/g, '').slice(0, 11),
                                )
                            }
                            placeholder="Contact Number"
                        />
                        <Input
                            value={createForm.data.case_number}
                            onChange={(event) => createForm.setData('case_number', event.target.value)}
                            placeholder="Case Number"
                        />
                        <Input
                            value={createForm.data.crime_history}
                            onChange={(event) => createForm.setData('crime_history', event.target.value)}
                            placeholder="Crime History"
                        />
                        <Input
                            value={createForm.data.remarks}
                            onChange={(event) => createForm.setData('remarks', event.target.value)}
                            placeholder="Remarks"
                        />
                        <Input
                            type="date"
                            value={createForm.data.sentence_start_date}
                            onChange={(event) =>
                                createForm.setData('sentence_start_date', event.target.value)
                            }
                            placeholder="Sentence Start Date"
                        />
                        <Input
                            type="number"
                            min={1}
                            max={100}
                            value={createForm.data.sentence_years}
                            onChange={(event) =>
                                createForm.setData('sentence_years', event.target.value)
                            }
                            placeholder="Sentence Duration (Years)"
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            className="file:bg-blue-400 file:text-blue-950 hover:file:bg-blue-300 file:rounded-md file:px-3"
                            onChange={(event) =>
                                createForm.setData(
                                    'profile_photo',
                                    event.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <InputError message={createForm.errors.profile_photo} />
                        <Input
                            type="date"
                            value={createForm.data.next_hearing_date}
                            onChange={(event) =>
                                createForm.setData('next_hearing_date', event.target.value)
                            }
                            placeholder="Next Hearing Date"
                        />
                        <Input
                            value={createForm.data.hearing_notes}
                            onChange={(event) =>
                                createForm.setData('hearing_notes', event.target.value)
                            }
                            placeholder="Hearing Notes"
                        />
                        <select
                            value={createForm.data.status}
                            onChange={(event) =>
                                createForm.setData('status', event.target.value as CreateFormData['status'])
                            }
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="released">Released</option>
                            <option value="transferred">Transferred</option>
                        </select>
                        {createForm.data.status === 'transferred' ||
                        createForm.data.status === 'transfered' ? (
                            <Input
                                value={createForm.data.transferred_to}
                                onChange={(event) =>
                                    createForm.setData(
                                        'transferred_to',
                                        event.target.value,
                                    )
                                }
                                placeholder="Transferred To (facility/place)"
                            />
                        ) : null}
                        <div className="flex gap-2">
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing ? 'Saving...' : 'Save PDL'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

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
                            Full profile details and status history.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPdl ? (
                        <div className="space-y-3 text-sm">
                            {isEditing ? (
                                <form className="space-y-3" onSubmit={submitEdit}>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <Input
                                            value={editForm.data.surname}
                                            onChange={(event) => editForm.setData('surname', event.target.value)}
                                            placeholder="Surname"
                                        />
                                        <Input
                                            value={editForm.data.first_name}
                                            onChange={(event) =>
                                                editForm.setData('first_name', event.target.value)
                                            }
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <Input
                                        value={editForm.data.middle_name}
                                        onChange={(event) => editForm.setData('middle_name', event.target.value)}
                                        placeholder="Middle Name"
                                    />
                                    <Input
                                        value={editForm.data.alias}
                                        onChange={(event) => editForm.setData('alias', event.target.value)}
                                        placeholder="Alias"
                                    />
                                    <Input
                                        value={editForm.data.contact_number}
                                        onChange={(event) =>
                                            editForm.setData(
                                                'contact_number',
                                                event.target.value.replace(/\D/g, '').slice(0, 11),
                                            )
                                        }
                                        placeholder="Contact Number"
                                    />
                                    <Input
                                        value={editForm.data.case_number}
                                        onChange={(event) => editForm.setData('case_number', event.target.value)}
                                        placeholder="Case Number"
                                    />
                                    <Input
                                        value={editForm.data.crime_history}
                                        onChange={(event) => editForm.setData('crime_history', event.target.value)}
                                        placeholder="Crime History"
                                    />
                                    <Input
                                        value={editForm.data.remarks}
                                        onChange={(event) => editForm.setData('remarks', event.target.value)}
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
                                        type="file"
                                        accept="image/*"
                                        className="file:bg-blue-400 file:text-blue-950 hover:file:bg-blue-300 file:rounded-md file:px-3"
                                        onChange={(event) =>
                                            editForm.setData(
                                                'profile_photo',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    <InputError message={editForm.errors.profile_photo} />
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
                                                event.target.value as EditFormData['status'],
                                            )
                                        }
                                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="released">Released</option>
                                        <option value="transferred">Transferred</option>
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
                                            editForm.setData('status_change_note', event.target.value)
                                        }
                                        placeholder="Status change note (optional)"
                                    />
                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={editForm.processing}>
                                            {editForm.processing ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-slate-900 dark:border-blue-400/40 dark:bg-blue-950/20 dark:text-slate-100">
                                        <div className="flex items-center gap-3">
                                            {selectedPdl.profile_photo_url ? (
                                                <img
                                                    src={selectedPdl.profile_photo_url}
                                                    alt="PDL Profile"
                                                    className="h-20 w-20 rounded-full border-2 border-blue-300 object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-300 bg-white text-xs text-blue-700 dark:border-blue-300/50 dark:bg-blue-900/40 dark:text-blue-200">
                                                    No Photo
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate text-base font-semibold text-blue-950 dark:text-blue-100">
                                                    {selectedPdl.name}
                                                </p>
                                                <p className="text-xs text-blue-700 dark:text-blue-200">
                                                    Case: {selectedPdl.case_number}
                                                </p>
                                                <p className="text-xs text-blue-700 dark:text-blue-200">
                                                    Status: {selectedPdl.status}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-2 text-sm md:grid-cols-2">
                                            <p><strong>Alias:</strong> {selectedPdl.alias || '-'}</p>
                                            <p><strong>Contact:</strong> {selectedPdl.contact_number}</p>
                                            <p><strong>Transferred To:</strong> {selectedPdl.transferred_to || '-'}</p>
                                            <p><strong>Sentence:</strong> {selectedPdl.sentence_years ? `${selectedPdl.sentence_years} years` : '-'}</p>
                                            <p><strong>Sentence Start:</strong> {selectedPdl.sentence_start_date || '-'}</p>
                                            <p><strong>Sentence End:</strong> {selectedPdl.sentence_tracking.end_date || '-'}</p>
                                            <p className="md:col-span-2">
                                                <strong>Remaining:</strong> {selectedPdl.sentence_tracking.remaining_label || '-'}
                                            </p>
                                            <p><strong>Next Hearing Date:</strong> {selectedPdl.next_hearing_date || '-'}</p>
                                            <p><strong>Hearing Notes:</strong> {selectedPdl.hearing_notes || '-'}</p>
                                            <p className="md:col-span-2">
                                                <strong>Crime History:</strong> {selectedPdl.crime_history || '-'}
                                            </p>
                                            <p className="md:col-span-2">
                                                <strong>Remarks:</strong> {selectedPdl.remarks || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 rounded-md border p-3">
                                        <p className="font-semibold">Status History</p>
                                        {selectedPdl.status_histories.length === 0 ? (
                                            <p className="text-muted-foreground">No status history yet.</p>
                                        ) : (
                                            selectedPdl.status_histories.map((item, index) => (
                                                <div
                                                    key={`${item.created_at}-${index}`}
                                                    className="rounded border p-2"
                                                >
                                                    <p>
                                                        {item.from_status ?? 'N/A'} {' -> '} {item.to_status}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.remarks || 'No remarks'} | by{' '}
                                                        {item.changed_by || 'System'} | {item.created_at || '-'}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="space-y-2 rounded-md border p-3">
                                        <p className="font-semibold">Activity Timeline</p>
                                        {selectedPdl.activity_timeline.length === 0 ? (
                                            <p className="text-muted-foreground">No activity recorded yet.</p>
                                        ) : (
                                            selectedPdl.activity_timeline.map((item, index) => (
                                                <div
                                                    key={`${item.created_at}-${item.title}-${index}`}
                                                    className="rounded border p-2"
                                                >
                                                    <p className="font-medium">{item.title || '-'}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.description || '-'} | by {item.actor || 'System'} | {item.created_at || '-'}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                                            Edit Record
                                        </Button>
                                        <Button asChild>
                                            <a href={`/pdls/${selectedPdl.id}/print`} target="_blank" rel="noreferrer">
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

            {showPhotoSnackbar ? (
                <div className="bg-primary text-primary-foreground fixed right-4 bottom-4 z-[70] rounded-md px-4 py-2 text-sm font-medium shadow-lg">
                    Profile photo saved successfully.
                </div>
            ) : null}
        </AppLayout>
    );
}
