import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { makeUpdateRequest } from '../utils/makeUpdateRequest';
import { message } from 'antd';
import { getErrorMessage } from '../utils/getErrorMessage';
import { makeAddRequest } from '../utils/makeAddRequest';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const [loading, setLoading] = useState(false)
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
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Product updated!',
                        duration: 2,
                    });
                }
            } catch (error) {
                setLoading(false)
                const message = getErrorMessage(error)
                messageApi.open({
                    key,
                    type: 'error',
                    content: message,
                    duration: 2,
                })
            }
        }

        //Handling product add
        if (page === 'productAdd') {
            try {
                const res = await makeAddRequest(value)
                if (res) {
                    setLoading(false)
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Product Added!',
                        duration: 2,
                    });
                }
            } catch (error) {
                setLoading(false)
                const message = getErrorMessage(error)
                messageApi.open({
                    key,
                    type: 'error',
                    content: message,
                    duration: 2,
                })
            }
        }
    };
    return (
        <>
            {contextHolder}
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
                    <Input />
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
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item shouldUpdate
                    name="image"
                    label="Image"
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
                {
                    page === 'productEdit'
                        ?(<Button type="primary" htmlType="submit" loading={loading}>Update</Button>)
                        : (<Button type="primary" htmlType="submit" loading={loading}>Add</Button>)
                }
            </Form>
        </>
    );
};
export default ProductForm;