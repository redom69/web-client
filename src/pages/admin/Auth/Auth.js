import React, { useState } from "react"
import { Tab } from "semantic-ui-react"

import "./Auth.scss"
import { Icon } from "../../../assets"
import { LoginForm, RegisterForm } from "../../../components/Admin/Auth";

export function Auth() {
    const [activeIndex, setActiveIndex] = useState(0);

    const openLogin = () => setActiveIndex(0);

    const panes = [
        {
            menuItem: "Entrar",
            render: () => (
                <Tab.Pane>
                    <LoginForm />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Nuevo usuario",
            render: () => (
                <Tab.Pane>
                    <RegisterForm openLogin={openLogin} />
                </Tab.Pane>
            )
        }
    ];

    return (
        <div className="auth">
            <Icon.LogoWhite className="logo" />
            <Tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)} />
        </div>
    )
}