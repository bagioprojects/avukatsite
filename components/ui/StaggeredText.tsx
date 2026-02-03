'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface StaggeredTextProps {
    text: string
    className?: string
    delay?: number
}

export const StaggeredText = ({ text, className = "", delay = 0 }: StaggeredTextProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: delay }
        })
    }

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className={`flex flex-wrap ${className}`}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    className="mr-[0.25em]"
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}
