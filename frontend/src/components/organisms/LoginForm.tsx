'use client';
import {
  IconArrowBack,
  IconBrandGithub,
  IconBrandGoogle,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { ButtonRoundedIcon } from '../atoms/ButtonRoundedIcon';
import { LabelInputContainer } from '../atoms/LabelInputContainer';
import { LinkNav } from '../atoms/LinkNav';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-[0_0_70px_15px_rgba(0,0,0,0.4)] bg-muted dark:bg-muted">
      <Link
        href="/"
        className="text-sm flex items-center gap-1 transition-colors duration-150 mb-5 hover:text-secondary-foreground w-min"
      >
        <IconArrowBack className="w-5 h-5" /> Volte
      </Link>
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
          Bem-Vindo ao Jupiter
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Entre com a sua conta no Jupiter se você possuir uma. Caso contrário,
          registre-se{' '}
          <LinkNav href="register" className="text-primary-foreground">
            aqui
          </LinkNav>
          .
        </p>
      </div>

      <form className="my-8 flex flex-col gap-2" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="name@domain.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <Button
          variant="outline"
          style={{ width: '100%' }}
          size="lg"
          type="submit"
        >
          Login
        </Button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex gap-4 items- justify-center">
          <ButtonRoundedIcon
            icon={
              <IconBrandGithub className="h-full w-full text-neutral-800 dark:text-neutral-300" />
            }
          />
          <ButtonRoundedIcon
            icon={
              <IconBrandGoogle className="h-full w-full text-neutral-800 dark:text-neutral-300" />
            }
          />
        </div>
      </form>
    </div>
  );
}
