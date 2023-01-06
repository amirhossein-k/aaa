import "./datatable.scss";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductAction,
  deleteProductAction
} from "../../../actions/productActions";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridRowId,
  GridColumns
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
// ......................................................

//.......................................................

const Datatable = () => {
  const [rows, setRows] = useState([]);

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setPer((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );
  //////////////////////////
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "namecar",
      headerName: "خودرو",
      width: 150,
      editable: true
    },
    {
      field: "factory",
      headerName: "کارخانه",
      width: 150,
      editable: true
    },

    {
      field: "distance",
      headerName: "کارکرد",
      width: 150,
      editable: true
    },

    {
      field: "pic",
      headerName: "عکس",
      width: 150,
      editable: true,
      renderCell: (params) => <img src={params.value} className="img-table " />
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 150,
      editable: true
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      editable: true
    },
    {
      field: "skills",
      headerName: "ویژگی",
      width: 150,
      editable: true
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          // onClick={deleteUser(params.id)}
          // onClicl={deletehandle(params.id)}
        />
      ]
    }
  ];
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { product, loading } = productList;
  /////////////
  const productDelete = useSelector((state) => state.productDelete);
  // const {
  //   success: successDelete,
  //   loading: loadingDelete,
  //   error: errorDelete
  // } = productDelete;

  /////////////////
  const [pr, setPer] = useState([]);
  useEffect(() => {
    dispatch(listProductAction());
    if (product) {
      console.log("amad");
      setPer(product);
    }
  }, [dispatch]);
  ////////////
  // const deletehandle = (id) => {
  //   if (window.confirm("Are you Sure?")) {
  //     dispatch(deleteProductAction(id));
  //   }
  // };
  // ...................

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {product && (
        <DataGrid
          rows={pr}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  );
};

export default Datatable;
