import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './PostItem.scss'
import { BasicModal } from '../../../Shared';
import { PostForm } from '../PostForm';
import { Post } from '../../../../api';
import { useAuth } from '../../../../hooks';

const postController = new Post();

export function PostItem(props) {
    const { post, onReload } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)


    const openUpdatePost = () => {
        setTitleModal(`Actualizar ${post.title}`);
        onOpenCloseModal();
    }


    const openDeleteConfirm = () => {
        setConfirmMessage(`Eliminar ${post.title}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await postController.deletePost(accessToken, post._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className='post-item'>
                <div className='post-item__info'>
                    <span className='post-item__info-title'>{post.title}</span>
                    <span className='post-item__info-path'>{post.path}</span>
                </div>
                <div>
                    <Button as={Link} icon to={`/blog/${post.path}`} target='_blank'>
                        <Icon name='eye' />
                    </Button>
                    <Button icon primary onClick={openUpdatePost}>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color='red' onClick={openDeleteConfirm}>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal} size='large'>
                <PostForm onClose={onOpenCloseModal} onReload={onReload} post={post} />
            </BasicModal>
            <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={onDelete} content={confirmMessage} size='mini' />
        </>
    )
}
