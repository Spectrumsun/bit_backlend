const db = require('../services/db');
const helper = require('../services/helper');

async function getAllState(){
  const rows = await db.query(
    `SELECT * FROM states`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function getAllWard(){
  const rows = await db.query(
    `SELECT uniqueid, ward_name FROM ward`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}


async function getAllLocalGov(){
  const rows = await db.query(
    `SELECT uniqueid, lga_name FROM lga`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}


async function getLgaResult(){
  const rows = await db.query(
    `SELECT 
        lga.uniqueid AS id,
        lga.lga_id AS lga_id,
        lga.lga_name AS name,
        lga.state_id AS lga_state_id,
        polling_unit.polling_unit_name,
        polling_unit.lga_id polling_unit_lga_id,
        polling_unit.polling_unit_id,
        polling_unit.polling_unit_number,
        polling_unit.uniqueid,
        polling_unit.polling_unit_description,
        polling_unit.entered_by_user,
        announced_pu_results.polling_unit_uniqueid,
        SUM(announced_pu_results.party_score) AS sum
      FROM
        lga
      JOIN polling_unit
        ON lga.uniqueid = polling_unit.lga_id
      JOIN 
        announced_pu_results ON polling_unit.uniqueid = announced_pu_results.polling_unit_uniqueid
      GROUP BY announced_pu_results.polling_unit_uniqueid
    `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function addPollingUnit(newData){
  const queryData = `
    INSERT IGNORE INTO 
      polling_unit (
        ward_id,
        lga_id,
        polling_unit_name,
        polling_unit_description,
        polling_unit_number,
        entered_by_user,
        polling_unit_id,
        uniquewardid,
        date_entered,
        lat
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`
  
  const polling_unit_id = 66
  const uniquewardid = 112
  const date_entered = new Date();
  const values=[
    parseInt(newData.ward_id), 
    parseInt(newData.lga_id),
    newData.polling_unit_name,
    newData.polling_unit_description,
    newData.polling_unit_number,
    newData.entered_by_user,
    polling_unit_id,
    uniquewardid,
    date_entered,
    newData.lat,
  ];

  const rows = await db.query(queryData, values);
  console.log(rows, 'rows')
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}


module.exports = {
  getLgaResult,
  getAllState,
  getAllLocalGov,
  getAllWard,
  addPollingUnit
}