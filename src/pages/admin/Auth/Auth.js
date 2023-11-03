import React, { useState } from "react"
import { Tab } from "semantic-ui-react"

import "./Auth.scss"
import { Icon } from "../../../assets"

export function Auth() {
    const [activeIndex, setActiveIndex] = useState(1);

    const openLogin = () => setActiveIndex(0);

    const panes = [
        {
            menuItem: "Entrar",
            render: () => (
                <Tab.Pane>
                    <h2>Login FORM</h2>
                </Tab.Pane>
            )
        },
        {
            menuItem: "Nuevo usuairo",
            render: () => (
                <Tab.Pane>
                    <h2>Register FORM</h2>
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