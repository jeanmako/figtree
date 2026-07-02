import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs"

export function useServiceParams() {
  const [params, setParams] = useQueryStates({
    serviceId: parseAsString,
    createService: parseAsBoolean,
    name: parseAsString,
    q: parseAsString,
    details: parseAsBoolean,
  })

  return {
    ...params,
    setParams,
  }
}
