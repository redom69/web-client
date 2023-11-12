import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Post } from '../../../../api';
import { ListPostItem } from '../ListPostItem';
import './ListPost.scss';

const postController = new Post();

export function ListPost() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [posts, setPost] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(searchParams.get('page') || 1);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts(page);
                setPost(response.docs)
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
    }, [page]);

    if (!posts) return <Loader active inline='centered' />;
    if (size(posts === 0)) return 'No hay ningun post';

    const changePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage);
        navigate(`?page=${newPage}`)
    }

    return (
        <div className='list-posts-web'>
            <div className='list'>
                {map(posts, (post) => (
                    <div key={post._id} className='item' >
                        <ListPostItem post={post} />
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <Pagination
                    totalPages={pagination.totalPages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    secondary
                    pointing
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}
