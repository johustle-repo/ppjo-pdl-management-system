import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type UserRow = {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    roles: string[];
};

type UserManagementProps = {
    users: UserRow[];
    role_options: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User Management', href: '/user-management' },
];

export default function UserManagement({ users, role_options }: UserManagementProps) {
    const page = usePage<{ flash?: { success?: string } }>();
    const successMessage = page.props.flash?.success;

    const initial = useMemo(() => {
        const map: Record<number, { role: string; is_active: boolean }> = {};
        users.forEach((user) => {
            map[user.id] = {
                role: user.roles[0] ?? role_options[0] ?? 'viewer',
                is_active: user.is_active,
            };
        });
        return map;
    }, [users, role_options]);

    const [edits, setEdits] = useState<Record<number, { role: string; is_active: boolean }>>(initial);

    const updateUser = (id: number) => {
        const data = edits[id];
        if (! data) {
            return;
        }
        router.put(`/user-management/${id}`, data, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex flex-col gap-4 p-4">
                {successMessage ? (
                    <Alert>
                        <AlertTitle>Saved</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                ) : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                        <th className="px-3 py-2 text-left font-medium">Email</th>
                                        <th className="px-3 py-2 text-left font-medium">Role</th>
                                        <th className="px-3 py-2 text-left font-medium">Active</th>
                                        <th className="px-3 py-2 text-left font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-t">
                                            <td className="px-3 py-2">{user.name}</td>
                                            <td className="px-3 py-2">{user.email}</td>
                                            <td className="px-3 py-2">
                                                <select
                                                    value={edits[user.id]?.role ?? role_options[0] ?? 'viewer'}
                                                    onChange={(event) =>
                                                        setEdits((prev) => ({
                                                            ...prev,
                                                            [user.id]: {
                                                                ...prev[user.id],
                                                                role: event.target.value,
                                                            },
                                                        }))
                                                    }
                                                    className="border-input bg-background h-9 rounded-md border px-3 py-1 text-sm"
                                                >
                                                    {role_options.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={edits[user.id]?.is_active ?? true}
                                                    onChange={(event) =>
                                                        setEdits((prev) => ({
                                                            ...prev,
                                                            [user.id]: {
                                                                ...prev[user.id],
                                                                is_active: event.target.checked,
                                                            },
                                                        }))
                                                    }
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => updateUser(user.id)}
                                                >
                                                    Save
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
