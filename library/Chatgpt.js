const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: yourkey,
});
export const openai = new OpenAIApi(configuration);
