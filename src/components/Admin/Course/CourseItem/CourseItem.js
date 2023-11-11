import React, { useState } from 'react';
import { Image, Button, Confirm, Icon } from 'semantic-ui-react';

import { useAuth } from '../../../../hooks';
import { Course } from '../../../../api'
import { CourseForm } from '../CourseForm'
import { BasicModal } from '../../../Shared';
import { ENV } from '../../../../utils';
import './CourseItem.scss'

const courseController = new Course();

export function CourseItem(props) {
    const { course, onReload } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)


    const openUpdateCourse = () => {
        setTitleModal(`Actualizar ${course.title}`);
        onOpenCloseModal();
    }


    const openDeleteConfirm = () => {
        setConfirmMessage(`Eliminar ${course.title}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await courseController.deleteCourse(accessToken, course._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className='course-item'>
                <div className='course-item__info'>
                    <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                    <div>
                        <p>{course.title}</p>
                    </div>
                </div>
                <div>
                    <Button icon as='a' href={course.url} target='_blank'>
                        <Icon name='eye' />
                    </Button>
                    <Button icon primary onClick={openUpdateCourse}>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color='red' onClick={openDeleteConfirm}>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <CourseForm onClose={onOpenCloseModal} onReload={onReload} course={course} />
            </BasicModal>

            <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={onDelete} content={confirmMessage} size='mini' />
        </>
    )
}
