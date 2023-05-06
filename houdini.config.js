/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "http://localhost:4000"
    },
    "plugins": {
        "houdini-svelte": {}
    },
    "scalars": {
        ID: {
            type: "number",
            unmarshal(value) {
                return value ? parseInt(value) : null
            },
            marshal(value) {
                return value ? value.toString() : null
            }
        }
    }
}

export default config
