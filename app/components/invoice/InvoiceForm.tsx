'use client';

import { useMemo } from 'react';
// RHF
import { useFormContext, useWatch } from 'react-hook-form';

// ShadCn
import { Label } from '@/components/ui/label';

// Components
import { DatePickerFormField } from '@/app/components';

// Contexts
import { useTranslationContext } from '@/contexts/TranslationContext';
import { InvoiceContainer } from './InvoiceContainer';
import { InvoiceItemTable } from './InvoiceItemTable';
import { PayerCombined, ReceiverCombined } from './InvoiceMain';
import { PayerSection } from './PayerSection';
import { ReceiverSection } from './ReceiverSection';
import { VoucherSection } from './VoucherSection';

interface Payer {
  _id: string;
  name: string;
  emails: string[];
  addresses: string[];
}

interface Receiver {
  _id: string;
  name: string;
  emails: string[];
  addresses?: string[];
}

interface InvoiceFormProps {
  payersData?: PayerCombined;
  receiversData?: ReceiverCombined;
}

const InvoiceForm = ({ payersData, receiversData }: InvoiceFormProps) => {
  const { _t } = useTranslationContext();
  const { control } = useFormContext();

  // Get invoice number variable
  const invoiceNumber = useWatch({
    name: 'details.invoiceNumber',
    control,
  });

  const invoiceLabel = useMemo(() => {
    if (invoiceNumber) {
      return `#${invoiceNumber}`;
    } else {
      return 'New Invoice';
    }
  }, [invoiceNumber]);

  return (
    <InvoiceContainer title="Invoice" invoiceLabel={invoiceLabel}>
      <div className="space-y-8">
        {/* Voucher Details */}
        <VoucherSection numberTitle="Invoice Number">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-700">
                Date
              </Label>
              <div className="bg-white text-gray-900">
                <DatePickerFormField name="details.invoiceDate" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-700">
                Due Date
              </Label>
              <div className="bg-white text-gray-900">
                <DatePickerFormField name="details.dueDate" />
              </div>
            </div>
          </div>
        </VoucherSection>

        {/* Payer Details */}
        <PayerSection payersData={payersData} />

        {/* Receiver Details */}
        <ReceiverSection receiversData={receiversData} />

        {/* Items Table */}
        <InvoiceItemTable />
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceForm;
