import axios from "axios"

export const makeAddRequest = async (data)=>{
    const Base_URL = 'https://fakestoreapi.com/products'
    return await axios({
        url: `${Base_URL}`,
        method: "post",
        data: JSON.stringify(data)
    })
}