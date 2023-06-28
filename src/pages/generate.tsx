import { type NextPage } from "next";
import { Input } from "~/components/Input";
import { FormGroup } from "~/components/FormGroup";
import Head from "next/head";
import { useState } from 'react'; 
import { api } from "~/utils/api";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/Button";
import { useSession } from "next-auth/react";

const GeneratePage: NextPage = () => {

    //States
    const [form, setForm] = useState({
        prompt: "",
    }); 

    const [imageUrl, setImageUrl] = useState("");

    //Update form function
    function updateForm(key: string) {
        return function(e: React.ChangeEvent<HTMLInputElement>){
            setForm((prev) => ({
                ...prev,
                [key]: e.target.value
            }))
        }
    }


    const generateCover = api.generate.generateCover.useMutation({
        onSuccess(data){
            if (data.imageUrl) {
                setImageUrl(data.imageUrl);
            }
        }
    });

    //Handle form submit 
    function handleFormSubmit(e: React.FormEvent){
        e.preventDefault();
        generateCover.mutate({
            prompt: form.prompt
        });
    }

    //Session data 
    const session = useSession();
    const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Generate</title>
        <meta name="description" content="AI Album Cover Generator!" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isLoggedIn && 
            <Button
            onClick={() => {
                signIn().catch(console.error);
            }}
            >   Sign in
            </Button>
        }
        {isLoggedIn &&
            <Button
            onClick={() => {
                signOut().catch(console.error);
            }}
            >
                Sign out
            </Button>
        }
        <form className="flex flex-col gap-2"
            onSubmit={handleFormSubmit}
        >
            <FormGroup>
                <label>Prompt</label>
                <Input value={form.prompt} onChange={updateForm("prompt")}/>
            </FormGroup>
            <Button>Submit</Button>
        </form>

        <img src={imageUrl}/>

      </main>
    </>
  );
};

export default GeneratePage;
