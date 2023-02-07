import { Button, TableCell, TableRow } from "@mui/material";

const CandidateRow = ({
  first_name,
  last_name,
  phone_number,
  position_id,
  department_id,
  shortlist_date,
  shortlisted_result_id,
  recruiter_id,
}) => {
  return (
    <TableRow className="tableHover">
      <TableCell>{first_name}</TableCell>
      <TableCell>{last_name}</TableCell>
      <TableCell>{phone_number}</TableCell>
      <TableCell>{position_id}</TableCell>
      <TableCell>{department_id}</TableCell>
      <TableCell>{shortlist_date}</TableCell>
      <TableCell>{shortlisted_result_id}</TableCell>
      <TableCell>{recruiter_id}</TableCell>
      <TableCell>
        <Button variant="outlined" color="success" size="small">
          Approve
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;
