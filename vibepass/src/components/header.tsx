"use client";
import { PeraWalletConnect } from "@perawallet/connect";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const peraWallet = new PeraWalletConnect();

export default function Header() {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl"
    >
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 md:py-6 space-y-4 md:space-y-0">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture_decran_2024-11-01_a_13.01.02-removebg-preview-d2zcMqccZyweJGCCV2DNjoFZ4k3NO9.png"
              alt="VibePass Logo"
              width={120}
              height={30}
              className="h-8 w-auto brightness-0 invert"
            />
          </motion.div>
        </Link>
        <div className="flex flex-1 items-center justify-center md:justify-end space-x-4">
          <div className="w-full max-w-[400px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search for events, artists, or venues..."
                className="pl-8 rounded-full bg-white/5 border-white/10 focus:border-purple-500/50 transition-colors placeholder:text-white/50"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 text-white hover:text-gray-50 hover:bg-black transition-colors"
              >
                Explore
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
              <DropdownMenuItem className="">Music</DropdownMenuItem>
              <DropdownMenuItem className="">Arts</DropdownMenuItem>
              <DropdownMenuItem className="">Sports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isConnectedToPeraWallet ? (
            <>
              <div className="text-white  text-base">$ 500</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5 text-white" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 text-white border-gray-800 bg-gray-950"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/wallet" className="flex w-full">
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/event/manage" className="flex w-full">
                      Manage Events
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Button
                      onClick={handleDisconnectWalletClick}
                      className="flex w-full"
                    >
                      Log Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              className="bg-white text-black hover:bg-white/90 transition-colors"
              onClick={handleConnectWalletClick}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
  }
}
