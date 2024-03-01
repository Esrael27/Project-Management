
import ProjectForm from '@/components/projects/ProjectForm'
import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="projects/createProjects">Add Projects</Link>
    </div>
  )
}

export default page