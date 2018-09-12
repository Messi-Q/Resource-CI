const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const LOG = winston.loggers.get('application');

//credit card
let cardName = 'admin@demo-network';

class MyNetwork {

    constructor(){
        this.bisnessNetworkConnection = new BusinessNetworkConnection();
    }

    async init() {
        this.bisnessNetworkDefinition = await this.bisnessNetworkConnection(cardName);
        console.log('begain network connecting');
        LOG.info('MyNetWork:<init>', 'bisnessNetworkDefinition obtained', this.bisnessNetworkDefinition.getIdentifier())
    }

    listen() {
        this.bisnessNetworkConnection.on('event', (evt) => {
           console.log(evt);
        });
    }
    
}

export default MyNetwork;