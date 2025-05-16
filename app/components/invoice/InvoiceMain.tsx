'use client';

// RHF
import { useFormContext } from 'react-hook-form';

// ShadCn
import { Form } from '@/components/ui/form';

// Components

// Context
import { useInvoiceContext } from '@/contexts/InvoiceContext';

// Types
import { InvoiceType } from '@/types';

import { useEffect, useState } from 'react';
import InvoiceActions from './InvoiceActions';
import InvoiceForm from './InvoiceForm';
import PaymentVoucherForm from './PaymentVoucherForm';
import SidebarNavigation from './SidebarNavigation';

export interface PayerCombined {
  payers: Payer[];
  addresses: {
    _id: string;
    address: string;
  }[];
  emails: {
    _id: string;
    email: string;
  }[];
}

export interface ReceiverCombined {
  receivers: Receiver[];
  addresses: {
    _id: string;
    address: string;
  }[];
  emails: {
    _id: string;
    email: string;
  }[];
}

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
  zipCodes?: string[];
  cities?: string[];
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

const DOCUMENT_TYPES = [
  'Payment voucher',
  'Purchase order',
  'Quotation',
  'Invoice',
  'Contract',
  'Debit note',
  'Credit Note',
];

const InvoiceMain = () => {
  const { handleSubmit, watch, setValue, reset } =
    useFormContext<InvoiceType>();
  const { onFormSubmit, setInvoiceData } = useInvoiceContext();
  const [selectedType, setSelectedType] = useState(DOCUMENT_TYPES[0]); // Default to Payment voucher
  const [renderKey, setRenderKey] = useState(0); // Add key for forcing re-render
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  // States for data from API
  const [payers, setPayers] = useState<PayerCombined>();
  const [receivers, setReceivers] = useState<ReceiverCombined>();

  // Watch form values for live updates
  const formValues = watch();
  console.log('🚀 ~ InvoiceMain ~ formValues:', formValues);

  // // Set initial template when component mounts
  // useEffect(() => {
  //   setValue('details.pdfTemplate', 1); // Set template 1 for Payment voucher
  // }, []);

  // // Update invoice data when form values change
  // useEffect(() => {
  //   setInvoiceData(formValues);
  // }, []);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Set the template based on document type
    const templateNumber = type === 'Payment voucher' ? 1 : 2;

    // // Reset form data
    // reset({
    //   details: {
    //     pdfTemplate: templateNumber,
    //     invoiceNumber: '',
    //     invoiceDate: '',
    //   },
    //   payer: {
    //     name: '',
    //     address: '',
    //     email: '',
    //   },
    //   receiver: {
    //     name: '',
    //     address: '',
    //     email: '',
    //     zipCode: '',
    //     city: '',
    //   },

    // });

    setValue('details.pdfTemplate', templateNumber);
    setValue('details.invoiceNumber', '');
    setValue('details.invoiceDate', '');
    setValue('payer.name', '');
    setValue('payer.address', '');
    setValue('payer.email', '');
    setValue('receiver.name', '');
    setValue('receiver.address', '');
    setValue('receiver.email', '');
    setValue('receiver.zipCode', '');
    setValue('receiver.city', '');
    setValue('details.items', []);
    // // Force re-render of InvoiceActions and InvoiceTemplate
    // setRenderKey((prev) => prev + 1);
    setRenderKey((prev) => prev + 1);
  };

  const handleSidebarToggle = (minimized: boolean) => {
    setSidebarMinimized(minimized);
  };

  // fetch api combined payers and receivers here
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/payers-combined');
        const data = await response.json();
        console.log('🚀 ~ fetchData ~ data:', data);
        // Store the complete payers data
        setPayers(data || []);
      } catch (error) {
        console.error('Error fetching payers data:', error);
      }
    };

    const fetchReceivers = async () => {
      try {
        const response = await fetch('/api/receivers-combined');
        const data = await response.json();
        // Store the complete receivers data
        setReceivers(data || []);
      } catch (error) {
        console.error('Error fetching receivers data:', error);
      }
    };

    // fetch both in parallel
    Promise.all([fetchData(), fetchReceivers()])
      .then(() => {
        console.log('All data fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderForm = () => {
    switch (selectedType) {
      case 'Payment voucher':
        return (
          <PaymentVoucherForm payersData={payers} receiversData={receivers} />
        );
      case 'Invoice':
        return <InvoiceForm payersData={payers} receiversData={receivers} />;
      default:
        return <InvoiceForm payersData={payers} receiversData={receivers} />;
    }
  };

  console.log('🚀 ~ InvoiceMain ~ selectedType:', selectedType);

  return (
    <Form {...useFormContext<InvoiceType>()}>
      <form
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.log(err);
        })}
      >
        <div className="flex flex-col lg:flex-row w-full gap-4 pb-6">
          {/* Sidebar Navigation - for mobile/tablet it stacks, for desktop it's on the left */}
          <div
            className={`w-full ${
              sidebarMinimized ? 'lg:w-[60px]' : 'lg:w-[240px]'
            } transition-all duration-300`}
          >
            <SidebarNavigation
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
              onToggle={handleSidebarToggle}
            />
          </div>

          {/* <button onClick={() => setSelectedType('Invoice')}>Invoice</button>
          <button onClick={() => setSelectedType('Payment voucher')}>
            Payment voucher
          </button> */}

          {/* Form and Actions Container */}
          <div className="flex flex-col xl:flex-row w-full gap-4 mt-2 lg:mt-0">
            {/* Form */}
            <div className="w-full xl:flex-1">{renderForm()}</div>

            {/* Actions */}
            <div className="w-full xl:flex-1 mt-4 xl:mt-0">
              <InvoiceActions key={renderKey} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceMain;
