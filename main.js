const { timeStamp } = require('console');
const Discord = require('discord.js');
var fs = require("fs");
const client = new Discord.Client();
let prefix = '%';

//random colour
function gimmeColourz() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

client.on('ready', (ready) => {
    console.log('Ready!');
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong!');
    };
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}dm`)) {
        message.author.send('Hi!');
    };
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}help`)) {
        var args = message.content.split(" ")
        var helpSection = args[1]
        if (helpSection == 'verify') {
            let HelpVerify = new Discord.MessageEmbed()
                .setTitle('Verifying on the SMP')
                .setDescription(`Usage: '${prefix}verify <mc username>'`)
                .setColor(gimmeColourz())
            message.channel.send(HelpVerify);
        } else {
            message.channel.send("That's not a help section. Valid arguments: 'verify'");
        };
    };
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}send`)) {
        let args = message.content.split(" ");
        let msgText = message.content.substring(26);
        let textFwd = new Discord.MessageEmbed()
            .setTitle(msgText)
            .setColor(gimmeColourz())
        client.channels.cache.get(args[1]).send(textFwd);
        return;
    };
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}check`)) {
        if (fs.existsSync(`./VerifiedUsers/${message.author.id}.json`)) {
            message.channel.send('File Exists!');
        } else {
            message.channel.send("File Doesn't Exist!")
        };
        return;
    };
});

client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}verify`)) {
        var args = message.content.split(" ");
        var mcname = args[1];
        var msgAuth = message.author.tag.replace("_","\\_");
        if (mcname == undefined) {
            let undefName = new Discord.MessageEmbed()
                .setTitle('Verification Failed: Name is Undefined! ❌')
                .setDescription('Try again. An error? Contact @filipsly!')
                .setColor(gimmeColourz())
            message.channel.send(undefName);
            return;
        };
        if (msgAuth.endsWith('#0')) {
            msgAuth = `@${msgAuth.replace("#0", "")}`
        };
        if (fs.existsSync(`./VerifiedUsers/${message.author.id}.json`) == true) {
            let VerDen = new Discord.MessageEmbed()
                .setTitle('Verification Failed: Already Verified Once! ❌')
                .setDescription('Something Wrong? Contact @filipsly')
                .setColor(gimmeColourz())
            message.channel.send(VerDen);
            return;
        } else {
            let VerSuc = new Discord.MessageEmbed()
                .setTitle(`Verified user ${msgAuth} as player ${mcname}! ✅`)
                .setColor(gimmeColourz())
                .setDescription(`If there was a Mistake, Contact @filipsly!`)
            message.channel.send(VerSuc);
            client.channels.cache.get('1119772964150329506').send(VerSuc);
            client.channels.cache.get('1120013241083502654').send(`whitelist add ${mcname}`);
            var jsonObjSav = {
                Verified: true,
                mcUsr: mcname,
                dcUsr: message.author.id
            };
            fs.writeFile(`./VerifiedUsers/${message.author.id}.json`, JSON.stringify(jsonObjSav, null, 2), (err) => {
                if (err) { console.error(err); return };
                console.log(`Created a JSON file for ${msgAuth.replace('\\_', '')} (${message.author.id})`);
                return;
            });
        };
    };
});



client.login("MTEyMDAzMjAzOTAyMjg4NzA1Mw.G7d2jW.5ZlKVyrWoI60M_S6SwvwKomFwt8ld_QlSojFWo");
