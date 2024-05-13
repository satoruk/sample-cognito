import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ClientId, Username } from "./settings.json"; 

const confirmationCode = "847543";

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new ConfirmSignUpCommand({
    ClientId,
    ConfirmationCode: confirmationCode,
    Username,
  }));
  console.log(result);
}

main();
