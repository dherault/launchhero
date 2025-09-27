import { collection, doc, orderBy, query, setDoc, updateDoc, where, type UpdateData } from 'firebase/firestore'
import { type PropsWithChildren, useCallback, useMemo } from 'react'
import slugify from 'slugify'

import type { Project } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import { database } from '~firebase'

import ProjectsContext, { type ProjectsContextType } from '~contexts/data/ProjectsContext'

import useUser from '~hooks/data/useUser'
import useLiveDocuments from '~hooks/db/useLiveDocuments'
import { useToast } from '~hooks/ui/useToast'

import ErrorOccured from '~components/common/ErrorOccured'

function ProjectsProvider({ children }: PropsWithChildren) {
  const { user } = useUser()
  const { toast } = useToast()

  const q = useMemo(() => query(
    collection(database, 'projects'),
    where('memberUserIds', 'array-contains', user?.id ?? NULL_DOCUMENT_ID),
    where('deletedAt', '==', null),
    orderBy('createdAt', 'asc'),
  ), [
    user?.id,
  ])
  const { data: projects, loading, error } = useLiveDocuments<Project>(q, !!user)

  const createProject = useCallback(async (name: string) => {
    if (!user?.id) return

    try {
      const now = new Date().toISOString()
      const project: Project = {
        id: slugify(name).toLowerCase(),
        name,
        administratorUserIds: [user.id],
        memberUserIds: [user.id],
        userId: user.id,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      }

      // TODO unique id generation
      await setDoc(doc(database, 'projects', project.id), project)

      return project
    }
    catch (error: any) {
      console.error('Error creating Project:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to create project',
        description: error.message ?? 'An unknown error occurred.',
      })
    }
  }, [
    user?.id,
    toast,
  ])

  const updateProject = useCallback(async (projectId: string, data: UpdateData<Project>) => {
    const project = projects.find(project => project.id === projectId)

    if (!project) return

    try {
      await updateDoc(doc(database, 'projects', projectId), {
        ...data,
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: '🎉 Project updated',
        description: `${project.name} has been successfully updated.`,
      })
    }
    catch (error: any) {
      console.error('Error updating Project:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to update project',
        description: error.message ?? 'An unknown error occurred.',
      })
    }
  }, [
    projects,
    toast,
  ])

  const deleteProject = useCallback(async (projectId: string) => {
    const project = projects.find(project => project.id === projectId)

    if (!project) return

    try {
      const now = new Date().toISOString()

      await updateDoc(doc(database, 'projects', projectId), {
        deletedAt: now,
        updatedAt: now,
      })

      toast({
        title: 'Project deleted',
        description: `${project.name} has been successfully deleted.`,
      })
    }
    catch (error: any) {
      console.error('Error deleting Project:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to delete project',
        description: error.message ?? 'An unknown error occurred.',
      })
    }
  }, [
    projects,
    toast,
  ])

  const projectsContextValue = useMemo<ProjectsContextType>(() => ({
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
  }), [
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
  ])

  if (error) {
    return (
      <ErrorOccured
        source="ProjectsProvider"
        message={error.message}
      />
    )
  }

  return (
    <ProjectsContext.Provider value={projectsContextValue}>
      {children}
    </ProjectsContext.Provider>
  )
}

export default ProjectsProvider
