import { passthrough } from 'msw'
 
export function withSearchParams(predicate, resolver) {
  return (args) => {
    const { request } = args
    const url = new URL(request.url)
 
    if (!predicate(url.searchParams)) {
      return passthrough()
    }
 
    return resolver(args)
  }
}