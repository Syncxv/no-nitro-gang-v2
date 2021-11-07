const { Plugin } = require("powercord/entities");
const fs = require("fs");
const path = require('path')
const commands = require("./commands");
console.log(commands)
const saveimages = (name, link) => {
  fs.writeFileSync(path.join(__dirname, 'commands', `${name}.js`), 
    `module.exports = {
    command: "${name}",
    description: "hehe",
    executor: () => {
      return {
        send: true,
        result: "${link}",
      };
    },
};  `)
}
module.exports = class ImgCmd extends Plugin {
  async startPlugin() {
    powercord.api.commands.registerCommand({
      command: "upload",
      aliases: ["move"],
      description: "upload a image",
      usage: "{c} <name> <link>",
      executor: (args) => {
        if (!args[0]) return{result: "hey dude its like `.upload <name> <link>`"}
        if (!args[1]) return{result: "you forgot the link"}
        saveimages(args[0], args[1])
        return {
          send: false,
          result: "okay nigga its done",
        };
      },
    });
    powercord.api.commands.registerCommand({
      command: "memes",
      aliases: ["react"],
      description: "this is not fine",
      usage: "{c}",
      executor: (args) => {
        const subcommand = commands[args[0]];
        if (!args[0]) return {result: "aye nigga its like `.memes <name>`"}
        if (!subcommand)
          return {
            send: false,
            result: {
              type: "rich",
              author: { name: "Memes dawg" },
              title: "Invalid subcommand",
              description: `\`${
                args[0]
              }\` is not a valid subcommand. Specify one of ${Object.keys(
                commands
              )
                .map((cmd) => `\`${cmd}\``)
                .join(", ")}.`,
            },
          };
        return subcommand.executor(args.slice(1));
        
        
      },
      autocomplete: (args) => {
        if (args.length > 1) {
          return false;
        }
        
          return {
            commands: Object.values(commands)
            .filter(({ command }) => command.includes(args[0].toLowerCase())),
            header: "mememememememememem",
          };
        
      }
    });
    powercord.api.commands.registerCommand({
      command: "spotify2",
      aliases: ['spot', 'sp'],
      useage: "{c}",
      description: "hehe SPTOIFY PREMIUM",
      executor: () => require('powercord/webpack').getModule(['getActiveSocketAndDevice'],false).getActiveSocketAndDevice().socket.isPremium = true
    })
  }


  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('upload');
    powercord.api.commands.unregisterCommand('memes');
    powercord.api.commands.unregisterCommand('spotify2');
  }
};
