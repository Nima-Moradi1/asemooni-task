/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpTrayIcon, CheckBadgeIcon } from "@heroicons/react/24/outline"

interface FileInputProps {
    label : string ,
    name : string ,
    value : string  ,
    id? : string
    dir? : string ,
    onChange : React.ChangeEventHandler<HTMLInputElement>,
    isRequired? : boolean ,
    isImageUploaded? : boolean,
    className? : string
    validationSchema? : object
    errors? : any
    disabled? : boolean, 
    register? : any
}

function FileInput({
    label,
    name , 
    id,
    value,
    isImageUploaded,
    dir = 'rtl',
    onChange,
    isRequired,
    className,
    disabled ,
    errors,

    ...rest
}:FileInputProps) {

    return (
      <div className="w-full">
        <label htmlFor={id}
         className={`cursor-pointer border-2 rounded-lg px-5
        py-3 flex items-center justify-center gap-x-3 ${className}`}>
            {isImageUploaded ? <CheckBadgeIcon stroke="green"
             className="size-7 -mr-3" /> : null}
            {label}
            <ArrowUpTrayIcon className="size-5"/>
            <input id={id} type="file" className="sr-only " disabled={disabled}
            name={name} value={value} onChange={onChange} required={isRequired}
            dir={dir}
            {...rest}
            />
        </label>
        {errors && errors[name] && (
            <span className="text-destructive block text-xs mt-2">
                {errors[name]?.message}
            </span>
        )}
        </div>
    )
}

export default FileInput