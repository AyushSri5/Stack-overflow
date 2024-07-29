import { useAuthStore } from '@/store/Auth'
import React from 'react'

function RegisterPage() {
    const {createAccount,login} = useAuthStore();
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Collect data
        const formData = new FormData(e.currentTarget);
        const firstName =  formData.get("firstName");
        const lastName =  formData.get("lastName");
        const email =  formData.get("email");
        const password =  formData.get("password");

        if(!firstName || !lastName || !email || !password) {
            setError(() => "Please fill out all fields");
            return;
        }

        //Validate

        //Call the store
        setIsLoading(true);
        setError("");

        const response = await createAccount(
            `${firstName} ${lastName}`,
            email?.toString(),
            password?.toString(),
        )

        if(response.error) {
            setError(() => response.error!.message)
        }
        else {
            const loginResponse = await login(email.toString(),password.toString());
            if(loginResponse.error){
                setError(() => loginResponse.error!.message);
            }
        }

        setIsLoading(() => false);
    }
  return (
    <div>
        {error && (
            <p>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
            
        </form>
    </div>
  )
}

export default RegisterPage