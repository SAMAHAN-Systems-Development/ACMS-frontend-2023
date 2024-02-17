'use client';
import { ButtonComponent } from "@/components/button/ButtonComponent";
import { useState } from "react";


export default function Page() {
    const [text, setText] = useState<string>("Add Facilitator");
    const [type, setType] = useState<string>("secondary");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    return (
        <div className="p-5">
            <ButtonComponent type={type} text={text} isDisabled={isDisabled} />
        </div>
        
      
    )
}