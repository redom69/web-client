import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';

import { ListEmails } from '../../../components/Admin/Newsletter';

export function Newsletter() {
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            render: () => (
                <Tab.Pane attached={false}>
                    <ListEmails onReload={onReload} reload={reload} />
                </Tab.Pane>
            )
        }
    ];

    return (
        <div className='newsletter-page'>
            <Tab menu={{ secondary: true }} panes={panes} />
        </div>
    )
}
