const path = require('path');

const frontController = {
    'home': (req, res) => {
        let options = {
            root: path.join(__dirname + "../../../frontend/")
        };
        let fileName = 'home.html';
        res.sendFile(fileName, options);
    },
    'favoritas': (req, res) => {
        let options = {
            root: path.join(__dirname + "../../../frontend/")
        };
        let fileName = 'favoritas.html';
        res.sendFile(fileName, options);
    },
    'formulario': (req, res) => {
        let options = {
            root: path.join(__dirname + "../../../frontend/")
        };
        let fileName = 'formulario.html';
        res.sendFile(fileName, options);
    },
}

module.exports = frontController;