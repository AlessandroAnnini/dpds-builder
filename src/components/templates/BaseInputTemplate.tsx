import React, {
  ChangeEvent,
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { getInputProps, BaseInputTemplateProps } from '@rjsf/utils';
import type { FocusEvent } from 'react';

// List of props that should not be passed to the input element
const EXCLUDED_PROPS = [
  'uiSchema',
  'rawErrors',
  '$id',
  '$schema',
  'registry',
  'formContext',
  'hideError',
  'label',
  'hideLabel',
  'formData',
  'onChange',
  'onBlur',
  'onFocus',
  'idPrefix',
  'idSchema',
  'schema',
  'required',
  'disabled',
  'readonly',
  'autofocus',
];

// Use React.memo with custom comparison to minimize re-renders
const BaseInputTemplate = memo(
  function BaseInputTemplate(props: BaseInputTemplateProps) {
    const {
      schema,
      id,
      options,
      value,
      type,
      placeholder,
      disabled,
      readonly,
      autofocus,
      onChange,
      onChangeOverride,
      onBlur,
      onFocus,
      ...restProps
    } = props;

    // Use local state to manage input value for better performance
    // This decouples the input from the form's render cycle
    const [localValue, setLocalValue] = useState(
      value === undefined || value === null ? '' : value,
    );

    // Sync local state with prop value when it changes from outside
    useEffect(() => {
      const normalized = value === undefined || value === null ? '' : value;
      if (normalized !== localValue) {
        setLocalValue(normalized);
      }
    }, [value]);

    // Fast local change handler that updates local state immediately
    const handleLocalChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Debounce the actual onChange to reduce form validation frequency
        // Use requestAnimationFrame for performance
        requestAnimationFrame(() => {
          onChange(newValue === '' ? options.emptyValue || '' : newValue);
        });
      },
      [onChange, options.emptyValue],
    );

    const onTextBlur = useCallback(
      ({ target: { value: val } }: FocusEvent<HTMLInputElement>) => {
        onBlur(id, val);
      },
      [onBlur, id],
    );

    const onTextFocus = useCallback(
      ({ target: { value: val } }: FocusEvent<HTMLInputElement>) => {
        onFocus(id, val);
      },
      [onFocus, id],
    );

    // Get the appropriate props for the input
    const inputProps = getInputProps(schema, type, options);

    // Filter out non-DOM props efficiently
    const cleanProps = Object.fromEntries(
      Object.entries(restProps).filter(
        ([key]) => !EXCLUDED_PROPS.includes(key),
      ),
    );

    // Ensure the id is always a string
    const safeId = typeof id === 'string' ? id : `input-${String(id)}`;

    return (
      <input
        id={safeId}
        className="p-2 rounded-none outline-none border-solid border-2 w-full focus:border-2 focus:border-blue-700 focus:outline-none focus:ring-0"
        value={localValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        autoFocus={autofocus}
        onChange={onChangeOverride || handleLocalChange}
        onBlur={onTextBlur}
        onFocus={onTextFocus}
        {...cleanProps}
        {...inputProps}
        data-testid={`input-${safeId}`}
      />
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    // Only re-render when these specific props change
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.readonly === nextProps.readonly &&
      prevProps.placeholder === nextProps.placeholder
    );
  },
);

export { BaseInputTemplate };
