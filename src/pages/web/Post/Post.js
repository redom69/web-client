import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Loader } from 'semantic-ui-react';

import './Post.scss';
import { Post as PostController } from '../../../api';

const postController = new PostController();

export function Post() {
    const { path } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPost(path);
                setPost(response);
                console.log(response);
            } catch (error) {
                throw error;
            }
        })()
    }, [path]);

    if (!post) return <Loader active inline='centered' />;

    return (
        <Container className='post'>
            <h1 className='title'>{post.title}</h1>
            <div className='content' dangerouslySetInnerHTML={{ __html: post.content }}>

            </div>
        </Container>
    )
}
