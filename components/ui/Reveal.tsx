'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface RevealProps {
    children: React.ReactNode
    width?: 'fit-content' | '100%'
    delay?: number
}

export const Reveal = ({ children, width = 'fit-content', delay = 0.25 }: RevealProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-75px" })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView, mainControls])

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1.1, delay: delay, ease: [0.22, 1, 0.36, 1] }} // "Wonderful" slow smooth ease
            >
                {children}
            </motion.div>
        </div>
    )
}
