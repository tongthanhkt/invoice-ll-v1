import { Label } from '@/components/ui/label';
import CreatableSelect, { CreatableProps } from 'react-select/creatable';

export const AppSelect = ({
  label,
  ...props
}: CreatableProps<any, any, any> & { label: string }) => {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <Label className="text-sm font-medium text-neutral-700 block truncate">
        {label}
      </Label>
      <CreatableSelect
        {...props}
        className="w-full bg-white text-gray-900 text-sm sm:text-base"
        classNames={{
          control: ({ isFocused }) =>
            `min-h-[38px] md:min-h-[42px] border ${
              isFocused ? 'border-blue-500' : 'border-gray-200'
            } hover:!border-blue-500 !shadow-none px-0 !rounded-xl !outline-0 transition-all duration-200 ${
              isFocused ? 'ring-2 ring-blue-100' : ''
            }`,
          valueContainer: () => 'py-1.5 sm:py-2 px-3 sm:px-4',
          input: () => 'text-sm sm:text-base',
          menu: () =>
            'bg-white px-2 py-1 !rounded-xl !shadow-lg z-50 border border-gray-100 mt-1',
          menuList: () => 'max-h-[200px] sm:max-h-[280px]',
          option: ({ isSelected, isFocused }) =>
            `text-gray-900 hover:text-gray-900 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 sm:my-1.5 text-sm sm:text-base transition-all duration-150 ${
              isSelected
                ? '!bg-blue-100 !text-blue-600 hover:text-blue-600 hover:bg-blue-100 font-medium'
                : 'bg-white'
            } ${isFocused ? '!bg-blue-50 shadow-sm' : ''}`,
          placeholder: () => 'text-sm sm:text-sm text-gray-400',
          indicatorsContainer: () => 'h-full',
          dropdownIndicator: () => 'text-gray-400 hover:text-blue-500 p-2',
          clearIndicator: () => 'text-gray-400 hover:text-red-500 p-2',
          multiValue: () =>
            'bg-blue-50 rounded-md overflow-hidden mr-1.5 my-0.5',
          multiValueLabel: () => 'px-2 py-1 text-blue-700 text-sm',
          multiValueRemove: () =>
            'px-1 hover:bg-red-100 hover:text-red-700 text-blue-500 rounded-r-md',
          ...props.classNames,
        }}
        styles={{
          control: (base) => ({
            ...base,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            '&:hover': {
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.07)',
            },
          }),
          ...props.styles,
        }}
      />
    </div>
  );
};
