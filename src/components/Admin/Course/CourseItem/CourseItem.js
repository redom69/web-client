import React from 'react';
import { Image, Button, Confirm, Icon } from 'semantic-ui-react';

import { ENV } from '../../../../utils';
import './CourseItem.scss'

export function CourseItem(props) {
    const { course } = props;

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
                    <Button icon primary>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color='red'>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>
        </>

    )
}
