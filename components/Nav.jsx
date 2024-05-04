"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const provider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    provider();
  }, []);

  console.log(providers);

  return (
    <nav className=" w-full flex-between mb-16 pt-6">
      <Link href="/" className=" flex-center gap-2 ">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia_logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className=" flex items-center gap-3 md:gap-5">
            <Link href="/create-prompt" className=" black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className=" outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image || "/assets/images/logo.svg"}
                width={37}
                height={37}
                alt="Profile"
                className=" rounded-full border border-teal-900"
              />
            </Link>
          </div>
        ) : (
          // <>
          //   {providers &&
          //     Object.values(providers).map((prov) => (
          //       <button
          //         type="button"
          //         key={prov.name}
          //         onClick={() => signIn(prov.id)}
          //         className=" black_btn"
          //       >
          //         Sign In
          //       </button>
          //     ))}
          // </>
          <>
            <button
              type="button"
              // key={prov.name}
              // onClick={() => signIn(prov.id)}
              className=" black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              alt="Profile"
              className=" rounded-full border border-teal-900"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className=" dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                  className=" mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className=" black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
