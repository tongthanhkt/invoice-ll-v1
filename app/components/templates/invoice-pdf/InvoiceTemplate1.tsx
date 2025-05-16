// Components
import { InvoiceLayout } from '@/app/components';

// Helpers
import { formatNumberWithCommas } from '@/lib/helpers';

// Variables
import { DATE_OPTIONS } from '@/lib/variables';

// Types
import { InvoiceType } from '@/types';

const InvoiceTemplate = (data: InvoiceType) => {
  const { payer, receiver, details } = data;

  return (
    <InvoiceLayout data={data}>
      <div className="mx-auto bg-white p-0 ">
        {/* Header with Logo and Title */}
        <div className="border-b border-gray-300 pb-4">
          <div className="py-0 px-4 rounded-md">
            <h2 className="text-lg font-bold text-gray-900 uppercase text-center">
              {payer.name}
            </h2>
            {payer.address && (
              <p className="text-sm text-gray-600 mt-1 text-center">
                {payer.address}
              </p>
            )}
            {payer.email && (
              <p className="text-sm text-gray-600 text-center">{payer.email}</p>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase py-2 px-4 rounded text-center">
            PAYMENT VOUCHER
          </h1>
        </div>

        {/* Voucher Details Section */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 my-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-20 text-sm">To:</span>
              <span className="text-sm">{receiver.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-20 text-sm">Address:</span>
              <span className="text-sm">{receiver.address}</span>
            </div>
            {receiver.email && (
              <div className="flex">
                <span className="font-semibold w-20 text-sm">Email:</span>
                <span className="text-sm">{receiver.email}</span>
              </div>
            )}
            {receiver.phone && (
              <div className="flex">
                <span className="font-semibold w-20 text-sm">Phone:</span>
                <span className="text-sm">{receiver.phone}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2">
              <span className="font-semibold text-sm">Voucher No:</span>
              <span className="text-right text-sm">
                {details.invoiceNumber}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-semibold text-sm">Date:</span>
              <span className="text-right text-sm">
                {details.invoiceDate &&
                  new Date(details.invoiceDate).toLocaleDateString(
                    'en-US',
                    DATE_OPTIONS
                  )}
              </span>
            </div>
          </div>
        </div>

        {/* Paid For Section */}
        <div className="my-6">
          {/* Table */}
          <div className="border border-gray-300 rounded overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-200 text-gray-800 font-medium text-sm">
              <div className="col-span-1 p-3 border-r border-gray-300">No</div>
              <div className="col-span-7 p-3 border-r border-gray-300">
                Description
              </div>

              <div className="col-span-2 p-3 ">Amount</div>
            </div>

            {/* Item Rows */}
            {details.items?.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 bg-white border-b border-gray-300`}
              >
                <div className="col-span-1 p-3 border-r border-gray-300 text-sm">
                  {index + 1}
                </div>
                <div className="col-span-7 p-3 border-r border-gray-300">
                  <p className="font-medium text-sm">{item.name}</p>
                  {item.description}
                </div>

                <div className="col-span-2 p-3 text-right text-sm">
                  {formatNumberWithCommas(Number(item.total))}{' '}
                  {details.currency}
                </div>
              </div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-12 py-2 ">
              <div className="col-span-10 px-2 text-right text-sm  text-neutral-500 ">
                Total
              </div>
              <div className="col-span-2 px-2 text-right text-sm font-semibold">
                {formatNumberWithCommas(Number(details.totalAmount))}{' '}
                {details.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          {/* Total in Words */}
          {details.totalAmountInWords && (
            <div className="mb-4 border-t border-gray-300 pt-2">
              <span className="font-semibold text-sm">Amount in words: </span>
              <span className="italic text-sm">
                {details.totalAmountInWords} {details.currency}
              </span>
            </div>
          )}
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;
