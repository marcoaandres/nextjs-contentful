import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard({recipe}) {
    const { title, slug, cookingTime, thumbnail} = recipe.fields
  return (
    <div className='card'>
        <div className='featured'>
        <Image 
        src={'https:' + thumbnail.fields.file.url} 
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}/> 
        </div>
        <div className='content'>
            <div className='info'>
                <h4>{title}</h4>
                <p>Tiempo aproximado { cookingTime } min.</p>
            </div>
            <div className='actions'>
                <Link href={'/recipes/' + slug}>
                <a>
                    Ver receta

                </a>
                </Link>
            </div>
        </div>
        <style jsx>
            {
                `
                  .content {
                    background: #fff;
                    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                    margin: 0;
                    
                  }
                  .info {
                    padding: 16px;
                    text-align: center;
                  }
                  .info h4 {
                    font-size: 1.5rem;
                    margin: 4px 0;
                    color: #292929;
                  }
                  .info p {
                    font-size: 1rem;
                    margin: 0;
                    color: #292929;
                  }
                  .actions {
                    margin: 20px 0;
                    padding-top: 1rem;
                    padding-bottom: 2rem;
                    display: flex;
                    justify-content: center;
                    font-size: 1.4rem;
                    
                  }
                  .actions a {
                    color: rgba(0,0,0,0.7);
                    background: #ffbc0d;
                    padding: .5rem 1.5rem;
                    text-decoration: none;
                    border-radius: 5px;
                    border: none;
                  }
                `
            }
        </style>
    </div>

    
  )
}
