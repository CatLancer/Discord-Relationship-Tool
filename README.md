# Discord-Relationship-Tool
Download your discord relationships and generate an obsidian vault using mutual connections. 

Usernames have been hidden for confidentality and privacy.

<img src = 'https://user-images.githubusercontent.com/96950281/161457462-bfafd1a6-2e8f-4822-894f-af0daca54662.png' width = '400'>

## Is this safe? 

Any automated API calls to discord is unsafe. I have not experienced any issues myself after using the tool multiple times. If you do happen to get locked out of your discord account, it will likely be due to their automatic spam detection in which case you can phone verify possibly or contact support to unlock the account. 

## Usage
Files will be saved to the current working directory (the directory the terminal instance is in).

```console
$ node collect.js "discord_token"
$ node obsidian.js "file_name.json
```

The `collect` script will created a `.json` file named with the current EPOCH time as the name. You can pass the directory to this file to `obsidian` to create an obsidian vault of the same name in the same directory. 

Your results may looking something like this: 

```console
$ node .\src\collect.js "mfa.TH!s1sAfAkET0K3N$0D0NT_TrY@nYThiNG!Y0U$ILLyG0o$S3"
saved results to 1649030165271.json
$ node .\src\obsidian.js "./1649030165271.json"
created vault directory: \1649030165271\
```

## Discord Token?
Before we start, **dont share this token with ANYONE. They can use it to log into your account without knowing your password and bypass 2fa. Never input your token into a program you don't trust. If you don't trust this tool you're free to read the source code. Its fairly short.**

You can find your discord token by open inspect element and looking for a request to discord.com. There will be an `Authorization` header which you can use. If you have 2FA on your account will start with "mfa." otherwise the first so many characters represent your discord snowflake id in base64. 



## Obsidian? 

Obsidian is a note taking tool. The purpose of this tool is to generate notes on relationship data between people that can be manually manipulated fairly easy and sorted simply. The graph visualization tool in obsidian used a force-directed approach. 

https://obsidian.md/
