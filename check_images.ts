import { prisma } from './lib/prisma'

async function checkImages() {
    const articles = await prisma.article.findMany({
        select: { id: true, title: true, coverImage: true }
    })
    console.log(JSON.stringify(articles, null, 2))
}

checkImages()
