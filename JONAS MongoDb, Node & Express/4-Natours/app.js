const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1). Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

<<<<<<< HEAD
app.use((req, res, next) => {
  console.log('Hello from the middleware 😉️');
  next();
});


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
=======
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//fetch tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

// Get tours by id
const getTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);
  console.log(tour);

  //  if (id > tours.length)
  if (!tours) {
    res.status(404).json({
      status: 'fail',
      message: `Enter id less than or equal to ${tours.length}`
    })
  } else {
    res.status(200).json({
      status: 'success',
      tour
    });
  }
}

// make new tour
const createTour = (req, res) => {
  console.log(req.body);
  res.send('Done');

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

// update existing tour
const updateTour = (req, res) => {

  //  if (id > tours.length)
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: `Enter id less than or equal to ${tours.length}`
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>'
      }
    });
  }
};

// delete tour
const deleteTour = (req, res) => {
  //  if (id > tours.length)
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: `Enter id less than or equal to ${tours.length}`
    })
  } else {
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
};


// api to fetch tours (GET)
// app.get('/api/v1/tours', getAllTours);

// api to fetch tours by ID (GET)
// app.get('/api/v1/tours/:id', getTour);


// api to create tours (POST)
// app.post('/api/v1/tours', createTour);


// api to update tours (PATCH)
// app.patch('/api/v1/tours/:id', updateTour);


// api to delete Tours (Delete)
// app.delete('/api/v1/tours/:id', deleteTour);


app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
>>>>>>> 2fb1f7062ce4d3284e4b16fe0f98ae58de662f49
