import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()
  
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }, [])

  return (
    <div className='not-found'>
        <h1>404</h1>
        <h2>¡Ooops! Esta página no ha sido encontrada</h2>
        <p>Regresa a la página de <Link href={'/'}><a>inicio</a></Link> para más recetas</p>

        <style jxs>{`
          .not-found {
            padding: 30px;
          }
          h1 {
            font-size: 3em;
          }
        `}</style>
    </div>
  )
}
