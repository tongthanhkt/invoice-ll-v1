import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AppSelect } from '../../reusables/form-fields/AppSelect';
import { PayerCombined } from '../InvoiceMain';
import { SectionContainer } from '../SectionContainer';

interface Payer {
  _id: string;
  name: string;
  emails: string[];
  addresses: string[];
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

interface PayerSectionProps {
  payersData?: PayerCombined;
}

export const PayerSection = ({ payersData }: PayerSectionProps) => {
  const methods = useFormContext();
  const { setValue } = methods;

  // Initialize with data from props
  const [payers, setPayers] = useState<Payer[]>([]);
  const [payerEmails, setPayerEmails] = useState<SelectOption[]>([]);
  const [payerAddresses, setPayerAddresses] = useState<SelectOption[]>([]);

  // Update state when props change
  useEffect(() => {
    if (payersData?.payers) {
      setPayers(payersData.payers);
    }

    if (payersData?.emails) {
      const emailOptions = payersData.emails.map((email) => ({
        value: email.email,
        label: email.email,
      }));
      setPayerEmails(emailOptions);
    }

    if (payersData?.addresses) {
      const addressOptions = payersData.addresses.map((address) => ({
        value: address.address,
        label: address.address,
      }));
      setPayerAddresses(addressOptions);
    }
  }, [payersData]);

  // Initialize select options
  const [selectedPayer, setSelectedPayer] = useState<SelectOption | null>(null);
  const [selectedPayerEmail, setSelectedPayerEmail] =
    useState<SelectOption | null>(null);
  const [selectedPayerAddress, setSelectedPayerAddress] =
    useState<SelectOption | null>(null);

  return (
    <SectionContainer title="Payer Details">
      <AppSelect
        label="Payer"
        value={selectedPayer}
        options={payers.map((payer: Payer) => ({
          value: payer._id,
          label: payer.name,
        }))}
        placeholder="Select or create payer"
        onChange={(option: any) => {
          setSelectedPayer(option);
          if (!option) {
            setValue('payer.name', '');
          } else if (option?.__isNew__) {
            setValue('payer.name', option.label);
          } else {
            setValue('payer.name', option.label);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const response = await fetch('/api/payers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: inputValue,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create payer');
            }

            const newPayer = await response.json();
            setPayers([...payers, newPayer]);
            setSelectedPayer({
              value: newPayer.id,
              label: newPayer.name,
            });
            setValue('payer.name', newPayer.name);
            return {
              value: newPayer.id,
              label: newPayer.name,
            };
          } catch (error) {
            console.error('Error creating payer:', error);
            return null;
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
      <AppSelect
        label="Payer Email"
        value={selectedPayerEmail}
        options={payerEmails}
        placeholder="Select or create email"
        onChange={(option: any) => {
          setSelectedPayerEmail(option);
          if (!option) {
            setValue('payer.email', '');
          } else if (option?.__isNew__) {
            setValue('payer.email', option.label);
          } else {
            setValue('payer.email', option.value);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const response = await fetch('/api/payer-emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: inputValue,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create payer email');
            }

            const newEmail = await response.json();
            setPayerEmails([
              ...payerEmails,
              {
                value: newEmail.email,
                label: newEmail.email,
              },
            ]);
            setSelectedPayerEmail({
              value: newEmail.email,
              label: newEmail.email,
            });
            setValue('payer.email', newEmail.email);
            return {
              value: newEmail.email,
              label: newEmail.email,
            };
          } catch (error) {
            console.error('Error creating payer email:', error);
            return null;
          }
        }}
        // className="w-full bg-white text-gray-900"
        // classNames={{
        //   control: () => 'border border-gray-200 h-10 px-3 rounded-md',
        //   input: () => 'text-sm',
        //   menu: () => 'bg-white mt-1 border border-gray-200 rounded-md',
        //   option: () => `text-gray-900 px-3 py-2 hover:bg-gray-100`,
        // }}
        isSearchable={true}
        isClearable={true}
      />
      <AppSelect
        label="Payer Address"
        value={selectedPayerAddress}
        options={payerAddresses}
        placeholder="Select or create address"
        onChange={(option: any) => {
          setSelectedPayerAddress(option);
          if (!option) {
            setValue('payer.address', '');
          } else if (option?.__isNew__) {
            setValue('payer.address', option.label);
          } else {
            setValue('payer.address', option.value);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const response = await fetch('/api/payer-addresses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                address: inputValue,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create payer address');
            }

            const newAddress = await response.json();
            setPayerAddresses([
              ...payerAddresses,
              {
                value: newAddress.address,
                label: newAddress.address,
              },
            ]);
            setSelectedPayerAddress({
              value: newAddress.address,
              label: newAddress.address,
            });
            setValue('payer.address', newAddress.address);
            return {
              value: newAddress.address,
              label: newAddress.address,
            };
          } catch (error) {
            console.error('Error creating payer address:', error);
            return null;
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
    </SectionContainer>
  );
};
