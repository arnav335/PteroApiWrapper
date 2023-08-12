const wrapper = require('pteroapiwrapper');

const api = wrapper.start('https://example.com','api-key');
//import the client endpoints
const client = wrapper.client;
//import the application endpoints
const application = wrapper.application
//example get request
api.get(application, (res) => {
    console.log(res);
});
