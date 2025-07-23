"use client";

import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import NavLink from "@/components/atoms/NavLink/navLink";
import Button from "@/components/atoms/Button/button";

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden ml-6 md:flex space-x-2 px-1">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/create-certificate">Create Certificate</NavLink>
        <NavLink href="/verify">Verify</NavLink>
        <NavLink href="/certificate">Certificates</NavLink>
        <NavLink href="/help">Help</NavLink>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex text-white space-x-4 ml-auto">
        <Button variant="outline">Sign In</Button>
        <Button variant="secondary">Sign Up</Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="absolute md:hidden p-2 right-5"
        onClick={toggleMenu}
        data-testid="mobile-menu-button"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden mt-4 mr-auto ml-10 flex flex-col space-y-4"
          data-testid="mobile-menu"
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/create-certificate">Create Certificate</NavLink>
          <NavLink href="/verify">Verify</NavLink>
          <NavLink href="/certificate">Certificates</NavLink>
          <NavLink href="/help">Help</NavLink>
          <div className="text-white space-y-4 flex flex-col">
            <button>Sign In</button>
            <button className="bg-[#2563EB] text-black px-3 py-2 rounded-sm hover:opacity-80">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;
