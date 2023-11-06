import React from 'react'

import { AdminLogout } from '../../components/Admin/AdminLayout'
import { AdminMenu } from '../../components/Admin/AdminLayout'
import { Icon } from "../../assets"
import "./AdminLayout.scss"

export function AdminLayout(props) {
    const { children } = props

    return (
        <div className='admin-layout'>
            <div className='admin-layout__left'>
                <Icon.LogoWhite className='logo' />
                <AdminMenu />
            </div>
            <div className='admin-layout__right'>
                <div className='admin-layout__right-header'>
                    <AdminLogout />
                </div>
                <div className='admin-layout__right-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}
