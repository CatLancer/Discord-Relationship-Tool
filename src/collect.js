const fs = require(`fs`).promises // safer than fs/promises incase of old node version 
const https = require(`${__dirname}\\modules\\https.js`)

const RELATIONSHIP_API = `https://discord.com/api/v8/users/{USER_ID}/relationships`
const RELATIONSHIP_CALL_TIMEOUT = 2000 // avoid 429 and api spam detection...?!

const token = process.argv[2]

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function get_user_relationships(user_token, user_id) {
    const response = await https.get(RELATIONSHIP_API.replace(`{USER_ID}`, user_id), {
        headers: {
            "Authorization": user_token,
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.37 Chrome/91.0.4472.106 Electron/13.1.4 Safari/537.36`,
            "X-Super-Properties": Buffer.from(JSON.stringify({
                "os": `Windows`,
                "browser": `Discord Client`,
                "release_channel": `canary`,
                "client_version": `1.0.45`,
                "os_version": `10.0.19041`,
                "os_arch": `x64`,
                "system_locale": `en-US`,
                "client_build_number": 122133,
                "client_event_source": null
            })).toString(`base64`)
        }
    })

    if (response.status == 200) {
        const relationships = JSON.parse(response.body)

        return relationships
    } else {
        console.log(`Critical Error: `, response)
        return []
    }
}

;(async function() {
    const relationships = await get_user_relationships(token, `@me`)
    const relationship_mappings = []

    let i = 0
    for (const relationship of relationships) {
        const mutuals = await get_user_relationships(token, relationship.id)
        relationship_mappings.push({ relationship, mutuals })

        process.title = `${i++} / ${relationships.length}`

        await sleep(RELATIONSHIP_CALL_TIMEOUT)
    }

    const output_file = `${process.cwd()}\\${Date.now()}.json`
    const output_data = JSON.stringify(relationship_mappings, null, `\t`)

    fs.writeFile(output_file, output_data)
        .then(() => console.log(`saved results to ${output_file}`))
})()