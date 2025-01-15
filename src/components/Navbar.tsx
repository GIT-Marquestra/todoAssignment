import { Search, Component } from "lucide-react"; 
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";


function Navbar() {
  return (
    <div className="sticky top-2 flex justify-between items-center px-4 py-2">
      <div className="text-xl font-bold flex"><Component/> <span className="mx-2">DoIt</span></div>
      <div className="flex items-center space-x-4">
        <Search className="w-6 h-6 cursor-pointer" />
        <ModeToggle/>
        <SignedIn>
          <SignOutButton/>
        </SignedIn>
        <SignedOut>
          <SignInButton mode='modal'/>
        </SignedOut>
      </div>
    </div>
  );
}

export default Navbar;

