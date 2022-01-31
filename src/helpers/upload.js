const axios = require("axios");
const FormData = require("form-data");
const supportedTypes = ["gif", "png", "jpg"];

module.exports = async function (user, attachment, config) {
  if (!attachment) return "Invalid attachment";
  const attachmentType = attachment.contentType.split("/")[1];
  if (!supportedTypes.includes(attachmentType)) return "Unsupported type";
  console.log(`Uploading ${attachment.name}`);

  const imageResponse = await axios.default.get(attachment.url, {
    responseType: "arraybuffer",
  });
  const data = new FormData();
  data.append("file", imageResponse.data, attachment.name);

  const response = await axios.default.post(config.baseURL, data, {
    headers: {
      Authorization: user.assToken,
      "Content-Type": "multipart/form-data",
      ...config.assHeaders,
      ...data.getHeaders(),
    },
  });
  if (response.status !== 200) return "Failed to upload";

  console.log(`${attachment.name} has been uploaded`);
  return `Here is your link: <${response.data.resource}>`;
};
