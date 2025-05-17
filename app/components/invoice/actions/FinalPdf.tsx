'use client';

// ShadCn

// Components
import { BaseButton } from '@/app/components';

// Contexts
import { useInvoiceContext } from '@/contexts/InvoiceContext';

// Icons
import {
  BookmarkIcon,
  DownloadCloudIcon,
  Eye,
  MoveLeft,
  Printer,
} from 'lucide-react';

export default function FinalPdf() {
  const {
    pdfUrl,
    removeFinalPdf,
    previewPdfInTab,
    downloadPdf,
    printPdf,
    saveInvoice,
    sendPdfToMail,
  } = useInvoiceContext();

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 px-2 sm:px-4 border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="flex items-center mb-2 sm:mb-0">
          <BaseButton
            variant="ghost"
            tooltipLabel="Back to preview"
            size="sm"
            onClick={removeFinalPdf}
            className="text-neutral-700 hover:text-blue-600 flex items-center gap-1.5"
          >
            <MoveLeft className="w-4 h-4" />
            <span>Back to editor</span>
          </BaseButton>
        </div>

        {/* Actions toolbar */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <BaseButton
            tooltipLabel="Preview invoice in new tab"
            onClick={previewPdfInTab}
            size="sm"
            variant="outline"
            className="flex items-center gap-1.5 h-9 px-3"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </BaseButton>

          <BaseButton
            tooltipLabel="Download invoice PDF"
            onClick={downloadPdf}
            size="sm"
            variant="outline"
            className="flex items-center gap-1.5 h-9 px-3"
          >
            <DownloadCloudIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </BaseButton>

          <BaseButton
            tooltipLabel="Print invoice"
            onClick={printPdf}
            size="sm"
            variant="outline"
            className="flex items-center gap-1.5 h-9 px-3"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </BaseButton>

          <BaseButton
            tooltipLabel="Save invoice in website"
            onClick={saveInvoice}
            size="sm"
            variant="default"
            className="flex items-center gap-1.5 h-9 px-3 bg-blue-500 text-white hover:bg-blue-600"
          >
            <BookmarkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </BaseButton>
        </div>
      </div>

      <div className="flex-grow bg-neutral-100 p-4">
        <div className="max-w-[850px] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <iframe
            className="w-full h-[calc(100vh_-_140px)]"
            src={`${pdfUrl}#toolbar=0`}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}
