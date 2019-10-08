import Sequelize, { Model } from 'sequelize';
import moogoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connetion = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connetion))
      .map(model => model.associate && model.associate(this.connetion.models));
  }

  mongo() {
    this.mongoConnection = moogoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
