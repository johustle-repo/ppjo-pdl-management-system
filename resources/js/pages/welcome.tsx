import { Head, Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { dashboard, login } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as { auth: { user: unknown | null } };

    return (
        <>
            <Head title="PPJO Management System" />

            <div className="relative min-h-screen overflow-hidden bg-blue-900 px-4 py-4 text-slate-900 lg:px-6 lg:py-6 dark:bg-slate-950 dark:text-slate-100">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl dark:bg-blue-500/20" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/10" />

                <main className="relative mx-auto flex h-[calc(100vh-2rem)] w-full max-w-6xl rounded-3xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)] backdrop-blur lg:h-[calc(100vh-3rem)] lg:p-6 dark:border-slate-700 dark:bg-slate-900/90">
                    <div className="grid h-full w-full gap-4 lg:grid-cols-2">
                        <section className="relative hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 lg:block dark:border-slate-700 dark:bg-slate-800">
                            <img
                                src="https://pia.gov.ph/uploads/2024/02/5e62f673f3a2c08372a00b30f3923386.jpg"
                                alt="Pangasinan jail facility"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/45" />
                        </section>

                        <section className="h-full overflow-y-auto rounded-2xl pr-1">
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
                                    <AppLogoIcon className="h-4 w-4 fill-current" />
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                                    PPJO Management System
                                </span>
                            </div>

                            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 lg:text-3xl dark:text-slate-100">
                                PDL Record Management and Operations Dashboard
                            </h1>

                            <p className="mt-3 text-sm leading-relaxed text-slate-600 lg:text-base dark:text-slate-300">
                                A centralized platform for intake, case tracking, status
                                monitoring, card printing, and export-ready reporting.
                                Built to help teams manage PDL records accurately and
                                efficiently.
                            </p>

                            <div className="mt-4 grid gap-3">
                                <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                                    <h2 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                                        What You Can Do
                                    </h2>
                                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                            Register new PDL records
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                            Search and review profile details
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                            Print PDL card preview
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                            Export records for reporting
                                        </li>
                                    </ul>
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                                    <h2 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                                        Data Standards
                                    </h2>
                                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                                            Contact number: digits only
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                                            Contact number: exactly 11 digits
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                                            Required field validation
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                                            Consistent name formatting
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                                    >
                                        Open Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
