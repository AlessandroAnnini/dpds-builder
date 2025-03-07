import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface JsonViewerProps {
  value: Record<string, unknown> | unknown[];
  readOnly?: boolean;
  height?: string;
  onChange?: (value: Record<string, unknown> | unknown[] | null) => void;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  value,
  readOnly = true,
  height = '200px',
  onChange,
}) => {
  const [jsonString, setJsonString] = useState<string>('');
  const [autoHeight, setAutoHeight] = useState<string>('auto');
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Format JSON with 2 spaces indentation for readability
      const formatted = JSON.stringify(value, null, 2);
      setJsonString(formatted);
      setIsValid(true);

      // Calculate auto height based on content (roughly 20px per line plus some padding)
      if (height === 'auto') {
        const lineCount = formatted.split('\n').length;
        const calculatedHeight = `${Math.min(
          500,
          Math.max(100, lineCount * 20 + 10),
        )}px`;
        setAutoHeight(calculatedHeight);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setJsonString(String(value) || '');
      setIsValid(false);
    }
  }, [value, height]);

  const handleChange = React.useCallback(
    (newCode: string) => {
      setJsonString(newCode);

      // Validate and parse JSON
      try {
        const parsedJson = JSON.parse(newCode);
        setIsValid(true);

        // Only call onChange if JSON is valid
        if (onChange) {
          onChange(parsedJson);
        }
      } catch (error) {
        // JSON is invalid
        setIsValid(false);
        console.warn('Invalid JSON:', error);
      }
    },
    [onChange],
  );

  // Setup CodeMirror extensions
  const extensions = [json()];

  return (
    <div className="json-viewer">
      <div
        style={{
          border: `1px solid ${isValid ? '#e2e8f0' : '#f56565'}`,
          borderRadius: '0.375rem',
          transition: 'border-color 0.2s',
        }}
      >
        <CodeMirror
          value={jsonString}
          height={height === 'auto' ? autoHeight : height}
          extensions={extensions}
          onChange={handleChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: !readOnly,
            highlightSelectionMatches: !readOnly,
          }}
          editable={!readOnly}
          className="text-sm"
          theme="light"
        />
      </div>
      {!isValid && !readOnly && (
        <div className="text-red-500 text-xs px-2 mt-1">
          Invalid JSON syntax
        </div>
      )}
    </div>
  );
};
