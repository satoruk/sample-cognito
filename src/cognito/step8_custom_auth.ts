import Base64 from "crypto-js/enc-base64";
import HmacSHA256 from "crypto-js/hmac-sha256";
import {
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallengeCommand,
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProviderClient,
 } from "@aws-sdk/client-cognito-identity-provider";

import { readText } from "./lib";
import {
  ClientId,
  ClientSecret,
  UserPoolId,
  Username,
  Password,
} from "./settings.json";

const generateSecretHash = (username: string, clientId: string, clientSecret: string) => {
  return HmacSHA256(username + clientId, clientSecret).toString(Base64);
};

const secretHash = generateSecretHash(Username, ClientId, ClientSecret);

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new AdminInitiateAuthCommand({
    AuthFlow: AuthFlowType.CUSTOM_AUTH,
    ClientId,
    UserPoolId,
    AuthParameters: {
      USERNAME: Username,
      SECRET_HASH: secretHash,
    },
  }));

  console.log(result);
  let { ChallengeName, Session } = result;

  while (ChallengeName === ChallengeNameType.CUSTOM_CHALLENGE) {
    process.stdout.write('Input Code > ')
    const UserCode = await readText();
    console.log(`Code : '${UserCode}'`)
 
    const result2 = await client.send(new AdminRespondToAuthChallengeCommand({
      ClientId,
      UserPoolId,
      ChallengeName: ChallengeNameType.CUSTOM_CHALLENGE,
      ChallengeResponses: {
        USERNAME: Username,
        ANSWER: UserCode,
        SECRET_HASH: secretHash,
      },
      Session,
    }));
    console.log(result2);

    ChallengeName = result2.ChallengeName;
    Session = result2.Session;
  }
}

main();
