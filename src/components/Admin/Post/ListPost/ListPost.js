import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash';

import './ListPost.scss';
import { Post } from '../../../../api';
import { PostItem } from '../PostItem';

const postController = new Post();

export function ListPost(props) {
    const { reload, onReload } = props;

    const [posts, setPost] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts(page);
                setPost(response.docs);
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

    if (!posts) return <Loader active inline='centered' />;
    if (size(posts === 0)) return 'No hay ningun post';

    return (
        <div className='list-post'>
            {map(posts, (post) => (
                <PostItem key={post._id} post={post} onReload={onReload} />
            ))}
            <div className='list-post__pagination'>
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
