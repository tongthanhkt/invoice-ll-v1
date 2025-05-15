'use client';

// RHF
import { useFormContext } from 'react-hook-form';

// ShadCn
import { Form } from '@/components/ui/form';

// Components
import SidebarNavigation from './SidebarNavigation';

// Context
import { useInvoiceContext } from '@/contexts/InvoiceContext';

// Types
import { InvoiceType } from '@/types';

import { useEffect, useState } from 'react';
import InvoiceActions from './InvoiceActions';
import InvoiceForm from './InvoiceForm';
import PaymentVoucherForm from './PaymentVoucherForm';

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

  // Watch form values for live updates
  const formValues = watch();

  // Set initial template when component mounts
  useEffect(() => {
    setValue('details.pdfTemplate', 1); // Set template 1 for Payment voucher
  }, []);

  // Update invoice data when form values change
  useEffect(() => {
    setInvoiceData(formValues);
  }, []);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Set the template based on document type
    const templateNumber = type === 'Payment voucher' ? 1 : 2;

    // Reset form data
    reset({
      details: {
        pdfTemplate: templateNumber,
        invoiceNumber: '',
        invoiceDate: '',
      },
      payer: {
        name: '',
        address: '',
        email: '',
      },
      receiver: {
        name: '',
        address: '',
        email: '',
        zipCode: '',
        city: '',
      },
    });

    // Force re-render of InvoiceActions and InvoiceTemplate
    setRenderKey((prev) => prev + 1);
  };

  const handleSidebarToggle = (minimized: boolean) => {
    setSidebarMinimized(minimized);
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'Payment voucher':
        return <PaymentVoucherForm />;
      case 'Invoice':
        return <InvoiceForm />;
      default:
        return <InvoiceForm />;
    }
  };

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
