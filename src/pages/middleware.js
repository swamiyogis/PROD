import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  response.headers.set('x-robots-tag', 'index, follow')
  return response
}
