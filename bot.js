const Discord = require('discord.js');
const client = new Discord.Client();
require("express")().listen(3000)
client.on('ready', () => {
console.log(client.user.tag);   
// GLOBAL KOMUT YAPMAK İÇİN .guilds("738731463524220989") İ KALDIRIN NOT:İŞLENMESİ 1 SAAT SÜRECEKTİR [ÖNBELEĞE ALMAK İÇİM]
// SUNUCUYA ÖZEL KOMUT YAPMAK İÇİN   .guilds("738731463524220989") BAŞLIĞI EKLEYİN
/* 

BURAYI OKUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU!

// ŞİMDİ BUNDA TEK KOMUT VAR /avatar
/*
* Bunu Çalıştırmak README.md yi okuyun
*/
client.api.applications(client.user.id).guilds("SUNUUCU_İDNİNİz").commands.post({ 
data:{
name: 'avatar',
description: 'If mentioned, shows the information about the user.',
options: [{name: 'User', description: 'If mentioned, shows the information about the user.', type: 6, required: true}]
}
});

client.ws.on('INTERACTION_CREATE', async interaction => {
if(interaction.data.name == "avatar") {
let user;
if (interaction.data.options != null) {
user = client.users.cache.get(interaction.data.options.find(arg => arg.name.toLowerCase() == "user").value);
} else {
user = client.users.cache.get(interaction.member.user.id);
}
if (!user) return;
let embed = new Discord.MessageEmbed()
.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
.setImage(user.displayAvatarURL({ dynamic: true, size: 1024})) 
client.api.interactions(interaction.id, interaction.token).callback.post({
data: {
type: 4,
data: await createAPIMessage(interaction, embed)
}
});
}
});
});
async function createAPIMessage(interaction, content) {
 const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content).resolveData().resolveFiles();
 return { ...apiMessage.data, files: apiMessage.files };
}

client.login("TOKEN"); 
