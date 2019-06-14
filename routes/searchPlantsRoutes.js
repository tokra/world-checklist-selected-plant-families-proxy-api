const SearchPlantsController = require('../controllers/searchPlantsController');

async function handle(req, res) {
	const data = await SearchPlantsController.getPlants(req.query.q);
	const json = JSON.stringify(data, null, 2);
	res.setHeader('Content-Type', 'application/json');
	res.send(json);
}

/* GET users listing. */
const getPlants = express => {
	express.route('/v1/searchPlants').get(handle);
};

module.exports = {
	getPlants
};
