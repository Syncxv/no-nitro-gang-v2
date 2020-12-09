module.exports = {
    command: "tom-is-crazy",
    description: "a cool command",
    executor: async (args) => {
      return {
        send: true,
        result: "https://cdn.discordapp.com/attachments/719798258322636801/781004716519850014/unknown.png",
      };
    },
};  