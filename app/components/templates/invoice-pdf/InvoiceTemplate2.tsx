// Components
import { InvoiceLayout } from '@/app/components';

// Helpers
import { formatNumberWithCommas } from '@/lib/helpers';

// Variables
import { DATE_OPTIONS } from '@/lib/variables';

// Types
import { InvoiceType } from '@/types';

const InvoiceTemplate2 = (data: InvoiceType) => {
  const { payer, receiver, details } = data;

  return (
    <InvoiceLayout data={data}>
      <div className="mx-auto bg-white p-0">
        {/* Header with Receiver Info */}
        <div className="border-b border-gray-300 pb-4">
          <div className="text-center">
            <h2
              className="text-lg font-bold text-gray-800 uppercase break-words"
              title={receiver.name}
            >
              {receiver.name}
            </h2>
          </div>
          <div className="text-sm text-center text-gray-700">
            {receiver.address && (
              <div className="break-words" title={receiver.address}>
                {receiver.address}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase py-1 text-center">
            INVOICE
          </h1>
        </div>

        {/* Invoice Details Section */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 my-6 ">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 ">
              <span className="font-semibold text-sm">To:</span>
              <span
                className="text-sm text-right break-words"
                title={payer.name}
              >
                {payer.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 !mt-1">
              <span className="font-semibold text-sm">Address:</span>
              <span
                className="text-sm text-right break-words"
                title={payer.address}
              >
                {payer.address}
              </span>
            </div>
            {/* <div className="mt-4">
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-sm">To:</span>
                <span className="text-sm text-right">{payer.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-sm">Address:</span>
                <span className="text-sm text-right">{payer.address}</span>
              </div>
            </div> */}
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-sm">Account holder:</span>
                <span
                  className="text-sm text-right break-words"
                  title={receiver.name}
                >
                  {receiver.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-sm">Account email:</span>
                <span
                  className="text-sm text-right break-words"
                  title={receiver.email}
                >
                  {receiver.email}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <span className="font-semibold text-sm">Invoice no:</span>
              <span
                className="text-right text-sm break-words"
                title={details.invoiceNumber}
              >
                {details.invoiceNumber}
              </span>
            </div>
            <div className="grid grid-cols-2 !mt-1">
              <span className="font-semibold text-sm ">Date:</span>
              <span
                className="text-right text-sm break-words"
                title={
                  details.invoiceDate &&
                  new Date(details.invoiceDate).toLocaleDateString(
                    'en-US',
                    DATE_OPTIONS
                  )
                }
              >
                {details.invoiceDate &&
                  new Date(details.invoiceDate).toLocaleDateString(
                    'en-US',
                    DATE_OPTIONS
                  )}
              </span>
            </div>
            {details.dueDate && (
              <div className="grid grid-cols-2">
                <span className="font-semibold text-sm">Due date:</span>
                <span
                  className="text-right text-sm break-words"
                  title={new Date(details.dueDate).toLocaleDateString(
                    'en-US',
                    DATE_OPTIONS
                  )}
                >
                  {new Date(details.dueDate).toLocaleDateString(
                    'en-US',
                    DATE_OPTIONS
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="my-6">
          <div className="border border-gray-300 rounded overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-200 text-gray-800 font-medium text-sm">
              <div className="col-span-1 p-3 border-r border-gray-300">No</div>
              <div className="col-span-5 p-3 border-r border-gray-300">
                Description
              </div>
              <div className="col-span-2 p-3 border-r border-gray-300">
                Unit Price
              </div>
              <div className="col-span-2 p-3 border-r border-gray-300">
                Quantity
              </div>
              <div className="col-span-2 p-3">Amount</div>
            </div>

            {/* Item Rows */}
            {details.items?.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 bg-white border-t border-gray-300`}
              >
                <div className="col-span-1 p-3 border-r border-gray-300 text-sm">
                  {index + 1}
                </div>
                <div className="col-span-5 p-3 border-r border-gray-300">
                  <p
                    className="text-sm font-medium break-words"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="break-words text-xs" title={item.description}>
                    {item.description}
                  </p>
                </div>
                <div className="col-span-2 p-3 text-right text-sm border-r border-gray-300 break-words">
                  {item.unitPrice &&
                    formatNumberWithCommas(Number(item.unitPrice))}
                </div>
                <div className="col-span-2 p-3 text-center text-sm border-r border-gray-300">
                  {item.quantity || 1}
                </div>
                <div className="col-span-2 p-3 text-right text-sm break-words">
                  {formatNumberWithCommas(Number(item.total))}{' '}
                  {details.currency}
                </div>
              </div>
            ))}

            {/* Tax Row (if applicable) */}
            <div className="grid grid-cols-12  border-t border-gray-300">
              <div className="col-span-10 p-2 text-right text-sm text-neutral-500 ">
                Tax
              </div>

              <div className="col-span-2 p-2 text-right text-sm font-semibold break-words">
                {details.taxDetails?.amountType === 'amount'
                  ? `${formatNumberWithCommas(
                      Number(details.taxDetails?.amount)
                    )}`
                  : ''}
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-12  ">
              <div className="col-span-10 px-2 text-right text-sm  text-neutral-500 ">
                Total
              </div>
              <div
                className="col-span-2 px-2 pb-2 text-right text-sm font-semibold break-words"
                title={`${formatNumberWithCommas(
                  Number(details.totalAmount)
                )} ${details.currency}`}
              >
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
              <span
                className="italic text-sm break-words block"
                title={`${details.totalAmountInWords} ${details.currency}`}
              >
                {details.totalAmountInWords} {details.currency}
              </span>
            </div>
          )}
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate2;
