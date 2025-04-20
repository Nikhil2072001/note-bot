import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import LogOutButton from "@/components/LogOutButton";
import {getUser} from "@/auth/server";
import { SidebarTrigger } from "./sidebar";
const Header = async() => {
    const user = await getUser();

  return (
    <header className="bg-popover relative flex h-24 w-full items-center justify-between px-3
    sm:px-8 text-popover-foreground"
    style={{
        boxShadow: shadow,
    }}>
      <SidebarTrigger className="absolute left-1 top-1 "/>
      <Link className="flex items-end gap-2" href="/">
        <Image src="/goatius.png" 
        height={60}
        width={60}
        alt="Goatius Logo"
        className="rounded-full"
        priority />
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6"> 
            GOAT <span>Notes</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {
            user ? (
                <LogOutButton/>
            ) : (
              <>
              <Button asChild>
                <Link href="/sign-up" className="hidden sm:block">Sign Up</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              </>
            )
        }
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
