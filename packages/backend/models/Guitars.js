const { Model } = require('objection')
const knex = require('../knex.js')

Model.knex(knex)

class Guitar extends Model {
    static get tableName() {
        return 'guitars'
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join:{
                    from: 'guitars.ownerId',
                    to: 'users.id',
                },
            },
        };
    }
}

module.exports = Guitar
