module.exports = {
    command: "outstanding-move",
    description: "a cool command",
    executor: async (args) => {
      return {
        send: true,
        result: "https://cdn.discordapp.com/attachments/747945582718353530/779593623036755999/d14.png",
      };
    },
};  