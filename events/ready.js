module.exports = (client) => {
 
// Bot presence    
client.user.setPresence({
    activity: {
    name: client.config.prefix+'ping'          
    },
    status: 'online'
});

};