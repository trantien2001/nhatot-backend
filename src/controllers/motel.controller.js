const {
    getAllMotel,
    getAllMotelActive,
    getAllInfoMotelActive,
    getMotel,
    addMotel
} = require('../models/motel.model');

module.exports = {
    addMotel,
    getMotel,
    getAllMotel,
    getAllMotelActive,
    getAllInfoMotelActive,
}