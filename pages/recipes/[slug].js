import { createClient } from "contentful"
import Image from 'next/image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async() => {
  const res = await client.getEntries({
    content_type: 'receta'
  })

  const paths = res.items.map(item => {
    return {
      params: {slug: item.fields.slug}
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }){
  const {items} = await client.getEntries({
    content_type: 'receta',
    'fields.slug': params.slug
  }) 
  
  return {
    props: { recipe: items[0]},
    revalidate: 10,
  }
}

export default function RecipeDetails({ recipe }) {
  console.log(recipe)
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields
  return (
    <div>
      <div className="banner">
        <Image 
        src={'https:' + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
        />
        <h2>{ title }</h2>
      </div>
      <div className="info">
      <p>Tiempo aproximado { cookingTime } min</p>
      <h3>Ingredientes:</h3>
      <ul>
      {
          ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))
      }
      </ul>
      </div>
      <div className="method">
        <h3>Procedimiento:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>
        {`
          h2,h3 {
            text-transform: uppercase;
          }
          .banner{
            position: relative;
          }
          .banner h2 {
            margin: 0;
            background: #ffbc0d;
            display: inline-block;
            padding: 20px;
            position: absolute;
            top: -10%;
            left: 0;
            transform: rotateZ(-1deg);
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          }
          .info p {
            margin: 0;
          }
        `}
      </style>
    </div>
  )
}