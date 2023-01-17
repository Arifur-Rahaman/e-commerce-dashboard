import React from 'react'
import useFetch from '../hooks/useFetch'
import { Button, Rate, Space, Table, Spin } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
function ProductsList() {
  const { loading, error, data } = useFetch('')
  const navigate = useNavigate()

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      render: (_, record) => {
        return <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
          <img src={record.image} alt="Product" style={{ height: '40px', width: '40px' }} />
          <p>{record.title}</p>
        </div>
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate allowHalf defaultValue={rating.rate} disabled />
    },
    {
      title: 'Price ($)',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditFilled />}
            size={'large'} onClick={() => navigate(`/products/${record.id}`)} />
          <Button danger icon={<DeleteFilled />} size={'large'} />

        </Space>
      ),
    },
  ];
  const dataWithKey = data?.map(element=>({...element, key: element.id}))
  return (
    <>
      {
        loading
          ? (<div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}
          >
            <Spin size="large" />
          </div>) :
          error ? (<Error err={error}/>)
            : (<Table columns={columns} dataSource={dataWithKey} />)
      }
    </>

  )
}

export default ProductsList