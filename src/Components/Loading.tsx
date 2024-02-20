import { useLoading } from "../Storage/useLoading";
import React, { useEffect } from 'react'
import { Rotate } from "../styles/IsLoadingStyle";

const Loading = () => {

    let setIsLoading = useLoading((state) => state.setIsLoading)

    let isLoading = useLoading((state) => state.isLoading)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    if(isLoading) {
        return (
            <h1><Rotate>🕷</Rotate></h1>
        )
    }       
}

export default Loading