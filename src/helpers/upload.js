const axios = require("axios");
const FormData = require("form-data");
const supportedTypes = ["gif", "png", "jpg"];

module.exports = async function (user, customName, attachment, config) {
  if (!attachment) return "Invalid attachment";
  const attachmentType = attachment.contentType.split("/")[1];
  if (!supportedTypes.includes(attachmentType)) return "Unsupported type";

  if (customName.length > 100)
    return "Custom name too long. Should be between 1-100 characters.";

  const fileName = customName
    ? `${customName}.${attachmentType}`
    : attachment.name;
  console.log(`Uploading ${fileName}`);

  const imageResponse = await axios.default.get(attachment.url, {
    responseType: "arraybuffer",
  });
  const data = new FormData();

  data.append("file", imageResponse.data, fileName);

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
