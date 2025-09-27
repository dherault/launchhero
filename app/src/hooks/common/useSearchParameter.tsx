import { useSearchParams } from 'react-router'

type Parser<T> = {
  parse: (value: string | null) => T
  serialize: (value: T) => string
}

const stringParser: Parser<string> = {
  parse: value => value ?? '',
  serialize: value => value,
}

const numberParser: Parser<number> = {
  parse: value => value ? Number(value) : 0,
  serialize: value => value.toString(),
}

const booleanParser: Parser<boolean> = {
  parse: value => value === '1',
  serialize: value => value ? '1' : '0',
}

const parsers = {
  string: stringParser,
  number: numberParser,
  boolean: booleanParser,
}

function useSearchParameter<T>(key: string, defaultValue: T) {
  const [searchParameters, setSearchParameters] = useSearchParams()

  const type = typeof defaultValue
  const parser = parsers[type as keyof typeof parsers] as any as Parser<T>

  if (!parser) throw new Error(`Unsupported type: ${type}`)

  const value = parser.parse(searchParameters.get(key)) ?? defaultValue

  const setValue = (value: T) => {
    setSearchParameters(previous => {
      const next = new URLSearchParams(previous)

      if (value === defaultValue) next.delete(key)
      else next.set(key, parser.serialize(value))

      return next
    })
  }

  return [value, setValue] as const
}

export default useSearchParameter
