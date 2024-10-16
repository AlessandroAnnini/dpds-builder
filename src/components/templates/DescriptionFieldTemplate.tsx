import { DescriptionFieldProps } from "@rjsf/utils";

function DescriptionFieldTemplate(props: DescriptionFieldProps) {
  return <div dangerouslySetInnerHTML={{ __html: props.description }} />;
}

export { DescriptionFieldTemplate };
