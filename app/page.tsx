import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Hero } from '@/components/site/Hero'
import { Goal } from '@/components/site/Goal'
import { Services } from '@/components/site/Services'
import { Team } from '@/components/site/Team'
import { Articles } from '@/components/site/Articles'
import { HowWeWork } from '@/components/site/HowWeWork'
import { Contact } from '@/components/site/Contact'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <Goal />
                <Services />
                <Team />
                <HowWeWork />
                <Articles />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
