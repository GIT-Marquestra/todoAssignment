import React from "react";
import { Search, Menu } from "lucide-react"; // Import icons from lucide-react
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="sticky top-2 flex justify-between items-center px-4 py-2">
      {/* Left: Logo */}
      <div className="text-xl font-bold">Logo</div>

      {/* Right: Search and Toggle */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <Search className="w-6 h-6 cursor-pointer" />
        
        {/* Toggle Button */}
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