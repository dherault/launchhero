import Logo from '~components/common/logos/Logo'

function LogoType() {
  return (
    <div className="flex items-center gap-2 select-none">
      <Logo />
      <div className="text-2xl font-bold text-primary leading-none">
        Submit Hero
      </div>
    </div>
  )
}

export default LogoType
