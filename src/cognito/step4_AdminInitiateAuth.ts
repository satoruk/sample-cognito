import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ClientId, UserPoolId, Username, Password } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new AdminInitiateAuthCommand({
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    ClientId,
    UserPoolId,
    AuthParameters: {
      USERNAME: Username,
      PASSWORD: Password,
    },
  }));
  console.log(result);
}

main();
