const fs = require(`fs`).promises
const path = require(`path`)

const input_file = path.join(process.cwd(), process.argv[2])

async function directory_exists(directory) {
    return fs.stat(directory)
        .then(resp => resp.isDirectory())
        .catch(err => false)
}

async function relationship_json_to_vault(relationship_file) {
    const file_name = path.basename(relationship_file, `.json`)
    const relationship_data = require(relationship_file)
    const vault_directory = `${process.cwd()}\\${file_name}\\`
    
    if (!await directory_exists(vault_directory)) {
        await fs.mkdir(vault_directory)
    }
    
    for (const { relationship, mutuals } of relationship_data) {
        const relationship_name = relationship.user.username
        const relationship_type = ["Friend", "Blocked", "???", "Pending"][relationship.type - 1]

        await fs.writeFile(vault_directory + `\\${relationship_name}.md`, `[TYPE=${relationship_type}]\n`)

        for (const mutual of mutuals) {
            const mutual_name = mutual.username

            await fs.appendFile(vault_directory + `\\${relationship_name}.md`, `[[${mutual_name}]]\n`)
        }
    }

    return vault_directory
}

relationship_json_to_vault(input_file)
    .then(vault_directory => console.log(`created vault directory: ${vault_directory}`))