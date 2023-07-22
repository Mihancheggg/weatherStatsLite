import React from 'react';
import { MonthData } from '../../app/weather-reducer';

export type TablePropsType = {
    data: Array<MonthData>
}

export const Table = (props: TablePropsType) => {
    return (
        <div>
            {props.data.map(el => {
                return(
                    <div>
                        {el.name}
                    </div>
                )
            })}
        </div>
    );
};