import axios from "axios"

export const makeUpdateRequest = async (data, id)=>{
    const Base_URL = 'https://fakestoreapi.com/products'
    return await axios({
        url: `${Base_URL}/${id}`,
        method: "put",
        data: JSON.stringify(data)
    })
}