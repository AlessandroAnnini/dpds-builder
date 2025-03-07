import { getSubmitButtonOptions, SubmitButtonProps } from '@rjsf/utils';
import { Button } from '@/components/ui/button';
import { ClipboardCopy } from 'lucide-react';

function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);

  if (norender) {
    return null;
  }

  return (
    <Button
      variant="outline"
      type="submit"
      className="text-white bg-blue-800"
      id="submit-button"
    >
      <ClipboardCopy className="mr-2 h-4 w-4" />
      Copy to clipboard
    </Button>
  );
}

export { SubmitButton };
