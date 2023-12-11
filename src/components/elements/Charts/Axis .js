import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import * as React from 'react';

export default function Axis() {
    const uData =[1, 4, 2, 5, 7, 2, 4, 3];
    return (
        <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
                plotType="bar"
                data={uData}
                width={500}
                height={300}
                showTooltip
                showHighlight
                xAxis={{
                    scaleType: 'band',
                    data: [
                        new Date(2016, 0, 1),
                        new Date(2017, 0, 1),
                        new Date(2018, 0, 1),
                        new Date(2019, 0, 1),
                        new Date(2020, 0, 1),
                        new Date(2021, 0, 1),
                        new Date(2022, 0, 1),
                        new Date(2023, 0, 1),
                    ],
                    valueFormatter: (value) => value.getFullYear(),
                }}
            />
        </Box>
    );
}