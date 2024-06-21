import React, {useState} from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'dayjs/locale/en-gb';

const DatePickerValue = ({fieldValue, onChangeEvent, fieldName}) => {

    let color = '#ffffff'

    const newTheme = createTheme({
            components: {
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            color: color,
                        }
                    }
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            color: color,
                        }
                    }
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            color: color,
                        }
                    }
                }
            }
        })

    const formattedDate = dayjs(fieldValue);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <ThemeProvider theme={newTheme}>
                    {fieldValue &&
                        <DatePicker
                            value={formattedDate}
                            name={fieldName}
                            onChange={(newVal) => onChangeEvent(fieldName, newVal ? newVal['$d'] : null)}
                            slotProps={{
                                textField: {
                                    sx: {
                                        size: 'large',
                                        color: '#ffffff',
                                        borderRadius: '2px',
                                        borderWidth: '2px',
                                        border: '2px solid',
                                        backgroundColor: '#666666',
                                    }
                                },
                            }}
                        />
                    }
                    {!fieldValue &&
                        <DatePicker
                            onChange={(newVal) => onChangeEvent(fieldName, newVal['$d'])}
                            slotProps={{
                                textField: {
                                    sx: {
                                        size: 'large',
                                        color: '#ffffff',
                                        borderRadius: '2px',
                                        borderWidth: '2px',
                                        border: '2px solid',
                                        backgroundColor: '#666666',
                                    }
                                },
                            }}
                        />
                    }
                </ThemeProvider>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default DatePickerValue

