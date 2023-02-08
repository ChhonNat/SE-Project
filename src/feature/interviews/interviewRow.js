import React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

const InterviewRow = ({
  cadidateId,
  name,
  gender,
  position,
  dept,
  joinDate,
}) => {
  return (
    <TableRow className="tableHover">
      <TableCell>{cadidateId}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{dept}</TableCell>
      <TableCell>{joinDate}</TableCell>
      <TableCell>PASS</TableCell>
      <TableCell>008</TableCell>
      <TableCell>300</TableCell>
      <TableCell>1 Jan 2023</TableCell>
      <TableCell>
        <Button variant="outlined" color="success" size="small">
          Approve
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InterviewRow;
