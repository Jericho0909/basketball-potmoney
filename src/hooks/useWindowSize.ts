import { useWindowSize } from "@uidotdev/usehooks"

const useWindowSizeCheck = () => {
    const { width } = useWindowSize()

    const isMobile = (width ?? 0) < 1024

    return{ 
        isMobile 
    }
}

export default useWindowSizeCheck