import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/Button";

const Home: NextPage = () => {

  //Session data 
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="AI Album Cover Generator!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Welcome!</h1>
      {!isLoggedIn && 
            <Button
            onClick={() => {
                signIn().catch(console.error);
            }}
            >   Sign in
            </Button>
        }
        {isLoggedIn &&
          <div className="flex flex-col gap-2">
            <Button
            onClick={() => {
                signOut().catch(console.error);
            }}
            >
                Sign out
            </Button>
            <Link className='text-blue-500 underline visited:text-purple-500' href='/generate'>
              Generate a cover
            </Link>
          </div>
            
        }
      </main>
    </>
  );
};

export default Home;
