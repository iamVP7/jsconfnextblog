import fs from 'fs'
import path from 'path'

export function getAllPostSlugs() {
    // Read all the files from blog post folder
    const files = fs.readdirSync(path.join('blogposts'))


    // for all the file path remove the md file to create as slug variable
    const paths = files.map((singleFileName) => ({
        params: {
            slug: singleFileName.replace('.md', '')
        }
    }))


    return paths;
}

export const sortByDate = (a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}
