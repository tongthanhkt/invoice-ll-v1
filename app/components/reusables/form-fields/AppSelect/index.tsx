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
          control: () =>
            'min-h-[38px] md:min-h-[42px] border border-gray-200 hover:!border-blue-400 !shadow-none px-0 !rounded-lg !outline-0 transition-all',
          valueContainer: () => 'py-1 sm:py-1.5 px-2 sm:px-3',
          input: () => 'text-sm sm:text-base',
          menu: () => 'bg-white px-2 py-0 !rounded-lg !shadow-md z-50',
          menuList: () => 'max-h-[180px] sm:max-h-[250px]',
          option: ({ isSelected, isFocused }) =>
            `text-gray-900 hover:text-gray-900 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer my-1 sm:my-2 text-sm sm:text-base ${
              isSelected
                ? '!bg-blue-100 !text-blue-600 hover:text-blue-600 hover:bg-blue-100'
                : 'bg-white'
            } ${isFocused ? '!bg-blue-50' : ''}`,
          placeholder: () => 'text-sm sm:text-base text-gray-500',
          indicatorsContainer: () => 'h-full',
          ...props.classNames,
        }}
      />
    </div>
  );
};
