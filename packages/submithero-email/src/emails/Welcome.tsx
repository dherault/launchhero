import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { APP_URL, type Project } from 'submithero-core'

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
        You're about to submit your startup to 50+ directories!
      </Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="font-sans text-base">
          <Container>
            <Header>
              Welcome to Submit Hero
            </Header>
            <Section className="mt-8">
              <Text className="my-0 text-base">
                You're about to submit your startup to 50+ directories.
              </Text>
              <Text className="my-0 text-base">
                Come back tomorrow to continue your journey.
              </Text>
              <Row className="mt-8">
                <Column>
                  <Link
                    href={`${APP_URL}/-/projects/${project.id}?ref=${REF}`}
                    className="w-full"
                  >
                    {/* {project.imageUrl && (
                      <Img
                        src={project.imageUrl}
                        alt={project.name}
                        width="100%"
                        className="mx-auto w-16 rounded-full"
                      />
                    )}
                    {!project.imageUrl && (
                      <div className="mx-auto h-16 w-16 rounded-full bg-neutral-200">
                        <Row className="h-full">
                          <Column>
                            <Text className="my-0 text-lg font-semibold text-center text-black">
                              {project.name[0]}
                            </Text>
                          </Column>
                        </Row>
                      </div>
                    )} */}
                    <Text className="mt-2 mb-0 mx-auto text-xl font-semibold text-black text-center">
                      {project.name}
                    </Text>
                  </Link>
                </Column>
              </Row>
              <Text className="mt-8 mb-0 text-base">
                Feedback is greatly appreciated! Share your thoughts on X.
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
