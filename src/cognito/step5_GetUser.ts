import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { AccessToken } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new GetUserCommand({
    AccessToken,
  }));
  console.log(result);
}

main();
