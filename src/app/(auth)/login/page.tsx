"use client"
//make it when using react hooks
import { useAuthStore } from '@/store/Auth'
import React from 'react'

function LoginPage() {
    const {login} = useAuthStore();
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Collect the data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if(!email || !password) {
            setError("Please enter all fields");
        }

        //Validation

        //Handle loading and erro
        setIsLoading(() => true);
        setError(() => "");

        //Login => store
        const loginResponse = await login(email.toString(),password?.toString());

        if(loginResponse.error) {
            setError(() =>  loginResponse.error!.message);

        }
        setIsLoading(() => false);

    }   
  return (
    <div>page</div>
  )
}

export default LoginPage