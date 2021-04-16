import React from 'react';

import UsersCarts from '../../components/Carts/UsersCarts';
import { Content } from '../../styled';
import {usersApi} from "../../api/api";
import {Redirect} from "react-router-dom";

export default () => {
    const [users, setUsers] = React.useState([]);
    const [amIAuthorized, setAmIAuthorized] = React.useState(true);
    React.useEffect(() => {
        usersApi
            .getUsers(0, 200)
            .then(
                ({ data }) => {
                    setUsers(data.Content.users);
                },
                (err) => {
                    if (err.response.status === 401) {
                        setAmIAuthorized(() => false);
                        localStorage.clear();
                    }
                    console.error("ERROR getUsers:", err);
                })
            .catch((err) => console.error("ERROR getUsers:", err))
    }, []);

    if (!amIAuthorized) {
        return <Redirect to="/login" />;
    }

    return (
        <Content>
            <UsersCarts users={users} buttonText="Общаться" />
        </Content>
    );
}
