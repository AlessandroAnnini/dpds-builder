import { ChangeEvent } from 'react';
import { getInputProps, BaseInputTemplateProps } from '@rjsf/utils';
import type { FocusEvent } from 'react';

function BaseInputTemplate(props: BaseInputTemplateProps) {
  const {
    schema,
    id,
    options,
    // label,
    value,
    type,
    placeholder,
    // required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    // rawErrors,
    // hideError,
    ...rest
  } = props;
  const onTextChange = ({
    target: { value: val },
  }: ChangeEvent<HTMLInputElement>) => {
    // Use the options.emptyValue if it is specified and newVal is also an empty string
    onChange(val === '' ? options.emptyValue || '' : val);
  };
  const onTextBlur = ({
    target: { value: val },
  }: FocusEvent<HTMLInputElement>) => onBlur(id, val);
  const onTextFocus = ({
    target: { value: val },
  }: FocusEvent<HTMLInputElement>) => onFocus(id, val);

  const inputProps = { ...rest, ...getInputProps(schema, type, options) };
  // const hasError = rawErrors && rawErrors.length > 0 && !hideError;

  return (
    <input
      id={id}
      className="p-2 rounded-none outline-none border-solid border-2  w-full focus:border-2 focus:border-blue-700 focus:outline-none focus:ring-0"
      // label={label}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      // error={hasError}
      // errors={hasError ? rawErrors : undefined}
      onChange={onChangeOverride || onTextChange}
      onBlur={onTextBlur}
      onFocus={onTextFocus}
      {...inputProps}
    />
  );
}

export { BaseInputTemplate };
