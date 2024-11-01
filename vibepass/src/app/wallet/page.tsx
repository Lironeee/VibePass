"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG as QRCode } from "qrcode.react";
import Header from "@/components/header";

interface TicketData {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  seatInfo: string;
  ticketType: string;
  price: number;
}

const mockTickets: TicketData[] = [
  {
    id: "T1001",
    eventName: "DARKAVE Festival",
    date: "2024-08-15",
    time: "20:00",
    location: "Neon Arena, Cybercity",
    seatInfo: "VIP Section, Row A, Seat 1",
    ticketType: "VIP",
    price: 250,
  },
  {
    id: "T1002",
    eventName: "Galactic Symphony",
    date: "2024-09-22",
    time: "19:30",
    location: "Stardust Hall, Lunar City",
    seatInfo: "Orchestra, Row C, Seat 15",
    ticketType: "Premium",
    price: 180,
  },
  {
    id: "T1003",
    eventName: "Neon Nights EDM",
    date: "2024-10-05",
    time: "22:00",
    location: "Pulse Stadium, Neon District",
    seatInfo: "General Admission",
    ticketType: "Standard",
    price: 120,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Sparkle = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      ...style,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

const AnimatedBackground = () => {
  const sparkles = Array.from({ length: 50 }).map((_, i) => (
    <Sparkle
      key={i}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    />
  ));

  return <div className="fixed inset-0 pointer-events-none">{sparkles}</div>;
};

export default function WalletPage() {
  const [tickets, setTickets] = useState<TicketData[]>(mockTickets);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isResellDialogOpen, setIsResellDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [transferEmail, setTransferEmail] = useState("");
  const [resellPrice, setResellPrice] = useState("");

  const handleTransferTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    setIsTransferDialogOpen(false);
    setSelectedTicket(null);
    setTransferEmail("");
  };

  const handleResellTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    setIsResellDialogOpen(false);
    setSelectedTicket(null);
    setResellPrice("");
  };

  const handleAddToAppleWallet = (ticket: TicketData) => {
    alert(`Ticket ${ticket.id} added to Apple Wallet`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white overflow-hidden">
      <AnimatedBackground />
      <Header />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <div className="container mx-auto px-4 py-8 relative">
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold mt-4 mb-8"
          >
            My Wallet
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="bg-gray-800 border-gray-700 text-gray-100"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {ticket.eventName}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {ticket.ticketType} Ticket
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                      <span>
                        {new Date(ticket.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-purple-400" />
                      <span>{ticket.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                      <span>{ticket.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Ticket className="mr-2 h-4 w-4 text-purple-400" />
                      <span>{ticket.seatInfo}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-lg font-bold">
                    ${ticket.price.toFixed(2)}
                  </span>
                  <div className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          View Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 text-white">
                        <DialogHeader>
                          <DialogTitle>{ticket.eventName} Ticket</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Ticket ID: {ticket.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <QRCode value={ticket.id} size={200} level="H" />
                          </div>
                          <div className="text-center">
                            <p>{ticket.seatInfo}</p>
                            <p>
                              {new Date(ticket.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}{" "}
                              at {ticket.time}
                            </p>
                            <p>{ticket.location}</p>
                          </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setIsTransferDialogOpen(true);
                            }}
                          >
                            Transfer Ticket
                          </Button>
                          <Button
                            className="bg-black hover:bg-gray-800 text-white border border-white hover:text-gray-200"
                            onClick={() => handleAddToAppleWallet(ticket)}
                          >
                            Add to Apple Wallet
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setIsResellDialogOpen(true);
                      }}
                    >
                      Resell
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </motion.div>

          <Dialog
            open={isTransferDialogOpen}
            onOpenChange={setIsTransferDialogOpen}
          >
            <DialogContent className="bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Transfer Ticket</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the wallet address of the person you want to transfer
                  this ticket to.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transfer-email">Recipient's address</Label>
                  <Input
                    id="transfer-email"
                    value={transferEmail}
                    onChange={(e) => setTransferEmail(e.target.value)}
                    placeholder="AFQ..."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsTransferDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    selectedTicket && handleTransferTicket(selectedTicket.id)
                  }
                >
                  Transfer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isResellDialogOpen}
            onOpenChange={setIsResellDialogOpen}
          >
            <DialogContent className="bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Resell Ticket</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Set the new price for your ticket.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resell-price">New Price ($)</Label>
                  <Input
                    id="resell-price"
                    type="number"
                    value={resellPrice}
                    onChange={(e) => setResellPrice(e.target.value)}
                    placeholder="0.00"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsResellDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    selectedTicket && handleResellTicket(selectedTicket.id)
                  }
                >
                  List for Resale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
}
