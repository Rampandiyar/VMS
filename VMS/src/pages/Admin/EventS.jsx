import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { motion } from "framer-motion";

const EventS = () => {
  const [events, setEvents] = useState([
    {
      event_id: 1,
      event_name: "Tech Conference",
      description: "A conference about the latest in tech.",
      start_date: "2025-01-30",
      end_date: "2025-01-31",
      location: "New York",
    },
    {
      event_id: 2,
      event_name: "Art Workshop",
      description: "Learn painting and sketching.",
      start_date: "2025-02-10",
      end_date: "2025-02-12",
      location: "Los Angeles",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    event_id: "",
    event_name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
  });

  const handleSave = () => {
    if (!currentEvent.event_name || !currentEvent.start_date || !currentEvent.end_date) {
      alert("Please fill in required fields");
      return;
    }

    if (currentEvent.event_id) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.event_id === currentEvent.event_id ? currentEvent : event
        )
      );
    } else {
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...currentEvent, event_id: new Date().getTime() },
      ]);
    }

    setOpenDialog(false);
    setCurrentEvent({
      event_id: "",
      event_name: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
    });
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.event_id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-6">
      <div className="relative z-10 text-left w-full max-w-7xl mx-auto py-8">
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
          Event Management Dashboard
        </h1>

        <div className="flex justify-end mb-6">
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            className="mb-6 px-6 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add Event
          </Button>
        </div>

        {/* Event Table */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl mb-8">
          <Table className="text-white">
            <TableHead>
              <TableRow>
                {["ID", "Name", "Description", "Start Date", "End Date", "Location", "Actions"].map((header) => (
                  <TableCell key={header} className="text-xs font-medium text-white uppercase tracking-wider">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <motion.tr
                  key={event.event_id}
                  whileHover={{ scale: 1.02 }}
                  className="border-b last:border-b-0 hover:bg-white/10 transition-all duration-200"
                >
                  <TableCell className="text-white">{event.event_id}</TableCell>
                  <TableCell className="text-white">{event.event_name}</TableCell>
                  <TableCell className="text-white">{event.description}</TableCell>
                  <TableCell className="text-white">{new Date(event.start_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-white">{new Date(event.end_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-white">{event.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(event)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDelete(event.event_id)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle className="text-indigo-600">
          {currentEvent.event_id ? "Edit Event" : "Add Event"}
        </DialogTitle>
        <DialogContent className="text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Event Name"
              value={currentEvent.event_name}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, event_name: e.target.value })
              }
              fullWidth
              required
              margin="normal"
              className="bg-white/30 text-white"
            />
            <TextField
              label="Location"
              value={currentEvent.location}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, location: e.target.value })
              }
              fullWidth
              margin="normal"
              className="bg-white/30 text-white"
            />
            <TextField
              label="Start Date"
              type="date"
              value={currentEvent.start_date}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, start_date: e.target.value })
              }
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              className="bg-white/30 text-white"
            />
            <TextField
              label="End Date"
              type="date"
              value={currentEvent.end_date}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, end_date: e.target.value })
              }
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              className="bg-white/30 text-white"
            />
          </div>
          <TextField
            label="Description"
            value={currentEvent.description}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, description: e.target.value })
            }
            fullWidth
            multiline
            rows={4}
            margin="normal"
            className="bg-white/30 text-white"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            className="bg-gray-300 hover:bg-gray-400 text-white rounded-lg px-6 py-3 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:from-indigo-700 hover:to-pink-700 rounded-lg px-6 py-3 transition-all duration-300"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventS;
