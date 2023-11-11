import React from 'react';
import { Button } from 'semantic-ui-react';
import { map } from 'lodash';

import './Info.scss'
import { Icon } from '../../../../assets';
import { socialData } from '../../../../utils';

export function Info() {
    return (
        <div className='footer-info'>
            <Icon.LogoWhite className='logo' />
            <p>
                Streamer y programador a tiempo parcial
            </p>
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
    )
}
