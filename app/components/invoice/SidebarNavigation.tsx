'use client';

import {
  ChevronLeft,
  ChevronRight,
  FileCheck,
  FileMinus,
  FileSpreadsheet,
  FileText,
  FileWarning,
  Receipt,
  ScrollText,
} from 'lucide-react';
import { useState } from 'react';

// ShadCn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Components
import { BaseButton } from '@/app/components';

type DocumentType = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
};

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'payment-voucher',
    label: 'Payment voucher',
    icon: FileSpreadsheet,
    enabled: true,
  },
  {
    id: 'purchase-order',
    label: 'Purchase order',
    icon: FileText,
    enabled: false,
  },
  {
    id: 'quotation',
    label: 'Quotation',
    icon: FileCheck,
    enabled: false,
  },
  {
    id: 'invoice',
    label: 'Invoice',
    icon: Receipt,
    enabled: true,
  },
  {
    id: 'contract',
    label: 'Contract',
    icon: ScrollText,
    enabled: false,
  },
  {
    id: 'debit-note',
    label: 'Debit note',
    icon: FileWarning,
    enabled: false,
  },
  {
    id: 'credit-note',
    label: 'Credit Note',
    icon: FileMinus,
    enabled: false,
  },
];

type SidebarNavigationProps = {
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onToggle?: (minimized: boolean) => void;
  disabled?: boolean;
};

const SidebarNavigation = ({
  selectedType,
  onTypeSelect,
  onToggle,
  disabled,
}: SidebarNavigationProps) => {
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    const newState = !minimized;
    setMinimized(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Mobile dropdown view */}
      <div className="md:hidden w-full">
        <Select
          value={selectedType}
          onValueChange={(value) => onTypeSelect(value)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full border border-gray-200 bg-white">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPES.map((docType) => (
              <SelectItem
                key={docType.id}
                value={docType.label}
                disabled={!docType.enabled}
              >
                <div className="flex items-center gap-2">
                  {docType.icon && <docType.icon className="w-4 h-4" />}
                  <span>{docType.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tablet horizontal navigation */}
      <div className="hidden md:flex lg:hidden w-full overflow-x-auto pb-2">
        <div className="flex gap-2">
          {DOCUMENT_TYPES.map((docType) => {
            const isSelected = docType.label === selectedType;
            const Icon = docType.icon;

            return (
              <BaseButton
                key={docType.id}
                variant="outline"
                onClick={() => docType.enabled && onTypeSelect(docType.label)}
                disabled={disabled || !docType.enabled}
                className={`flex items-center justify-center border gap-2 px-3 py-2 whitespace-nowrap 
                  ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'
                  }
                  ${!docType.enabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{docType.label}</span>
              </BaseButton>
            );
          })}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:block h-full bg-white border border-gray-200 rounded-lg transition-all duration-300 ease-in-out relative ${
          minimized ? 'w-[60px]' : 'w-full max-w-[220px]'
        }`}
      >
        {/* Toggle button positioned at the right edge of the sidebar */}
        <div className="absolute -right-3 top-4 z-10">
          <BaseButton
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            tooltipLabel={minimized ? 'Expand sidebar' : 'Collapse sidebar'}
            className="rounded-full w-6 h-6 p-0 flex items-center justify-center border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          >
            {minimized ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </BaseButton>
        </div>

        <div className="flex flex-col gap-2 p-2 pl-0 mt-4">
          {DOCUMENT_TYPES.map((docType) => {
            const isSelected = docType.label === selectedType;
            const Icon = docType.icon;

            return (
              <BaseButton
                key={docType.id}
                variant="outline"
                onClick={() => docType.enabled && onTypeSelect(docType.label)}
                disabled={disabled || !docType.enabled}
                className={`flex items-center ${
                  minimized ? 'justify-center' : 'justify-start'
                } border-0 gap-2 ${
                  minimized ? 'px-2' : 'px-4'
                } py-2 rounded-none rounded-r-lg transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? 'border-l-2 !border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'
                  }
                  ${!docType.enabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                tooltipLabel={minimized ? docType.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!minimized && (
                  <span className="text-sm font-medium truncate overflow-hidden transition-all duration-300">
                    {docType.label}
                  </span>
                )}
              </BaseButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
