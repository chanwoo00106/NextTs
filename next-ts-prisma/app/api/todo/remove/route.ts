import { NextResponse } from 'next/server'

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url)
    if (url.searchParams.has('id')) return

    const id = url.searchParams.get('id') || ''

    await prisma?.todo.delete({ where: { id } })

    return NextResponse.json({ msg: 'Success', status: 200 })
  } catch (e) {
    return NextResponse.json({ msg: 'Failure', status: 400 })
  }
}
