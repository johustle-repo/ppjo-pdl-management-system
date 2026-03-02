import { Form, Head } from '@inertiajs/react';
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
    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-4 py-8">
                <div className="w-full max-w-md rounded-2xl border border-slate-300 bg-white p-8 shadow-lg shadow-blue-950/20">
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current" />
                        </div>
                        <p className="text-sm font-semibold tracking-wide text-slate-900">
                            PPJO Management System
                        </p>
                    </div>

                    <h1 className="text-center text-2xl font-bold text-slate-900">
                        Sign in
                    </h1>
                    <p className="mt-2 text-center text-sm text-slate-700">
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
                                        className="text-slate-800"
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
                                            className="text-slate-800"
                                        >
                                            Password
                                        </Label>
                                        {canResetPassword ? (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-xs text-blue-700"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        ) : null}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                    />
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
                                        className="text-slate-800"
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
                        <p className="mt-5 text-center text-sm text-slate-700">
                            Don&apos;t have an account?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={6}
                                className="text-blue-700"
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
