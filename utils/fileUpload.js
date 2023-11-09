const HandleError = require("../utils/HandleError");
const { deleteFile } = require("../utils/imageUpload");

const client = require("filestack-js").init(process.env.FILESTACK_API);

module.exports.fileStackUpload = async (file) => {
  try {
    const result = await client.upload(file);
    deleteFile(file);
    return { data: result.url, message: "successfully uploaded" };
  } catch (error) {
    return HandleError(error);
  }
};
