'use client';

import { useFormContext } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { AnimatePresence, motion } from 'framer-motion'

import { useInvoiceContext } from '@/contexts/InvoiceContext';

import { InvoiceType } from '@/types';

import { Button } from '@/components/ui/button';
import { FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import InvoiceActions from './InvoiceActions';
import InvoiceForm from './InvoiceForm';
import PaymentVoucherForm from './PaymentVoucherForm';
import SidebarNavigation from './SidebarNavigation';
import {
    actionsVariants,
    containerVariants,
    floatingButtonVariants,
    formVariants,
    itemVariants,
    mobileContentVariants,
    mobileOverlayVariants,
    tooltipVariants
} from '@/constants/animationVariants';

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
    const [mobileActionsVisible, setMobileActionsVisible] = useState(false);
    const [formLoaded, setFormLoaded] = useState(false)
    
    // Set form as loaded after a short delay for animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setFormLoaded(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    // States for data from API
    const [payers, setPayers] = useState<PayerCombined>();
    const [receivers, setReceivers] = useState<ReceiverCombined>();


    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        // Set the template based on document type
        const templateNumber = type === 'Payment voucher' ? 1 : 2;

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
        setRenderKey((prev) => prev + 1);
    };

    const handleSidebarToggle = (minimized: boolean) => {
        setSidebarMinimized(minimized);
    };

    const toggleMobileActions = () => {
        setMobileActionsVisible(!mobileActionsVisible);
    };

    // fetch api combined payers and receivers here
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/payers-combined');
                const data = await response.json();
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

    return (
        <Form {...useFormContext<InvoiceType>()}>
            <form
                onSubmit={handleSubmit(onFormSubmit, (err) => {
                    console.log(err);
                })}
            >
                <motion.div
                    className="flex flex-col lg:flex-row w-full gap-4 pb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={formLoaded ? "visible" : "hidden"}
                >
                    {/* Sidebar Navigation - for mobile/tablet it stacks, for desktop it's on the left */}
                    <motion.div
                        className={`w-full ${sidebarMinimized ? "lg:w-[60px]" : "lg:w-[240px]"} transition-all duration-300`}
                        variants={itemVariants}
                    >
                        <SidebarNavigation
                            selectedType={selectedType}
                            onTypeSelect={handleTypeSelect}
                            onToggle={handleSidebarToggle}
                        />
                    </motion.div>

                    <motion.div className="flex flex-col xl:flex-row w-full gap-4 mt-2 lg:mt-0" variants={itemVariants}>
                        {/* Form */}
                        <motion.div className="w-full xl:flex-1" variants={itemVariants}>
                            <AnimatePresence mode="wait">
                                <motion.div key={selectedType} variants={formVariants} initial="hidden"
                                            animate="visible" exit="exit">
                                    {renderForm()}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Actions for desktop */}
                        <motion.div className="w-full hidden xl:block xl:flex-1 mt-4 xl:mt-0"
                                    variants={actionsVariants}>
                            <InvoiceActions key={renderKey} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Floating action button for mobile with instruction tag */}
                <div className="fixed bottom-6 right-6 xl:hidden z-50 flex items-center">
                    <AnimatePresence>
                        {!mobileActionsVisible && (
                            <motion.div
                                className="bg-slate-800 text-white text-sm rounded-lg px-3 py-2 mr-3 shadow-lg"
                                variants={tooltipVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                Click here to generate your PDF
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        variants={floatingButtonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button
                            onClick={toggleMobileActions}
                            className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
                            aria-label="Preview Invoice"
                        >
                            {mobileActionsVisible ? <X size={24} /> : <FileText size={24} />}
                        </Button>
                    </motion.div>
                </div>

                {/* Mobile actions overlay */}
                <AnimatePresence>
                    {mobileActionsVisible && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 xl:hidden flex items-end"
                            variants={mobileOverlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className="bg-white w-full rounded-t-xl p-4 max-h-[80vh] overflow-auto"
                                variants={mobileContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Invoice Actions</h3>
                                    <Button variant="ghost" onClick={toggleMobileActions}>
                                        <X size={24} />
                                    </Button>
                                </div>
                                <InvoiceActions key={renderKey} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </Form>
    );
};

export default InvoiceMain;
