import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AiFillCaretDown } from "react-icons/ai";

export default function OrdersTable({ order }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  var counter = 1;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell align="right">{order.user_id}</TableCell>
        <TableCell align="right">Phone</TableCell>
        <TableCell align="right">{order.order_status}</TableCell>
        <TableCell align="right">{order.created_at}</TableCell>
        <TableCell align="right">{order.totalPrice}</TableCell>
        <TableCell align="right">{order.grandTotalPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" component="div">
                Order Items
              </Typography>
              <Table
                className="bg-gray-100"
                size="small"
                aria-label="purchases"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product name</TableCell>
                    <TableCell align="right">brand</TableCell>
                    <TableCell align="right">Category </TableCell>
                    <TableCell align="right">Date </TableCell>
                    <TableCell align="right">Quantity </TableCell>

                    <TableCell align="right">Price </TableCell>
                    <TableCell align="right">Sum Price </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {counter++}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.order_id}
                      </TableCell>
                      <TableCell>{item.product?.name?.english}</TableCell>
                      <TableCell align="right">
                        {item?.product?.brand}
                      </TableCell>
                      <TableCell align="right">
                        {item?.product?.category?.name?.english}
                      </TableCell>
                      <TableCell align="right">{item.created_at}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.sumPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="w-100vh flex justify-end ">
                <div>
                  <Button
                    style={{
                      color: "white",

                      backgroundColor: "#636ab1",
                      padding: "16px",
                      margin: "2px",
                    }}
                    aria-controls={open1 ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Status
                    <AiFillCaretDown className="ml-2" />
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open1}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
