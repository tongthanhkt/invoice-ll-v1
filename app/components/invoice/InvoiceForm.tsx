'use client';

import { useEffect, useMemo, useState } from 'react';
// RHF
import { useFormContext, useWatch } from 'react-hook-form';

// ShadCn
import { Label } from '@/components/ui/label';

// Components
import { DatePickerFormField } from '@/app/components';

// Contexts
import { useInvoiceContext } from '@/contexts/InvoiceContext';
import { useTranslationContext } from '@/contexts/TranslationContext';
import { InvoiceContainer } from './InvoiceContainer';
import { InvoiceItemTable } from './InvoiceItemTable';
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
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

const InvoiceForm = () => {
  const { _t } = useTranslationContext();
  const { control, setValue, watch, getValues } = useFormContext();
  const context = useInvoiceContext();
  const { setInvoiceData } = context;
  const [payers, setPayers] = useState<Payer[]>([]);
  const [payerEmails, setPayerEmails] = useState<SelectOption[]>([]);
  const [payerAddresses, setPayerAddresses] = useState<SelectOption[]>([]);
  const [receivers, setReceivers] = useState<Receiver[]>([]);

  const [receiverEmails, setReceiverEmails] = useState<SelectOption[]>([]);
  const [receiverAddresses, setReceiverAddresses] = useState<SelectOption[]>(
    []
  );
  const [selectedPayer, setSelectedPayer] = useState<SelectOption | null>(null);
  const [selectedReceiver, setSelectedReceiver] = useState<SelectOption | null>(
    null
  );
  const [selectedPayerEmail, setSelectedPayerEmail] =
    useState<SelectOption | null>(null);
  const [selectedReceiverEmail, setSelectedReceiverEmail] =
    useState<SelectOption | null>(null);
  const [selectedPayerAddress, setSelectedPayerAddress] =
    useState<SelectOption | null>(null);
  const [selectedReceiverAddress, setSelectedReceiverAddress] =
    useState<SelectOption | null>(null);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] =
    useState<SelectOption | null>(null);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          payersResponse,
          receiversResponse,
          payerEmailsResponse,
          payerAddressesResponse,
          receiverEmailsResponse,
          receiverAddressesResponse,
        ] = await Promise.all([
          fetch('/api/payers'),
          fetch('/api/receivers'),
          fetch('/api/payer-emails'),
          fetch('/api/payer-addresses'),
          fetch('/api/receiver-emails'),
          fetch('/api/receiver-addresses'),
        ]);

        if (payersResponse.ok) {
          const payersData = await payersResponse.json();
          setPayers(payersData);
        }

        if (receiversResponse.ok) {
          const receiversData = await receiversResponse.json();
          setReceivers(receiversData);
        }

        if (payerEmailsResponse.ok) {
          const emails = await payerEmailsResponse.json();
          setPayerEmails(
            emails.map((email: any) => ({
              value: email.email,
              label: email.email,
            }))
          );
        }

        if (payerAddressesResponse.ok) {
          const addresses = await payerAddressesResponse.json();
          setPayerAddresses(
            addresses.map((address: any) => ({
              value: address.address,
              label: address.address,
            }))
          );
        }

        if (receiverEmailsResponse.ok) {
          const emails = await receiverEmailsResponse.json();
          setReceiverEmails(
            emails.map((email: any) => ({
              value: email.email,
              label: email.email,
            }))
          );
        }

        if (receiverAddressesResponse.ok) {
          const addresses = await receiverAddressesResponse.json();
          setReceiverAddresses(
            addresses.map((address: any) => ({
              value: address.address,
              label: address.address,
            }))
          );
        }

        // Initialize select states from form values
        const formValues = getValues();

        // Initialize payer select
        if (formValues.payer?.name) {
          const payer = payers.find(
            (p: Payer) => p.name === formValues.payer.name
          );
          if (payer) {
            setSelectedPayer({
              value: payer._id,
              label: payer.name,
            });
          }
        }

        // Initialize payer email select
        if (formValues.payer?.email) {
          setSelectedPayerEmail({
            value: formValues.payer.email,
            label: formValues.payer.email,
          });
        }

        // Initialize payer address select
        if (formValues.payer?.address) {
          setSelectedPayerAddress({
            value: formValues.payer.address,
            label: formValues.payer.address,
          });
        }

        // Initialize receiver select
        if (formValues.receiver?.name) {
          const receiver = receivers.find(
            (r: Receiver) => r.name === formValues.receiver.name
          );
          if (receiver) {
            setSelectedReceiver({
              value: receiver._id,
              label: receiver.name,
            });
          }
        }

        // Initialize receiver email select
        if (formValues.receiver?.email) {
          setSelectedReceiverEmail({
            value: formValues.receiver.email,
            label: formValues.receiver.email,
          });
        }

        // Initialize receiver address select
        if (formValues.receiver?.address) {
          setSelectedReceiverAddress({
            value: formValues.receiver.address,
            label: formValues.receiver.address,
          });
        }

        // Initialize invoice number select
        if (formValues.details?.invoiceNumber) {
          setSelectedInvoiceNumber({
            value: formValues.details.invoiceNumber,
            label: formValues.details.invoiceNumber,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getValues]);

  // Get invoice number variable
  const invoiceNumber = useWatch({
    name: 'details.invoiceNumber',
    control,
  });

  // Watch all form fields for changes

  // Update invoice data whenever form values change
  useEffect(() => {
    const currentValues = getValues();
    setInvoiceData({
      payer: {
        name: currentValues.payer?.name || '',
        email: currentValues.payer?.email || '',
        address: currentValues.payer?.address || '',
      },
      receiver: {
        name: currentValues.receiver?.name || '',
        address: currentValues.receiver?.address || '',
        zipCode: currentValues.receiver?.zipCode || '',
        city: currentValues.receiver?.city || '',
        country: currentValues.receiver?.country || '',
        email: currentValues.receiver?.email || '',
        phone: currentValues.receiver?.phone || '',
        customInputs: currentValues.receiver?.customInputs || [],
      },
      details: {
        currency: currentValues.details?.currency || '',
        invoiceNumber: currentValues.details?.invoiceNumber || '',
        invoiceDate: currentValues.details?.invoiceDate || '',
        dueDate: currentValues.details?.dueDate || '',
        language: currentValues.details?.language || '',
        items: currentValues.details?.items || [],
        subTotal: currentValues.details?.subTotal || 0,
        totalAmount: currentValues.details?.totalAmount || 0,
        totalAmountInWords: currentValues.details?.totalAmountInWords || '',
        paymentTerms: currentValues.details?.paymentTerms || '',
        pdfTemplate: currentValues.details?.pdfTemplate || '1',
        updatedAt: currentValues.details?.updatedAt || '',
      },
    });
  }, []);

  // Auto-fill payer details when selected
  const handlePayerChange = (payerId: string) => {
    const selectedPayer = payers.find((p) => p._id === payerId);
    if (selectedPayer) {
      setSelectedPayer({
        value: selectedPayer._id,
        label: selectedPayer.name,
      });
      setValue('payer.name', selectedPayer.name);
    }
  };

  // Auto-fill receiver details when selected
  const handleReceiverChange = (receiverId: string) => {
    const selectedReceiver = receivers.find((r) => r._id === receiverId);
    if (selectedReceiver) {
      setSelectedReceiver({
        value: selectedReceiver._id,
        label: selectedReceiver.name,
      });
      setValue('receiver.name', selectedReceiver.name);
      setValue('receiver.email', selectedReceiver.emails[0] || '');
    }
  };

  // Get payer addresses for the selected payer

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
        <PayerSection
          payers={payers}
          payerEmails={payerEmails}
          payerAddresses={payerAddresses}
          selectedPayer={selectedPayer}
          selectedPayerEmail={selectedPayerEmail}
          selectedPayerAddress={selectedPayerAddress}
          setPayers={setPayers}
          setPayerEmails={setPayerEmails}
          setPayerAddresses={setPayerAddresses}
          setSelectedPayer={setSelectedPayer}
          setSelectedPayerEmail={setSelectedPayerEmail}
          setSelectedPayerAddress={setSelectedPayerAddress}
        />

        {/* Receiver Details */}
        <ReceiverSection
          receivers={receivers}
          receiverEmails={receiverEmails}
          receiverAddresses={receiverAddresses}
          selectedReceiver={selectedReceiver}
          selectedReceiverEmail={selectedReceiverEmail}
          selectedReceiverAddress={selectedReceiverAddress}
          setReceivers={setReceivers}
          setReceiverEmails={setReceiverEmails}
          setReceiverAddresses={setReceiverAddresses}
          setSelectedReceiver={setSelectedReceiver}
          setSelectedReceiverEmail={setSelectedReceiverEmail}
          setSelectedReceiverAddress={setSelectedReceiverAddress}
        />

        {/* Items Table */}
        <InvoiceItemTable />
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceForm;
