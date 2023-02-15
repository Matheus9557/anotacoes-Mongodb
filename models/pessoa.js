const mongoose = require('../database/db');
const bcrypt = require("bcrypt");

const SALT_FACTOR = 10;

const pessoaSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    nome: String
  });
  
  const noop = function () {};
  
  pessoaSchema.pre("save", function (done) {
    const pessoa = this;
  
    if (!pessoa.isModified("password")) {
      return done();
    }
  
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) {
        return done(err);
      }
      bcrypt.hash(pessoa.password, salt, noop, function (err, hashedPassword) {
        if (err) {
          return done(err);
        }
        pessoa.password = hashedPassword;
        done();
      });
    });
  });
  
  pessoaSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
      done(err, isMatch);
    });
  };
  
  pessoaSchema.methods.name = function () {
    return this.nome || this.email;
  };
  
const Pessoa = mongoose.model('pessoa', pessoaSchema);

module.exports = Pessoa;