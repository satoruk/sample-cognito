import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  RespondToAuthChallengeCommand,
  InitiateAuthCommand,
  VerifySoftwareTokenCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import { readText } from "./lib";
import { ClientId, Username, Password } from "./settings.json"; 

async function main() {
  const config = {};
  const client = new CognitoIdentityProviderClient(config);
  const result = await client.send(new InitiateAuthCommand({
    AuthFlow:"USER_PASSWORD_AUTH",
    ClientId,
    AuthParameters: {
      USERNAME: Username,
      PASSWORD: Password,
    },
  }));
  console.log(result);
  // ChallengeName: 'MFA_SETUP',
  // ChallengeParameters: { MFAS_CAN_SETUP: '["SOFTWARE_TOKEN_MFA"]', USER_ID_FOR_SRP: 'test' },
  // "NEW_PASSWORD_REQUIRED": 初期パスワードの変更
  // "MFA_SETUP": MFAの設定
  // "SOFTWARE_TOKEN_MFA": MFAの確認

  console.log(`ChallengeName === '${result.ChallengeName}'`);
  if (result.ChallengeName === 'MFA_SETUP') {
    const softwareToken = await client.send(new AssociateSoftwareTokenCommand({
      Session: result.Session,
    }));
    console.log(softwareToken);
    console.log(`otpauth://totp/${Username}?secret=${softwareToken.SecretCode}`);
    console.log(`https://totp.danhersam.com/?key=${softwareToken.SecretCode}`)

    process.stdout.write('Input TOTP Code > ')
    const UserCode = await readText();
    console.log(`TOTP Code : '${UserCode}'`)

    const result2 = await client.send(new VerifySoftwareTokenCommand({
      Session: softwareToken.Session,
      UserCode,
    }));
    console.log(result2);

    // TODO: RespondToAuthChallengeCommand
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/RespondToAuthChallengeCommand/
    const result3 = await client.send(new RespondToAuthChallengeCommand({
      ChallengeName: 'MFA_SETUP',
      Session: result2.Session,
      ClientId,
    }));
    console.log(result3);
  }

  if (result.ChallengeName === 'SOFTWARE_TOKEN_MFA') {
    process.stdout.write('Input TOTP Code > ')
    const UserCode = await readText();
    console.log(`TOTP Code : '${UserCode}'`)

    const result2 = await client.send(new RespondToAuthChallengeCommand({
      ChallengeName: 'SOFTWARE_TOKEN_MFA',
      Session: result.Session,
      ClientId,
      ChallengeResponses: {
        USERNAME: Username,
        SOFTWARE_TOKEN_MFA_CODE: UserCode,
      },
    }));
    console.log(result2);
  }
}

main();
