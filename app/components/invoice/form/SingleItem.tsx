'use client';

import { useEffect } from 'react';

// RHF
import { FieldArrayWithId, useFormContext, useWatch } from 'react-hook-form';

// DnD
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ShadCn
import { Label } from '@/components/ui/label';

// Components
import { BaseButton } from '@/app/components';

// Contexts
import { useTranslationContext } from '@/contexts/TranslationContext';

// Icons
import { GripVertical, Trash2 } from 'lucide-react';

// Types
import { ItemType, NameType } from '@/types';
import FormInput from '../../reusables/form-fields/FormInput/FormInput';

type SingleItemProps = {
  name: NameType;
  index: number;
  fields: ItemType[];
  field: FieldArrayWithId<ItemType>;
  moveFieldUp: (index: number) => void;
  moveFieldDown: (index: number) => void;
  removeField: (index: number) => void;
};

const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
}: SingleItemProps) => {
  const { control, setValue } = useFormContext();

  const { _t } = useTranslationContext();

  // Items
  const itemName = useWatch({
    name: `${name}[${index}].name`,
    control,
  });

  const rate = useWatch({
    name: `${name}[${index}].unitPrice`,
    control,
  });

  const quantity = useWatch({
    name: `${name}[${index}].quantity`,
    control,
  });

  const total = useWatch({
    name: `${name}[${index}].total`,
    control,
  });

  // Currency
  const currency = useWatch({
    name: `details.currency`,
    control,
  });

  useEffect(() => {
    // Calculate total when rate or quantity changes
    if (rate != undefined && quantity != undefined) {
      const calculatedTotal = (rate * quantity).toFixed(2);
      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [rate, quantity]);

  // DnD
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const boxDragClasses = isDragging ? 'bg-blue-50 z-10' : '';

  const gripDragClasses = isDragging
    ? 'opacity-0 group-hover:opacity-100 transition-opacity cursor-grabbing'
    : 'cursor-grab';

  return (
    <div
      style={style}
      {...attributes}
      className={`rounded-lg py-2 md:px-2 ${boxDragClasses}`}
    >
      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-3 p-3 border border-neutral-200 rounded-lg mb-2">
        <div className="flex justify-between items-center">
          <div className="font-medium text-neutral-700">Item #{index + 1}</div>
          <div className="flex items-center gap-1">
            <div
              className={`${gripDragClasses} flex justify-center items-center`}
              ref={setNodeRef}
              {...listeners}
            >
              <GripVertical className="hover:text-blue-600 text-neutral-700 w-4 h-4 cursor-pointer !important" />
            </div>
            {fields.length > 0 && (
              <BaseButton
                className="p-1 bg-white text-red-500 hover:bg-red-50 size-8"
                variant="destructive"
                onClick={() => removeField(index)}
              >
                <Trash2 className="w-4 h-4" />
              </BaseButton>
            )}
          </div>
        </div>

        <div className="w-full mb-3">
          <FormInput
            name={`${name}[${index}].description`}
            placeholder="Item description"
            vertical
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <Label className="text-xs mb-1 block">Unit Price</Label>
            <FormInput
              name={`${name}[${index}].unitPrice`}
              type="number"
              placeholder={_t('form.steps.lineItems.rate')}
              vertical
            />
          </div>

          <div>
            <Label className="text-xs mb-1 block">Quantity</Label>
            <FormInput
              name={`${name}[${index}].quantity`}
              type="number"
              placeholder="Item quantity"
              size={10}
            />
          </div>
        </div>

        <div className="w-full">
          <Label className="text-xs mb-1 block">Total</Label>
          <FormInput
            name={`${name}[${index}].total`}
            value={`${total}`}
            readOnly
            placeholder="Item total"
            className="font-medium"
          />
        </div>
      </div>

      {/* Desktop view */}
      <div
        className="
        hidden md:flex flex-row gap-3
        "
        key={index}
      >
        <div className="w-10 text-center flex items-center justify-center">
          {index + 1}
        </div>
        <div className="w-1/2">
          <FormInput
            name={`${name}[${index}].description`}
            placeholder="Item description"
            vertical
          />
        </div>

        <div className="w-1/4">
          <FormInput
            name={`${name}[${index}].unitPrice`}
            type="number"
            placeholder={_t('form.steps.lineItems.rate')}
            vertical
          />
        </div>

        <div className="max-w-[80px] w-full">
          <FormInput
            name={`${name}[${index}].quantity`}
            type="number"
            placeholder="Item quantity"
            size={10}
          />
        </div>

        <div className="w-1/4">
          <FormInput
            name={`${name}[${index}].total`}
            value={`${total}`}
            readOnly
            placeholder="Item total"
            size={10}
          />
        </div>
        <div className="flex flex-row gap-2">
          {fields.length > 0 && (
            <BaseButton
              className="px-2 bg-white text-red-500 hover:bg-red-50 size-10"
              variant="destructive"
              onClick={() => removeField(index)}
            >
              <Trash2 className="w-5 h-5" />
            </BaseButton>
          )}
          <div
            className={`${gripDragClasses} flex justify-center items-center`}
            ref={setNodeRef}
            {...listeners}
          >
            <GripVertical className="hover:text-blue-600 text-neutral-700 w-4 h-4 cursor-pointer !important" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
