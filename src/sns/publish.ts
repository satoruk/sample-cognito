import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

async function main() {
  const config = {};
  const client = new SNSClient(config);
  const response = await client.send(new PublishCommand({
    // TopicArn: "STRING_VALUE",
    // TargetArn: "STRING_VALUE",
    PhoneNumber: "818066653106",
    Message: "Use this message to test SNS from AWS SDK for JavaScript v3.",
    // Subject: "STRING_VALUE",
    // MessageStructure: "STRING_VALUE",
    // MessageAttributes: {
    //   "<keys>": {
    //     DataType: "STRING_VALUE", // required
    //     StringValue: "STRING_VALUE",
    //     BinaryValue: new Uint8Array(), // e.g. Buffer.from("") or new TextEncoder().encode("")
    //   },
    // },
    // MessageDeduplicationId: "STRING_VALUE",
    // MessageGroupId: "STRING_VALUE",
  }));
}

main();
