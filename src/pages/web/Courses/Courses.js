import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import { map } from 'lodash';

import './Courses.scss';
import { Course as CourseController } from '../../../api';
import { image } from '../../../assets';
import { Course } from '../../../components/Web/Courses'

const courseController = new CourseController();

export function Courses() {
    const [courses, setCourses] = useState(null);
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    const isCurrentLastPage = pagination?.page === pagination?.totalPages;

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ page, limit: 6 });
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    totalPages: response.totalPages,
                    totalDocs: response.totalDocs
                });
                if (!courses) {
                    setCourses(response.docs)
                } else {
                    setCourses([...courses, ...response.docs])
                }
            } catch (error) {
                throw error;
            }
        })()
    }, [page]);

    const loadMore = () => {
        setPage((prevState) => prevState + 1);
    }

    return (
        <Container className='courses-page'>
            <Image src={image.academyLogo} />
            <h2>Aqui encontraras los mejores cursos de programacion.</h2>
            <div className='courses'>
                {map(courses, (course) => (
                    <div key={course._id} className='courses__item'>
                        <Course course={course} />
                    </div>
                ))}

            </div>
            {!isCurrentLastPage && (
                <div className='more'>
                    <Button primary onClick={loadMore}>
                        Cargar mas
                    </Button>
                </div>
            )}
        </Container>
    )
}
