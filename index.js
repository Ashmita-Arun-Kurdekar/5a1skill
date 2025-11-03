// index.js
const express = require('express');
const app = express();
app.use(express.json()); // middleware to parse JSON

// In-memory data storage
let bookings = [
  { id: 1, name: 'John Doe', event: 'Hackathon', email: 'john@example.com' }
];

// -------------------- CRUD ROUTES -------------------- //

// 1️⃣ GET - View all bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// 2️⃣ POST - Create new booking
app.post('/bookings', (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    name: req.body.name,
    event: req.body.event,
    email: req.body.email
  };
  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
});

// 3️⃣ PUT - Update booking details
app.put('/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.name = req.body.name || booking.name;
  booking.event = req.body.event || booking.event;
  booking.email = req.body.email || booking.email;

  res.json({ message: 'Booking updated successfully', booking });
});

// 4️⃣ DELETE - Cancel booking
app.delete('/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });

  bookings.splice(index, 1);
  res.json({ message: 'Booking deleted successfully' });
});

// -------------------- SERVER -------------------- //
// Default home route
app.get('/', (req, res) => {
  res.send('🎉 Welcome to Synergia Booking API! Use /bookings to access the API.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
