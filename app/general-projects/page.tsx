"use client"
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SquarePlus } from 'lucide-react'
import { stringify } from 'querystring'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import { addUserToProject } from '../actions'

const page = () => {
    const [inviteCode, setInviteCode] = useState("")
    const {user} = useUser()
const email = user?.primaryEmailAddress?.emailAddress as string

const handleSubmit = async () => {
    try {
        if (inviteCode != "") {
            await addUserToProject(email , inviteCode)
            toast.success("Vous pouvez maintenant collaboré sur le projet")
        } else {
            toast.error("Il manque le code du projet")
        }
    } catch (error) {
        toast.error("Code de validation ou vous appartenez déjà au projet")
    }
}

  return (
    <Wrapper>
        <div className="flex">
            <div className="mb-4">
                <input type="text" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Code d'invitation" className="w-ful p-2 input input-bordered" />
            </div>
        </div>
        <button className="btn btn-primary ml-4" onClick={handleSubmit}>
            Rejoindre <SquarePlus className='w-4' />
        </button>
    </Wrapper>
  )
}

export default page