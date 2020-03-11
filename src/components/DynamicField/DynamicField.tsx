import React, { ReactElement } from 'react';
import { FieldArray, Field } from 'formik';
import { Button, TextField, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { AnimatePresence, motion } from 'framer-motion';

import shortid from 'shortid';
import LightTooltip from '../LightTooltip/LightTooltip';
import FormNumberInput from '../FormNumberField/FormNumberField';
import FormDiv from './FormDiv';

interface Props {
    values: { id: string; name: string; value: number | null }[];
    addButtonText: string;
    name: string;
}

const useStyles = makeStyles({
    marginRight: {
        marginRight: '15px'
    }
});

export default function DynamicField({
    values,
    addButtonText,
    name
}: Props): ReactElement {
    const classes = useStyles();
    return (
        <FieldArray name={name}>
            {arrayHelpers => (
                <FormDiv>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() =>
                            arrayHelpers.push({
                                id: shortid.generate(),
                                name: '',
                                value: null
                            })
                        }
                    >
                        {addButtonText}
                    </Button>
                    <AnimatePresence>
                        {values.map((item, index) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={item.id}
                                    style={{ marginTop: '15px' }}
                                >
                                    <Field
                                        as={TextField}
                                        name={`${name}.${index}.name`}
                                        className={classes.marginRight}
                                    />

                                    <FormNumberInput
                                        name={`${name}.${index}.value`}
                                        label='' // FIXME: make this optional?
                                    />
                                    <LightTooltip
                                        title='delete'
                                        placement='right'
                                    >
                                        <IconButton
                                            aria-label='delete'
                                            onClick={() =>
                                                arrayHelpers.remove(index)
                                            }
                                            style={{
                                                padding: '8px'
                                            }}
                                        >
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </LightTooltip>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </FormDiv>
            )}
        </FieldArray>
    );
}
