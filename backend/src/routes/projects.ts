import { Router } from 'express'
import { MAX_PROJECT_NAME_LENGTH, type User } from 'launchhero-core'
import {
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_PROJECT_INVITATION_NOT_FOUND,
  ERROR_CODE_PROJECT_NOT_FOUND,
  ERROR_CODE_USER_NOT_PROJECT_ADMIN,
  ERROR_CODE_USER_NOT_PROJECT_MEMBER,
  MAX_PROJECT_INVITES,
  type Project,
  type ProjectInvitation,
} from 'launchhero-core'
import directories from 'launchhero-directories'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import z from 'zod'

import type { ApiResponsePayload } from '~types'

import { ADMIN_EMAIL, EMAIL_FROM, IS_PRODUCTION } from '~constants'

import validate from '~middleware/validate'

import createProject from '~database/createProject'
import createProjectInvitation from '~database/createProjectInvitation'
import readProject from '~database/readProject'
import readProjectInvitation from '~database/readProjectInvitation'
import readProjectInvitations from '~database/readProjectInvitations'
import readUsersById from '~database/readUsersById'
import updateProject from '~database/updateProject'
import updateProjectInvitation from '~database/updateProjectInvitation'

import getResendClient from '~domain/emails/getResendClient'

function createProjectsRoutes() {
  const router = Router()

  /* ---
    CREATE
  --- */

  const createProjectSchema = z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(MAX_PROJECT_NAME_LENGTH, `Name must be at most ${MAX_PROJECT_NAME_LENGTH} characters`)
      .trim(),
  })

  router.post<any, ApiResponsePayload<Project>>(
    '/',
    validate({ body: createProjectSchema }),
    async (request, response) => {
      const name: string = request.body.name

      const baseId = slugify(name).toLowerCase()
      const now = new Date().toISOString()
      const project: Project = {
        id: baseId,
        name,
        imageUrl: null,
        isPublic: true,
        contents: [{ type: 'name', value: name }],
        hasSelectedDirectories: false,
        selectedDirectoryIds: directories.map(directory => directory.id),
        stripeId: null,
        stripeLink: null,
        administratorUserIds: [request.user.id],
        memberUserIds: [request.user.id],
        userId: request.user.id,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      }

      let existingProject = await readProject(project.id)
      let cursor = 1

      while (existingProject) {
        project.id = `${baseId}-${cursor}`
        existingProject = await readProject(project.id)
        cursor++

        if (cursor > 16) {
          project.id = `${baseId}-${nanoid()}`
          break
        }
      }

      await createProject(project)

      sendNewProjectEmailToAdministrator(project, request.user)

      response.status(201).json({
        status: 'success',
        data: project,
      })
    },
  )

  async function sendNewProjectEmailToAdministrator(project: Project, user: User) {
    if (!IS_PRODUCTION) return

    const resend = await getResendClient()

    resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: 'New Launch Hero project created',
      text: `Project ${project.name} has been created by ${user.email}.`,
    })
  }

  /* ---
    READ USERS
  --- */

  router.get<{ projectId: string }, ApiResponsePayload<User[]>>(
    '/:projectId/users',
    async (request, response) => {
      const projectId = request.params.projectId

      const project = await readProject(projectId)

      if (!project) {
        response.status(404).json({
          status: 'error',
          code: ERROR_CODE_PROJECT_NOT_FOUND,
          message: 'Project not found',
        })

        return
      }

      if (!project.memberUserIds.includes(request.user.id)) {
        response.status(403).json({
          status: 'error',
          code: ERROR_CODE_USER_NOT_PROJECT_MEMBER,
          message: 'User is not a member of this project',
        })

        return
      }

      const users = await readUsersById(project.memberUserIds)

      response.status(200).json({
        status: 'success',
        data: users,
      })
    },
  )

  /* ---
    INVITE USERS
  --- */

  const inviteSchema = z.object({
    emails: z.array(z.email()).max(MAX_PROJECT_INVITES),
  })

  router.post<{ projectId: string }, ApiResponsePayload>(
    '/:projectId/invite',
    validate({ body: inviteSchema }),
    async (request, response) => {
      const projectId = request.params.projectId

      const project = await readProject(projectId)

      if (!project) {
        response.status(404).json({
          status: 'error',
          code: ERROR_CODE_PROJECT_NOT_FOUND,
          message: 'Project not found',
        })

        return
      }

      if (!project.administratorUserIds.includes(request.user.id)) {
        response.status(403).json({
          status: 'error',
          code: ERROR_CODE_USER_NOT_PROJECT_ADMIN,
          message: 'User is not an administrator of this project',
        })

        return
      }

      const existingProjectInvitations = await readProjectInvitations(project.id)

      if (existingProjectInvitations.length + request.body.emails.length > MAX_PROJECT_INVITES) {
        response.status(400).json({
          status: 'error',
          code: ERROR_CODE_FORBIDDEN,
          message: `You can invite up to ${MAX_PROJECT_INVITES} users at a time.`,
        })

        return
      }

      const { user } = request

      for (const email of request.body.emails) {
        const existingEmailProjectInvitations = existingProjectInvitations.filter(invitation => invitation.email === email)

        if (existingEmailProjectInvitations.length) continue

        console.log(`🏢 Inviting ${email} to ${project.id}`)

        const now = new Date().toISOString()
        const projectInvitation: ProjectInvitation = {
          id: nanoid(),
          email,
          projectId: project.id,
          projectName: project.name,
          projectImageUrl: project.imageUrl,
          inviterName: user.name || user.email,
          userId: user.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        }

        await createProjectInvitation(projectInvitation)

        if (IS_PRODUCTION) {
        // const resend = await getResendClient()
        // const { subject, text, html } = await getEmailContent('invite', { user, project })

          // console.log('💌 Sending invite email to', email)

        // resend.emails.send({
        //   from: EMAIL_FROM,
        //   to: email,
        //   subject,
        //   html,
        //   text,
        // })
        }
      }

      response.status(201).json({
        status: 'success',
      })
    },
  )

  /* ---
    ACCEPT INVITATION
  --- */

  const acceptInvitationSchema = z.object({
    projectInvitationId: z.string().min(1),
    accepted: z.boolean(),
  })

  router.post<any, ApiResponsePayload>(
    '/accept-invitation',
    validate({ body: acceptInvitationSchema }),
    async (request, response) => {
      const projectInvitation = await readProjectInvitation(request.body.projectInvitationId)

      if (!projectInvitation || projectInvitation.deletedAt) {
        response.status(404).json({
          status: 'error',
          code: ERROR_CODE_PROJECT_INVITATION_NOT_FOUND,
          message: 'Project invitation not found',
        })

        return
      }

      if (projectInvitation.email !== request.user.email) {
        response.status(403).json({
          status: 'error',
          code: ERROR_CODE_FORBIDDEN,
          message: 'User is not invited',
        })

        return
      }

      if (request.body.accepted) {
        const project = await readProject(projectInvitation.projectId)

        if (!project) {
          response.status(404).json({
            status: 'error',
            code: ERROR_CODE_PROJECT_NOT_FOUND,
            message: 'Project not found',
          })

          return
        }

        await updateProject(project.id, {
          memberUserIds: [...project.memberUserIds, request.user.id],
        })
      }

      await updateProjectInvitation(projectInvitation.id, {
        deletedAt: new Date().toISOString(),
      })

      response.status(200).json({
        status: 'success',
      })
    },
  )

  return router
}

export default createProjectsRoutes
