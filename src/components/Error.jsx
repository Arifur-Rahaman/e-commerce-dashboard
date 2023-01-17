import React from 'react'
import {Typography } from 'antd';
const { Text} = Typography;
function Error({err}) {
  return (
    <div>
        <Text type="danger">{err}</Text>
    </div>
  )
}

export default Error