import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    HomeOutlined
} from '@ant-design/icons';

import { BsHandbag } from "react-icons/bs";
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
function DashboardLayout({children}) {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <HomeOutlined />,
                            label: 'Dashboard',
                            onClick: () => navigate('/')
                        },
                        {
                            key: 'products',
                            icon: <BsHandbag size={16} />,
                            label: 'Products',
                            onClick: () => navigate('/products')
                        },
                        {
                            key: 'addProduct',
                            icon: <PlusOutlined />,
                            label: 'Add Product',
                            onClick: () => navigate('/addProduct')
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout