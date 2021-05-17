const db = require("./connection");
const User = require("../Models/userModel")
const bcrypt = require("bcryptjs")

const users = [
    {
        
        name: "Ad Min",
        email: "admin@admin.com",
        password:"admin",
        role:"admin"
        
    },
    {
        name: "Wor Ker",
        email: "worker@worker.com",
        password:"worker",
        role:"worker"
        
    },
    {
        name: "Cli Ent",
        email: "client@client.com",
        password:"client",
        role:"client"
        
    }
]

async function userSeed() {
    for(let user of users) {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        })
    }
}

userSeed()