import { Project } from '@/type'
import { Copy, FolderGit2 } from 'lucide-react'
import React, { FC } from 'react'

interface ProjectProps {
    project: Project
    admin: number
}
const ProjectComponent: FC<ProjectProps> = ({ project, admin }) => {

    const totalTasks = project.tasks?.length
    const tasksByStatuts = project.tasks?.reduce((acc, task) => {
        if (task.status === "A Faire") acc.toDo++
        else if (task.status === "En cours") acc.inProgess++
        else if (task.status === "Terminée") acc.done++
        return acc
    }, { toDo: 0, inProgess: 0, done: 0 }) ?? { toDo: 0, inProgess: 0, done: 0 }
    const progressPercentage = totalTasks ? Math.round((tasksByStatuts.done / totalTasks) * 100) : 0
    const inProgressPercentage = totalTasks ? Math.round((tasksByStatuts.inProgess / totalTasks) * 100) : 0
    const toDoPercentage = totalTasks ? Math.round((tasksByStatuts.toDo / totalTasks) * 100) : 0
    return (
        <div key={project.id} className={`border border-base-300 p-5 shadow-sm text-base-content rounded-xl w-full text-left`}>
            <div className="w-full flex items-center mb-3">
                <div className="bg-primary-content text-xl h-10 w-10 rounded-lg flex justify-center items-center">
                    <FolderGit2 className='w-6 text-primary' />
                </div>
                <div className="badge ml-3 font-bold">
                    {project.name}
                </div>
            </div>
            <div className={`mb-3`}>
                <span>Collaborateurs</span>
                <div className="badge badge-sm badge-ghost ml-1">
                    {project.users?.length}
                </div>
            </div>
            {admin === 1 && (
                <div className="flex justify-between items-center rounded-lg p-2 border border-base-300 mb-3 bg-base-200">
                    <p>
                        {project.inviteCode}
                    </p>
                    <button className='btn btn-sm'>
                        <Copy className="w-5" />
                    </button>
                </div>
            )

            }
        </div>
    )
}

export default ProjectComponent