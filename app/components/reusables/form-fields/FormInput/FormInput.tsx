'use client';

// RHF
import { useFormContext } from 'react-hook-form';

// ShadCn
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import styles from './styles.module.scss';

type FormInputProps = {
  name: string;
  label?: string;
  labelHelper?: string;
  placeholder?: string;
  vertical?: boolean;
} & InputProps;

const FormInput = ({
  name,
  label,
  labelHelper,
  placeholder,
  vertical = true,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext();

  const verticalInput = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className={`${styles.input} w-full`}>
            {label && (
              <FormLabel className={`${styles.input__label} truncate`}>
                {label}
              </FormLabel>
            )}

            {labelHelper && (
              <span className="text-xs text-neutral-500 truncate">
                {' '}
                {labelHelper}
              </span>
            )}

            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className={`${styles.input__field} text-sm sm:text-base h-9 sm:h-10`}
                {...props}
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </div>
        </FormItem>
      )}
    />
  );

  const horizontalInput = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div
            className={`${styles.input} sm:flex-row sm:items-center sm:gap-4`}
          >
            {label && (
              <FormLabel className="flex-shrink-0 sm:w-1/3 truncate">{`${label}:`}</FormLabel>
            )}
            {labelHelper && (
              <span className="text-xs text-neutral-500 truncate">
                {' '}
                {labelHelper}
              </span>
            )}

            <div className="flex-1 w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`${styles.input__field} text-sm sm:text-base h-9 sm:h-10 w-full`}
                  {...props}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
  return vertical ? verticalInput : horizontalInput;
};

export default FormInput;
