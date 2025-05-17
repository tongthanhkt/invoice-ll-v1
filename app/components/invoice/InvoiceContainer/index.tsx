import { Badge } from '@/components/ui/badge';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export const InvoiceContainer = ({
  title,
  invoiceLabel,
  children,
}: {
  title: string;
  invoiceLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto sm:px-6">
      <div className="border border-solid border-neutral-200 rounded-lg bg-white">
        <CardHeader className="border-b border-border/40 bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-800">
                {title}
              </span>
            </CardTitle>
            <Badge
              variant="secondary"
              className="h-8 rounded-md px-3 bg-gray-100 cursor-pointer self-start sm:self-auto"
            >
              <p className="text-sm font-medium text-gray-900">
                {invoiceLabel}
              </p>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pb-10 bg-white h-[calc(100vh_-_196px)] overflow-y-auto">
          {children}
        </CardContent>
      </div>
    </div>
  );
};
