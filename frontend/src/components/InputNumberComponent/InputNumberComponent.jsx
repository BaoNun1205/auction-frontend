import * as React from 'react'
import {
  Unstable_NumberInput as BaseNumberInput
} from '@mui/base/Unstable_NumberInput'
import { StyledButton, StyledInputElement, StyledInputRoot } from './style'

const NumberInputComponent = React.forwardRef(function NumberInputComponent(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton
      }}
      slotProps={{
        incrementButton: {
          children: '▴'
        },
        decrementButton: {
          children: '▾'
        }
      }}
      {...props}
      ref={ref}
    />
  )
})

export default NumberInputComponent