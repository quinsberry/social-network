import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getEmail, getIsAuth, getLogin, getUserId } from '@store/selectors/authSelectors'
import { logoutTC } from '@store/reducers/authReducer'

import { Layout, Menu, Avatar, Row, Col, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import logoSvg from '@assets/logo.svg'
import './Header.scss'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch()

  const userId = useSelector(getUserId)
  const email = useSelector(getEmail)
  const login = useSelector(getLogin)
  const isAuth = useSelector(getIsAuth)

  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center', background: '#fff' }}>
      <div className="logo">
        <img src={logoSvg} alt="Network Logo" />
        <span>Social Network</span>
      </div>
      <Row style={{ flex: 1 }}>
        <Col span={20}>
          <Menu theme="light" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/developers">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <div className="auth">
            {isAuth ? (
              <div className="signedIn_block">
                <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
                <Button onClick={logout}>Sign out</Button>
              </div>
            ) : (
              <NavLink to={`/login`}>
                <Button onClick={logout}>Sign in</Button>
              </NavLink>
            )}
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}
