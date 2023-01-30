
const postMappings = {
    mappings: {
        buzzes: {
            properties: {
                _id: {
                    type: "string"
                },
                created_at: {
                    type: "date"
                },
                content: {
                    type: "text"
                },
                authorId: {
                    type: "text"
                },
                edited: {
                    type: "boolean"
                },
                tags: {
                    type: "tags"
                }
            }
        }
    }
}

export default postMappings;