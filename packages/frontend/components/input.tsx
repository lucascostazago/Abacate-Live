import { useState } from "react";
export default function Input({ placeholder, value, onChange, description, moneyFormat }: { placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, description?: string, moneyFormat?: boolean }) {
    const [isFocused, setIsFocused] = useState(false);
    
    const displayValue = moneyFormat 
        ? (Number(value) || 0) === 0 ? '' : (Number(value) / 100).toFixed(2).replace('.', ',')
        : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (moneyFormat) {
            const cents = e.target.value.replace(/\D/g, '') || '';
            onChange({ ...e, target: { ...e.target, value: cents } });
        } else {
            onChange(e);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className={`flex p-2 rounded-md border-2 border-black/5 ${isFocused ? 'border-blue-500' : 'border-black/5'} transition-all duration-300 items-center`}>
                {moneyFormat && <span className="text-xl translate-y-0.2">R$</span>}
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    className="min-w-70 text-xl outline-none focus:outline-none p-2 placeholder:text-black/20" 
                    value={displayValue} 
                    onChange={handleChange} 
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                />
            </div>
            {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      
    )
}