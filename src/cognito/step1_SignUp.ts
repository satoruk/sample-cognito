import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; 
import { ClientId, Email, Username, Password } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);

  const command = new SignUpCommand({
    ClientId,
    Username,
    Password,
    UserAttributes: [{ Name: "email", Value: Email }],
  });

  const result = await client.send(command);
  console.log(result);
}

main();
