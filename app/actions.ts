"use server"

import prisma from "@/lib/prisma"
import { error } from "console"
import { randomBytes } from "crypto"

function generateUniqueCode():string {
    return randomBytes(6).toString('hex')
}


export async function checkAndAddUser(email: string, name: string) {
    if (!email) return
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!existingUser && name) {
            await prisma.user.create({
                data: {
                    email,
                    name
                }
            })
            console.error("Erreur lors de la Vérification  de l'utilisateur")
        }else {
            console.error("Utilisateur déjà présent de la base de données")
        }
    } catch (error) {
        console.error("Erreue lors de la vérfication de l'utilisateur : ", error)
    }
}

export async function createProject(name: string, description: string, email: string) {
    if (!name || !description || !email) return
    try {
       const inviteCode = generateUniqueCode()
       const user = await prisma.user.findUnique({
           where: {
               email
            }
        })
        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                inviteCode,
                createdById: user.id
            }})
            return newProject
    } catch (error) {
        console.error(error)
        throw new Error
    }
}