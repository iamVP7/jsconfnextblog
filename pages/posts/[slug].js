import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

import { getAllPostSlugs,getPostData } from '../../lib/utils'

export default function PostPage({
    frontmatter: { title, date, cover_image },
    slug,
    content,
}) {
    return (
        <>
            <Link href='/'>
                <a className='btn btn-back'>Go Back</a>
            </Link>
            <div className='card card-page'>
                <h1 className='post-title'>{title}</h1>
                <div className='post-date'>Posted on {date}</div>
                <img src={cover_image} alt='' />
                <div className='post-body'>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {

    const paths = getAllPostSlugs()

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const postPath = path.join('blogposts', slug + '.md')
    const markdownWithMeta = fs.readFileSync(postPath, 'utf-8')

    const { data: frontmatter, content } = matter(markdownWithMeta)

    const {valuesCame:tempContent} = getPostData(slug)
    
    console.log(tempContent)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}
