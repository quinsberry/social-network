import React, { lazy, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'

import { Header } from '@components/Header/Header'
import Navbar from '@components/Navbar/Navbar'
import ProfileContainer from '@components/Profile/ProfileContainer'
import ErrorPage from '@components/ErrorPage/ErrorPage'
import { LoginPage } from '@components/Login/LoginPage'
import { initializeApp } from '@store/reducers/appReducer'
import { withSuspense } from '@hoc/withSuspense'

import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

import './App.scss'
import { getInitializedSelector } from '@store/selectors/appSelectors'

const DialogsContainer = lazy(() => import('@components/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('@components/Users/Users'))
const SettingsContainer = lazy(() => import('@components/Settings/SettingsContainer'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedSettings = withSuspense(SettingsContainer)

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const dispatch = useDispatch()
  const initialized = useSelector(getInitializedSelector)

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp())
    }
    if (initialized) {
      setTimeout(() => {
        const ele = document.getElementById('ipl-progress-indicator')
        // fade out
        ele?.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          if (ele) ele.outerHTML = ''
        }, 2000)
      }, 1000)
    }
  }, [initialized])

  return (
    <Layout>
      <Header />
      <Content style={{ overflow: 'scroll', height: 'calc(100vh - 64px)' }}>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                <SubMenu key="profile" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/dialogs">Messages</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/settings">Settings</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="developers" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="5">
                    <Link to="/developers">Find</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/news">News</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/developers" render={() => <SuspendedUsers />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/settings" render={() => <SuspendedSettings />} />
                <Route component={ErrorPage} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Content>
    </Layout>
  )
}

export default withRouter(App)
