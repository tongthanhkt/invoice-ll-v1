import { useFormContext } from 'react-hook-form';
import { Items } from '../..';

export const InvoiceItemTable = () => {
  const { watch } = useFormContext();
  return (
    <>
      <section className="space-y-4">
        <Items />
      </section>
      <section className="space-y-4">
        <div className="flex flex-col items-end w-full sm:w-auto border-t border-neutral-200">
          <div className="w-full sm:w-[300px] p-2 px-4 space-y-1">
            <div className="flex justify-between w-full text-lg">
              <span className="text-sm text-gray-500">Tax amount</span>
              <span className="font-semibold text-gray-700">
                {watch('details.taxDetails.amount') || 0}
              </span>
            </div>
            <div className="flex justify-between w-full text-lg">
              <span className="text-sm text-gray-500 font-medium">Total</span>
              <span className="font-semibold text-gray-700">
                {watch('details.subTotal') || 0}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
