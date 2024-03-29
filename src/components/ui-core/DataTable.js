import { useWindowSize } from "../../hooks";

import "styled-components/macro";
import { Flex } from ".";

/**
 * JSX element used to render a table of data
 * @param {Object} props destructured properties
 * @param {Array<{name: String, breakpoint: Number, selector: String,component:Function}>} props.columns used to select and manipulate table columns
 * @param {Array<Object>} props.data array of data objects being passed in
 * @param {Boolean} props.fallBack optional fallback component if table receives no data,true by default
 */
export default function DataTable({
  columns = [],
  data = [],
  fallBack = true,
}) {
  let size = useWindowSize();
  return (
    <div>
      <table
        css={`
          margin-bottom: 1rem;
          width: 100%;
          & td,
          th {
            border-bottom: 1px solid var(--neutral-300);
          }
        `}
      >
        <thead
          css={`
            border-bottom: 1px solid var(--neutral-300);
            padding: 12px 0px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 1rem;
          `}
        >
          <tr>
            {columns.map((column) =>
              column?.breakpoint && size.width <= column?.breakpoint ? null : (
                <th
                  css={`
                    padding: 12px 4px;
                  `}
                  key={column?.name}
                >
                  {column?.name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row?.id}>
              {columns.map((cell, index) =>
                cell?.breakpoint &&
                size.width <= cell?.breakpoint ? null : cell?.component ? (
                  <td
                    key={index}
                    css={`
                      padding: 12px 4px;
                    `}
                  >
                    {cell?.component(row)}
                  </td>
                ) : (
                  <td key={index}>{row[cell?.selector]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && fallBack ? (
        <div>
          <Flex justify="center" direction="column" align="center">
            <p>No data available for display</p>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}
