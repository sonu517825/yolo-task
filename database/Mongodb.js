const mongoose = require('mongoose');

module.exports = () => {

  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
  }).catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('\n', 'Mongoose connected to                      :        MongoDB Database');
    console.log('\n', `MongoDB Database connected to              :        yolo`, '\n', '\n', '\n', '\n', '\n');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
