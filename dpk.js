const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  
  const { partitionKey } = event;
  
  const shouldHashWholeObject = event && !event.partitionKey;
  const shouldHashPartitionKey = partitionKey && partitionKey.length > MAX_PARTITION_KEY_LENGTH;
  
  if (shouldHashWholeObject) {
    return crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  } else if (shouldHashPartitionKey) {
    return crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
  } else if (typeof partitionKey === "string") {
    return String(partitionKey);
  } else {
    return JSON.stringify(partitionKey);
  }
};