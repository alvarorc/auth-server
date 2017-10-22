/* eslint no-param-reassign: ["error", { "props": false }] */
import mongoose from 'mongoose';

mongoose.CreateModel = (name, options) => {
  if (typeof options.schema !== 'object') {
    throw new Error('Invalid schema options');
  }

  const schema = new mongoose.Schema(options.schema);
  if (typeof options.static !== 'undefined') {
    Object.keys(options.static)
      .forEach((k) => {
        if (typeof options.static[k] === 'function') {
          schema.statics[k] = options.static[k];
        }
      });
  }
  Object.keys(options)
    .forEach((k) => {
      if (typeof options[k] === 'function') {
        schema.methods[k] = options[k];
      }
    });

  if (typeof options.presave === 'function') {
    schema.pre('save', options.presave);
  }

  return mongoose.model(name, schema);
};

export default mongoose;
