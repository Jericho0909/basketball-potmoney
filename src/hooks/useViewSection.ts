import { useIntersectionObserver } from "@uidotdev/usehooks";

const useSectionInView = () => {
    const [ref, entry] = useIntersectionObserver({
        threshold: 0.4,
        root: null,
        rootMargin: ""
    })

    const isVisible = entry?.isIntersecting


    return { ref, isVisible };
}

export default useSectionInView