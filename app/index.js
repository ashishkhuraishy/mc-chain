const bodyParser = require('body-parser');
const express = require('express');
const BlockChain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new BlockChain();
const p2p = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (_, res) => {
    res.json(bc.chain);
});


app.post('/mine', (req, res) => {
    var block = bc.addBlock(req.body.data);
    console.log(`New block added   : ${block.toString()}`);

    p2p.syncChains();
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on Port ${HTTP_PORT}`));
p2p.listen();