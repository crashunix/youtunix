import { useState } from "react";

const Description = ({ text }) => {

    const [descriptionOpen, setDescriptionOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <div className={`
                        overflow-auto mt-8 text-sm relative
                        ${!descriptionOpen && 'max-h-20 overflow-hidden'}
                        `} onClick={() => setDescriptionOpen(x => !x)}>
                {!descriptionOpen && <div className="bg-gradient-to-b from-transparent to-black absolute inset-0 pointer-events-none"></div>}
                <p>{text}</p>
            </div>
            <a className="text-white text-center text-sm cursor-pointer" onClick={() => setDescriptionOpen(x => !x)}>Ler {descriptionOpen ? 'menos' : 'mais...'}</a>
        </div>
    );
}

export default Description;