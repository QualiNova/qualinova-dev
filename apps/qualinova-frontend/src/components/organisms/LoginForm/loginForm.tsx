'use client';

import { Button } from '@/components/atoms/Button/button';
import Checkbox from '@/components/atoms/Checkbox/checkbox';
import githubIcon from '@/components/atoms/icons/githubicon.svg';
import Input from '@/components/atoms/Input/input';
import { loginFormSchema } from '@/schemas/LoginForm/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PasswordInput from '../../atoms/Input/passwordInput';
import { useRouter } from 'next/navigation';

type RegisterFormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log('Form Submitted:', data);
        router.push('/dashboard');
    };

    return (
        <div className="h-screen flex justify-center items-center bg-[#0c0c16]">
            <div className="space-y-4 py-6 md:py-10 px-4 xl:py-0 xl:px-0 max-w-[420px] w-full">
                <div className="text-center flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl leading-8 font-semibold text-white">
                        Welcome back
                    </h2>
                    <p className="text-sm text-[#A1A1AA] leading-5">
                        Enter your credentials to sign in to your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-[420px] mx-auto space-y-4 bg-[#0c0c16] h-fit p-6
                    rounded-lg border border-[#27272A] shadow-[0px_1px_2px_#0000000D]"
                >
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-white">Email</label>
                        <Input
                            label={''}
                            placeholder="name@example.com"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                            className="bg-[#0c0c16] border-[#27272A] text-white"
                            data-testid="email-input"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between" data-testid="forgot-password">
                            <label className="block text-sm font-medium text-white">Password</label>
                            <Link href="/forgot-password" className="text-sm text-[#2563EB]">
                                Forgot password?
                            </Link>
                        </div>
                        <PasswordInput
                            label={''}
                            {...register('password')}
                            error={errors.password?.message}
                            className="bg-[#0c0c16] border-[#27272A] text-white"
                            data-testid="password-input"
                        />
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            label={<div className="text-sm text-white">Remember me</div>}
                            {...register('rememberMe')}
                            error={errors.rememberMe?.message}
                            data-testid="checkbox-remember"
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        className="rounded-md bg-[#2563EB] hover:bg-[#2563EB]/90 text-white py-2.5"
                        data-testid="submit-button"
                    >
                        <p className="text-sm leading-5 text-white font-medium">Sign In</p>
                    </Button>

                    <div className="flex justify-between items-center">
                        <div className="h-[1px] w-[25%] bg-[#27272A]"></div>
                        <p className="text-[#A1A1AA] w-[50%] text-xs text-center">
                            OR CONTINUE WITH
                        </p>
                        <div className="h-[1px] w-[25%] bg-[#27272A]"></div>
                    </div>

                    <Button
                        type="button"
                        className="flex justify-center items-center border border-[#27272A] w-full hover:bg-[#27272A] py-2.5 text-white rounded-md"
                        data-testid="github-button"
                    >
                        <Image
                            src={githubIcon}
                            alt="github icon"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        GitHub
                    </Button>

                    <div
                        className="flex justify-center text-sm items-center"
                        data-testid="register"
                    >
                        <p className="text-[#A1A1AA]">
                            Don&apos;t have an account?{' '}
                            <Link
                                className="text-sm hover:underline text-[#2563EB]"
                                href="/register"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
