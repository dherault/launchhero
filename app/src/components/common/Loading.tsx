import SpinnerLogo from '~components/common/SpinnerLogo'

type Props = {
  source: string
}

function Loading({ source }: Props) {
  return (
    <div
      role="status"
      className="grow flex flex-col items-center justify-center"
    >
      <SpinnerLogo />
      {import.meta.env.DEV && (
        <div className="mt-4 text-xs">
          {source}
        </div>
      )}
    </div>
  )
}

export default Loading
