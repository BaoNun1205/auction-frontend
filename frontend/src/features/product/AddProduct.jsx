import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import MUIDataTable from "mui-datatables";



import TextFieldComponent from '~/components/TextFieldComponent/TextFieldComponent';

export default function AddProduct() {

    const columns = ["Name", "Company", "City", "State"];

    const data = [
        ["Joe James", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT"],
        ["Bob Herm", "Test Corp", "Tampa", "FL"],
        ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    const options = {
        filterType: 'checkbox',
    };



    return (
        <>
     <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
    />


        </>
      );
}