import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';

import { UserItem } from '../UserItem';
import { User } from "../../../../api"
import { useAuth } from "../../../../hooks"

const userController = new User();

export function ListUser(props) {
    const { usersActive, reload, onReload } = props;
    const [users, setUsers] = useState(null)
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response = await userController.getUsers(accessToken, usersActive)
                setUsers(response)
            } catch (error) {
                throw error
            }
        })()
    }, [usersActive, reload])

    if (!users) return <Loader active inline="centered" />
    if (size(users) === 0) return "No hay ningun usuario"

    return map(users, (user) => (
        <UserItem key={user._id} user={user} onReload={onReload} />)
    )
}
