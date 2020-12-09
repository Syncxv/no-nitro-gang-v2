module.exports = {
    command: "this-post-right-here-officer",
    description: "a cool command",
    executor: async (args) => {
      return {
        send: true,
        result: "https://cdn.discordapp.com/attachments/770590731618353152/780033086867767326/FB_IMG_1605796996204.jpg",
      };
    },
};  