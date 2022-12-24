Features 
    Signup
    Login/Logout
    Post a status update
    Follow other users
    View a feed of the status updates of the users you are following


Tech Stack
    Backend API - Nodejs express 
    Front end - Angular


Schema design 

User : { 
    id,
    name,
    alias,
    password,
    email,
    created_at,
    lastActivityAt,
    thumbImage
}

PostSchema : { 
    id,
    created_at,
    content,
    author,
    authorAlias
}

RelationshipSchema : {
    from,
    to,
    started_at
}