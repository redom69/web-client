import React, { useState, useEffect } from 'react'
import { size, map } from 'lodash';

import { Course } from '../../../../api'
import { Loader } from 'semantic-ui-react';
import { CourseItem } from '../CourseItem';

const courseController = new Course();

export function ListCourse() {
    const [courses, setCourses] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses();
                setCourses(response.docs)
            } catch (error) {
                throw error
            }
        })()
    }, [])

    if (!courses) return <Loader active inline='centered' />;
    if (size(courses === 0)) return 'No hay ningun curso';

    return (
        <div>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}
            <div>
                {/*Paginaciom*/}
            </div>
        </div>
    )
}
