import { Project } from '@/type'
import { Copy, ExternalLink, FolderGit2, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'

interface ProjectProps {
    project: Project
    admin: number
    style: boolean
}
const ProjectComponent: FC<ProjectProps> = ({ project, admin, style }) => {

    const totalTasks = project.tasks?.length
    const tasksByStatuts = project.tasks?.reduce((acc, task) => {
        if (task.status === "A Faire") acc.toDo++
        else if (task.status === "En cours") acc.inProgess++
        else if (task.status === "Terminée") acc.done++
        return acc
    },
        {
            toDo: 0,
            inProgess: 0, done: 0

        }) ?? {
        toDo: 0,
        inProgess: 0,
        done: 0
    }
    const progressPercentage = totalTasks ? Math.round((tasksByStatuts.done / totalTasks) * 100) : 0

    const inProgressPercentage = totalTasks ? Math.round((tasksByStatuts.inProgess / totalTasks) * 100) : 0

    const toDoPercentage = totalTasks ? Math.round((tasksByStatuts.toDo / totalTasks) * 100) : 0

    const textSizeClass = style ? 'text-sm' : 'text-md'


    return (
        <div key={project.id} className={`${style ? 'border border-base-300 p-5 shadow-sm' : ''} text-base-content rounded-xl w-full text-left`}>
            <div className="w-full flex items-center mb-3">
                <div className="bg-primary-content text-xl h-10 w-10 rounded-lg flex justify-center items-center">
                    <FolderGit2 className='w-6 text-primary' />
                </div>
                <div className="badge ml-3 font-bold">
                    {project.name}
                </div>
            </div>

            {style == false && (
                <p className='text-sm text-gray-500 border border-base-200 p-5 mb-6 rounded-xl'>
                    {project.description}
                </p>
            )}


            <div className={`mb-3`}>
                <span>Collaborateurs</span>
                <div className="badge badge-sm badge-ghost ml-1">
                    {project.users?.length}
                </div>
            </div>
            {admin === 1 && (
                <div className="flex justify-between items-center rounded-lg p-2 border border-base-300 mb-3 bg-base-200">
                    <p className='text-primary font-bold ml-3'>
                        {project.inviteCode}
                    </p>
                    <button className='btn btn-sm ml-2'>
                        <Copy className="w-4" />
                    </button>
                </div>
            )}
            <div className="flex flex-col mb-3">
                <h2 className={`text-gray-500 mb-2`}>
                    <span className="font-bold">A faire</span>
                    <div className="badge badge-ghost badge-sm ml-1">
                        {tasksByStatuts.toDo}
                    </div>
                </h2>
                <progress className="progress progress-success w-full" value={toDoPercentage} max="100"></progress>
                <div className="flex">
                    <span className={`text-gray-400 mt-2`}>
                        {toDoPercentage}%
                    </span>
                </div>
            </div>
            <div className="flex flex-col mb-3">
                <h2 className={`text-gray-500 mb-2`}>
                    <span className="font-bold">En cours</span>
                    <div className="badge badge-ghost badge-sm ml-1">
                        {tasksByStatuts.inProgess}
                    </div>
                </h2>
                <progress className="progress progress-success w-full" value={inProgressPercentage} max="100"></progress>
                <div className="flex">
                    <span className={`text-gray-400 mt-2`}>
                        {inProgressPercentage}%
                    </span>
                </div>
            </div>
            <div className="flex flex-col mb-3">
                <h2 className={`text-gray-500 mb-2`}>
                    <span className="font-bold">Terminée(s)</span>
                    <div className="badge badge-ghost badge-sm ml-1">
                        {tasksByStatuts.done}
                    </div>
                </h2>
                <progress className="progress progress-success w-full" value={progressPercentage} max="100"></progress>
                <div className="flex">
                    <span className={`text-gray-400 mt-2`}>
                        {progressPercentage}%
                    </span>
                </div>
            </div>

            <div className="flex">
                {style && (
                    <Link className='btn btn-primary btn-sm' href={`/project/${project.id}`} >
                        <div className="badge badge-sm">
                            {totalTasks}
                        </div>
                        Tâche
                        <ExternalLink className="w-4 ml-1" />
                    </Link>
                )}
                {admin === 1 && (
                    <button className="btn btn-sm ml-3">
                        <Trash className="w-4" />
                    </button>
                )}
            </div>

        </div>
    )
}

export default ProjectComponent