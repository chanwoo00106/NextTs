import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { config } from './api/auth/[...nextauth]/options'

export default async function Home() {
  const data = await getServerSession(config)

  console.log(data)

  return (
    <main>
      <h1>Hello {data?.user?.name}</h1>
      {data?.user?.role && <p>your role is {data.user.role}</p>}
      {data?.user?.image && (
        <Image
          src={data?.user?.image}
          alt='profile image'
          width={200}
          height={200}
        />
      )}
    </main>
  )
}
