import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import './TopBar.scss';
import { Icon } from '../../../assets';
import { Menu } from '../../../api';
import { socialData } from '../../../utils';

const menuController = new Menu();

export function TopBar() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await menuController.getMenu(true);
                setMenu(response);
            } catch (error) {
                throw error;
            }
        })()
    }, []);

    return (
        <div className='top-bar'>
            <Container>
                <div className='top-bar__left'>
                    <Link to='/' className='logo'>
                        <Icon.LogoWhite />
                    </Link>
                    <div className='menu'>
                        {map(menu, (item) => (
                            <a key={item._id} href={item.path}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    {map(socialData, (social) => (
                        <Button key={social.type}
                            as='a'
                            href={social.link}
                            target='_blank'
                            icon={social.type}
                            color={social.type}
                        />
                    ))}
                </div>
            </Container>
        </div >
    )
}
