'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Form } from '@heroui/react';
import { LogIn } from 'lucide-react';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppTextInputPassword from '@/components/forms/app-text-input-password';
import { Footer } from '@/components/layout/footer';
import { BlurText } from '@/components/animations/blur-text';
import { ShinyText } from '@/components/animations/shiny-text';
import { SplitText } from '@/components/animations/split-text';
import { apiClient } from '@/lib/api-client';
import { APP_NAME, APP_TAGLINE } from '@/lib/app-config';

export function LoginContent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await apiClient.post('/auth/login', {
        email: form.get('email'),
        password: form.get('password'),
      });
      router.push('/users');
    } catch (err: any) {
      const { toast } = await import('@heroui/react');
      toast.danger('Login Failed', { description: err.message, timeout: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const formFields = (
    <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <AppTextInput
        isRequired
        name="email"
        label="Email"
        type="email"
        placeholder="admin@mail.com"
        isDisabled={loading}
      />
      <AppTextInputPassword
        isRequired
        name="password"
        label="Password"
        placeholder="Enter your password"
        isDisabled={loading}
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isDisabled={loading}
      >
        <span className="flex items-center gap-2">
          <LogIn size={15} />Login
        </span>
      </Button>
    </Form>
  );

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="flex flex-col justify-between px-5 h-screen py-10">
        <div className="flex items-center justify-center">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-300">
            {APP_NAME}
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col mb-8">
            <ShinyText className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary-300">
              Welcome Back
            </ShinyText>
            <span className="text-sm text-default-600 mt-3">
              Enter your email and password to access your account
            </span>
          </div>
          {formFields}
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-default-50">
      <Card className="max-w-6xl w-[90%] h-[70%] shadow-2xl">
        <Card.Content className="grid grid-cols-2 p-0 h-full overflow-hidden">
          {/* Left panel */}
          <div className="w-full h-full bg-gradient-to-br from-primary-600 via-primary-500 to-primary-300 rounded-l-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <div className="absolute left-8 top-8 z-10">
              <div className="text-4xl font-bold text-white">
                <BlurText duration={1} delay={0.3} splitBy="characters">
                  {APP_NAME}
                </BlurText>
              </div>
              <div className="text-sm text-white/80 mt-2">
                <SplitText duration={0.5} delay={0.5} splitBy="words">
                  {APP_TAGLINE}
                </SplitText>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col flex-1">
            <div className="w-full py-5 px-12 flex-grow flex flex-col justify-center">
              <div className="flex flex-col mb-10">
                <ShinyText className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary-300">
                  Welcome Back
                </ShinyText>
                <span className="text-sm text-default-600 mt-3">
                  Enter your email and password to access your account
                </span>
              </div>
              {formFields}
            </div>

            <Footer />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
