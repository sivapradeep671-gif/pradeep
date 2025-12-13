const db = require('../../database/db');

class GodownService {
    async getAll() {
        return db.find('godowns');
    }

    async getById(id) {
        return db.findOne('godowns', g => g.id === id);
    }
}

module.exports = new GodownService();
