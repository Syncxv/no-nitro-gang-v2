module.exports = {
    command: "excuse-me-what-the-fuck",
    description: "a cool command",
    executor: async (args) => {
      return {
        send: true,
        result: "https://i.imgur.com/UKuSpmQ.png",
      };
    },
};  