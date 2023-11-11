import React, { useState, useEffect } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';

import { Newsletter } from '../../../../api';
import { EmailItem } from '../EmailItem';
import { useAuth } from '../../../../hooks';
import './ListEmail.scss'

const newsletterController = new Newsletter();

export function ListEmails(props) {
    const { onReload, reload } = props;
    const [emails, setEmails] = useState(null);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response = await newsletterController.getEmails(accessToken, page);
                setEmails(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    totalPages: response.totalPages,
                    totalDocs: response.totalDocs
                });
            } catch (error) {
                throw error;
            }
        })()
    }, [page, reload]);

    const changePage = (_, data) => {
        console.log();
        setPage(data.activePage);
    }

    if (!emails) return <Loader active inline='centered' />;
    if (size(emails === 0)) return 'No hay ningun email';

    return (
        <div className='list-emails'>
            {map(emails, (email) => (
                <EmailItem key={email._id} email={email} onReload={onReload} />
            ))}
            <div className='list-emails__pagination'>
                <Pagination
                    totalPages={pagination.totalPages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}
