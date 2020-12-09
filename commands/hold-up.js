module.exports = {
    command: "hold-up",
    description: "a cool command",
    executor: async (args) => {
      return {
        send: true,
        result: "https://i.imgur.com/LmOp6KM.png",
      };
    },
};  