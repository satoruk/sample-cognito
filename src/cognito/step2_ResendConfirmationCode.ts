import { CognitoIdentityProviderClient, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider"; 
import { ClientId, Username } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const command = new ResendConfirmationCodeCommand({
    ClientId,
    Username,
  });
  const result = await client.send(command);
  console.log(result);
}

main();
