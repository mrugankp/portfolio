const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');

const app = express();

mongoose.connect('mongodb://localhost:3000/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

