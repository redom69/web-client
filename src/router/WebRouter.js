import React from 'react'
import { Routes, Route } from "react-router-dom"

import { Home, Courses, Blog, Post } from '../pages/web'
import { ClientLayout } from '../layouts'

export function WebRouter() {

    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }

    return (
        <Routes>
            <Route path='/' element={loadLayout(ClientLayout, Home)} />
            <Route path='/courses' element={loadLayout(ClientLayout, Courses)} />
            <Route path='/blog' element={loadLayout(ClientLayout, Blog)} />
            <Route path='/blog/:path' element={loadLayout(ClientLayout, Post)} />
        </Routes>
    )
}
