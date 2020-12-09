const { React } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require("powercord/injector");
var fs = require("fs");
var os = require('os');
const username = os.userInfo().username

function saveimages(name, link, description="a cool command") {
  var data = `module.exports = {
    command: "${name}",
    description: "${description}",
    executor: async (args) => {
      return {
        send: true,
        result: "${link}",
      };
    },
};  `
  fs.writeFile(`C:/Users/${username}/powercord/src/Powercord/plugins/no-nitro-gang-v2/commands/${name}.js`, data, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 
} 
// function getdic() {
//   var data = fs.readFileSync(`C:/Users/${username}/powercord/src/Powercord/plugins/no-nitro-gang-v2/images.json`);
//   var json = JSON.parse(data);
//   return json
// }
const insertText = (e) =>
  getModule(
    ["ComponentDispatch"],
    false
  ).ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", { content: e });
  
module.exports = class ImgCmd extends (
  Plugin
) {
  async startPlugin() {
    powercord.api.commands.registerCommand({
      command: "upload",
      aliases: ["move"],
      description: "upload a image",
      usage: "{c}",
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
    const commands = require("./commands/");
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
        if (args[0] !== void 0 && args.length === 1) {
          return {
            commands: Object.values(commands)
            .filter(({ command }) => command.includes(args[0].toLowerCase())),
            header: "mememememememememem",
          };
        }
      }

      // autocomplete (args) {
      //   if (args.length > 1) {
      //     return false;
      //   }
      //   return{
      //     options: json,
      //     header: 'powercord command list'
      //   }
        
      // }
    });

    powercord.api.commands.registerCommand({
      command: "tklogin",
      aliases: ["token_login", "login"],
      description: "script for loginging in to token nigga",
      usage: "{c}",
      executor: (args) => {
        if (!args[0]) {
          return {
            result: `\`\`\`js
            function login(token) {
              setInterval(() => {
              document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage.token = \`\"\${token}"\`
              }, 50);
              setTimeout(() => {
              location.reload();
              }, 2500);
              }
            \`\`\``,
          };
        }
        return {
          send: false,
          result: `\`\`\`js
          function login(token) {
            setInterval(() => {
            document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage.token = \`\"\${token}"\`
            }, 50);
            setTimeout(() => {
            location.reload();
            }, 2500);
            }
            login("${args[0]}")

          \`\`\``
        };
      },
    });
    //https://cdn.discordapp.com/attachments/719798258322636801/779251013135630346/3cagil.png
    //https://cdn.discordapp.com/attachments/768495779101802518/779387395883401219/msedge_366wjkYQpL.png
  }

  //const win = await popout

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("spotify");
    powercord.api.commands.unregisterCommand("tkinfo");
    powercord.api.commands.unregisterCommand('tklogin');
    powercord.api.commands.unregisterCommand('upload');
    powercord.api.commands.unregisterCommand('memes');
  }
};
