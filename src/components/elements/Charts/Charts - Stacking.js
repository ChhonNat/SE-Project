import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';

const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: 'Series A',
};
export default function ChartStacking() {
    return (
        <BarChart
            width={600}
            height={300}
            series={[
                { ...seriesA, stack: 'total' },
            ]}
        />
    );
}