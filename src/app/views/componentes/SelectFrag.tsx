import { FormControl } from '@mui/material';
import Select from 'react-select';
import SelectValues from '../../interfaces/Share';

const SelectFrag = ({
  value,
  options,
  onInputChange,
  placeholder,
  disabled
}: {
  value: string,
  options: SelectValues[],
  onInputChange: Function,
  placeholder: string,
  disabled: boolean
}

) => {
  return (
    <FormControl sx={{ width: "100%" }}  >
      <Select
        aria-label={"Presione enter para seleccionar"}
        noOptionsMessage={()=>"Sin opciones"}
        value={value != "" ? options.find(element => element.value === value) : []}
        options={options}
        defaultValue={[]}
        isDisabled={disabled}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        onChange={(v) => (v === null) ?
          onInputChange(String(disabled))
          :
          onInputChange(v.value)
        }
        placeholder={ placeholder}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'rgb(175, 140, 85)',
            primary: 'rgb(175, 140, 85)',
          },
        })}

        styles={{
          menu: (base) => ({
            position: 'absolute',
            paddingLeft: '1rem',
            zIndex: 500,
            ...base
          }),

        }}
      />
    </FormControl>
  )
}

export default SelectFrag
