import { Hono } from 'hono'
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; 
// import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const clientId = "3r7acnh58o0ffs7bbulltbnfl5"

const signUp = ({ clientId, username, password, email }: { clientId:string, username:string, password:string, email:string }) => {
  // const config = { region: 'ap-northeast-1' };
  const config = {};
  const client = new CognitoIdentityProviderClient(config);

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return client.send(command);
};


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
