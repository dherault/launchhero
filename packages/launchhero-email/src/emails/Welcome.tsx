import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { APP_URL, type Project } from 'launchhero-core'
import directories from 'launchhero-directories'
import { Check } from 'lucide-react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { previewProject } from '../previewData'
import tailwindConfig from '../tailwindConfig'

type Props = {
  project: Project
}

const REF = 'email-welcome'

function Welcome({ project }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        {`You're about to submit your startup to ${directories.length} directories!`}
      </Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="font-sans text-base">
          <Container>
            <Header>
              Welcome to Launch Hero
            </Header>
            <Section className="mt-8">
              <Text className="my-0 text-base">
                We are thrilled to have you on board!
              </Text>
              <Text className="my-0 text-base">
                You're about to submit your product to
                {' '}
                {directories.length}
                {' '}
                directories.
              </Text>
              <Text className="my-0 text-base">
                You can submit your product manually or ask our team to do it for you.
              </Text>
              <Row className="mt-8">
                <Column>
                  <Link href={`${APP_URL}/-/projects/${project.id}?ref=${REF}`}>
                    {project.imageUrl && (
                      <Img
                        src={project.imageUrl}
                        alt={project.name}
                        width="100%"
                        className="mx-auto w-16 rounded-xs"
                      />
                    )}
                    {!project.imageUrl && (
                      <div className="mx-auto h-16 w-16 rounded-xs bg-neutral-50 border border-neutral-200">
                        <Row className="h-full">
                          <Column>
                            <Text className="my-0 text-lg font-semibold text-center text-black">
                              {project.name.split(' ').map(word => word[0]).slice(0, 2).join('')}
                            </Text>
                          </Column>
                        </Row>
                      </div>
                    )}
                    <Text className="mt-2 mb-0 mx-auto text-xl font-semibold text-black text-center">
                      {project.name}
                    </Text>
                  </Link>
                </Column>
              </Row>
              <Row className="mt-5">
                <Column>
                  <Text className="my-0 text-base font-semibold text-center text-primary">
                    What to expect next?
                  </Text>
                  <Text className="mt-2 mb-0 text-base text-center">
                    <Check className="-mb-0.5 mr-2 h-4 w-4" />
                    You will attract your first users.
                  </Text>
                  <Text className="mt-0.5 mb-0 text-base text-center">
                    <Check className="-mb-0.5 mr-2 h-4 w-4" />
                    Your domain authority will increase.
                  </Text>
                  <Text className="mt-0.5 mb-0 text-base text-center">
                    <Check className="-mb-0.5 mr-2 h-4 w-4" />
                    You will get backlinks to your website.
                  </Text>
                </Column>
              </Row>
              <Text className="mt-8 mb-0 text-base">
                If you have any questions, just reply to this email.
              </Text>
              <Text className="my-0 text-base">
                Feedback is also greatly appreciated!
              </Text>
            </Section>
            <Footer ref={REF} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

Welcome.PreviewProps = {
  project: previewProject,
}

export default Welcome
