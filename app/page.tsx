"use client";
import Image from "next/image";
import Wrapper from "./components/Wrapper";
import { useState } from "react";
import { FolderGit2 } from "lucide-react";
import { createProject } from "./actions";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const {user} = useUser()
  const email = user?.primaryEmailAddress?.emailAddress as string
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement
      const project = await createProject(name, description, email)
      if (modal) {
        modal.close()
      }
      setName("")
      setDescription("") 
    } catch (error) {
      console.error('Error creating project', error)
    }
  }

  

  return (
    <Wrapper>
      <div>

        <button className="btn" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>open modal</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Nouveau projet</h3>
            <p className="py-4">Décrivez votre projet</p>
            <div>
              <input
                placeholder="Nom du projet"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-base-300 input  input-bordered w-full mb-4 placeholder:text-sm"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 textarea textarea-bordered border border-base-300 w-full  textarea-md placeholder::text-sm"
                required
              >
              </textarea>
              <button className="btn btn-primary">
                Nouveau Projet <FolderGit2 />
              </button>
            </div>
          </div>
        </dialog>

      </div>
    </Wrapper>
  );
}
