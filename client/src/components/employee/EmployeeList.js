import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useApi } from '../../hooks/useApi';
import { HTTP_CONSTANTS } from '../../utils/constants';
import { makeStyles, TextField } from '@material-ui/core';


const columns = [
  { field: 'name', headerName: 'Employee Name', width: 200 },
  { field: 'age', headerName: 'Age', width: 150 },
  { field: 'dateOfBirth', headerName: 'DOB', width: 150 },
  { field: 'reportingManager', headerName: 'Reporting Manager', width: 200 },
  { field: 'salary', headerName: 'Salary', width: 200 },
  { field: 'department', headerName: 'Department', width: 200 },
];

const pageOptions = [25, 50, 100, 500];

const useStyles = makeStyles((theme) => ({
  dataTable: {
    height: 500,
    width: '100%'
  },
}));

export default function EmployeeList({ uploadsId, searchValue }) {

  const classes = useStyles();
  const [filters, setFilters] = useState([]);

  const [params, setParams] = useState({
    uploadsId,
    searchValue: '',
    skip: 0,
    limit: 25,
    sortKey: 'name',
    sortOrder: 'asc'
  });
  const { data, loading, error, refetch } = useApi('/api/employees', HTTP_CONSTANTS.POST, params);

  useEffect(() => {
    refetch(params, filters);
  }, [params, filters]);

  useEffect(() => {
    params.searchValue = searchValue;
    setParams({ ...params });
  }, [searchValue])

  const handlePageChange = useCallback((newParams) => {
    params.limit = newParams.pageSize;
    params.skip = params.skip + params.limit;
    setParams({ ...params });

    // refetch
    // refetch(params, filters);
  }, [params]);

  const handlePageSizeChange = useCallback((newParams) => {
    console.log(newParams);
    params.limit = newParams.pageSize;
    params.skip = 0;
    setParams({ ...params });

    // refetch
    // refetch(params, filters);
  }, [params, filters]);

  const handleSort = useCallback((newParams) => {
    params.sortKey = newParams?.sortModel?.[0]?.field || 'name';
    params.sortOrder = newParams?.sortModel?.[0]?.sort || 'asc';
    setParams({ ...params });

    // refetch
    // refetch(params, filters);
  }, [params, filters]);

  const handleFilter = useCallback((newParams) => {
    const _filters = newParams?.filterModel?.items || [];
    setFilters(_filters);
    // refetch(params, _filters);
  }, [filters, params]);

  return (
    <>
      <DataGrid
        rows={data?.data || []}
        columns={columns}
        pagination
        rowsPerPageOptions={pageOptions}
        pageSize={params.limit}
        rowCount={data?.totalRecords || 0}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onSortModelChange={handleSort}
        onPageChange={handlePageChange}
        onFilterModelChange={handleFilter}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
        className={classes.dataTable}
      />
    </>
  );
}
