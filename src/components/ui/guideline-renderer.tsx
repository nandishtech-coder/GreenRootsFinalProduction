import React from 'react';

export function GuidelineRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let listItems: React.ReactNode[] = [];
  
  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 mb-6">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      elements.push(<div key={`br-${i}`} className="h-4" />);
      return;
    }

    if (trimmed.startsWith('•') || trimmed.startsWith('- ')) {
      const text = trimmed.startsWith('•') ? trimmed.substring(1) : trimmed.substring(2);
      listItems.push(<li key={`li-${i}`}>{text.trim()}</li>);
    } else {
      flushList();
      // If it looks like a heading (short, no ending punctuation)
      if (trimmed.length < 60 && !/[.,:;]$/.test(trimmed)) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl font-semibold text-forest mt-8 mb-4">
            {trimmed}
          </h2>
        );
      } else {
        elements.push(
          <p key={`p-${i}`} className="mb-2 leading-relaxed text-muted-foreground">
            {trimmed}
          </p>
        );
      }
    }
  });

  flushList();

  return <div className="text-base text-foreground font-sans">{elements}</div>;
}
