import Button from '@/components/ui/Buttons/Button';
import '../custom/CSSFile/default/Index.module.css';
import RadioGroup from '@/components/ui/Radio/RadioGroup';
import { useState } from 'react';
import Accordion from '@/components/ui/Accordion/Accordion';

export default function Home() {
  const options = [
    { label: 'YES', value: 'YES' },
    { label: 'NO', value: 'NO' },
  ];

  const [selectedValue, setSelectedValue] = useState('YES');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Button>+ Professional Registeration</Button>
      <Button variant="secondary">+ Professional Registeration</Button>
      <Button variant="ghost">+ Professional Registeration</Button>
      <RadioGroup
        options={options}
        selectedValue={selectedValue}
        onChange={handleRadioChange}
      />
            <Accordion title="Section 1" content="Content for Section 1" />
    </>
  );
}
