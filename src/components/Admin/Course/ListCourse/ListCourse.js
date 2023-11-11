import React, { useState, useEffect } from 'react'
import { size, map } from 'lodash';

import { Course } from '../../../../api'
import { Loader, Pagination } from 'semantic-ui-react';
import { CourseItem } from '../CourseItem';
import './ListCourse.scss'

const courseController = new Course();

export function ListCourse(props) {
    const { reload, onReload } = props;

    const [courses, setCourses] = useState(false)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ page, limit: 5 });
                setCourses(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    totalPages: response.totalPages,
                    totalDocs: response.totalDocs
                });
            } catch (error) {
                throw error
            }
        })()
    }, [page, reload]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    }

    if (!courses) return <Loader active inline='centered' />;
    if (size(courses === 0)) return 'No hay ningun curso';

    return (
        <div className='list-courses'>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} onReload={onReload} />
            ))}
            <div className='list-courses__pagination'>
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
