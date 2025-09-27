import DirectoriesTable from '~components/directory/DirectoriesTable'

function LandingHero() {
  return (
    <section className="relative mt-8 mx-auto md:pt-8 px-4 w-full max-w-4xl">
      <div className="text-center">
        A tool to help founders track their startup submission to directories such as Product Hunt or BetaList.

      </div>
      <div className="mt-8">
        <DirectoriesTable />
      </div>
    </section>
  )
}

export default LandingHero
