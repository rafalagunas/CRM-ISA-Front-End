import React from 'react'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Header } from '../../components/header/Header'
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../models/routes';
import Dashboard from '../../components/sidebar/modules/dashboard/Dashboard'
import Leads from '../../components/sidebar/modules/leads/Leads';
import Contacts from '../../components/sidebar/modules/contacts/Contacts';
import Activities from '../../components/sidebar/modules/activities/Activities';
import './RootPage.css'

const RootPage: React.FC = () => {
    return (
        <div className='root-page'>
            <Sidebar />
            <div className='main'>
                <Header />
                <Routes>
                    {/* <Route path="dashboard" element={<MainDashboard />} /> */}
                    <Route path={`/`} element={<Dashboard />} />
                    <Route path={`${PrivateRoutes.LEADS}`} element={<Leads />} />
                    <Route path={`${PrivateRoutes.CONTACTS}`} element={<Contacts />} />
                    <Route path={`${PrivateRoutes.ACTIVITIES}`} element={<Activities />} />
                </Routes>
            </div>

        </div>
    )
}

export default RootPage
