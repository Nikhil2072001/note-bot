"use client";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { loginAction, signUpAction } from '@/actions/users'; // Assuming these are your auth actions
type props = {
    type: 'login' | 'signUp';
};

const AuthForm = ({ type }: props) => {
    const isLoginForm = type === 'login';
    const router = useRouter();
    const [isPending, startTransition] =useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
           let errorMessage;
           if(isLoginForm){
            errorMessage = (await loginAction(email, password)).errorMessage
           }else{
            errorMessage = (await signUpAction(email, password)).errorMessage

           }
            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success(`Sucessfully ${isLoginForm ? 'logged in' : 'signed up'}!`);
                router.replace('/'); // Redirect to dashboard after successful login/signup
            }
        })
    };
    return <form action={handleSubmit}>
        <CardContent className='grid w-full items-center gap-4'>
            <div className="flex flex-col space-y-1.5">
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='Enter your email' required disabled={isPending} />
            </div>
            <div className="flex flex-col space-y-1.5">
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' placeholder='Enter your password' required disabled={isPending} />
            </div>
        </CardContent>
        <CardFooter className='mt-4 flex flex-col gap-6'>
            <Button className='w-full ' >
                {
                    isPending ? (
                        <Loader2 className='animate-spin' />
                    ): isLoginForm ? (
                        'Login'
                    ) : (
                        'Sign Up'
                    )
                }
            </Button>
            <p className="text-xs">
                {isLoginForm ? (
                    <span>Don't have an account? <a href="/sign-up" className='text-blue-500 hover:text-blue-700'>Sign Up</a></span>
                ) : (
                    <span>Already have an account? <a href="/login" className='text-blue-500 hover:text-blue-700'>Login</a></span>
                )}
            </p>
        </CardFooter>

    </form> 
}

export default AuthForm