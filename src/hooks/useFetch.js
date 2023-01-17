import axios from "axios"
import {useEffect, useState} from "react"
import { getErrorMessage } from "../utils/getErrorMessage"

const Base_URL = 'https://fakestoreapi.com/products'
function useFetch(url) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`${Base_URL}/${url}`)
                setLoading(false)
                setData(data)
                
            } catch (error) {
                const err = getErrorMessage(error)
                setLoading(false)
                setError(err)
            }
        }
        fetchData()
    }, [url])

    return {loading, error, data}
}

export default useFetch