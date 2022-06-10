# Discord-Relationship-Tool
Download your discord relationships and prepare a gephi workspace dataset or generate an obsidian vault using mutual connections. 


## Is this safe? 

Any automated API calls to discord are unsafe. I have not experienced any issues myself after using the tool multiple times, but I am putting this disclaimer here so you understand the potential consequences. Discord likely will not be able to tell you're using this program versus simply viewing your friend's profiles.

If you do happen to get locked out of your discord account, it will likely be due to their automatic spam detection in which case you can phone verify possibly or contact support to unlock the account. To iterate once more: *Any automated API calls to discord are unsafe.*

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

## Gephi? 

This is the preferred method of graph generation. Gephi is a powerful Open Source graph-viz tool. This tool is very powerful and can do much more than just visualize the data. You can install plugins and tools for shortest path between nodes, doing community checks, and many more. 

You can use "import spreadsheet" to import the output `.csv` file as an adjaceny list into your network. Then you can use Force-Atlas or some other layout function to oragnize the data to your liking. Make sure the "edge merge strategy" is set to "Sum" and "Graph Type" is set to "Undirected". If you cant see these options when progressing through the import settings, try clicking a blue "More options..." text.

<img src = 'https://user-images.githubusercontent.com/96950281/173152456-e2a202e0-0973-4e6a-a825-9d9dfed13019.png' width = '400'>
<sub>Usernames have been hidden for confidentality and privacy.</sub>

https://gephi.org/

## Obsidian? 

Obsidian is a note taking tool which you can write notes with and organize. Very neat note taking tool that should not be overlooked. The graph visualization tool in obsidian used a force-directed approach. 


<img src = 'https://user-images.githubusercontent.com/96950281/161457462-bfafd1a6-2e8f-4822-894f-af0daca54662.png' width = '400'>
<sub>Usernames have been hidden for confidentality and privacy.</sub>

https://obsidian.md/
