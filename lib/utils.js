import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export function getAllPostSlugs() {
    // Read all the files from blog post folder
    const files = fs.readdirSync(path.join('blogposts'))


    // for all the file path remove the md file to create as slug variable
    const paths = files.map((singleFileName) => ({
        params: {
            slug: singleFileName.replace('.md', '')
        }
    }

    )
    )

   
    return paths;
}

export function getPostData(slug) {

    const postPath = path.join('blogposts', slug + '.md')
    const markdownWithMeta = fs.readFileSync(postPath, 'utf-8')


    // the matter returns the markdown file into two parts
    // contents between --- are sent as data, and after that are content
    const { data: frontmatter, content } = matter(markdownWithMeta)

    const tempContent = content
    return {
        frontmatter,
        tempContent
    };
}

export const sortByDate = (a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  }
  