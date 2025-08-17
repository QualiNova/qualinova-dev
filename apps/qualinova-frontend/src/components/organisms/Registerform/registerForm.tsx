'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '@/schemas/RegisterForm/registerFormSchema';
import { z } from 'zod';
import Input from '@/components/atoms/Input/input';
import Checkbox from '@/components/atoms/Checkbox/checkbox';
import { Button } from '@/components/atoms/Button/button';
import Image from 'next/image';
import githubIcon from '@/components/atoms/icons/githubicon.svg';
import Link from 'next/link';
import PasswordInput from '../../atoms/Input/passwordInput';

type RegisterFormData = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log('Form Submitted:', data);
    };

    return (
        <div className="h-screen flex justify-center items-center bg-[#09090B]">
            <div className="space-y-4 py-6 md:py-10 px-4 xl:py-0 xl:px-0 max-w-[420px] w-full">
                <div className="text-center flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl leading-8 font-semibold text-white">
                        Create an account
                    </h2>
                    <p className="text-sm text-[#A1A1AA] leading-5">
                        Enter your information to create a QualiNova account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-[420px] mx-auto space-y-4 bg-[#09090B] h-fit p-6 rounded-lg border border-[#27272A] shadow-[0px_1px_2px_#0000000D]"
                >
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                        <Input
                            placeholder="John"
                            label="First name"
                            {...register('firstName')}
                            error={errors.firstName?.message}
                            className="bg-[#09090B] border-[#27272A] text-white"
                            data-testid="first-name-input"
                        />
                        <Input
                            label="Last name"
                            placeholder="Doe"
                            {...register('lastName')}
                            error={errors.lastName?.message}
                            className="bg-[#09090B] border-[#27272A] text-white"
                            data-testid="last-name-input"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-white">Email</label>
                        <Input
                            label="Email"
                            placeholder="name@example.com"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                            className="bg-[#09090B] border-[#27272A] text-white"
                            data-testid="email-input"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between">
                            <label
                                className="block text-sm font-medium text-white"
                                data-testid="password-label"
                            >
                                Password
                            </label>
                        </div>
                        <PasswordInput
                            label="Password"
                            {...register('password')}
                            error={errors.password?.message}
                            className="bg-[#09090B] border-[#27272A] text-white"
                            data-testid="password-input"
                        />
                        <p className="text-[#A1A1AA] text-xs leading-4">
                            Choose a strong password, at least 8 characters long
                        </p>
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            label={
                                <div className="text-sm text-white">
                                    I agree to the{' '}
                                    <a
                                        href="#"
                                        className="text-[#2563EB] font-normal hover:underline"
                                    >
                                        terms of service
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        href="#"
                                        className="text-[#2563EB] font-normal hover:underline"
                                    >
                                        privacy policy
                                    </a>
                                </div>
                            }
                            {...register('terms')}
                            error={errors.terms?.message}
                            data-testid="checkbox-terms"
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={!isValid}
                        className="rounded-md bg-[#2563EB] hover:bg-[#2563EB]/90 text-white py-2.5 disabled:bg-[#2563EB] disabled:opacity-100"
                        data-testid="create-account-button"
                    >
                        <p className="text-sm leading-5 text-white font-medium">Create Account</p>
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

                    <div className="flex justify-center text-sm items-center">
                        <p className="text-[#A1A1AA]">
                            Already have an account?{' '}
                            <Link
                                className="text-sm hover:underline text-[#2563EB]"
                                href="/login"
                                data-testid="login-link"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
