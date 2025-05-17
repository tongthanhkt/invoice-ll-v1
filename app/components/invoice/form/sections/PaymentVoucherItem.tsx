'use client';

import { useCallback, useState } from 'react';

// RHF
import { useFieldArray, useFormContext } from 'react-hook-form';

// DnD
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// Components

// Contexts
import { useTranslationContext } from '@/contexts/TranslationContext';

// Icons
import { Plus } from 'lucide-react';

// Types
import { BaseButton } from '@/app/components';
import { InvoiceType } from '@/types';
import VoucherSingleItem from '../VoucherSingleItem';

const PaymentVoucherItem = () => {
  const { control, setValue } = useFormContext<InvoiceType>();

  const { _t } = useTranslationContext();

  const ITEMS_NAME = 'details.items';
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: ITEMS_NAME,
  });

  const addNewField = () => {
    append({
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const moveFieldUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };
  const moveFieldDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  // DnD
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(active.id);

      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over?.id);

        move(oldIndex, newIndex);
      }
    },
    [fields, setValue]
  );

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold tracking-tight text-gray-900">
          Expense Item
        </h3>
      </div>
      <div className="flex flex-row items-center px-2 font-medium text-neutral-700 w-full gap-3 bg-neutral-100 py-3 rounded-t-lg border border-b-0 border-solid border-neutral-200 text-sm">
        <div className="w-10">No.</div>
        <div className="w-1/2">Description</div>
        <div className="w-1/4">Amount</div>
        <div className="max-w-[60px] w-full"></div>
      </div>
      <div className="border border-t-0 border-solid rounded-b-lg -mt-4 border-neutral-200 py-2">
        {fields?.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => {
              const { active } = event;
              setActiveId(active.id);
            }}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <VoucherSingleItem
                  key={field.id}
                  name={ITEMS_NAME}
                  index={index}
                  fields={fields}
                  field={field}
                  moveFieldUp={moveFieldUp}
                  moveFieldDown={moveFieldDown}
                  removeField={removeField}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-neutral-500 text-center">No data</div>
        )}
      </div>
      <BaseButton
        tooltipLabel="Add a new item to the list"
        onClick={addNewField}
        className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-8 w-fit ml-auto flex items-center gap-2 -mr-2"
      >
        <Plus />
        {_t('form.steps.lineItems.addNewItem')}
      </BaseButton>
    </section>
  );
};

export default PaymentVoucherItem;
