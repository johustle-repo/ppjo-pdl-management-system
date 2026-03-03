import { Form, Head } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />

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
                        Create account
                    </h1>
                    <p className="mt-2 text-center text-sm text-slate-700 dark:text-slate-300">
                        Enter your details to continue
                    </p>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="mt-6 space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-800 dark:text-slate-200">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-800 dark:text-slate-200">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-800 dark:text-slate-200">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-slate-800 dark:text-slate-200"
                                    >
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="h-10 w-full"
                                    tabIndex={5}
                                    disabled={processing}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </>
                        )}
                    </Form>

                    <p className="mt-5 text-center text-sm text-slate-700 dark:text-slate-300">
                        Already have an account?{' '}
                        <TextLink href={login()} tabIndex={6} className="text-blue-700 dark:text-blue-300">
                            Log in
                        </TextLink>
                    </p>
                </div>
            </div>
        </>
    );
}
