import { FieldTemplateProps } from '@rjsf/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

function FieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    // description,
    help,
    required,
    errors,
    children,
    schema,
    formData,
  } = props;

  const hasErrors =
    errors &&
    errors.props &&
    errors.props.errors &&
    Array.isArray(errors.props.errors) &&
    errors.props.errors.length > 0;

  const isArrayWithData =
    schema.type === 'array' && formData && formData.length > 0;
  const isString = schema.type === 'string';
  const isObject = schema.type === 'object';

  if (isString) {
    return (
      <div
        className={`${classNames} my-2 ${
          hasErrors ? 'border-r-red-600 border-r-8' : ''
        }`}
        style={style}
      >
        <div className="px-4">
          <div className="flex flex-row items-center space-x-2">
            <label
              htmlFor={id}
              className={`${hasErrors ? 'text-red-700 font-semibold' : ''} ${
                required ? 'font-bold' : ''
              }`}
            >
              {label}
              {required ? '*' : null}
            </label>
            {children}
          </div>
          {errors && <div className="mt-2 text-red-600">{errors}</div>}
          {help && <div className="mt-2 text-gray-600">{help}</div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${classNames} mix-blend-multiply bg-slate-50 my-2 py-2 ${
        isObject || !isArrayWithData ? 'border-2' : 'py-10'
      }  ${hasErrors ? 'border-r-red-600 border-r-8' : ''}`}
      style={style}
    >
      <Collapsible>
        <div className="space-x-4 px-4">
          <CollapsibleTrigger className="flex flex-row items-center space-x-2">
            <ChevronsUpDown className="h-5 w-5" />
            <label
              htmlFor={id}
              className={`flex flex-row text-xl font-semibold ${
                hasErrors ? 'text-red-700 font-semibold' : ''
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: label }} />
              {/* {label} */}
              {required ? '*' : null}
            </label>
            <span className="sr-only">Toggle</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {children}
            {errors && <div className="mt-2 text-red-600">{errors}</div>}
            {help && <div className="mt-2 text-gray-600">{help}</div>}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}

export { FieldTemplate };
