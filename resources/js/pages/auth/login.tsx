import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
                <div className="w-full max-w-md rounded-2xl border border-slate-300 bg-white p-8 shadow-lg shadow-blue-950/20 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current" />
                        </div>
                        <p className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
                            PPJO Management System
                        </p>
                    </div>

                    <h1 className="text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Sign in
                    </h1>
                    <p className="mt-2 text-center text-sm text-slate-700 dark:text-slate-300">
                        Enter your credentials to continue
                    </p>

                    {status ? (
                        <div className="mt-5 rounded-md bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
                            {status}
                        </div>
                    ) : null}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="mt-6 space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-slate-800 dark:text-slate-200"
                                    >
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Label
                                            htmlFor="password"
                                            className="text-slate-800 dark:text-slate-200"
                                        >
                                            Password
                                        </Label>
                                        {canResetPassword ? (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-xs text-blue-700 dark:text-blue-300"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        ) : null}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((current) => !current)
                                            }
                                            className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center px-3"
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-slate-800 dark:text-slate-200"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="h-10 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </>
                        )}
                    </Form>

                    {canRegister ? (
                        <p className="mt-5 text-center text-sm text-slate-700 dark:text-slate-300">
                            Don&apos;t have an account?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={6}
                                className="text-blue-700 dark:text-blue-300"
                            >
                                Register
                            </TextLink>
                        </p>
                    ) : null}
                </div>
            </div>
        </>
    );
}
