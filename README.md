# Updaty Mobile App

## Development environment

- node 18 or higher
- yarn
- expo account
  - You will need to have an [expo eas account](https://expo.dev/eas) (free) to create a development build to install in your local iOS simulator (Steps bellow) and to create the build for Apple.

### Creating prod and dev builds

In the root folder find the file eas.json and you will find 3 different builds profiles

- developement - To run on physical devices as development
- development-simulator - To run on simulator as development
- production - To build a production ready build

You will also find a submit > production profile. In here you will need to replace the credentials as needed to match your Apple credentials.

#### Creating simulator build

`$ eas login`
`$ eas build --profile development-simulator --platform ios`

- It will ask you to login with your apple developer account to connect with your account and it will ask to create a provisional credential, these are so that eas expo can connect with Apple.
- After the build is done it will ask you if you want to install it on your simulator you can say yes if you have a simulator open , or click the link provided in the terminal that will download the build (recommended)
- unzip it
- drag and drop to your simulator
- optional - if you want to test in different simulators you need to install the build on each of the simulators

` $ npx expo start`
` $ i`

- This will open the last used simulator, install expo go and you will have a hot reload environment where you can now edit the code and see the changes in real time.

[Official Documentation](https://docs.expo.dev/develop/development-builds/create-a-build#create-a-development-build-for-emulatorsimulator)

#### Creating physical device build development

To create a development build for to test on a physical device there are a few extra steps that have to be done in your physical device to accept the build.
Please follow this instruction [Official Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-development-build-for-the-device)

`$ eas build --profile development --platform ios`

- It will ask you to login with your apple developer account to connect with your account and it will ask to create a provisional credential, these are so that eas expo can connect with Apple.
- Once the build is done and you have followed the instruction above to create the profile in your device, you can scan the QR code in the terminal and it will install the build in your physical device where you can now also have hot reload development environment.

#### Creating a build for production

Before creating a build for production you have to increase the build number. You can find it in:

> ios > Updaty > Info.plist

```
<key>CFBundleVersion</key>
<string>120023</string>
```

Increase the number to match the next build.
Then run:
`$ eas build --platform ios`

- After the build is done it will give you a download link in the terminal, click and download the build.
- Please download the [Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) app on to your mac, sign in with your apple account.
- Drag and drop the new downloaded build into the Transporter app.
- It will verify if it a legit build and then you can press deliver, which will push the app build file into your account.
- NOTE - Make sure the credentials in the eas.json file right at the bottom of the file are correct as they are the credentials they use to authenticate.

#### Every new change to the app

For every change you make to the app you will need to repeat the **Creating a build for production** step. Super easy.
