import { Chart } from '../components/Chart/Chart';
import { Table } from '../components/Table/Table';
import { ReactNode } from 'react';

export enum AppRoutes {
    TABLE = 'table',
    CHART = 'charts',
    //NOT_FOUND = 'not_found'
}

type RouteDataType = {
    path: string,
    name: string,
    element: ReactNode | null
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.TABLE]: '/',
    [AppRoutes.CHART]: '/charts',
};

export const routeConfig: Record<AppRoutes, RouteDataType> = {
    [AppRoutes.TABLE]: {
        path: RoutePath.table,
        name: 'Обзор',
        element: <Table/>,
    },
    [AppRoutes.CHART]: {
        path: RoutePath.charts,
        name: 'Графики',
        element: <Chart/>,
    },
};