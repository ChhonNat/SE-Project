import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';

const uData = [4600, 5000, 2000, 2780, 1890, 2390, 3490, 3490, 3190, 3880, 3490, 6490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export default function StackedBarChart() {
    return (
        <BarChart
            width={700}
            height={300}
            series={[
                // { data: pData, label: 'pv', id: 'pvId', stack: 'total' },
                { data: uData, label: 'Visitor', id: 'uvId', stack: 'total' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
    );
}