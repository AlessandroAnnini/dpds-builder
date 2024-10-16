import { TitleFieldProps } from "@rjsf/utils";

function TitleFieldTemplate(props: TitleFieldProps) {
  return null;
  return (
    <header
      style={{ fontSize: 24 }}
      dangerouslySetInnerHTML={{ __html: props.title }}
    />
  );
}

export { TitleFieldTemplate };
