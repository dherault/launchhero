import { collection, doc, query, setDoc, updateDoc, where, type UpdateData } from 'firebase/firestore'
import type { Submission } from 'launchhero-core'
import { nanoid } from 'nanoid'
import { type PropsWithChildren, useCallback, useMemo } from 'react'

import { NULL_DOCUMENT_ID } from '~constants'

import { database } from '~firebase'

import SubmissionsContext, { type SubmissionsContextType } from '~contexts/data/SubmissionsContext'

import useProject from '~hooks/data/useProject'
import useUser from '~hooks/data/useUser'
import useLiveDocuments from '~hooks/db/useLiveDocuments'
import { useToast } from '~hooks/ui/useToast'

import ErrorOccured from '~components/common/ErrorOccured'

function SubmissionsProvider({ children }: PropsWithChildren) {
  const { user } = useUser()
  const project = useProject()
  const { toast } = useToast()

  const q = useMemo(() => query(
    collection(database, 'projects', project?.id ?? NULL_DOCUMENT_ID, 'submissions'),
    where('deletedAt', '==', null),
  ), [
    project?.id,
  ])
  const { data: submissions, loading, error } = useLiveDocuments<Submission>(q, !!project)

  const createSubmission = useCallback(async (directoryId: string, url: string | null) => {
    if (!user?.id) return
    if (!project?.id) return

    try {
      const now = new Date().toISOString()
      const submission: Submission = {
        id: nanoid(),
        directoryId,
        url,
        userId: user.id,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      }

      await setDoc(doc(database, 'projects', project.id, 'submissions', submission.id), submission)

      return submission
    }
    catch (error: any) {
      console.error('Error creating Submission:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to create submission',
        description: 'Contact support if the error persists',
      })
    }
  }, [
    user?.id,
    project?.id,
    toast,
  ])

  const updateSubmission = useCallback(async (submissionId: string, data: UpdateData<Submission>) => {
    const submission = submissions.find(submission => submission.id === submissionId)

    if (!submission) return

    try {
      await updateDoc(doc(database, 'submissions', submissionId), {
        ...data,
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: '🎉 Submission updated',
      })
    }
    catch (error: any) {
      console.error('Error updating Submission:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to update submission',
        description: 'Contact support if the error persists',
      })
    }
  }, [
    submissions,
    toast,
  ])

  const deleteSubmission = useCallback(async (submissionId: string) => {
    const submission = submissions.find(submission => submission.id === submissionId)

    if (!submission) return

    try {
      const now = new Date().toISOString()

      await updateDoc(doc(database, 'submissions', submissionId), {
        deletedAt: now,
        updatedAt: now,
      })

      toast({
        title: 'Submission deleted',
      })
    }
    catch (error: any) {
      console.error('Error deleting Submission:', error)

      toast({
        variant: 'destructive',
        title: 'Failed to delete submission',
        description: 'Contact support if the error persists',
      })
    }
  }, [
    submissions,
    toast,
  ])

  const projectsContextValue = useMemo<SubmissionsContextType>(() => ({
    submissions,
    loading,
    createSubmission,
    updateSubmission,
    deleteSubmission,
  }), [
    submissions,
    loading,
    createSubmission,
    updateSubmission,
    deleteSubmission,
  ])

  if (error) {
    return (
      <ErrorOccured
        source="SubmissionsProvider"
        message={error.message}
      />
    )
  }

  return (
    <SubmissionsContext.Provider value={projectsContextValue}>
      {children}
    </SubmissionsContext.Provider>
  )
}

export default SubmissionsProvider
