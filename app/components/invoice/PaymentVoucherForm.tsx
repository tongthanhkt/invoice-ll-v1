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
import { PayerCombined, ReceiverCombined } from './InvoiceMain';
import { PayerSection } from './PayerSection';
import { ReceiverSection } from './ReceiverSection';
import { VoucherItemTable } from './VoucherItemTable';
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

interface PaymentVoucherFormProps {
  payersData?: PayerCombined;
  receiversData?: ReceiverCombined;
}

const PaymentVoucherForm = ({
  payersData,
  receiversData,
}: PaymentVoucherFormProps) => {
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
    <InvoiceContainer title="Payment Voucher" invoiceLabel={invoiceLabel}>
      <div className="space-y-8">
        {/* Voucher Details */}
        <VoucherSection
          numberTitle="Voucher Number"
          className="grid grid-cols-2 gap-4 items-start"
        >
          <div className="space-y-2 !-mt-1">
            <Label className="text-sm font-medium text-gray-700">Date</Label>
            <div className="bg-white text-gray-900 mt-2">
              <DatePickerFormField name="details.invoiceDate" />
            </div>
          </div>
        </VoucherSection>

        {/* Payer Details */}
        <PayerSection payersData={payersData} />

        {/* Receiver Details */}
        <ReceiverSection receiversData={receiversData} />

        {/* Items Table */}
        <VoucherItemTable />
      </div>
    </InvoiceContainer>
  );
};

export default PaymentVoucherForm;
