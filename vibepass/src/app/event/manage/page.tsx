"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Grid,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import Header from "@/components/header";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SeatGrade {
  name: string;
  color: string;
  price: number;
}

interface VenueLayout {
  rows: number;
  cols: number;
  seats: string[][];
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  venueLayout: VenueLayout;
  seatGrades: SeatGrade[];
}

const initialSeatGrades: SeatGrade[] = [
  { name: "VIP", color: "#FFD700", price: 200 },
  { name: "Premium", color: "#C0C0C0", price: 150 },
  { name: "Standard", color: "#CD7F32", price: 100 },
];

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    capacity: 0,
    venueLayout: {
      rows: 5,
      cols: 10,
      seats: Array(5).fill(Array(10).fill("Standard")),
    },
    seatGrades: [...initialSeatGrades],
  });

  const handleCreateEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      capacity: 0,
      venueLayout: {
        rows: 5,
        cols: 10,
        seats: Array(5).fill(Array(10).fill("Standard")),
      },
      seatGrades: [...initialSeatGrades],
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleVenueLayoutChange = (rowIndex: number, colIndex: number) => {
    const updatedSeats = newEvent.venueLayout.seats.map((row, rIndex) =>
      row.map((seat, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex
          ? newEvent.seatGrades[
              (newEvent.seatGrades.findIndex((grade) => grade.name === seat) +
                1) %
                newEvent.seatGrades.length
            ].name
          : seat
      )
    );
    setNewEvent({
      ...newEvent,
      venueLayout: {
        ...newEvent.venueLayout,
        seats: updatedSeats,
      },
    });
  };

  const handleVenueLayoutSizeChange = (rows: number, cols: number) => {
    const newSeats = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill("Standard"));
    setNewEvent({
      ...newEvent,
      venueLayout: {
        rows,
        cols,
        seats: newSeats,
      },
    });
  };

  const handleAddSeatGrade = () => {
    setNewEvent({
      ...newEvent,
      seatGrades: [
        ...newEvent.seatGrades,
        { name: "New Grade", color: "#000000", price: 0 },
      ],
    });
  };

  const handleUpdateSeatGrade = (
    index: number,
    field: keyof SeatGrade,
    value: string | number
  ) => {
    const updatedGrades = newEvent.seatGrades.map((grade, i) =>
      i === index ? { ...grade, [field]: value } : grade
    );
    setNewEvent({
      ...newEvent,
      seatGrades: updatedGrades,
    });
  };

  const handleRemoveSeatGrade = (index: number) => {
    const updatedGrades = newEvent.seatGrades.filter((_, i) => i !== index);
    setNewEvent({
      ...newEvent,
      seatGrades: updatedGrades,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
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
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-8">
            Event Management
          </motion.h1>

          <motion.div variants={fadeInUp} className="mb-8">
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="rounded-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> Create New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Create New Event
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Fill in the details for your new event.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newEvent.capacity}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Seat Grades</Label>
                    <div className="space-y-2">
                      {newEvent.seatGrades.map((grade, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={grade.name}
                            onChange={(e) =>
                              handleUpdateSeatGrade(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Input
                            type="color"
                            value={grade.color}
                            onChange={(e) =>
                              handleUpdateSeatGrade(
                                index,
                                "color",
                                e.target.value
                              )
                            }
                            className="w-12 h-8 p-0 bg-gray-800 border-gray-700"
                          />
                          <Input
                            type="number"
                            value={grade.price}
                            onChange={(e) =>
                              handleUpdateSeatGrade(
                                index,
                                "price",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-24 bg-gray-800 border-gray-700 text-white"
                            placeholder="Price"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSeatGrade(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleAddSeatGrade}
                      className="mt-2 bg-purple-600 hover:bg-purple-700"
                    >
                      Add Seat Grade
                    </Button>
                  </div>
                  <div>
                    <Label className="mb-2 block">Venue Layout</Label>
                    <div className="flex space-x-4 mb-4">
                      <div>
                        <Label htmlFor="rows">Rows</Label>
                        <Input
                          id="rows"
                          type="number"
                          value={newEvent.venueLayout.rows}
                          onChange={(e) =>
                            handleVenueLayoutSizeChange(
                              parseInt(e.target.value),
                              newEvent.venueLayout.cols
                            )
                          }
                          className="w-20 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cols">Columns</Label>
                        <Input
                          id="cols"
                          type="number"
                          value={newEvent.venueLayout.cols}
                          onChange={(e) =>
                            handleVenueLayoutSizeChange(
                              newEvent.venueLayout.rows,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div
                      className="grid gap-1 p-4 bg-gray-800 rounded-lg"
                      style={{
                        gridTemplateColumns: `repeat(${newEvent.venueLayout.cols}, minmax(0, 1fr))`,
                      }}
                    >
                      {newEvent.venueLayout.seats.map((row, rowIndex) =>
                        row.map((seat, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            className="w-6 h-6 rounded transition-colors duration-200 hover:opacity-80"
                            style={{
                              backgroundColor: newEvent.seatGrades.find(
                                (grade) => grade.name === seat
                              )?.color,
                            }}
                            onClick={() =>
                              handleVenueLayoutChange(rowIndex, colIndex)
                            }
                          ></button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleCreateEvent}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold">{event.title}</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-700 text-white"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="text-blue-400 focus:bg-gray-600">
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-600" />
                      <DropdownMenuItem
                        className="text-red-400 focus:bg-gray-600"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                    {format(new Date(event.date), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-purple-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-purple-400" />
                    Capacity: {event.capacity}
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  {event.description}
                </p>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Venue Layout</h3>
                  <div className="flex space-x-4 mb-2">
                    {event.seatGrades.map((grade, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: grade.color }}
                        ></div>
                        <span>
                          {grade.name} - ${grade.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="grid gap-1 p-4 bg-gray-700 rounded-lg"
                    style={{
                      gridTemplateColumns: `repeat(${event.venueLayout.cols}, minmax(0, 1fr))`,
                    }}
                  >
                    {event.venueLayout.seats.map((row, rowIndex) =>
                      row.map((seat, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="w-6 h-6 rounded"
                          style={{
                            backgroundColor: event.seatGrades.find(
                              (grade) => grade.name === seat
                            )?.color,
                          }}
                        ></div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
