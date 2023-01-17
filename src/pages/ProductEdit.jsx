import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import Error from '../components/Error'
import ProductForm from '../components/ProductForm'
import useFetch from '../hooks/useFetch'
function ProductEdit() {
    const { id } = useParams()
    const { loading, error, data: product } = useFetch(id)
    return (
        <>
            {
                loading
                    ? (<div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}
                    >
                        <Spin size="large" />
                    </div>) :
                    error ? (<Error err={error} />)
                        : (<ProductForm data={product} page={'productEdit'} />)
            }
        </>
    )
}

export default ProductEdit