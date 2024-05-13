import { CognitoIdentityProviderClient, UpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import { AccessToken } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new UpdateUserAttributesCommand({
    AccessToken,
    UserAttributes: [
      {
        Name: "nickname",
        Value: "koYans",
        // Value: "日本語",
      },
      {
        Name: "mother_tongue",
        Value: "Japanese",
        // Value: "日本語",
      },
    ],
  }));
  console.log(result);
}

main();
