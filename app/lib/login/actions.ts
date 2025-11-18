"use server";

import { signIn } from "auth";
import z, { object, string } from "zod";
import { signInSchema } from "./signInSchema";

export async function loginAction(formData: FormData) {
    const form_email = formData.get("email");
    const form_password = formData.get("password");

    try{
        const credentials = {email: form_email, password: form_password};
        const parseResult = await signInSchema.safeParseAsync(credentials);   

        if (!parseResult.success) {
            return { zod: parseResult.error.flatten().fieldErrors };
        }

    }
    catch(e){
        console.log("e",e);
    }

    try{
        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });

        console.log("result213" ,result)
        // wrong credentials
        if (result?.error) {
            return { error: "Invalid credentials" };
        }

        // valid – allow redirect
        return { success: true, url: result.url };

    }
    catch(error: any){
        console.log("e error eee ",error);
    }
}

