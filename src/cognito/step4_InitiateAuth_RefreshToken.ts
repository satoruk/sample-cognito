import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ClientId, RefreshToken } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new InitiateAuthCommand({
    AuthFlow:"REFRESH_TOKEN_AUTH",
    ClientId,
    AuthParameters: {
      REFRESH_TOKEN: RefreshToken,
    },
  }));
  console.log(result);
}

main();
