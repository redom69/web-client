import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

import "./HowMyCoursesWork.scss";
import { itemsData } from './HowMyCoursesWork.data';

export function HowMyCoursesWork() {
    return (
        <Container className='how-my-courses-works'>
            <h2>
                Como funcionan los cursos
            </h2>
            <h4>
                Cada curso cuenta con contenido multimedio, activo los 24h del dia
            </h4>
            <div className='how-my-courses-works__item'>
                {map(itemsData, (item, index) => (
                    <div key={index}>
                        <div>
                            <Icon name={item.icon} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}
