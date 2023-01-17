import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    HomeOutlined
} from '@ant-design/icons';

import { BsHandbag } from "react-icons/bs";
import { Layout, Menu, theme } from 'antd';
import logo from '../assets/images/logo.png'
const { Header, Sider, Content } = Layout;
function DashboardLayout({ children }) {
    const [selected, setSelected] = useState('dashboard')
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const location = window.location.pathname
    useEffect(()=>{
        switch(location){
            case "/":
                setSelected('dashboard')
              break;
            case "/dashboard":
                setSelected('dashboard')
              break;
            case "/products":
                setSelected('products')
              break;
            case "/addProduct":
                setSelected('addProduct')
              break;
              default:
                setSelected(2)
              break
        }
    },[location])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <img style={{ width: '64px' }} src={logo} alt='logo' />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selected]}
                    selectedKeys={[selected]}
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
                <Header style={{ paddingLeft: '8px', background: colorBgContainer }}>
                    {
                        collapsed
                            ? <MenuFoldOutlined style={{ fontSize: '150%'}} onClick={() => setCollapsed(!collapsed)} />
                            : <MenuUnfoldOutlined style={{ fontSize: '150%'}} onClick={() => setCollapsed(!collapsed)}/>
                    }
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