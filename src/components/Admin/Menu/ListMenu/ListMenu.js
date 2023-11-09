import React, { useState, useEffect } from 'react'
import { size, map } from 'lodash';
import { Loader } from 'semantic-ui-react';

import { Menu } from '../../../../api';
import { MenuItem } from '../MenuItem';

const menuController = new Menu();

export function ListMenu(props) {
    const { active, reload, onReload } = props;
    const [menus, setMenu] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                setMenu(null);
                const response = await menuController.getMenu(active);
                setMenu(response);
            } catch (error) {
                throw error
            }
        })()
    }, [active, reload])

    if (!menus) return <Loader active inline='centered' />;
    if (size(menus === 0)) return 'No hay ningun menu';

    return map(menus, (menu) => (
        <MenuItem key={menu._id} menu={menu} onReload={onReload} />)
    );
}
