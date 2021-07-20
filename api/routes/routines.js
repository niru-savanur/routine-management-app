const router = require('express').Router();
let Routine = require('../models/Routine');

router.route('/').get((req, res) => {
  Routine.find()
    .then(routines => res.json(routines))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = new Date(req.body.date);
  console.log(req.body.date, date);
  const newRoutine = new Routine({
    username,
    description,
    duration,
    date,
  });

  newRoutine.save()
  .then(() => res.json('Routine added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Routine.findById(req.params.id)
    .then(routine => res.json(routine))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Routine.findByIdAndDelete(req.params.id)
    .then(() => res.json('Routine deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Routine.findById(req.params.id)
    .then(routine => {
      routine.username = req.body.username;
      routine.description = req.body.description;
      routine.duration = Number(req.body.duration);
      routine.date = Date.parse(req.body.date);
      console.log(req.body.date, routine.date);

      routine.save()
        .then(() => res.json('Routine updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;