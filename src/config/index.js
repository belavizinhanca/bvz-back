const config = {}

config.JWT_KEY = 'bvz-identifyByJsonWebTokenOnAPIserver';

// config.URL_MONGO = 'mongodb://localhost/bvz-testes'; //db local para testes
config.URL_MONGO = 'mongodb+srv://BVZ:iCHkmDlW31WMycKr@bvz1.rwmza.mongodb.net/bdbvz?retryWrites=true&w=majority'; //db atlas versão oficial
config.SALT_ROUNDS = 10;

module.exports = config;