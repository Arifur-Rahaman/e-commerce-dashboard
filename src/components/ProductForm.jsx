import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { makeUpdateRequest } from '../utils/makeUpdateRequest';
import { message } from 'antd';
import { getErrorMessage } from '../utils/getErrorMessage';
import { makeAddRequest } from '../utils/makeAddRequest';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';

const layout = {
    labelCol: { span: 8 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const ProductForm = ({ data, page }) => {
    const { Title } = Typography;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [product] = useState(data || {
        title: '',
        price: '',
        category: '',
        description: '',
        image: '',
    })

    const onFinish = async (value) => {
        setLoading(true)
        //Handling product update
        if (page === 'productEdit') {
            try {
                const res = await makeUpdateRequest(value, data.id)
                if (res) {
                    setLoading(false)
                    message.success('Updated successfully!')
                    navigate('/products')
                }
            } catch (error) {
                setLoading(false)
                message.error(getErrorMessage(error)) 
            }
        }

        //Handling product add
        else if (page === 'productAdd') {
            try {
                const res = await makeAddRequest(value)
                if (res) {
                    setLoading(false)
                    message.success("Added successfully")
                    navigate('/products')
                }
            } catch (error) {
                setLoading(false)
                message.error(getErrorMessage(error))
            }
        }
    };
    return (
        <div style={{maxWidth:'760px', margin:'0 auto'}}>
            <Title level={2} style={{ paddingBottom: '16px' }}>
                {page === 'productAdd' ? `Add Product` : `Update Product`}
            </Title>
            <Form
                {...layout}
                layout="vertical"
                name="nest-messages"
                onFinish={onFinish}
                initialValues={product}
                validateMessages={validateMessages}>
                <Form.Item shouldUpdate
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item shouldUpdate
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item shouldUpdate
                    name="image"
                    label="Image URL"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item shouldUpdate
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item shouldUpdate
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                {
                    page === 'productEdit'
                        ? (<Button type="primary" htmlType="submit" loading={loading}>Update</Button>)
                        : (<Button type="primary" htmlType="submit" loading={loading}>Add</Button>)
                }
            </Form>
        </div>
    );
};
export default ProductForm;