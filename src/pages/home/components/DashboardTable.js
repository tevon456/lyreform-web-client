import React from "react";
import { UICore } from "../../../components";

export default function DashboardTable({ data }) {
  return (
    <StyledTable>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      {data.map((item, index) => (
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      ))}
    </StyledTable>
  );
}

const StyledTable = styled.div`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;

  & td {
    border-bottom: 1px solid #ddd;
    padding: 12px;
  }

  & th {
    border-bottom: 1px solid #ddd;
    padding: 18px;
    font-size: var(--text-xl);
  }

  & tr:hover {
    background-color: #ddd;
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #111;
    color: white;
  }
`;
