const express = require('express')
const app = express()
const connectDB = require('./database');
const port = 3000

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello')
})
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/job', jobRoutes);

const companyRoutes = require('./routes/companyRoutes');
app.use('/company', companyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
