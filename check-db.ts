import { prisma } from './lib/prisma'

async function checkData() {
    const pages = await prisma.page.findMany()
    const articles = await prisma.article.findMany()
    const users = await prisma.user.findMany()
    const settings = await prisma.siteSettings.findFirst()

    console.log('Pages:', pages.length)
    console.log('Articles:', articles.length)
    console.log('Users (Team):', users.length)
    console.log('Settings:', settings ? 'Found' : 'Not Found')
}

checkData()
