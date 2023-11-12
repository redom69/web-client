import React from 'react';
import { Image, Button, Rating } from 'semantic-ui-react';

import './Course.scss';
import { ENV } from '../../../../utils';

export function Course(props) {
    const { course } = props;

    return (
        <div className='course'>
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />

            <div className='course__info'>
                <h3>
                    {course.title}
                </h3>
                <p>
                    {course.description}
                </p>
                <Button as='a' href={course.url} primary fluid target='_blank'>
                    Entra en el curso
                </Button>

                <div className='course__info-footer'>
                    <span>
                        {course.price} $
                    </span>
                    <Rating
                        icon='star'
                        defaultRating={course.score}
                        maxRating={5}
                        disabled
                    />
                </div>
            </div>
        </div>
    )
}
