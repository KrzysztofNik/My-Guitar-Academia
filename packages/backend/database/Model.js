const knex = require('../knex');

module.exports = class Model {
  constructor(table, attributes = null, values = null, relations = null) {
    this.values = {};
    this.table = table;

    if (attributes) {
      this.attributes = attributes;
    }

    if (values) {
      this.fill(values);
    }

    if (relations) {
      this.relations = relations;
    }
  }

  fill = (values) => {
    Object.entries(values).map(([key, value]) => {
      if (this['attributes'].includes(key)) {
        this[key] = value;
        this.values[key] = value;
      } else {
        console.error(`Trying to set property "${key}", that doesn't exists in the model attributes array.`);
      }
    });
  }

  getAll = () => {
    return new Promise((resolve, reject) => {
      if (!this.relations || this.relations.length < 1) {
        knex(this.table)
          .select('*')
          .then((result) => {
            resolve(result);
          }).catch((error) => {
          reject(error);
        });
      } else {
        const query = knex(this.table);

        this.relations.map((relation) => {
          query.join(relation.table, relation.on, relation.type);
          query.select(`${relation.table}.*`);
        });

        query.then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  getWithPagination = (page, limit) => {
    return new Promise((resolve, reject) => {
      const offset = page > 1 ? (page - 1) * limit : 0;

      knex(this.table)
        .count('*')
        .then((countResult) => {
          knex(this.table)
            .select('*')
            .limit(limit)
            .offset(offset)
            .count('* as count')
            .then((result) => {
              resolve({
                paginator: {
                  currentPage: page,
                  perPage: limit,
                  count: result[0]?.count || 0,
                  total: countResult[0]['count(*)'],
                  firstItem: offset
                },
                data: countResult[0]['count(*)'] > 0 ? result : []
              });
            }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
        reject(error);
      });
    });
  }

  findById = (id) => {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .select('*')
        .where({id: id})
        .then((result) => {
          if (result.length > 0) {
            this.fill(result[0]);
            resolve(result[0]);
          } else {
            reject({message: 'Not found'});
          }
        }).catch((error) => {
        reject(error);
      });
    });
  }

  find = (data) => {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .select('*')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            this.fill(result[0]);
            resolve(result[0]);
          } else {
            reject({message: 'Not found'});
          }
        }).catch((error) => {
        reject(error);
      });
    });
  }

  save = () => {
    this.values['updated_at'] = knex.fn.now();
    this.values['created_at'] = knex.fn.now();

    return new Promise((resolve, reject) => {
      knex(this.table)
        .insert(this.values)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  create = (data) => {
    data.updated_at = knex.fn.now();
    data.created_at = knex.fn.now();

    return new Promise((resolve, reject) => {
      knex(this.table)
        .insert(data)
        .then((result) => {
          resolve(result);
          this.fill(data);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  update = (data, id = null) => {
    data.updated_at = knex.fn.now();

    return new Promise((resolve, reject) => {
      knex(this.table)
        .update(data)
        .where({id: id ?? this['id'] ?? null})
        .then((result) => {
          resolve(result);
          this.fill(data);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  delete = () => {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where({id: this['id']})
        .del()
        .then((result) => {
          resolve(result);
        }).catch((error) => {
        reject(error);
      });
    });
  }
}