import React from 'react'
import Logo from '../Svg/Logo.svg'
import LogoLight from '../Svg/Logo-light.svg'
import { ProductManagement } from '../Components'
import { UserManagement, ManageProducts } from '../Svg'
export function Settings() {
    return (
        <div className="page settings">
            <div className="header-wrapper">
                <p className="heading"><img src={Logo} className="logo" alt="" /><img src={LogoLight} className="logo-light" alt="" />KnightStores</p>
            </div>
            <div className="settings-wrapper">
                <div className="sidebar">
                    <button className="btn-plain"><ManageProducts /></button>
                    <button className="btn-plain"><UserManagement /></button>
                </div>
                <div className="content">
                    <ProductManagement />
                </div>
            </div>
        </div>
    )
}
