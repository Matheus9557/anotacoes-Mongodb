const Pessoa = require('../models/pessoa');

const loginController = {
    async createSession(req, res) {

        const { email, password } = req.body;

        try{
            const pessoa = await Pessoa.findOne({ email, password });
            return res.status(200).json(pessoa);
        } catch(err){
            return res.status(400).json(err);
        }
    }
}

module.exports = loginController;