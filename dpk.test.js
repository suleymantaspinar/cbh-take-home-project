const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns hash when event has no partition key", () => {
    const exampleInput = {}
    const exampleHash = crypto.createHash("sha3-512").update(JSON.stringify(exampleInput)).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(exampleHash)
  });

  it("Returns whole object as hash when partition key is undefined", () => {
    const exampleInput = { partitionKey: undefined }
    const expectedOutput = crypto.createHash("sha3-512").update(JSON.stringify(exampleInput)).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })
  it("Returns whole object as hash when partition key is undefined", () => {
    const exampleInput = { partitionKey: null }
    const expectedOutput = crypto.createHash("sha3-512").update(JSON.stringify(exampleInput)).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })
  it("Returns whole object as hash when partition key is false", () => {
    const exampleInput = { partitionKey: false }
    const expectedOutput = crypto.createHash("sha3-512").update(JSON.stringify(exampleInput)).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })
  it("Returns string when partition key is true", () => {
    const exampleInput = { partitionKey: true }
    const expectedOutput = 'true';
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns string when partition key is 0", () => {
    const exampleInput = { partitionKey: true }
    const expectedOutput = 'true';
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns whole object as a hash string when partition key is NaN", () => {
    const exampleInput = { partitionKey: NaN }
    const expectedOutput = crypto.createHash("sha3-512").update(JSON.stringify(exampleInput)).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns partition key when event has partition key as string", () => {
    const exampleInput = {partitionKey: 'examplePartitionKey'};
    const expectedOutput = exampleInput.partitionKey
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  });

  it("Returns partition key when event has partition key as object", () => {
    const exampleInput = { partitionKey: {"foo": "barr"}}
    const expectedOutput = JSON.stringify(exampleInput.partitionKey)
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns partition key when event has partition key as empty array", () => {
    const exampleInput = { partitionKey: []}
    const expectedOutput = JSON.stringify(exampleInput.partitionKey)
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns partition key when event has partition key as array of objects", () => {
    const exampleInput = { partitionKey: [{"foo":"bar"}, {1: 2}]}
    const expectedOutput = JSON.stringify(exampleInput.partitionKey)
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })

  it("Returns hash when partition Key lentgh greater than 256", () => {
    const exampleInput = { partitionKey: Buffer.alloc(257, "1").toString() }
    const expectedOutput = crypto.createHash("sha3-512").update(exampleInput.partitionKey).digest("hex");
    expect(deterministicPartitionKey(exampleInput)).toBe(expectedOutput)
  })
});