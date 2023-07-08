const express = require('express');
const router = express.Router();
const query = require('../query');

router.get('/', (req, res) => {
  res.status(200)
    .json({
      success: true,
      message: 'Welcome'
    });
});

router.get('/states', async function(req, res, next) {
  try {
    res.res.status(200).json(await query.getAllState());
  } catch (err) {
    res.res.status(500).json({
      message: 'Error while getting states',
      err: err.message
    });
    next(err);
  }
});


router.get('/lga-results', async function(req, res, next) {
  try {
    const data = await query.getLgaResult();
    const convert = mergeObjectsById(data.data);
    res.status(200).json({ result: convert });
  } catch (err) {
    res.status(500).json({
      message: 'Error while getting states',
      err: err.message
    });
    next(err);
  }
});

router.get('/wards', async function(req, res, next) {
  try {
      res.status(201).json(await query.getAllWard());
  } catch (err) {
    res.status(500).json({
      message: 'Error while getting states',
      err: err.message
    });
    next(err);
  }
});

router.get('/lga', async function(req, res, next) {
  try {
    res.status(200).json(await query.getAllLocalGov());
  } catch (err) {
    res.status(500).json({
      message: 'Error while getting states',
      err: err.message
    });
    next(err);
  }
});

router.post('/new-unit', async function(req, res, next) {
  try {
    const save = await query.addPollingUnit(req.body)
    res.json({ data: save, message: 'Successful' });
  } catch (err) {
    res.status(500).json({
      message: 'Error while getting states',
      err: err.message
    });
    next(err);
  }
});

router.use('*', (req, res) =>
  res.status(404).json({
    message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫',
}));



function mergeObjectsById(data) {
  const combinedObjects = data.reduce((result, obj) => {
    const key = `${obj.polling_unit_lga_id}-${obj.id}`;
    if (!result[key]) {
      result[key] = {
        id: obj.id,
        lga_id: obj.lga_id,
        name: obj.name,
        lga_state_id: obj.lga_state_id,
        lga_description: obj.lga_description,
        polling_units: []
      };
    }
    result[key].polling_units.push({
      polling_unit_name: obj.polling_unit_name,
      polling_unit_description: obj.polling_unit_description,
      polling_unit_id: obj.polling_unit_id,
      polling_unit_lga_id: obj.polling_unit_lga_id,
      entered_by_user: obj.entered_by_user,
      polling_unit_number: obj.polling_unit_number,
      sum: obj.sum
    });
    return result;
  }, {});
  
  const combinedArray = Object.values(combinedObjects);
  return combinedArray;
}


module.exports = router;