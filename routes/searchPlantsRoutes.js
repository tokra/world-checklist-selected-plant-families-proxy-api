const express = require('express');
const router = express.Router();
const SearchPlantsController = require('../controllers/searchPlantsController');

/* GET users listing. */
const getPlants = async express => {
	express.route('/v1/searchPlants').get(handle);
};

async function handle(req, res, next) {
	const data = await SearchPlantsController.getPlants(req.query.q);
	const json = JSON.stringify(data, null, 2);
	res.setHeader('Content-Type', 'application/json');
	res.send(json);
}

module.exports = {
	getPlants
};
